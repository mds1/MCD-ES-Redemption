<template>
  <div>
    <q-card class="text-center full-height">
      <!-- Header + Balance -->
      <q-card-section class="row justify-center items-center">
        <img
          alt="Dai logo"
          class="col-auto token-image q-pr-sm"
          src="statics/logos/dai.png"
        >
        <h6 class="col-auto">
          Redeem Dai
        </h6>
        <div class="col-xs-12 q-mt-sm">
          Balance: {{ formatCurrency(balance, false, 2, 4) }}
        </div>
      </q-card-section>
      <!-- Redeem -->
      <q-card-section class="form">
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
          label="Redeem Dai for USDC"
          :disabled="parseFloat(balance) === 0 || amount === undefined || amount <= 0"
          :loading="isLoading"
          @click="redeem()"
        />
        <div
          v-if="parseFloat(balance) === 0"
          class="text-caption text-italic"
        >
          You have no Dai to redeem
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';

export default {
  name: 'RedeemDai',

  mixins: [mixinHelpers],

  data() {
    return {
      amount: undefined,
      isLoading: false,
    };
  },

  computed: {
    ...mapState({
      balance: (state) => state.main.data.user.daiBalance,
    }),
  },

  methods: {
    setWithdrawalAmount(fraction) {
      this.amount = parseFloat(this.balance) * fraction;
    },

    redeem() {
      this.isLoading = true;
      alert('redeem dai');
      this.isLoading = false;
    },
  },
};
</script>
