// src/composables/useAuth.ts
import { ref } from 'vue'

export function useAuth() {
  const isLoggedIn = ref(false)

  const login = (username: string, password: string) => {
    if (username === 'admin' && password === 'admin123') {
      isLoggedIn.value = true
      return true
    }
    return false
  }

  const logout = () => {
    isLoggedIn.value = false
  }

  return {
    isLoggedIn,
    login,
    logout
  }
}