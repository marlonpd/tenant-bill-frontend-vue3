import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  allPowerRates(state: State): PowerRate[];
};

const getters: GetterTree<State, any> & Getters = {
  allPowerRates(state) {
    return state.powerRates;
  },
};

export default getters;
