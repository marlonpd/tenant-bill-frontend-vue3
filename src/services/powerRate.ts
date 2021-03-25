import { runPost, runGet } from './axios';

export const fetchPowerRates = async () => {
  return await runGet('api/power-rates');
};

export const fetchLimitedPowerRates = async (pageIndex: number) => {
  return await runGet(`api/power-rates/${pageIndex}/get`);
};

export const updatePowerRate = async (powerRate: PowerRate) => {
  return await runPost('api/power-rate/update', powerRate);
};

export const storePowerRate = async (rate: number) => {
  return await runPost('api/power-rate/store', { rate });
};

export const fetchPowerRate = async (id: string) => {
  return await runGet(`api/power-rate/${id}`);
};

export const deletePowerRate = async (powerRate: PowerRate) => {
  return await runPost('api/power-rate/delete', powerRate);
};
