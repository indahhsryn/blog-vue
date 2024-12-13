<template>
    <div class="container mt-5">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <RouterLink to="/dashboard" class="navbar-brand">Dashboard</RouterLink>
  
            <div class="collapse navbar-collapse">
              <div class="navbar-nav">
                <RouterLink to="/tambah" class="nav-link">Tambah Blog</RouterLink>
              </div>
            </div>
  
          </div>
        </nav>
      <h2>CRUD Blog</h2>
  
      <div class="mb-3">
        <input v-model="newTitle" placeholder="Judul Blog" class="form-control mb-2" />
        <textarea v-model="newBody" placeholder="Konten Blog" class="form-control mb-2"></textarea>
        <button @click="addBlog" class="btn btn-primary mt-2">Tambah Blog</button>
      </div>
  
      <div class="mt-4">
        <h4>Daftar Blog</h4>
        <div v-for="blog in paginatedBlogs" :key="blog.id" class="card mt-2">
          <div class="card-header">
            <strong>{{ blog.title }}</strong>
          </div>
          <div class="card-body">
            <p>{{ blog.body }}</p>
  
            <button @click="editBlog(blog.id)" class="btn btn-warning btn-sm mt-2">Edit</button>
            <button @click="deleteBlog(blog.id)" class="btn btn-danger btn-sm mt-2 ms-2">Hapus</button>
          </div>
        </div>
  
        <!-- Pagination -->
        <div class="pagination mt-4">
          <button
            v-for="page in totalPages"
            :key="page"
            @click="currentPage = page"
            :class="{ active: currentPage === page }"
            class="btn btn-outline-primary btn-sm mt-2 mx-1"
          >
            {{ page }}
          </button>
        </div>
      </div>
  
    </div>
  </template>
  
  
  
  <script setup lang="ts">
  import { ref, onMounted, computed } from 'vue'
  
  const baseUrl = 'https://jsonplaceholder.typicode.com/posts'
  
  interface Blog {
    id: number
    title: string
    body: string
  }
  
  const blogs = ref<Blog[]>([])
  const newTitle = ref('')
  const newBody = ref('')
  const currentPage = ref(1)
  const blogsPerPage = 5
  
  // Fetch Data Blog dari Dummy API
  const getBlogs = async () => {
    try {
      const res = await fetch(baseUrl)
      const data = await res.json()
      blogs.value = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        body: item.body,
      }))
    } catch (error) {
      console.error('Failed fetching blog data', error)
    }
  }
  
  // Mengambil blog berdasarkan pagination
  const paginatedBlogs = computed(() => {
    const start = (currentPage.value - 1) * blogsPerPage
    const end = start + blogsPerPage
    return blogs.value.slice(start, end)
  })
  
  const totalPages = computed(() => Math.ceil(blogs.value.length / blogsPerPage))
  
  // Menambah Blog Baru
  const addBlog = () => {
    if (!newTitle.value || !newBody.value) return alert('Isi semua bidang!')
  
    const newBlog: Blog = {
      id: Date.now(),
      title: newTitle.value,
      body: newBody.value,
    }
  
    console.log('Tambah Blog', newBlog)
    blogs.value.unshift(newBlog)
  
    newTitle.value = ''
    newBody.value = ''
  }
  
  // Mengedit Blog
  const editBlog = (id: number) => {
    const title = prompt('Update Judul Blog:')
    const body = prompt('Update Konten Blog:')
  
    if (title && body) {
      const updatedBlog = { title, body }
      blogs.value = blogs.value.map(blog =>
        blog.id === id ? { ...blog, ...updatedBlog } : blog
      )
      console.log(`Update id=${id}`, updatedBlog)
    }
  }
  
  // Menghapus Blog (DELETE) - Validasi Konfirmasi
  const deleteBlog = async (id: number) => {
    const confirmed = window.confirm('Apakah Anda yakin ingin menghapus blog ini?')
  
    if (confirmed) {
      blogs.value = blogs.value.filter(blog => blog.id !== id)
      console.log(`Blog ID ${id} dihapus`)
      alert('Data berhasil dihapus')
    }
  }
  
  onMounted(getBlogs)
  </script>
  
  
  
  <style scoped>
  .card {
    max-width: 100%;
    margin: auto;
    padding: 15px;
    box-sizing: border-box;
  }
  
  .pagination {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding-top: 10px;
  }
  
  .pagination button {
    padding: 5px 8px;
    font-size: 12px;
    margin: 2px;
    border: 1px solid #ccc;
    background-color: #f8f9fa;
    color: #495057;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    cursor: pointer;
  }
  
  .pagination button:hover {
    background-color: #e9ecef;
  }
  
  .pagination button.active {
    background-color: #007bff;
    color: white;
    font-weight: bold;
  }
  
  .pagination button:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  </style>
  
  
  
  