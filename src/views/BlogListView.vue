<script setup lang="ts">
import { onMounted } from 'vue';
import { useBlogStore } from '@/stores/blog.store';

const blogStore = useBlogStore();

onMounted(() => {
  blogStore.fetchPosts();
});

const posts = blogStore.posts;
</script>

<template>
  <div>
    <h1>All Blog Posts</h1>
    <div v-if="!posts.length">Loading...</div>
    <ul v-else>
      <li v-for="post in posts" :key="post.id">
        <router-link :to="`/post/${post.id}`">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>
