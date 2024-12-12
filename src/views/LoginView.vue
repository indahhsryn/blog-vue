<template>
    <div class="d-flex vh-100 align-items-center justify-content-center bg-light">
      <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
  
        <!-- Header -->
        <div class="text-center mb-4">
          <img src="https://vuejs.org/images/logo.png" alt="Vue.js Logo" class="mb-3" style="width: 40px; height: 50px;" />
          <h2 class="h5 mb-2">Welcome Back!</h2>
          <p class="text-muted small">Please log in to your account</p>
        </div>
  
        <!-- Form Login -->
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input v-model="username" type="text" id="username" class="form-control" placeholder="Enter your username" />
          </div>
  
          <div class="mb-3 position-relative">
            <label for="password" class="form-label">Password</label>
            <input :type="showPassword ? 'text' : 'password'" v-model="password" id="password" class="form-control" placeholder="Enter your password" />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted"
              style="padding: 0; margin-right: 1rem;"
            >
              <span v-if="showPassword" class="fs-5">👁️</span>
              <span v-else class="fs-5">🙈</span>
            </button>
          </div>
  
          <button type="submit" class="btn btn-primary w-100 mb-3">Log In</button>
  
          <p v-if="error" class="text-danger text-center small">{{ error }}</p>
        </form>
  
        <!-- Google Login -->
        <button @click="mockGoogleLogin" class="btn btn-outline-secondary w-100 mt-2">Log in with Google</button>
  
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  const username = ref("");
  const password = ref("");
  const showPassword = ref(false);
  const error = ref("");
  
  const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
  };
  
  const login = async () => {
    const mockCredentials = {
      username: "admin",
      password: "admin123"
    };
  
    if (username.value === mockCredentials.username && password.value === mockCredentials.password) {
      error.value = "";
      alert("Login successful!");
  
      // Simpan status login di sessionStorage
      sessionStorage.setItem("isLoggedIn", "true");
  
      // Redirect ke Dashboard
      router.push('/dashboard');
    } else {
      error.value = "Invalid username or password!";
    }
  };
  
  const mockGoogleLogin = () => {
    alert("Google login clicked (mock action)");
  };
  </script>
  
  <style scoped>
  body {
    background-color: #f8f9fa;
  }
  
  .card {
    border: none;
    border-radius: 0.75rem;
  }
  
  button {
    transition: background-color 0.2s ease-in-out;
  }
  
  .fs-5 {
    font-size: 1.25rem;
  }
  
  .text-center {
    text-align: center;
  }
  </style>
  