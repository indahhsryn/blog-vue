<script setup lang="ts">
import { ref } from 'vue';
import { useBlogStore } from '@/stores/blog.store';

const searchQuery = ref('');
const isLoading = ref(false);
const blogStore = useBlogStore();
const searchResults = ref([]);

const searchPosts = async () => {
  isLoading.value = true;
  await blogStore.fetchPosts();
  searchResults.value = blogStore.posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
  isLoading.value = false;
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
      <div v-if="searchResults.length" class="row gy-4">
        <div
          v-for="post in searchResults"
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
      <p v-else class="text-center mt-4 text-muted">Tidak ada hasil ditemukan.</p>
    </div>
  </div>
</template>

<style scoped>
/* Tambahkan margin dan gaya pencarian */
.container {
  max-width: 800px;
}

.card {
  border-radius: 10px;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

/* Gaya responsif tambahan */
@media (max-width: 768px) {
  .card {
    font-size: 0.9rem;
  }

  .card-header h5 {
    font-size: 1rem;
  }
}
</style>
