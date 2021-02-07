import { runPost, runGet } from './axios';

export const fetchMeterReadings = async () => {
  return await runGet('api/meter-readings');
};

export const updateMeterReading = async (meterReading: MeterReading) => {
  return await runPost('api/meter-readings/update', meterReading);
};

export const storeMeterReading = async (meterReading: MeterReading) => {
  return await runPost('api/meter-reading/store', meterReading);
};

export const fetchMeterReading = async (id: string) => {
  return await runGet(`api/meter-reading/${id}`);
};

export const deleteMeterReading = async (id: string) => {
  return await runPost('api/meter-reading/delete', { id });
};
