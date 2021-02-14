import { SET_POWER_RATES, APPEND_POWER_RATE } from '@/store/mutations.type';
import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations = {
  [SET_POWER_RATES](state: State, powerRates: PowerRate[]): void;
  [APPEND_POWER_RATE](state: State, powerRate: PowerRate): void;
};
const mutations: MutationTree<State> & Mutations = {
  [SET_POWER_RATES](state, powerRates) {
    state.powerRates = powerRates;
  },
  [APPEND_POWER_RATE](state, powerRate) {
    state.powerRates.push(powerRate);
  },
};

export default mutations;
