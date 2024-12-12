<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
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
  <div class="container mt-5">
    <div class="search-box">
      <input
        type="text"
        placeholder="Cari Judul"
        v-model="searchQuery"
        @input="searchPosts"
        class="search-input"
      />
    </div>

    <div v-if="isLoading" class="text-center mt-5">
      <p>Loading...</p>
    </div>

    <div v-else>
      <div v-if="searchResults.length" class="cards">
        <div v-for="post in searchResults" :key="post.id" class="card">
          <div class="card-header">
            <h2>{{ post.title }}</h2>
          </div>

          <div class="card-body">
            <p>{{ post.body.split(' ').slice(0, 30).join(' ') }}...</p>
          </div>
        </div>
      </div>

      <p v-else>Tidak ada hasil ditemukan.</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  padding: 20px;
  margin: auto;
}

.search-box {
  display: flex;
  justify-content: center;
  padding: 15px;
}

.search-input {
  width: 100%;
  max-width: 600px;
  padding: 12px;
  font-size: 18px;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.search-input:focus {
  border-color: #888;
  outline: none;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  width: 300px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.5s ease-in-out;
  transition: transform 0.2s;
  background-color: #fff;
}

.card-header {
  background-color: #e0e0e0;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.card-body {
  padding: 10px;
  font-size: 16px;
}

.card:hover {
  transform: scale(1.05);
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
