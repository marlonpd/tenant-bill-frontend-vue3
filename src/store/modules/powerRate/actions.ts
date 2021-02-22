import { ActionContext, ActionTree } from 'vuex';
import {
  FETCH_POWER_RATES,
  DELETE_POWER_RATE,
  ADD_NEW_POWER_RATE,
} from '@/store/actions.type';
import {
  SET_POWER_RATES,
  SET_POWER_RATE,
  APPEND_POWER_RATE,
} from '@/store/mutations.type';
import { State } from './state';
import {
  fetchPowerRates,
  storePowerRate,
  deletePowerRate,
} from '../../../services/powerRate';

export type Actions = {
  [FETCH_POWER_RATES](context: ActionContext<State, State>): void;
  [ADD_NEW_POWER_RATE](
    context: ActionContext<State, State>,
    rate: number
  ): void;

  [DELETE_POWER_RATE](
    context: ActionContext<State, State>,
    powerRate: PowerRate
  ): void;
};

const actions: ActionTree<State, State> & Actions = {
  async [FETCH_POWER_RATES](context) {
    const { data } = await fetchPowerRates();
    context.commit(SET_POWER_RATES, data.powerRates);
    return data;
  },
  async [ADD_NEW_POWER_RATE](context, rate) {
    const { data } = await storePowerRate(rate);
    context.commit(APPEND_POWER_RATE, data.powerRate);
    return data;
  },
  async [DELETE_POWER_RATE](context, powerRate) {
    const { data } = await deletePowerRate(powerRate);
    context.commit(APPEND_POWER_RATE, data.powerRate);
    return data;
  },
};

export default actions;