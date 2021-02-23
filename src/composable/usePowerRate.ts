import { computed } from 'vue';
import { useStore } from 'vuex';
import {
  FETCH_POWER_RATES,
  DELETE_POWER_RATE,
  ADD_NEW_POWER_RATE,
} from '../store/actions.type';

export function usePowerRate() {
  const store = useStore();

  const allPowerRates = computed(() => store.getters.allPowerRates);

  const latestPowerRate = computed(() => {
    const powerRateCnt = store.getters.allPowerRates.length;

    if (powerRateCnt > 0) {
      return store.getters.allPowerRates[powerRateCnt - 1];
    }

    return null;
  });

  const fetchPowerRates = async () => {
    await store.dispatch(FETCH_POWER_RATES);
  };

  const storePowerRate = async (rate: number) => {
    await store.dispatch(ADD_NEW_POWER_RATE, rate);
  };

  const deletePowerRate = async (id: number) => {
    await store.dispatch(DELETE_POWER_RATE, id);
  };

  return {
    allPowerRates,
    latestPowerRate,
    fetchPowerRates,
    storePowerRate,
    deletePowerRate,
  };
}
