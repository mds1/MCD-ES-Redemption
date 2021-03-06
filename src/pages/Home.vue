<template>
  <q-page padding>
    <div class="text-center">
      <h2 class="text-bold q-mt-lg">
        Redeem Dai for USDC
      </h2>
      <h6 class="q-mt-md">
        <!-- Multi-Collateral Dai (MCD) is undergoing an emergency shutdown -->
        This site can be used if an Emergency Shutdown of MCD is triggered
      </h6>
    </div>

    <!-- EXPLAINER QUESTIONS -->
    <div class="container q-pb-lg">
      <!-- Question 1 -->
      <q-expansion-item
        class="q-mt-lg"
        group="question"
        dense
        switch-toggle-side
      >
        <template v-slot:header>
          <q-item-section>
            <div class="text-bold">
              What is an emergency shutdown?
            </div>
          </q-item-section>
        </template>

        <ul>
          <!-- Some text copied from https://blog.makerdao.com/introduction-to-emergency-shutdown-in-multi-collateral-dai/ -->
          <li>
            An Emergency Shutdown is triggered as a last resort when a serious threat
            arises within the MCD system.
          </li>
          <li>
            This process stops and gracefully settles the Maker Protocol while ensuring
            that all users, both Dai holders and Vault holders, receive the net value of
            assets they are entitled to.
          </li>
          <li>
            The value of 1 Dai is no longer pegged to $1, and it can now redeemed for
            the underlying (volatile) assets that back it.
          </li>
          <li>
            This means by holding Dai, you are now exposed to price volatility and the
            value of your Dai may decrease. Because you were holding Dai, you probably
            do not want this to happen.
          </li>
        </ul>
      </q-expansion-item>

      <!-- Question 2 -->
      <q-expansion-item
        class="q-mt-lg"
        group="question"
        dense
        switch-toggle-side
      >
        <template v-slot:header>
          <q-item-section>
            <div class="text-bold">
              What is this site?
            </div>
          </q-item-section>
        </template>

        <ul>
          <li>
            During an Emergency Shutdown, Dai can be redeemed for $1 worth of underlying
            collateral. The underlying collateral is currently a mix of Ether (ETH),
            Basic Attention Token (BAT), and USD Coin (USDC).
          </li>
          <li>
            ETH and BAT are volatile assets, so this website will automate the process
            of redeeming Dai for the underlying collateral, then swapping all collateral
            for USDC and sending it you.
          </li>
          <li>
            USDC is stablecoin where each token is backed by $1 in a bank account,
            therefore acting as a stable replacement for Dai.
          </li>
        </ul>
      </q-expansion-item>
    </div>

    <!-- Contract Interataction -->
    <div class="container q-py-xl">
      <div
        v-if="!userAddress"
        class="text-center"
      >
        <connect-wallet />
      </div>
      <div
        v-else
        class="row justify-center "
      >
        <!-- REDEEM DAI -->
        <redeem-dai class="col-auto q-mr-md" />

        <!-- REDEEM CHAI -->
        <redeem-chai class="col-auto q-ml-md" />
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';
import mixinHelpers from 'src/utils/mixinHelpers';
import ConnectWallet from 'components/ConnectWallet';
import RedeemDai from 'components/RedeemDai';
import RedeemChai from 'components/RedeemChai';

export default {
  name: 'HomePage',

  components: {
    ConnectWallet,
    RedeemDai,
    RedeemChai,
  },

  mixins: [mixinHelpers],

  data() {
    return {
      amountDai: undefined,
      amountChai: undefined,
      isDaiLoading: false,
      isChaiLoading: false,
    };
  },

  computed: {
    ...mapState({
      blockNumber: (state) => state.main.data.blockNumber,
      userAddress: (state) => state.main.userAddress,
      daiBalance: (state) => state.main.data.user.daiBalance,
      chaiBalance: (state) => state.main.data.user.chaiBalance,
    }),
  },
};
</script>

<style lang="stylus" scoped>
.container {
  margin: 0 auto;
  max-width: 800px;
  text-align: left;
}
</style>
