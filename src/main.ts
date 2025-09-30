import "iconify-icon";
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import './assets/index.css';

import { plugin } from '@formkit/vue';
import { createHead } from '@vueuse/head';
import config from '../formkit.config';

import App from './App.vue';
import router from './router';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createHead())
app.use(plugin, config)

app.mount('#app')
