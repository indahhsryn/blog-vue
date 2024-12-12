
// src/stores/authStore.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface User {
  id: number
  username: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = ref(false)

  const login = (username: string, password: string): boolean => {
    // Hardcoded credentials
    if (username === 'admin' && password === 'admin123') {
      user.value = { 
        id: 1, 
        username: 'admin' 
      }
      isAuthenticated.value = true
      return true
    }
    return false
  }

  const logout = () => {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
})
