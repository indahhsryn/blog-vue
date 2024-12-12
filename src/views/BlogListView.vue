<template>
    <div class="container">
      <h1 class="text-center my-4">All Blog Posts</h1>
  
      <div v-if="isLoading" class="text-center my-5">
        <span class="spinner-border" role="status" aria-hidden="true"></span>
        <p>Loading data...</p>
      </div>
  
      <div v-else>
        <div v-if="posts.length" class="table-responsive">
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>Judul</th>
                <th>Body</th>
                <th>Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(post, index) in posts" :key="post.id">
                <td>{{ index + 1 }}</td>
                <td>{{ post.title }}</td>
                <td>{{ post.body.split(' ').slice(0, 30).join(' ') }}...</td>
                <td>
                  <button
                    class="btn btn-info btn-sm w-100"
                    @click="$router.push(`/post/${post.id}`)"
                  >
                    Lihat
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p class="text-center">Tidak ada data ditemukan.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useBlogStore } from '@/stores/blog.store';
  
  const blogStore = useBlogStore();
  
  const searchQuery = ref('');
  const isLoading = ref(false);
  
  // Ambil data saat komponen dimuat
  onMounted(async () => {
    try {
      isLoading.value = true;
      await blogStore.fetchPosts();
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      console.error('Gagal mengambil data:', error);
    }
  });
  
  const posts = computed(() => {
    if (!searchQuery.value) return blogStore.posts;
    return blogStore.posts.filter(post =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  @media (max-width: 768px) {
    table {
      font-size: 12px;
    }
  
    h1 {
      font-size: 1.5rem;
    }
  
    td {
      display: block;
      white-space: normal;
      word-wrap: break-word;
    }
  
    tr {
      display: block;
      margin-bottom: 1rem;
    }
  
    th {
      display: none;
    }
  }
  </style>
  