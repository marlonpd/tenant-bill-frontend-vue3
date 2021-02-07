import { computed } from 'vue';
import { useStore } from 'vuex';
import {
  FETCH_TENANTS,
  DELETE_TENANT,
  UPDATE_TENANT,
} from '../store/actions.type';

export function useTenant() {
  const store = useStore();

  const allTenants = computed(() => store.state.tenant.tenants);

  const fetchTenants = async () => {
    await store.dispatch(FETCH_TENANTS);
  };

  const updateTenant = async (tenant: Tenant) => {
    await store.dispatch(UPDATE_TENANT, tenant);
  };

  const deleteTenant = async (id: number) => {
    await store.dispatch(DELETE_TENANT, id);
  };

  const getTenantById = (id: number) => {
    return store.getters.getTenantById(id);
  };

  return {
    allTenants,
    fetchTenants,
    deleteTenant,
    updateTenant,
    getTenantById,
  };
}
