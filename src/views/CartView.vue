<template>
  <div class="cart-view">
    <h3>🛒 Carrito</h3>
    <div class="carrito-container">
      <CarritoComponent/>
    </div>
    <div v-if="carrito.length > 0" class="checkout-cta">
      <RouterLink to="/checkout" class="checkout-btn">Proceder al pago</RouterLink>
    </div>
  </div>
</template>
<script setup>
import { storeToRefs } from 'pinia'
import CarritoComponent from '../components/CarritoComponent.vue'
import { useCarritoStore } from '../stores/CarritoStore'

const carritoStore = useCarritoStore()
const { carrito } = storeToRefs(carritoStore)
</script>
<style scoped>
.cart-view {
  display: flex;
  flex-direction: column;
  align-items: center;

}

.cart-view h3 {
  color: #4a90e2;
}
.carrito-container {
  padding: 20px;
}

.checkout-cta {
  display: flex;
  justify-content: center;
  margin-top: 8px;
}

.checkout-btn {
  padding: 12px 18px;
  margin-bottom: 24px;
  background: #4a90e2;
  color: #fff;
  text-decoration: none;
  font-weight: 700;
  border-radius: 8px;
  transition: background 0.2s;
}

.checkout-btn:hover {
  background: #357abd;
}
</style>