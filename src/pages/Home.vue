<template>
  <q-page padding>
    <!-- MAIN CONTENT -->
    <div class="text-center">
      Put stuff here
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
