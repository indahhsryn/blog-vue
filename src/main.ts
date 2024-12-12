import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

console.log('Mounting Vue app...');

createApp(App)
  .use(router)
  .mount('#app');

console.log('Vue app mounted.');
