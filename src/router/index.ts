import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
  
    {
      path: '/',
      name: 'home',
      component: () => import('../views/BlogListView.vue'),
    },
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/BlogListView.vue'),
    },
    
  ],
})

export default router
