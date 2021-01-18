import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import './assets/css/tailwind.css';
import registerGlobalComponents from './plugins/global-components';

const app = createApp(App);
app.use(router);

registerGlobalComponents(app);

app.mount('#app');
