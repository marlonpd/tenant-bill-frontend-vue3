import {
  SET_TENANTS,
  SET_TENANT,
  APPEND_TENANT,
  TENANT_REMOVE,
  APPEND_TENANTS,
  SET_TENANTS_COUNT,
} from '@/store/mutations.type';
import { MutationTree } from 'vuex';
import { State } from './state';

export type Mutations = {
  [SET_TENANTS](state: State, tenants: Tenant[]): void;
  [APPEND_TENANTS](state: State, tenants: Tenant[]): void;
  [SET_TENANTS_COUNT](state: State, tenantsCount: number): void;
  [SET_TENANT](state: State, tenant: Tenant): void;
  [TENANT_REMOVE](state: State, tenantId: number): void;
  [APPEND_TENANT](state: State, tenant: Tenant): void;
};
const mutations: MutationTree<State> & Mutations = {
  [SET_TENANTS](state, tenants) {
    state.tenants = tenants;
  },
  [SET_TENANTS_COUNT](state, tenantsCount) {
    state.tenantsCount = tenantsCount;
    state.isAllTenantsFetch = state.tenants.length === tenantsCount;
    console.log(SET_TENANTS_COUNT);
    console.log(state.tenants.length);
    console.log(tenantsCount);
    console.log(state.isAllTenantsFetch);
  },
  [APPEND_TENANTS](state, tenants) {
    let tenant: Tenant = {
      id: undefined,
      name: '',
      meterNumber: '',
      meterInitialReading: 0,
    };
    for (tenant of tenants) {
      state.tenants.push({
        id: tenant.id,
        name: tenant.name,
        meterNumber: tenant.meterNumber,
        meterInitialReading: tenant.meterInitialReading,
      });
    }
  },
  [SET_TENANT](state, tenant) {
    state.tenant = tenant; //{"id": tenant.id , "name": tenant.name , "meterNumber": tenant.meterNumber, "meterInitialReading": tenant.meterInitialReading };
  },
  [TENANT_REMOVE](state, tenantId) {
    state.tenants = state.tenants.filter(function(t) {
      return t.id != tenantId;
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
