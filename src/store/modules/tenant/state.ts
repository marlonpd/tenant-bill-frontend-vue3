export type State = {
  tenants: Tenant[];
  tenant: Tenant;
};

const state: State = {
  tenants: [],
  tenant: { id: '', name: '', meterNumber: '', meterInitialReading: 0 },
};

export default state;
