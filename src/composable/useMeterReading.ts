import { computed } from 'vue';
import { useStore } from 'vuex';
import {
  FETCH_METER_READINGS,
  DELETE_METER_READING,
  ADD_NEW_METER_READING,
  UPDATE_METER_READING,
} from '../store/actions.type';

export function useMeterReading() {
  const store = useStore();

  const allMeterReadings = computed(() => store.getters.allMeterReadings);

  const latestReading = computed<MeterReading | undefined>(() => {
    const readingCnt = store.getters.allMeterReadings.length;

    if (readingCnt > 0) {
      return store.getters.allMeterReadings[readingCnt - 1] as MeterReading;
    }

    return undefined;
  });

  const fetchMeterReading = async (tenantId: number) => {
    await store.dispatch(FETCH_METER_READINGS, tenantId);
  };

  const storeMeterReading = async (meterReading: MeterReading) => {
    await store.dispatch(ADD_NEW_METER_READING, meterReading);
  };

  const deleteMeterReading = async (id: number) => {
    await store.dispatch(DELETE_METER_READING, id);
  };

  const updateMeterReading = async (meterReading: MeterReading) => {
    await store.dispatch(UPDATE_METER_READING, meterReading);
  };

  return {
    allMeterReadings,
    fetchMeterReading,
    storeMeterReading,
    deleteMeterReading,
    updateMeterReading,
    latestReading,
  };
}
