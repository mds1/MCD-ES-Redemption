<template>
  <q-btn
    label="Connect Wallet to Get Started"
    color="primary"
    @click="connectWallet()"
  />
</template>

<script>
import { mapState } from 'vuex';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Portis from '@portis/web3';
// import Fortmatic from 'fortmatic';
// import Squarelink from 'squarelink';
// import Torus from '@toruslabs/torus-embed';
// import Arkane from "@arkane-network/web3-arkane-provider";
// import Authereum from "authereum";

const addresses = require('src/addresses.json');
const abi = require('src/abi/ESRedemption.json');

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.INFURA_ID,
    },
  },
  portis: {
    package: Portis,
    options: {
      id: process.env.PORTIS_ID,
    },
  },
  // fortmatic: {
  //   package: Fortmatic,
  //   options: {
  //     key: 'FORTMATIC_KEY',
  //   },
  // },
  // squarelink: {
  //   package: Squarelink,
  //   options: {
  //     id: 'SQUARELINK_ID',
  //   },
  // },
  // torus: {
  //   package: Torus, // required
  //   options: {
  //     // enableLogging: false, // optional
  //     // buttonPosition: 'bottom-left', // optional
  //     // buildEnv: 'production', // optional
  //     // showTorusButton: true, // optional
  //     // enabledVerifiers: {
  //     //   // optional
  //     //   google: false, // optional
  //     // },
  //   },
  // },
  // arkane: {
  //   package: Arkane, // required
  //   options: {
  //     clientId: 'ARKANE_CLIENT_ID', // required, replace
  //   },
  // },
  // authereum: {
  //   package: Authereum, // required
  //   options: {},
  // },
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

  computed: {
    ...mapState({
      signer: (state) => state.main.signer,
      userAddress: (state) => state.main.userAddress,
    }),
  },

  methods: {
    async connectWallet() {
      const web3provider = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(web3provider);
      const signer = provider.getSigner();
      await this.$store.dispatch('main/setWallet', signer);
      this.ESRedemption = new ethers.Contract(addresses.ESRedemption, abi, signer);
    },
  },
};
</script>
