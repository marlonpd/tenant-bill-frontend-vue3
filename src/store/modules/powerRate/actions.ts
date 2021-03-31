import { ActionContext, ActionTree } from 'vuex';
import {
  FETCH_POWER_RATES,
  DELETE_POWER_RATE,
  ADD_NEW_POWER_RATE,
  FETCH_LIMITED_POWER_RATES,
} from '@/store/actions.type';
import {
  SET_POWER_RATES,
  SET_POWER_RATES_COUNT,
  APPEND_POWER_RATE,
  APPEND_POWER_RATES,
} from '@/store/mutations.type';
import { State } from './state';
import {
  fetchPowerRates,
  storePowerRate,
  deletePowerRate,
  fetchLimitedPowerRates,
} from '../../../services/powerRate';

export type Actions = {
  [FETCH_POWER_RATES](context: ActionContext<State, State>): void;
  [FETCH_LIMITED_POWER_RATES](
    context: ActionContext<State, State>,
    pageIndex: number
  ): Promise<Tenant[] | []>;
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
  async [FETCH_LIMITED_POWER_RATES](context, pageIndex: number) {
    const { data } = await fetchLimitedPowerRates(pageIndex);
    if (pageIndex === 1) {
      context.commit(SET_POWER_RATES, data.powerRates);
    } else {
      context.commit(APPEND_POWER_RATES, data.powerRates);
    }
    const powerRatesCount = Number(data.count);
    context.commit(SET_POWER_RATES_COUNT, powerRatesCount);
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
