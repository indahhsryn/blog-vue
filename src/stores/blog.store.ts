import { defineStore } from 'pinia';
import axios from 'axios';

interface Post {
  id: number;
  title: string;
  body: string;
}

export const useBlogStore = defineStore('blog', {
  state: () => ({
    posts: [] as Post[], // Tipe eksplisit untuk `posts`
  }),
  actions: {
    async fetchPosts() {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      this.posts = response.data as Post[]; // Tipe data untuk hasil API
    },
    deletePost(id: number) {
      this.posts = this.posts.filter(post => post.id !== id);
    },
    createPost(post: { title: string; body: string }) {
      this.posts.push({ id: Date.now(), ...post }); // `Date.now()` sebagai ID unik
    },
    updatePost(id: number, updatedPost: { title: string; body: string }) {
      const index = this.posts.findIndex(post => post.id === id);
      if (index !== -1) {
        this.posts[index] = { id, ...updatedPost }; // Perbarui data di array
      }
    },
  },
});
