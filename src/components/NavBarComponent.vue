<template>
  <nav class="navbar">
    <RouterLink to="/" class="nav-button">🏠 Home</RouterLink>
    <RouterLink to="/shop" class="nav-button">🛍️ Tienda</RouterLink>

    <RouterLink v-if="authStore.isLoggedIn" to="/carrito" class="nav-button">
      🛒 Carrito
      <span v-if="carritoCount > 0" class="badge">{{ carritoCount }}</span>
    </RouterLink>

    <RouterLink v-if="!authStore.isLoggedIn" to="/login" class="nav-button">🔐 Login</RouterLink>
    <button v-else class="nav-button" @click="handleLogout">🚪 Cerrar sesión</button>
  </nav>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCarritoStore } from '../stores/CarritoStore'
import { useAuthStore } from '../stores/AuthStore'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

const carritoStore = useCarritoStore()
const { carritoCount } = storeToRefs(carritoStore)
const authStore = useAuthStore()
const router = useRouter()
const toast = useToast()

function handleLogout() {
  authStore.logout()
  toast.success('Sesión cerrada')
  router.push('/')
}
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.navbar .nav-button {
  padding: 10px 24px;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  background: white;
  color: #4a90e2;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none; 
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
}

.navbar .nav-button.router-link-active {
  background: #4a90e2;
  color: white;
}

.badge {
  background: #e53e3e;
  color: white;
  border-radius: 50%;
  padding: 2px 7px;
  font-size: 0.75rem;
  margin-left: 6px;
}
</style>