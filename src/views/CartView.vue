<template>
<div>
    <h3>🛒 Carrito</h3>
    <div class="carrito-container">
      <CarritoComponent/>
    </div>
  </div>
</template>
<script setup>
import CarritoComponent from '../components/CarritoComponent.vue'
</script>
<style scoped>
.carrito-container {
  padding: 20px;
}
</style>