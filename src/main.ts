import { createApp } from 'vue';
import App from './App.vue';
import axios, { setHeader } from './services/axios';
import VueAxios from 'vue-axios';
import { router } from './router';
import './assets/css/tailwind.css';
import 'primeflex/primeflex.css';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import registerGlobalComponents from './plugins/global-components';

setHeader();
import { store } from './store';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);
app.use(store);

registerGlobalComponents(app);

app.mount('#app');
