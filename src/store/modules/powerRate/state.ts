export type State = {
  powerRates: PowerRate[];
  powerRate: PowerRate;
};

const state: State = {
  powerRates: [],
  powerRate: {
    id: undefined,
    ownerId: undefined,
    rate: 0,
    created: undefined,
  },
};

export default state;

// export default {
//   powerRates : [],
//   powerRate : {
//       rate: 0
//   }
// }
