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

function viewPost(id: number) {
  console.log(`Melihat data dengan ID: ${id}`);
  // Aksi tambahan, misalnya arahkan ke halaman detail
}
</script>

<template>
  <div class="container">
    <h1>All Blog Posts</h1>
    <div v-if="isLoading" class="text-center my-5">
      <span class="spinner-border" role="status" aria-hidden="true"></span>
      <p>Loading data...</p>
    </div>
    <div v-else>
      <table v-if="posts.length" class="table table-striped">
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
                class="btn btn-info btn-sm"
                @click="$router.push(`/post/${post.id}`)"
                :style="{
                  color: 'white',
                  backgroundColor: '#17a2b8',
                  padding: '10px 20px',
                  fontWeight: 'bold',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }"
              >
                Lihat
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p>Tidak ada data ditemukan.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}
</style>
