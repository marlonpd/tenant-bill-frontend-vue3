export type State = {
  powerRates: PowerRate[];
  powerRate: PowerRate;
  isAllPowerRatesFetch: boolean;
};

const state: State = {
  powerRates: [],
  powerRate: {
    id: undefined,
    ownerId: undefined,
    rate: 0,
    created: undefined,
  },
  isAllPowerRatesFetch: false,
};

export default state;
