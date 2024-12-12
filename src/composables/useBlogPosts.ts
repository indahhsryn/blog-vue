import { ref } from 'vue';

const blogPosts = ref([
  { id: 1, title: 'Blog Post 1', content: 'Content of blog post 1.' },
  { id: 2, title: 'Blog Post 2', content: 'Content of blog post 2.' },
]);

export function useBlogPosts() {
  const fetchBlogPosts = async () => {
    console.log('Fetching blog posts...');
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Blog posts loaded:', blogPosts.value);
        resolve(true);
      }, 1000);
    });
  };

  return {
    blogPosts,
    fetchBlogPosts,
  };
}
