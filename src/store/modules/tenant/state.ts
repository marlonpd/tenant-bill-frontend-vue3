export type State = {
  tenants: Tenant[];
  tenant: Tenant;
  tenantsCount: number;
  isAllTenantsFetch: boolean;
};

const state: State = {
  tenants: [],
  tenant: { id: undefined, name: '', meterNumber: '', meterInitialReading: 0 },
  isAllTenantsFetch: false,
  tenantsCount: 0,
};

export default state;
