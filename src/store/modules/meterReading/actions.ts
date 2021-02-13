import { ActionContext, ActionTree } from 'vuex';
import {
  FETCH_METER_READINGS,
  ADD_NEW_METER_READING,
} from '@/store/actions.type';
import {
  SET_METER_READINGS,
  APPEND_METER_READING,
} from '@/store/mutations.type';
import { State } from './state';
import {
  fetchMeterReadings,
  storeMeterReading,
  // updateMeterReading,
  // fetchMeterReading,
  // deleteMeterReading,
} from '../../../services/meterReading';

export type Actions = {
  [FETCH_METER_READINGS](
    context: ActionContext<State, State>,
    id: number
  ): void;
  [ADD_NEW_METER_READING](
    context: ActionContext<State, State>,
    meterReading: MeterReading
  ): void;
};

const actions: ActionTree<State, State> & Actions = {
  async [FETCH_METER_READINGS](context, tenantId) {
    const { data } = await fetchMeterReadings(tenantId);
    context.commit(SET_METER_READINGS, data.meterReadings);
    return data;
  },
  async [ADD_NEW_METER_READING](context, meterReading) {
    const { data } = await storeMeterReading(meterReading);
    context.commit(APPEND_METER_READING, data.meterReading);
    return data;
  },
};

export default actions;
