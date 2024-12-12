<template>
    <div class="d-flex vh-100 align-items-center justify-content-center bg-light">
      <div class="card p-4 shadow" style="width: 100%; max-width: 400px;">
        <!-- Header -->
        <div class="text-center mb-4">
          <img
            src="https://vuejs.org/images/logo.png"
            alt="Vue.js Logo"
            class="mb-3"
            style="width: 40px; height: 50px;"
          />
          <h2 class="h5 mb-2">Welcome Back!</h2>
          <p class="text-muted small">Please log in to your account</p>
        </div>
  
        <!-- Form -->
        <form @submit.prevent="login">
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              v-model="username"
              type="text"
              id="username"
              class="form-control"
              placeholder="Enter your username"
            />
          </div>
  
          <div class="mb-3 position-relative">
            <label for="password" class="form-label">Password</label>
            <input
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              id="password"
              class="form-control"
              placeholder="Enter your password"
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="btn btn-link position-absolute top-50 end-0 translate-middle-y text-muted"
              style="padding: 0; margin-right: 1rem; margin-left: 0.5rem; width: 2.5rem; height: 2.5rem; text-align: center;"
            >
              <span v-if="showPassword" class="fs-5">👁️</span>
              <span v-else class="fs-5">🙈</span>
            </button>
          </div>
  
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div class="form-check">
              <input type="checkbox" id="remember" class="form-check-input" />
              <label for="remember" class="form-check-label">Remember me</label>
            </div>
            <a href="#" class="text-decoration-none small text-primary">Forgot password?</a>
          </div>
  
          <button
            type="submit"
            class="btn btn-primary w-100 mb-3"
          >
            Log In
          </button>
  
          <p v-if="error" class="text-danger text-center small">{{ error }}</p>
        </form>
  
        <!-- Google Login -->
        <button
          @click="mockGoogleLogin"
          class="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
        >
        
          Log in with Google
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
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
      password: "admin123",
    };
  
    if (username.value === mockCredentials.username && password.value === mockCredentials.password) {
      alert("Login successful!");
      error.value = "";
      // Fetch data from public API (example: JSONPlaceholder)
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await response.json();
      console.log("Fetched data:", data);
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
    font-size: 1.25rem; /* Adjust size for visibility */
  }
  </style>