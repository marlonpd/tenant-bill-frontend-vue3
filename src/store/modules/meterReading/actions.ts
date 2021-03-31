import { ActionContext, ActionTree } from 'vuex';
import {
  FETCH_METER_READINGS,
  ADD_NEW_METER_READING,
  FETCH_LIMITED_METER_READINGS,
} from '@/store/actions.type';
import {
  SET_METER_READINGS,
  APPEND_METER_READING,
  APPEND_METER_READINGS,
} from '@/store/mutations.type';
import { State } from './state';
import {
  fetchMeterReadings,
  storeMeterReading,
  fetchLimitedMeterReadings,
} from '../../../services/meterReading';

type limitedMeterReadingsArgs = {
  tenantId: number;
  pageIndex: number;
};

export type Actions = {
  [FETCH_METER_READINGS](
    context: ActionContext<State, State>,
    id: number
  ): Promise<void>;
  [FETCH_LIMITED_METER_READINGS](
    context: ActionContext<State, State>,
    args: limitedMeterReadingsArgs
  ): Promise<void>;
  [ADD_NEW_METER_READING](
    context: ActionContext<State, State>,
    meterReading: MeterReading
  ): Promise<void>;
};

const actions: ActionTree<State, State> & Actions = {
  async [FETCH_METER_READINGS](context, tenantId): Promise<void> {
    const { data } = await fetchMeterReadings(tenantId);
    context.commit(SET_METER_READINGS, data.meterReadings);
    //return data;
  },
  async [FETCH_LIMITED_METER_READINGS](context, args): Promise<void> {
    const { data } = await fetchLimitedMeterReadings(
      args.tenantId,
      args.pageIndex
    );
    if (args.pageIndex === 1) {
      context.commit(SET_METER_READINGS, data.meterReadings);
    } else {
      context.commit(APPEND_METER_READINGS, data.meterReadings);
    }
    //return data;
  },
  async [ADD_NEW_METER_READING](context, meterReading): Promise<void> {
    const { data } = await storeMeterReading(meterReading);
    context.commit(APPEND_METER_READING, data.meterReading);
    //return data;
  },
};

export default actions;
