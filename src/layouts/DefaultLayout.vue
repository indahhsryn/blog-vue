<template>
  <div class="layout">
    <header>
      <h1>My Blog</h1>
    </header>
    <main>
      <slot />
    </main>
    <footer>
      <p>&copy; 2024 My Blog</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
header, footer {
  background-color: #f8f9fa;
  padding: 10px;
  text-align: center;
}
main {
  flex: 1;
  padding: 20px;
}
</style>
