import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  allMeterReadings(state: State): MeterReading[];
  getRatePerKwh(state: State): number | undefined;
};

const getters: GetterTree<State, any> & Getters = {
  allMeterReadings(state) {
    return state.meterReadings;
  },
  getRatePerKwh(state) {
    return state.ratePerKwh;
  },
};

export default getters;
