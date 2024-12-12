<!-- BlogDetailView.vue -->
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
  <div class="container mt-5">
    <div v-if="isLoading" class="text-center">
        <h3>Detail Blog</h3>
      <p>Loading...</p>
    </div>

    <div v-else-if="post" class="card">
<center>       <b> <h3>Detail Blog</h3></b></center><br>

      <div class="card-header">

        <h2>{{ post.title }}</h2>
      </div>

      <div class="card-body">
        <p>{{ post.body }}</p>
      </div>
    </div>

    <div v-else>
      <p>Post tidak ditemukan.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  padding: 20px;
  margin: auto;
}

.card {
  animation: fadeIn 0.5s ease-in;
  margin: 20px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: transform 0.2s;
}

.card:hover {
  transform: scale(1.05);
}

.card-header {
  background-color: #e0e0e0;
  padding: 15px;
  text-align: center;
  font-weight: bold;
}

.card-body {
  padding: 10px;
  font-size: 16px;
  line-height: 1.5;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
