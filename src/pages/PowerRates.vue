<template>
  <div class="container">
    <h3>Power Rates</h3>
    <h5></h5>
    <div class="row m-auto">
      <div class="container max-w-4xl mx-auto text-center pb-10">
        <div class="row m-auto">
          <h3>Rate Per KiloWatt</h3>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col" width="70%" class="text-center">Rates</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(rate, index) in allPowerRates.slice(0, 10)"
                :name="rate"
                :key="index"
              >
                <th scope="row">{{ index + 1 }}</th>
                <td class="text-center">
                  {{ rate.rate }}
                </td>
                <td>{{ rate.createdAt }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <button
            @click="loadMore()"
            v-if="!isAllPowerRatesFetch && !isLoading"
            class="block w-full bg-blue-600 text-white rounded-sm py-3 text-sm tracking-wide"
          >
            Load More
          </button>
          <button
            v-if="!isAllPowerRatesFetch && isLoading"
            class="block w-full bg-blue-600 text-white rounded-sm py-3 text-sm tracking-wide"
          >
            <i class="pi pi-spin pi-spinner" style="fontSize: 2rem"></i>
          </button>
        </div>
        <div class="fixed-bottom w-100" style="width:100%;">
          <div class="container">
            <CreatePowerRate></CreatePowerRate>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { onMounted, defineComponent, ref } from 'vue';
  import { usePowerRate } from '../composable/usePowerRate';
  import CreatePowerRate from '../components/powerRate/CreatePowerRate.vue';

  export default defineComponent({
    name: 'PowerRatesPage',
    components: { CreatePowerRate },
    async setup() {
      const uPowerRate = usePowerRate();
      let pageIndex = 1;
      const isLoading = ref(false);
      const isAllPowerRatesFetch = uPowerRate.isAllPowerRatesFetch;

      onMounted(async () => {
        isLoading.value = true;
        await uPowerRate.fetchLimitedPowerRates(pageIndex++);
        isLoading.value = false;
      });

      const loadMore = async () => {
        isLoading.value = true;
        await uPowerRate.fetchLimitedPowerRates(pageIndex++);
        isLoading.value = false;
      };

      return {
        allPowerRates: uPowerRate.allPowerRates,
        isAllPowerRatesFetch,
        isLoading,
        loadMore,
      };
    },
  });
</script>
