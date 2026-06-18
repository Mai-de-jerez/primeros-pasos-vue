<template>
    <!-- v-for -->
  <div >
    <div class="tienda-header">
     <h3 class="tienda-titulo">Lista de productos en la tienda:</h3>
    <!-- v-model nos permite crear un enlace bidireccional entre el valor del buscador y la variable 'tiendaStore.busqueda' -->
    <BuscadorComponent v-model="ShopStore.busqueda" /> 
    </div>
    
    <div class="tienda-container">
      <!-- v-for con key -->  
      <ProductoComponent 
        v-for="producto in ShopStore.productosPaginados" 
        :key="producto.id" 
        :producto="producto" 
        @comprar="lanzarToastProducto"
        @contadorNegativoIntento="mostrarAvisoNegativo"
      />
      <!-- v-for sino tuvieramos id (con index)-->
      <!--  v-for="(producto, index) in tienda" :key="index">  -->
    </div>
    <PaginadorComponent 
      :pagina-actual="ShopStore.paginaActual" 
      :total-paginas="ShopStore.totalPaginas" 
      @cambiarPagina="ShopStore.cambiarPagina" 
    />
  </div>
</template>
<script setup>
import { useToast } from 'vue-toastification'
import ProductoComponent from '../components/ProductoComponent.vue';
import BuscadorComponent from '../components/BuscadorComponent.vue';
import PaginadorComponent from '../components/PaginadorComponent.vue'
import { useCarritoStore } from '../stores/CarritoStore.js'
import { useAuthStore } from '../stores/AuthStore.js'
import { useShopStore } from '../stores/ShopStore.js'

const toast = useToast()
const ShopStore = useShopStore()
const authStore = useAuthStore()
const { agregarAlCarrito } = useCarritoStore()

function mostrarAvisoNegativo() {
  toast.error('¡El contador no puede ser negativo!')
}

function lanzarToastProducto({ producto, cantidad }) {
  if (!authStore.isLoggedIn) {
    toast.error('¡Inicia sesión para comprar!')
    return
  }
  agregarAlCarrito({ producto, cantidad })

  if (cantidad === 1) {
    toast.success(`¡Has comprado: ${producto.name} x${cantidad}!`)
  } else if (cantidad < 5) {
    toast.success(`¡Has comprado un pack de: ${producto.name} x${cantidad}!`)
  } else {
    toast.success(`¡Has comprado al por mayor: ${producto.name} x${cantidad}!`)
  }
}
</script>
<style scoped>
.tienda-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start; 
  gap: 20px;
  padding: 20px;
}

.tienda-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 0 50px;
}

.tienda-titulo {
  color: #4a90e2;
  margin: 0;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .tienda-header {
    flex-direction: column;
    align-items: stretch; 
    padding: 0 16px;
    gap: 12px;
  }

  .tienda-titulo {
    white-space: normal;
  }

  .tienda-header :deep(input), 
  .tienda-header > * {
    width: 100% !important;
    box-sizing: border-box;
  }
}
</style>
