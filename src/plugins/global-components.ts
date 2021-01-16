import type { App } from 'vue'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';

export default function registerGlobalComponents (app: App) {
  app.use(PrimeVue);
  app.component('Dialog', Dialog);
}
