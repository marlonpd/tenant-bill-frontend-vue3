import type { App } from 'vue'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';

export default function registerGlobalComponents (app: App) {
  app.use(PrimeVue);
  app.use(ToastService);
  app.component('Dialog', Dialog);
  app.component('Toast', Toast);
}
