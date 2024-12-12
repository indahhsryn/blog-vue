<template>
    <div class="container mt-5">
      <h1 class="text-center my-4">All Blog Posts</h1>
  
      <div v-if="isLoading" class="text-center my-5">
        <span class="spinner-border" role="status" aria-hidden="true"></span>
        <p>Loading data...</p>
      </div>
  
      <div v-else>
        <div v-if="paginatedPosts.length" class="table-responsive">
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
              <tr v-for="(post, index) in paginatedPosts" :key="post.id">
                <td>{{ index + 1 + (currentPage - 1) * postsPerPage }}</td>
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
  
        <!-- Pagination -->
        <div class="pagination mt-4">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="{ active: currentPage === page }"
            class="btn btn-outline-primary btn-sm mt-2 mx-1"
          >
            {{ page }}
          </button>
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
  const currentPage = ref(1);
  const postsPerPage = 5;
  
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
  
  const totalPages = computed(() => {
    return Math.ceil(posts.value.length / postsPerPage);
  });
  
  const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;
    return posts.value.slice(start, end);
  });
  </script>
  
  <style scoped>
  .container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .table {
    font-size: 14px;
  }
  
  /* Untuk Responsif di Mobile */
  @media (max-width: 768px) {
    table {
      font-size: 12px;
    }
  
    th {
      display: none;
    }
  
    td {
      display: block;
      word-wrap: break-word;
      padding: 10px 0;
    }
  
    tr {
      display: block;
      margin-bottom: 1rem;
    }
  }
  
  .pagination {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-top: 10px;
  }
  
  .pagination button {
    padding: 5px 8px;
    font-size: 12px;
    margin: 2px;
    border: 1px solid #ccc;
    background-color: #f8f9fa;
    color: #495057;
    transition: background-color 0.2s ease;
    cursor: pointer;
  }
  
  .pagination button:hover {
    background-color: #e9ecef;
  }
  
  .pagination button.active {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }
  
  .pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  </style>
  