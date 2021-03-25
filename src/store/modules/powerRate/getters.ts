import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  allPowerRates(state: State): PowerRate[];
  getIsAllPowerRatesFetch(state: State): boolean;
};

const getters: GetterTree<State, any> & Getters = {
  allPowerRates(state) {
    return state.powerRates;
  },
  getIsAllPowerRatesFetch(state: State) {
    return state.isAllPowerRatesFetch;
  },
};

export default getters;
