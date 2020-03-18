/**
 * @notice This mixin contains boilerplate for both the permit pattern
 * and for meta-transactions via the Gas Station Network
 */

import { mapState } from 'vuex';
import { ethers } from 'ethers';

const Web3 = require('web3'); // required for Open Zeppelin GSN provider
const { GSNProvider } = require('@openzeppelin/gsn-provider');
const addresses = require('src/addresses.json');
const esRedemptionAbi = require('src/abi/ESRedemption.json');

export default {
  data() {
    return {
      daiPermitData: {
        // Define data types
        permit: [
          { name: 'holder', type: 'address' },
          { name: 'spender', type: 'address' },
          { name: 'nonce', type: 'uint256' },
          { name: 'expiry', type: 'uint256' },
          { name: 'allowed', type: 'bool' },
        ],
        domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
          // { name: 'salt', type: 'bytes32' }, // not used
        ],
      },
    };
  },

  computed: {
    ...mapState({
      signer: (state) => state.main.signer,
      userAddress: (state) => state.main.userAddress,
      esRedemptionContract: (state) => state.main.contracts.esRedemptionContract,
      daiContract: (state) => state.constants.contracts.daiContract,
    }),
  },

  methods: {
    /**
     * @notice Generate GSN instance of contract for meta-transactions
     */
    async getEsRedemptionGsnInstance() {
      const web3gsn = new Web3(new GSNProvider(this.signer));
      const ESRedemptionInstance = new web3gsn.eth.Contract(
        esRedemptionAbi, addresses.ESRedemption, { transactionConfirmationBlocks: 1 },
      );
      return ESRedemptionInstance;
    },

    /**
     * @notice Requests users signature for Dai permit function and then
     * sends a transaction with those parameters
     * @dev TODO currently sends no transaction
     */
    async sendTransactionWithSignature() {
      /* eslint-disable no-console */
      console.log('Fetching and formatting required signature data...');
      const { permit, domain } = this.daiPermitData;
      const nonce = parseInt(await this.daiContract.nonces(this.userAddress), 10);
      const holder = this.userAddress;
      const spender = this.esRedemptionContract.address;
      const expiry = 7200 + Math.floor(Date.now() / 1000); // expire 2 hours after now;
      const allowed = true;

      const permitData = {
        holder,
        spender,
        nonce,
        expiry,
        allowed,
      };

      const domainData = {
        name: 'Dai',
        version: '1',
        chainId: 1,
        verifyingContract: this.daiContract.address,
      };

      const dataObject = {
        types: {
          EIP712Domain: domain,
          Permit: permit,
        },
        domain: domainData,
        primaryType: 'Permit',
        message: permitData,
      };

      const web3 = new Web3(this.signer);
      const data = JSON.stringify(dataObject);

      console.log('Requesting signature data...');
      await web3.currentProvider.send(
        {
          // method: 'eth_signTypedData',
          method: 'eth_signTypedData_v3',
          params: [holder, data],
          from: holder,
          id: 1,
        },
        async (err, result) => {
          if (err) {
            // Something went wrong requesting signature
            return console.error(err);
          }
          try {
            console.log('Signature received! Parsing signature...');
            const signature = result.result.substring(2);
            const r = `0x${signature.substring(0, 64)}`;
            const s = `0x${signature.substring(64, 128)}`;
            const v = parseInt(signature.substring(128, 130), 16);

            console.log('Using signature to send transaction...');
            // Call contract function here and pass in signature parameters
            // (currently not using the GSN instance, so user must still have ETH)
            const instance = new ethers.Contract(addresses.ESRedemption, esRedemptionAbi, this.signer);
            // TODO update with real function and parameters
            await instance.SomeFunction(r, s, v, '1', '2', '3');
          } catch (error) {
            // Something went wrong sending transaction
            console.error(error);
          }
          /* eslint-enable no-console */
          return true; // success
        },
      );
    },
  },
};
