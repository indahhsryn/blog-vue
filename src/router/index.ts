import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/BlogListView.vue'),
    },
    {
      path: '/post/:id',
      name: 'DetailBlog',
      component: () => import('../views/BlogDetailView.vue'),
    },
    {
      path: '/search',
      name: 'SearchBlog',
      component: () => import('../views/SearchBlogView.vue'),
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/Dashboard.vue'),
      meta: { requiresAuth: true } 
    }
  ],
})

router.beforeEach((to, from, next) => {
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true'

  if (to.meta.requiresAuth && !isLoggedIn) {
    alert('Silakan login terlebih dahulu untuk mengakses Dashboard')
    next('/login')
  } else {
    next()
  }
})

export default router
