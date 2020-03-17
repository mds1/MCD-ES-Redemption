<template>
  <q-page padding>
    <div class="text-center">
      <h2 class="q-mt-lg">
        Redeem Dai for USC
      </h2>
      <h6 class="q-mt-md">
        Multi-Collateral Dai (MCD) is undergoing an emergency shutdown
      </h6>
    </div>

    <!-- EXPLAINER QUESTIONS -->
    <div class="container">
      <!-- Question 1 -->
      <q-expansion-item
        class="q-mt-xl"
        group="question"
        dense
        switch-toggle-side
      >
        <template v-slot:header>
          <q-item-section>
            <h4>
              What does this mean?
            </h4>
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
            <h4>
              What is this site?
            </h4>
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
    <div class="container q-pt-xl">
      <div class="text-center">
        TODO
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HomePage',

  data() {
    return {
    };
  },

  computed: {
    ...mapState({
      blockNumber: (state) => state.main.data.blockNumber,
    }),
  },
};
</script>

<style lang="stylus" scoped>
.container
  margin 0 auto
  max-width 800px
  text-align left
</style>
