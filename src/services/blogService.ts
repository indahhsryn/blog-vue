import { api } from './api';
import { ref } from 'vue';
import { BlogPost } from '@/interfaces/BlogPost';

export const useBlogPosts = () => {
  const blogPosts = ref<BlogPost[]>([]);

  const fetchBlogPosts = async () => {
    try {
      const response = await api.get('/posts');
      blogPosts.value = response.data;
    } catch (error) {
      console.error('Error fetching blog posts', error);
    }
  };

  return { blogPosts, fetchBlogPosts };
};
