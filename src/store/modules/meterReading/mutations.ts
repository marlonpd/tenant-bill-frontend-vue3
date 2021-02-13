import {
  SET_METER_READINGS,
  APPEND_METER_READING,
} from '@/store/mutations.type';
import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations = {
  [SET_METER_READINGS](state: State, meterReadings: MeterReading[]): void;
  [APPEND_METER_READING](state: State, meterReading: MeterReading): void;
};
const mutations: MutationTree<State> & Mutations = {
  [SET_METER_READINGS](state, meterReadings) {
    state.meterReadings = meterReadings;
  },
  [APPEND_METER_READING](state, meterReading) {
    state.meterReadings.push(meterReading);
  },
};

export default mutations;
