<template>
    <div>
      <template v-if="isLoggedIn">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <RouterLink to="/dashboard" class="navbar-brand">Dashboard</RouterLink>
  
            <div class="collapse navbar-collapse">
              <div class="navbar-nav">
                <RouterLink to="/tambah" class="nav-link">Tambah Blog</RouterLink>
              </div>
            </div>
  
            <button @click="logout" class="btn btn-outline-danger ms-3">Logout</button>
          </div>
        </nav>
  
        <div class="container mt-5">
          <div class="card">
            <div class="card-header">
              <h2>Dashboard</h2>
            </div>
            <div class="card-body">
              <p>Selamat datang di Dashboard!</p>
            </div>
          </div>
        </div>
      </template>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const isLoggedIn = ref(sessionStorage.getItem('isLoggedIn') === 'true')
  const router = useRouter()
  
  const logout = () => {
    sessionStorage.removeItem('isLoggedIn')
    alert('Anda telah logout')
    router.push('/login')
  }
  </script>
  
  <style scoped>
  </style>
  