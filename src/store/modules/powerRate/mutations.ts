import {
  SET_POWER_RATES,
  APPEND_POWER_RATE,
  APPEND_POWER_RATES,
  SET_POWER_RATES_COUNT,
} from '@/store/mutations.type';
import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations = {
  [SET_POWER_RATES](state: State, powerRates: PowerRate[]): void;
  [APPEND_POWER_RATE](state: State, powerRate: PowerRate): void;
  [APPEND_POWER_RATES](state: State, powerRates: PowerRate[]): void;
  [SET_POWER_RATES_COUNT](state: State, powerRatesCount: number): void;
};
const mutations: MutationTree<State> & Mutations = {
  [SET_POWER_RATES](state, powerRates) {
    state.powerRates = powerRates;
  },
  [APPEND_POWER_RATE](state, powerRate) {
    state.powerRates.push(powerRate);
  },
  [APPEND_POWER_RATES](state: State, powerRates: PowerRate[]) {
    let powerRate: PowerRate = {
      id: undefined,
      ownerId: undefined,
      rate: 0,
      created: undefined,
    };
    for (powerRate of powerRates) {
      state.powerRates.push(powerRate);
    }
  },
  [SET_POWER_RATES_COUNT](state: State, powerRatesCount: number) {
    state.isAllPowerRatesFetch = state.powerRates.length === powerRatesCount;
  },
};

export default mutations;
