
<!-- src/components/SearchFilter.vue -->
<template>
  <div class="search-filter">
    <input 
      type="text" 
      v-model="localQuery" 
      placeholder="Cari blog posts..."
      @input="$emit('update:modelValue', localQuery)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    modelValue: String
  },
  setup(props, { emit }) {
    const localQuery = ref(props.modelValue || '')

    return {
      localQuery
    }
  }
})
</script>

<style scoped>
.search-filter input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
}
</style>
