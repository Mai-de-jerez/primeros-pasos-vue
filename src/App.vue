<!--DIRECTIVAS EN VUE-->
<!-- v-if, v-else-if, v-else -->
<template>
  <nav class="navbar">
    <button :class="{ active: vistaActual === 'home' }" @click="vistaActual = 'home'">🏠 Home</button>
    <button :class="{ active: vistaActual === 'tienda' }" @click="vistaActual = 'tienda'">🛍️ Tienda</button>
    <button :class="{ active: vistaActual === 'carrito' }" @click="vistaActual = 'carrito'">
      🛒 Carrito <span v-if="carrito.length > 0" class="badge">{{ carrito.reduce((acc, p) => acc + p.cantidad, 0) }}</span>
    </button>
    <button :class="{ active: vistaActual === 'login' }" @click="vistaActual = 'login'">🔐 Login</button>
  </nav>
  <!-- v-for -->
  <div v-if="vistaActual === 'tienda'">
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
  <div v-else-if="vistaActual === 'carrito'">
    <h3>🛒 Carrito</h3>
    <div class="carrito-container">
      <CarritoComponent :carrito="carrito" />
    </div>
  </div>
  <div v-else-if="vistaActual === 'login'">
    <LoginComponent />
  </div>
  <div v-else class="contador-container">
    <!-- :valorInicialContador → prop dinámica (v-bind) que inicializa el contador en 5 -->
    <!-- @contadorNegativo → escucha el emit del hijo y llama a lanzarToast con el valor recibido -->
    <ContadorComponent v-if="aparecer" titulo="Contador Título 1" :valorInicialContador="5" @contadorNegativo="lanzarToast"></ContadorComponent>
    <!-- titulo sin : → prop estática, se pasa como string directamente sin JavaScript -->
    <!-- @contadorNegativoIntento → escucha el emit del hijo y muestra un toast de error -->
    <ContadorComponent v-if="aparecer" titulo="Contador Título 2" @contadorNegativoIntento="mostrarAvisoNegativo"></ContadorComponent>
    <!-- :titulo → prop dinámica que recibe el name del primer producto del array tienda -->
    <!-- @contadorCambiado → cada vez que cambia el contador, $event guarda el valor emitido en ultimoReset -->
    <ContadorComponent v-if="aparecer" :titulo="tienda[0].name" @contadorCambiado= "ultimoReset = $event"></ContadorComponent>
    <p v-else-if="2 != 2">El contador ha desaparecido</p>
    <div v-else> 
      <p>111</p>
      <form>  
        <button>2222</button>
      </form>
    </div>
  <!-- v-show (desaparece en el componente si aparecer es false pero se muestra en el DOM)-->
    <p v-show="aparecer">Este texto se muestra u oculta según 'aparecer'</p>
  </div>
</template>
  
<script setup>
import { useToast } from 'vue-toastification'
import { ref, computed } from 'vue';
import ContadorComponent from './components/ContadorComponent.vue';
import ProductoComponent from './components/ProductoComponent.vue';
import CarritoComponent from './components/CarritoComponent.vue'
import BuscadorComponent from './components/BuscadorComponent.vue'
import LoginComponent from './components/LoginComponent.vue'

const toast = useToast()
const aparecer = true;
const carrito = ref([])
const vistaActual = ref('home')
const busqueda = ref('')

const tiendaFiltrada = computed(() => {
  return tienda.filter(p => 
    p.name.toLowerCase().includes(busqueda.value.toLowerCase())
  )
})

function mostrarAvisoNegativo() {
  toast.error('¡El contador no puede ser negativo!')
}

function lanzarToastProducto({ producto, cantidad }) {
  // Actualizar carrito
  const existe = carrito.value.find(p => p.id === producto.id)
  if (existe) {
    existe.cantidad += cantidad
  } else {
    carrito.value.push({ ...producto, cantidad })
  }

  // mensajes de aviso de producto añadido al carrito según cantidad
  if (producto.quantity === 1) {
    toast.success(`¡Has comprado: ${producto.name} x${cantidad}!`)
  } else if (producto.quantity < 5) {
    toast.success(`¡Has comprado un pack de: ${producto.name} x${cantidad}!`)
  } else {
    toast.success(`¡Has comprado al por mayor: ${producto.name} x${cantidad}!`)
  }

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

h3 {
  text-align: center;
}

.carrito-container {
  padding: 20px;
}

.contador-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.navbar {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 16px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
}

.navbar button {
  padding: 10px 24px;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  background: white;
  color: #4a90e2;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.navbar button.active {
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