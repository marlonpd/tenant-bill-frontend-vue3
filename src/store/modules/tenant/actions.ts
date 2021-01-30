import { ActionContext, ActionTree } from 'vuex';
import {
  fetchTenants,
  updateTenant,
  storeTenant,
  fetchTenant,
  deleteTenant,
} from '@/services/tenant';
import {
  SET_TENANTS,
  SET_TENANT,
  APPEND_TENANT,
  TENANT_REMOVE,
} from '@/store/mutations.type';
import {
  FETCH_TENANTS,
  FETCH_TENANT,
  UPDATE_TENANT,
  ADD_NEW_TENANT,
  DELETE_TENANT,
} from '@/store/actions.type';
import { State } from './state';

export type Actions = {
  [FETCH_TENANTS](context: ActionContext<State, State>): Promise<Tenant[] | []>;
  [FETCH_TENANT](
    context: ActionContext<State, State>,
    id: string
  ): Promise<Tenant | null>;
  [DELETE_TENANT](context: ActionContext<State, State>, id: string): void;
  [ADD_NEW_TENANT](context: ActionContext<State, State>, tenant: Tenant): void;
  [UPDATE_TENANT](context: ActionContext<State, State>, tenant: Tenant): void;
};

const actions: ActionTree<State, State> & Actions = {
  async [FETCH_TENANTS](context) {
    const { data } = await fetchTenants();
    console.log(data);
    const tenants: Tenant[] = data.tenants;
    context.commit(SET_TENANTS, tenants);
    return tenants;
  },
  async [FETCH_TENANT](context, tenantId) {
    const { data } = await fetchTenant(tenantId);
    const tenant: Tenant = data.tenant;
    context.commit(SET_TENANT, tenant);
    return tenant;
  },
  async [DELETE_TENANT](context, tenantId) {
    await deleteTenant(tenantId);
    context.commit(TENANT_REMOVE, tenantId);
  },
  async [ADD_NEW_TENANT](context, tenant: Tenant) {
    const { data } = await storeTenant(tenant);
    const newTenant: Tenant = data.tenant;
    context.commit(APPEND_TENANT, newTenant);
  },
  async [UPDATE_TENANT](context, tenant: Tenant) {
    const { data } = await updateTenant(tenant);
    const newTenant: Tenant = data.tenant;
    context.commit(APPEND_TENANT, newTenant);
  },
};

export default actions;
