import { createApp } from 'vue';
import App from './App.vue';
import axios from './services/axios';
import VueAxios from 'vue-axios';
import { router } from './router';
import './assets/css/tailwind.css';
import registerGlobalComponents from './plugins/global-components';

const app = createApp(App);
app.use(VueAxios, axios);
app.use(router);

registerGlobalComponents(app);

app.mount('#app');
