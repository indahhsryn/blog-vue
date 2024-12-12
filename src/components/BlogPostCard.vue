
<!-- src/components/BlogPostCard.vue -->
<template>
  <div class="blog-post-card">
    <h3>{{ post.title }}</h3>
    <p>{{ truncatedBody }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const truncatedBody = computed(() => {
      const body = props.post.body as string
      return body.length > 100 ? body.slice(0, 100) + '...' : body
    })

    return {
      truncatedBody
    }
  }
})
</script>

<style scoped>
.blog-post-card {
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 5px;
}
</style>
