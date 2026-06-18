<template>
  <div class="detalle-view">
    <p v-if="!producto" class="no-encontrado">Producto no encontrado.</p>

    <div v-else class="detalle-card">
      <img :src="producto.img" :alt="producto.name" class="detalle-img" />
      <div class="detalle-info">
        <h2>{{ producto.name }}</h2>
        <p class="detalle-precio">{{ producto.price.toFixed(2) }}€</p>
        <p class="detalle-cantidad">Unidades por pack: {{ producto.quantity }}</p>
        <ContadorComponent 
          @contadorCambiado="cantidadSeleccionada = $event"
          @contadorNegativoIntento="toast.error('¡El contador no puede ser negativo!')"
        />
        <button class="btn-comprar" v-if="producto.quantity == 1" @click="comprar">Comprar Unidad</button>
        <button class="btn-comprar" v-else-if="producto.quantity < 5" @click="comprar">Comprar pack</button>
        <button class="btn-comprar" v-else @click="comprar">Comprar Lote</button>
        
        <button class="btn-volver" @click="router.push('/shop')">← Volver a la tienda</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useShopStore } from '../stores/ShopStore.js'
import { useCarritoStore } from '../stores/CarritoStore.js'
import { useAuthStore } from '../stores/AuthStore.js'
import { useToast } from 'vue-toastification'
import ContadorComponent from '../components/ContadorComponent.vue'

const route = useRoute()
const router = useRouter()
const shopStore = useShopStore()
const { agregarAlCarrito } = useCarritoStore()
const authStore = useAuthStore()
const toast = useToast()


const producto = computed(() => shopStore.getProductoById(route.params.id))
const cantidadSeleccionada = ref(0)

function comprar() {
  if (!authStore.isLoggedIn) {
    toast.error('¡Inicia sesión para comprar!')
    return
  }
  if (cantidadSeleccionada.value === 0) return
  agregarAlCarrito({ producto: producto.value, cantidad: cantidadSeleccionada.value })
  toast.success(`¡${producto.value.name} añadido al carrito!`)
}
</script>

<style scoped>
.detalle-view {
  max-width: 700px;
  margin: 32px auto;
  padding: 0 16px;
}

.no-encontrado {
  text-align: center;
  color: #718096;
}

.detalle-card {
  display: flex;
  gap: 32px;
  background: white;
  border: 1px solid #e1e4e8;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.detalle-img {
  width: 260px;
  height: 260px;
  object-fit: cover;
  border-radius: 12px;
  flex-shrink: 0;
}

.detalle-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}

.detalle-info h2 {
  color: #2d3748;
  font-size: 1.8rem;
  margin: 0;
}

.detalle-precio {
  color: #4a90e2;
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0;
}

.detalle-cantidad {
  color: #718096;
  margin: 0;
}

.btn-volver {
  margin-top: auto;
  padding: 12px 24px;
  background: white;
  color: #4a90e2;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  width: fit-content;
}

.btn-volver:hover {
  background: #f0f7ff;
}

.btn-comprar {
  padding: 12px 24px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
}

.btn-comprar:hover {
  background: #357abd;
}
</style>