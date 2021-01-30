import {
  SET_TENANTS,
  SET_TENANT,
  APPEND_TENANT,
  TENANT_REMOVE,
} from '@/store/mutations.type';
import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations = {
  [SET_TENANTS](state: State, tenants: Tenant[]): void;
  [SET_TENANT](state: State, tenant: Tenant): void;
  [TENANT_REMOVE](state: State, tenant: Tenant): void;
  [APPEND_TENANT](state: State, tenant: Tenant): void;
};
const mutations: MutationTree<State> & Mutations = {
  [SET_TENANTS](state, tenants) {
    state.tenants = tenants;
  },
  [SET_TENANT](state, tenant) {
    state.tenant = tenant; //{"id": tenant.id , "name": tenant.name , "meterNumber": tenant.meterNumber, "meterInitialReading": tenant.meterInitialReading };
  },
  [TENANT_REMOVE](state, tenant) {
    state.tenants = state.tenants.filter(function(t) {
      return t.id != tenant.id;
    });
  },
  [APPEND_TENANT](state, tenant) {
    state.tenants.push({
      id: tenant.id,
      name: tenant.name,
      meterNumber: tenant.meterNumber,
      meterInitialReading: tenant.meterInitialReading,
    });
  },
};

export default mutations;
