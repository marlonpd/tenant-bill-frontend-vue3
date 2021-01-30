import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  allTenats(state: State): Tenant[];
  currentTenant(state: State): Tenant;
};

const getters: GetterTree<State, any> & Getters = {
  allTenats(state) {
    return state.tenants;
  },
  currentTenant(state) {
    return state.tenant;
  },
};

export default getters;
