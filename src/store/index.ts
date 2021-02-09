import { createStore, Store, createLogger } from 'vuex';
import auth from './modules/auth';
import tenant from './modules/tenant';
import meterReading from './modules/meterReading';

export const store = createStore({
  plugins: process.env.NODE_ENV === 'development' ? [createLogger()] : [],
  modules: { auth, tenant, meterReading },
});

export function useStore() {
  return store as Store<>;
}
