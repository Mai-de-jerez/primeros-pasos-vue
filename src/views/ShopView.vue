<template>
    <!-- v-for -->
  <div >
    <h3>Lista de productos en la tienda:</h3>
    <!-- v-model nos permite crear un enlace bidireccional entre el valor del buscador y la variable 'busqueda' -->
    <BuscadorComponent v-model="busqueda" />
    <div class="tienda-container">
      <!-- v-for con key -->  
      <ProductoComponent 
        v-for="producto in tiendaFiltrada" 
        :key="producto.id" 
        :producto="producto" 
        @comprar="lanzarToastProducto"
        @contadorNegativoIntento="mostrarAvisoNegativo"
      />
      <!-- v-for sino tuvieramos id (con index)-->
      <!--  v-for="(producto, index) in tienda" :key="index">  -->
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue';
import { useToast } from 'vue-toastification'
import ProductoComponent from '../components/ProductoComponent.vue';
import BuscadorComponent from '../components/BuscadorComponent.vue';
import { useCarritoStore } from '../stores/CarritoStore.js'

const toast = useToast()
const busqueda = ref('')
//const emit = defineEmits(['comprar-producto'])
const { agregarAlCarrito } = useCarritoStore()

const tiendaFiltrada = computed(() => {
  return tienda.filter(p => 
    p.name.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function mostrarAvisoNegativo() {
  toast.error('¡El contador no puede ser negativo!')
}

// function lanzarToastProducto({ producto, cantidad }) {
//   // Actualizar carrito
//   const existe = carrito.value.find(p => p.id === producto.id)
//   if (existe) {
//     existe.cantidad += cantidad
//   } else {
//     carrito.value.push({ ...producto, cantidad })
//   }

//   // mensajes de aviso de producto añadido al carrito según cantidad
//   if (producto.quantity === 1) {
//     toast.success(`¡Has comprado: ${producto.name} x${cantidad}!`)
//   } else if (producto.quantity < 5) {
//     toast.success(`¡Has comprado un pack de: ${producto.name} x${cantidad}!`)
//   } else {
//     toast.success(`¡Has comprado al por mayor: ${producto.name} x${cantidad}!`)
//   }

//   console.log('Producto comprado:', producto)
// }

function lanzarToastProducto({ producto, cantidad }) {
  agregarAlCarrito({ producto, cantidad })

  if (cantidad === 1) {
    toast.success(`¡Has comprado: ${producto.name} x${cantidad}!`)
  } else if (cantidad < 5) {
    toast.success(`¡Has comprado un pack de: ${producto.name} x${cantidad}!`)
  } else {
    toast.success(`¡Has comprado al por mayor: ${producto.name} x${cantidad}!`)
  }

  console.log('Producto comprado:', producto)
}

// function lanzarToastProducto({ producto, cantidad }) {
//   emit('comprar-producto', { producto, cantidad })

//   // Mensajes de aviso (los dejamos aquí para que se encargue la vista)
//   if (producto.quantity === 1) {
//     toast.success(`¡Has comprado: ${producto.name} x${cantidad}!`)
//   } else if (producto.quantity < 5) {
//     toast.success(`¡Has comprado un pack de: ${producto.name} x${cantidad}!`)
//   } else {
//     toast.success(`¡Has comprado al por mayor: ${producto.name} x${cantidad}!`)
//   }

//   console.log('Producto comprado:', producto)
// }

const tienda = [
  { id: 1, name: "Pizza", quantity: 2, img: "https://foodish-api.com/images/pizza/pizza75.jpg", price: 10.99 }, 
  { id: 2, name: "Crepes", quantity: 1, img: "https://foodish-api.com/images/dosa/dosa7.jpg", price: 5.99 },
  { id: 3, name: "Eggs", quantity: 12, img: "https://foodish-api.com/images/idly/idly4.jpg", price: 8.99 },
  { id: 4, name: "Cheesecake", quantity: 6, img: "https://foodish-api.com/images/dessert/dessert9.jpg", price: 12.99 },
  { id: 5, name: "Chicken Breast", quantity: 1, img: "https://foodish-api.com/images/butter-chicken/butter-chicken3.jpg", price: 15.99 }, 
  { id: 6, name: "Sushi", quantity: 10, img: "https://foodish-api.com/images/rice/rice29.jpg", price: 20.99 }, 
  { id: 7, name: "Pasta", quantity: 1, img: "https://foodish-api.com/images/pasta/pasta31.jpg", price: 10.99 },
  { id: 8, name: "Helado", quantity: 3, img: "https://foodish-api.com/images/dessert/dessert24.jpg", price: 6.99 }
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
</style>
