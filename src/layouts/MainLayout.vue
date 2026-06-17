<template>
  <div class="layout">
    <Navbar />
    <RouterView />
    <footer class="layout-footer">
      <p>© 2026 Mi Tienda de Vue - María del Carmen Martín Rodríguez</p>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '../components/NavBarComponent.vue'
</script>

<style scoped>

.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-footer {
  text-align: center;
  padding: 16px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  color: #64748b;
  font-size: 0.85rem;
  margin-top: auto;
}
</style>