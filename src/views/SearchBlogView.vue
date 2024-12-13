<script setup lang="ts">
import { ref, computed } from 'vue';
import { useBlogStore } from '@/stores/blog.store';

const searchQuery = ref('');
const isLoading = ref(false);
const blogStore = useBlogStore();
const searchResults = ref([]);

const currentPage = ref(1);
const postsPerPage = 6;

const searchPosts = async () => {
  isLoading.value = true;
  await blogStore.fetchPosts();
  searchResults.value = blogStore.posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  currentPage.value = 1;
  isLoading.value = false;
};

const totalPages = computed(() => Math.ceil(searchResults.value.length / postsPerPage));

const paginatedResults = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return searchResults.value.slice(start, end);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<template>
  <div class="container my-5">
    <!-- Pencarian -->
    <div class="row justify-content-center mb-4">
      <div class="col-12 col-md-8">
        <input
          type="text"
          placeholder="Cari Judul"
          v-model="searchQuery"
          @input="searchPosts"
          class="form-control form-control-lg"
        />
      </div>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <!-- Hasil Pencarian -->
    <div v-else>
      <div v-if="paginatedResults.length" class="row gy-4">
        <div
          v-for="post in paginatedResults"
          :key="post.id"
          class="col-12 col-md-6 col-lg-4"
        >
          <div class="card h-100 shadow-sm">
            <div class="card-header bg-light text-center">
              <h6 class="mb-0">{{ post.title }}</h6>
            </div>
            <div class="card-body">
              <p class="card-text text-truncate">
                {{ post.body.split(' ').slice(0, 30).join(' ') }}...
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Pesan Data Tidak Ditemukan -->
      <div v-else class="text-center py-5">
        <p class="text-muted">Tidak ada data yang ditemukan untuk pencarian "{{ searchQuery }}".</p>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="pagination-container mt-4">
        <button
          v-for="page in totalPages"
          :key="page"
          @click="goToPage(page)"
          :class="{ active: currentPage === page }"
          class="btn btn-outline-primary btn-sm mx-1"
        >
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
}

/* Card Responsif */
.card {
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

/* Pagination Horizontal Scroll untuk Mobile */
.pagination-container {
  display: flex;
  overflow-x: auto;
  padding: 0 10px;
  justify-content: center;
  align-items: center;
}

.btn-outline-primary {
  font-weight: bold;
  padding: 8px 12px;
  transition: background-color 0.2s ease;
}

.btn-outline-primary:hover {
  background-color: #e7f3fe;
}

.btn-outline-primary.active {
  background-color: #007bff;
  color: #fff;
}

/* Pastikan Scroll tidak Mengganggu Layout */
.btn-outline-primary {
  white-space: nowrap;
  margin: 5px;
}
</style>