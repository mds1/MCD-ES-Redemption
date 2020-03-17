<template>
  <q-btn
    label="Connect Wallet to Get Started"
    color="primary"
    @click="connectWallet()"
  />
</template>

<script>
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';

const addresses = require('src/addresses.json');
const abi = require('src/abi/ESRedemption.json');

const providerOptions = {
  /* See Provider Options Section */
};

const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: false, // always require suer to choose provider
  providerOptions,
});

export default {
  name: 'ConnectWallet',

  data() {
    return {
      ESRedemption: undefined, // contract instance for user
    };
  },

  created() {

  },

  methods: {
    async connectWallet() {
      const web3provider = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(web3provider);
      const signer = provider.getSigner();
      await this.$store.dispatch('main/setSigner', signer);
      this.ESRedemption = new ethers.Contract(addresses.ESRedemption, abi, signer);
    },
  },
};
</script>
