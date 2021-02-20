import type { App } from 'vue'
import PrimeVue from 'primevue/config';
import Dialog from 'primevue/dialog';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     //optional for column grouping
import ConfirmationService from 'primevue/confirmationservice';
import ConfirmDialog from 'primevue/confirmdialog';
import Calendar from 'primevue/calendar';


export default function registerGlobalComponents (app: App) {
  app.use(PrimeVue);
  app.use(ToastService);
  app.use(ConfirmationService);
  app.component('Calendar', Calendar);
  app.component('Dialog', Dialog);
  app.component('ConfirmDialog', ConfirmDialog);
  app.component('Toast', Toast);
  app.component('DataTable', DataTable);
  app.component('Column', Column);
  app.component('ColumnGroup', ColumnGroup);
}
