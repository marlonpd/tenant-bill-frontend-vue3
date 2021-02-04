import { runPost, runGet } from './axios';

export const fetchMeterReadings = async () => {
  return await runGet('api/tenants');
};

export const updateMeterReading = async (tenant: Tenant) => {
  return await runPost('api/tenant/update', tenant);
};

export const storeTenant = async (tenant: Tenant) => {
  return await runPost('api/tenant/store', tenant);
};

export const fetchTenant = async (id: string) => {
  return await runGet(`api/tenant/${id}`);
};

export const deleteTenant = async (id: string) => {
  return await runPost('api/tenant/delete', { id });
};
