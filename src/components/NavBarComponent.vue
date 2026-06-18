<template>
  <nav class="navbar">
    <button class="hamburger" @click="toggleMenu" :class="{ 'is-active': isOpen }" aria-label="Menú">
      <span class="bar"></span>
      <span class="bar"></span>
      <span class="bar"></span>
    </button>

    <div class="nav-links" :class="{ 'is-open': isOpen }">
      <RouterLink to="/" class="nav-button" @click="closeMenu">🏠 Home</RouterLink>
      <RouterLink to="/shop" class="nav-button" @click="closeMenu">🛍️ Tienda</RouterLink>

      <RouterLink v-if="authStore.isLoggedIn" to="/carrito" class="nav-button" @click="closeMenu">
        🛒 Carrito
        <span v-if="carritoCount > 0" class="badge">{{ carritoCount }}</span>
      </RouterLink>

      <RouterLink v-if="!authStore.isLoggedIn" to="/login" class="nav-button" @click="closeMenu">🔐 Login</RouterLink>
      <button v-else class="nav-button" @click="handleLogout">🚪 Cerrar sesión</button>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
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

// Estado para controlar el menú desplegable en móvil
const isOpen = ref(false)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function handleLogout() {
  closeMenu()
  authStore.logout()
  toast.success('Sesión cerrada')
  router.push('/')
}
</script>

<style scoped>
/* --- Estilos base (Escritorio) --- */
.navbar {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
  position: relative;
}

.nav-links {
  display: flex;
  gap: 16px;
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
  justify-content: center;
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

/* Botón hamburguesa oculto por defecto en escritorio */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 21px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 10;
}

.hamburger .bar {
  width: 100%;
  height: 3px;
  background-color: #4a90e2;
  border-radius: 2px;
  transition: all 0.3s ease;
}

/* --- Media Query para Móviles (Pantallas menores de 768px) --- */
@media (max-width: 767px) {
  .navbar {
    justify-content: flex-end; 
    padding: 16px 24px;
  }

  .hamburger {
    display: flex; 
  }


  .hamburger.is-active .bar:nth-child(1) {
    transform: translateY(9px) rotate(45deg);
  }
  .hamburger.is-active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.is-active .bar:nth-child(3) {
    transform: translateY(-9px) rotate(-45deg);
  }


  .nav-links {
    display: none; 
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: #f8fafc;
    padding: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid #e2e8f0;
    gap: 12px;
    z-index: 9;
  }

  .nav-links.is-open {
    display: flex;
  }

  .navbar .nav-button {
    width: 100%; 
    box-sizing: border-box;
  }
}
</style>