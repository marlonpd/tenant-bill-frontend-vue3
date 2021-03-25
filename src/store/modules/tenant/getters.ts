import { GetterTree } from 'vuex';
import { State } from './state';

export type Getters = {
  allTenats(state: State): Tenant[];
  currentTenant(state: State): Tenant;
  getTenantById(state: State): (id: number) => Tenant | undefined;
  getIsAllTenantsFetch(state: State): boolean;
};

const getters: GetterTree<State, any> & Getters = {
  allTenats(state) {
    return state.tenants;
  },
  currentTenant(state) {
    return state.tenant;
  },
  getTenantById: (state) => (id: number) => {
    return state.tenants.find((tenant) => tenant.id === id);
  },
  getIsAllTenantsFetch: (state) => {
    return state.isAllTenantsFetch;
  },
};

export default getters;
