import { createStore, Store, createLogger } from 'vuex';
import auth from './modules/auth';
import tenant from './modules/tenant';
import meterReadings from './modules/meterReadings';

export const store = createStore({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules: { auth, tenant, meterReadings },
});

export function useStore() {
  return store as Store<>;
}
