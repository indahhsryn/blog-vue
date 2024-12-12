<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBlogStore } from '@/stores/blog.store';

const route = useRoute();
const postId = Number(route.params.id);
const blogStore = useBlogStore();

const post = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    await blogStore.fetchPosts();
    post.value = blogStore.posts.find(item => item.id === postId);
    isLoading.value = false;
  } catch (error) {
    console.error('Gagal mengambil data:', error);
  }
});
</script>

<template>
  <div class="container my-5">
    <div v-if="isLoading" class="text-center">
      <h3 class="mb-3">Detail Blog</h3>
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else-if="post" class="card shadow-sm">
      <div class="card-header bg-light text-center">
        <h3 class="fw-bold mb-0">Detail Blog</h3>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text text-justify">{{ post.body }}</p>
      </div>
    </div>

    <div v-else>
      <div class="alert alert-warning text-center" role="alert">
        <strong>Post tidak ditemukan!</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Maksimalkan ukuran kontainer */
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

/* Buat card lebih menarik */
.card {
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  padding: 15px;
  font-size: 1.25rem;
}

.card-body {
  padding: 20px;
  font-size: 1rem;
  line-height: 1.6;
}

/* Responsif untuk mobile */
@media (max-width: 768px) {
  .card-body {
    font-size: 0.9rem;
    padding: 15px;
  }

  .card-header {
    font-size: 1.1rem;
  }
}
</style>
