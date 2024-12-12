import { createRouter, createWebHistory } from 'vue-router';
import BlogListView from '@/views/BlogListView.vue';

console.log('Loading routes...');

const routes = [
  { path: '/', component: BlogListView },
  // Rute lain...
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

console.log('Routes initialized:', routes);

export default router;
