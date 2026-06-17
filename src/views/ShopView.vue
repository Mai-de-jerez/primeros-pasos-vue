<template>
    <!-- v-for -->
  <div >
    <div class="tienda-header">
     <h3 class="tienda-titulo">Lista de productos en la tienda:</h3>
    <!-- v-model nos permite crear un enlace bidireccional entre el valor del buscador y la variable 'busqueda' -->
    <BuscadorComponent v-model="busqueda" /> 
    </div>
    
    <div class="tienda-container">
      <!-- v-for con key -->  
      <ProductoComponent 
        v-for="producto in productosPaginados" 
        :key="producto.id" 
        :producto="producto" 
        @comprar="lanzarToastProducto"
        @contadorNegativoIntento="mostrarAvisoNegativo"
      />
      <!-- v-for sino tuvieramos id (con index)-->
      <!--  v-for="(producto, index) in tienda" :key="index">  -->
    </div>
    <PaginadorComponent 
      :pagina-actual="paginaActual" 
      :total-paginas="totalPaginas" 
      @cambiarPagina="cambiarPagina" 
    />
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification'
import ProductoComponent from '../components/ProductoComponent.vue';
import BuscadorComponent from '../components/BuscadorComponent.vue';
import { useCarritoStore } from '../stores/CarritoStore.js'
import { useAuthStore } from '../stores/AuthStore.js'
import PaginadorComponent from '../components/PaginadorComponent.vue'

const PRODUCTOS_POR_PAGINA = 5
const paginaActual = ref(1)

const totalPaginas = computed(() => 
  Math.ceil(tiendaFiltrada.value.length / PRODUCTOS_POR_PAGINA)
)

const productosPaginados = computed(() => {
  const inicio = (paginaActual.value - 1) * PRODUCTOS_POR_PAGINA
  return tiendaFiltrada.value.slice(inicio, inicio + PRODUCTOS_POR_PAGINA)
})

const authStore = useAuthStore()

const toast = useToast()
const busqueda = ref('')
const { agregarAlCarrito } = useCarritoStore()

const tiendaFiltrada = computed(() => {
  return tienda.filter(p => 
    p.name.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function cambiarPagina(pagina) {
  paginaActual.value = pagina
}

function mostrarAvisoNegativo() {
  toast.error('¡El contador no puede ser negativo!')
}

function lanzarToastProducto({ producto, cantidad }) {
  // si no esta logueado, mostramos un toast de error y no se añade nada al carrito
  if (!authStore.isLoggedIn) {
    toast.error('¡Inicia sesión para comprar!')
    return
  }
  // si esta logueado, añadimos el producto al carrito y mostramos un toast de éxito
  agregarAlCarrito({ producto, cantidad })

  // Mostramos un toast diferente según la cantidad comprada
  if (cantidad === 1) {
    toast.success(`¡Has comprado: ${producto.name} x${cantidad}!`)
  } else if (cantidad < 5) {
    toast.success(`¡Has comprado un pack de: ${producto.name} x${cantidad}!`)
  } else {
    toast.success(`¡Has comprado al por mayor: ${producto.name} x${cantidad}!`)
  }
  // Para tener yo un control de lo que se ha comprado, lo muestro en consola
  console.log('Producto comprado:', producto)
}

const tienda = [
  { id: 1, name: "Pizza", quantity: 2, img: "https://foodish-api.com/images/pizza/pizza75.jpg", price: 10.99 }, 
  { id: 2, name: "Crepes", quantity: 1, img: "https://foodish-api.com/images/dosa/dosa7.jpg", price: 5.99 },
  { id: 3, name: "Eggs", quantity: 12, img: "https://foodish-api.com/images/idly/idly4.jpg", price: 8.99 },
  { id: 4, name: "Cheesecake", quantity: 6, img: "https://foodish-api.com/images/dessert/dessert9.jpg", price: 12.99 },
  { id: 5, name: "Chicken Breast", quantity: 1, img: "https://foodish-api.com/images/butter-chicken/butter-chicken3.jpg", price: 15.99 }, 
  { id: 6, name: "Sushi", quantity: 10, img: "https://foodish-api.com/images/rice/rice29.jpg", price: 20.99 }, 
  { id: 7, name: "Pasta", quantity: 1, img: "https://foodish-api.com/images/pasta/pasta31.jpg", price: 10.99 },
  { id: 8, name: "Helado", quantity: 3, img: "https://foodish-api.com/images/dessert/dessert24.jpg", price: 6.99 },
  { id: 9, name: "Arroz", quantity: 5, img: "https://foodish-api.com/images/rice/rice3.jpg", price: 9.99 },
  { id: 10, name: "Hamburguesa", quantity: 2, img: "https://foodish-api.com/images/burger/burger7.jpg", price: 11.99 }
]
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
</style>
