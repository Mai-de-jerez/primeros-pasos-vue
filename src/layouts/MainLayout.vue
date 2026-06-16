<template>
    <Navbar :carrito="carrito" />
    <RouterView :carrito="carrito" @comprar-producto="redireccionarEvento" />
    <footer class="layout-footer">
        <p>© 2026 Mi Tienda de Vue - María del Carmen Martín Rodríguez</p>
    </footer>
</template>

<script setup>
import Navbar from '../components/NavBarComponent.vue'
import { defineProps, defineEmits } from 'vue'

// Recibimos el carrito desde el componente raíz (App.vue)
defineProps({
  carrito: {
    type: Array,
    required: true
  }
})

// Declaramos el emit para poder enviar los datos del producto hacia arriba (App.vue)
const emit = defineEmits(['comprar-producto'])

// Función puente: captura el evento de ShopView y se lo lanza a App.vue
function redireccionarEvento(datos) {
  emit('comprar-producto', datos)
}
</script>

<style scoped>

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