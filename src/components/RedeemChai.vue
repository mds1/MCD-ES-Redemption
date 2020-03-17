<template>
  <div>
    <q-card class="text-center full-height">
      <!-- Header + Balance -->
      <q-card-section class="row justify-center items-center">
        <img
          alt="Chai logo"
          class="col-auto token-image q-pr-sm"
          src="statics/logos/chai.png"
        >
        <h6 class="col-auto">
          Redeem Chai
        </h6>
        <div class="col-xs-12 q-mt-sm">
          Balance: {{ formatCurrency(balance, false, 2, 4) }}
        </div>
      </q-card-section>
      <!-- Redeem -->
      <!-- if no allowance -->
      <q-card-section
        v-if="parseFloat(balance) === 0"
        class="text-caption text-italic q-my-lg"
      >
        You have no Chai to redeem
      </q-card-section>
      <q-card-section
        v-else-if="parseFloat(allowance) === 0"
        class="form"
      >
        <div style="max-width: 300px;">
          You must first approve this redemption contract to spend your Chai
        </div>
        <q-btn
          color="primary"
          class="q-mt-xl q-mb-md"
          label="Approve Chai"
          :loading="isLoading"
          @click="setAllowance()"
        />
      </q-card-section>
      <!-- if allowance -->
      <q-card-section
        v-else
        class="form"
      >
        <div class="col-xs-12 row justify-evenly">
          <q-btn
            color="primary"
            dense
            flat
            label="25%"
            @click="setWithdrawalAmount(0.25)"
          />
          <q-btn
            color="primary"
            dense
            flat
            label="50%"
            @click="setWithdrawalAmount(0.50)"
          />
          <q-btn
            color="primary"
            dense
            flat
            label="75%"
            @click="setWithdrawalAmount(0.75)"
          />
          <q-btn
            color="primary"
            dense
            flat
            label="100%"
            @click="setWithdrawalAmount(1)"
          />
        </div>
        <q-input
          v-model.number="amount"
          class="q-mt-sm q-mb-md"
          filled
          label="Amount to redeem"
          type="number"
        />
        <q-btn
          color="primary"
          class="q-mt-md q-mb-md"
          label="Redeem Chai for USDC"
          :disabled="parseFloat(balance) === 0 || amount === undefined || amount <= 0"
          :loading="isLoading"
          @click="redeem()"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { ethers } from 'ethers';
import mixinHelpers from 'src/utils/mixinHelpers';

const addresses = require('src/addresses.json');
const chaiAbi = require('src/abi/Chai.json');
const esRedemptionAbi = require('src/abi/ESRedemption.json');

export default {
  name: 'RedeemChai',

  mixins: [mixinHelpers],

  data() {
    return {
      amount: undefined,
      isLoading: false,
    };
  },

  computed: {
    ...mapState({
      balance: (state) => state.main.data.user.chaiBalance,
      allowance: (state) => state.main.data.user.chaiAllowance,
      signer: (state) => state.main.signer,
    }),
  },

  methods: {
    setWithdrawalAmount(fraction) {
      this.amount = parseFloat(this.balance) * fraction;
    },

    async setAllowance() {
      this.isLoading = true;
      const Chai = new ethers.Contract(addresses.dai, chaiAbi, this.signer);
      await Chai.approve(addresses.ESRedemption, ethers.constants.MaxUint256);
      this.isLoading = false;
    },

    async redeem() {
      this.isLoading = true;
      const ESRedemption = new ethers.Contract(addresses.ESRedemption, esRedemptionAbi, this.signer);
      await ESRedemption.redeemDaiForUsdc(String(this.amount));
      this.isLoading = false;
    },
  },
};
</script>
