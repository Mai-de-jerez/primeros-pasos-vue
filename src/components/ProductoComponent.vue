<template>
  <div class="producto-card">
    <div class="producto-info">
      <h3>{{ producto.name }}</h3>
      <img :src="producto.img" :alt="producto.name" class="producto-img" />
      <p>Uds: {{ producto.quantity }}</p>
      <p class="price">{{ producto.price }}€</p>
    </div>

    <ContadorComponent 
      class="mi-contador" 
      @contadorCambiado="cantidadSeleccionada = $event"
      @contadorNegativoIntento="$emit('contadorNegativoIntento')"
    />

    <button class="btn-comprar" v-if="props.producto.quantity == 1" @click="enviarEvento()">Comprar Unidad</button>
    <button class="btn-comprar" v-else-if="props.producto.quantity<5" @click="enviarEvento()">Comprar pack</button>
    <button class="btn-comprar" v-else @click="enviarEvento()">Comprar Lote</button>
    <button class="btn-detalle" @click="verDetalle()">Ver detalle</button>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue'
import ContadorComponent from './ContadorComponent.vue'
import { useRouter } from 'vue-router'

const props = defineProps(['producto'])
const emit = defineEmits(['comprar', 'contadorNegativoIntento'])
const cantidadSeleccionada = ref(0)
const router = useRouter()

function enviarEvento() {
  if (cantidadSeleccionada.value === 0) return
  emit('comprar', { producto: props.producto, cantidad: cantidadSeleccionada.value })
}

function verDetalle() {
  router.push(`/shop/${props.producto.id}`)
} 
</script>

<style scoped>
.producto-card {
  border: 1px solid #e1e4e8;
  border-radius: 16px;
  padding: 20px;
  width: 220px;
  min-height: 280px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: transform 0.2s ease;
}

.producto-card:hover {
  transform: translateY(-4px);
}

.producto-info {
  text-align: center;
  width: 100%;
}

.producto-info h3 {
  margin: 0 0 4px;
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 700;
}

.producto-info p {
  margin: 0;
  color: #718096;
  font-size: 0.9rem;
  font-weight: 500;
}

.producto-info .price {
  color: #e24a4a;
  font-weight: 700;
  font-size: 1.5rem;
  margin-top: 4px;
}

.mi-contador {
  width: 100%;
}

.btn-comprar {
  width: 100%;
  padding: 10px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.85rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: auto;
}

.btn-comprar:hover {
  background-color: #357abd;
}

.btn-detalle {
  width: 100%;
  padding: 10px;
  background: white;
  color: #4a90e2;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-detalle:hover {
  background: #f0f7ff;
}

.producto-img {
  width: 100%;
  height: 150px; 
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}
</style>
