<template>
  <div class="carrito">
    <!-- con v-if mostramos un mensaje si el carrito está vacío, y con v-else mostramos la lista de productos -->
    <p v-if="carrito.length === 0" class="carrito-vacio">No hay productos todavía</p>
    <template v-else>
      <div class="carrito-header">
        <span class="col-producto">Producto</span>
        <span class="col-cantidad">Cantidad</span>
        <span class="col-unitario">Precio unitario</span>
        <span class="col-total">Total</span>
      </div>
      <ul>
        <!-- con v-for iteramos sobre los elementos del array carrito -->
        <li v-for="item in carrito" :key="item.id">
          <span class="col-producto">
            <img :src="item.img" :alt="item.name" class="carrito-img" />
            {{ item.name }}
          </span>
          <span class="col-cantidad">x{{ item.cantidad }}</span>
          <span class="col-unitario">{{ item.price.toFixed(2) }}€</span>
          <span class="col-total">{{ (item.price * item.cantidad).toFixed(2) }}€</span>
        </li>
      </ul>
      <div class="carrito-total">
        <span>Total:</span>
        <span>{{ totalPrecio.toFixed(2) }}€</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue' 

// con props recibimos el carrito desde el componente padre (App.vue) y podemos mostrarlo en este componente
const props = defineProps(['carrito'])

// computed recalcula totalPrecio automáticamente cada vez que cambia el carrito
// a diferencia de una función normal, Vue cachea el resultado y solo lo recalcula
// cuando alguna de sus dependencias reactivas cambia (en este caso, props.carrito)
const totalPrecio = computed(() => 
  props.carrito.reduce((acc, p) => acc + p.price * p.cantidad, 0)
)

</script>

<style scoped>

h3 {
  margin: 0 0 12px;
  font-size: 1.1rem;
  color: #2d3748;
  text-align: center;
}

.carrito {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  background: white;
  border: 1px solid #e1e4e8;
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.12);
}

.carrito-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 8px 0;
  border-bottom: 2px solid #e2e8f0;
  font-size: 0.8rem;
  font-weight: 700;
  color: #718096 !important;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.carrito-vacio {
  color: #718096;
  font-size: 0.9rem;
  text-align: center;
}

.carrito-precio {
  font-size: 0.85rem;
  color: #2d3748;
  font-weight: 500;
  white-space: nowrap;
}

.carrito-img {
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 6px;
  flex-shrink: 0;
}

.carrito-nombre {
  flex: 1;
  font-size: 0.9rem;
  color: #2d3748;
  font-weight: 500;
}

.carrito-cantidad {
  font-size: 0.85rem;
  color: #4a90e2;
  font-weight: bold;
  white-space: nowrap;
}

.carrito-total {
  display: flex;
  justify-content: space-between;
  padding: 16px 0 0;
  margin-top: 8px;
  border-top: 2px solid #e2e8f0;
  font-weight: 700;
  font-size: 1.1rem;
  color: #2d3748;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
}

li {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.col-producto {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.9rem;
  color: #2d3748;
  font-weight: 500;
}

.col-cantidad {
  color: #4a90e2;
  font-weight: 700;
  font-size: 0.9rem;
}

.col-unitario {
  color: #718096;
  font-size: 0.9rem;
}

.col-total {
  color: #2d3748;
  font-weight: 600;
  font-size: 0.9rem;
}

.col-cantidad, .carrito-header .col-cantidad {
  text-align: center;
}

.col-unitario, .carrito-header .col-unitario {
  text-align: center;
}

.col-total, .carrito-header .col-total {
  text-align: right;
}

.carrito-total span:last-child {
  text-align: right;
}
</style>