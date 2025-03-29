import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

const app = createApp(App);
app.use(store);
app.mount('#app');
