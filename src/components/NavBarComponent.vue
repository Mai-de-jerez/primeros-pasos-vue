<template>
  <nav class="navbar">
    <RouterLink to="/" class="nav-button">🏠 Home</RouterLink>
    <RouterLink to="/shop" class="nav-button">🛍️ Tienda</RouterLink>
    
    <RouterLink to="/carrito" class="nav-button">
      🛒 Carrito 
      <span v-if="carritoCount > 0" class="badge">{{ carritoCount }}</span>
    </RouterLink>
    
    <RouterLink to="/login" class="nav-button">🔐 Login</RouterLink>
  </nav>
</template>

<script setup>
import { useCarritoStore } from '../stores/CarritoStore'
const { carritoCount } = useCarritoStore()
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

/* Aplicamos tus estilos de botón a los enlaces de RouterLink */
.navbar .nav-button {
  padding: 10px 24px;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  background: white;
  color: #4a90e2;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none; /* Quitamos el subrayado por defecto de los enlaces */
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
}

/* Vue Router aplica automáticamente esta clase al enlace activo */
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