export type State = {
  meterReadings: MeterReading[];
  meterReading: MeterReading;
  ratePerKwh: number;
};

const state: State = {
  meterReadings: [],
  meterReading: {
    id: undefined,
    tenantId: undefined,
    fromDate: '',
    presentReadingKwh: 0,
    toDate: '',
    previousReadingKwh: 0,
    consumedKwh: 0,
    rate: 0,
    bill: 0,
  },
  ratePerKwh: 0,
};

export default state;
