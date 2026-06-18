<template>
  <div class="cart-view">
    <h3>🛒 Carrito</h3>

    <p v-if="carrito.length === 0" class="carrito-vacio">No hay productos todavía</p>

    <template v-else>
      <div class="carrito">
        <div class="carrito-header">
          <span class="col-producto">Producto</span>
          <span class="col-cantidad">Cantidad</span>
          <span class="col-unitario">Precio unitario</span>
          <span class="col-total">Total</span>
        </div>
        <ul>
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
      </div>

      <div class="checkout-cta">
        <RouterLink to="/checkout" class="checkout-btn">Proceder al pago</RouterLink>
        <RouterLink to="/shop" class="checkout-btn secundario">Seguir comprando</RouterLink>
      </div>
    </template>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useCarritoStore } from '../stores/CarritoStore'

const carritoStore = useCarritoStore()
const { carrito, totalPrecio } = storeToRefs(carritoStore)
</script>

<style scoped>
.cart-view {
  padding: 20px;
}

.cart-view h3 {
  color: #4a90e2;
  font-size: 1.6rem;
  text-align: center;
  margin-bottom: 24px;
}

.carrito-vacio {
  color: #718096;
  text-align: center;
}

.carrito {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border: 1px solid #e1e4e8;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
  overflow: hidden;
}

.carrito-header {
  display: grid;
  grid-template-columns: 2fr 100px 150px 100px;
  gap: 16px;
  padding: 14px 20px;
  background: #f0f7ff;
  font-size: 0.78rem;
  font-weight: 700;
  color: #4a90e2;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

li {
  display: grid;
  grid-template-columns: 2fr 100px 150px 100px;
  gap: 16px;
  align-items: center;
  padding: 14px 20px;
  border-bottom: 1px solid #f0f4f8;
}

li:last-child { border-bottom: none; }

.col-producto {
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 500;
  color: #2d3748;
}

.carrito-img {
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 8px;
  flex-shrink: 0;
}

.col-cantidad { color: #4a90e2; font-weight: 700; text-align: center; }
.col-unitario { color: #4a90e2; text-align: center; }
.col-total { color: #4a90e2; font-weight: 600; text-align: right; }

.carrito-total {
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  background: #f8fafc;
  font-weight: 700;
  font-size: 1.1rem;
  color: #2d3748;
  border-top: 2px solid #e2e8f0;
}

.checkout-cta {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
}

.checkout-btn {
  padding: 12px 28px;
  background: #4a90e2;
  color: white;
  text-decoration: none;
  font-weight: 700;
  border-radius: 8px;
  transition: background 0.2s;
}

.checkout-btn:hover { background: #357abd; }

.checkout-btn.secundario {
  background: white;
  color: #4a90e2;
  border: 2px solid #4a90e2;
}

.checkout-btn.secundario:hover { background: #f0f7ff; }
</style>