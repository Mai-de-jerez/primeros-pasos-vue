<template>
  <section class="success-page">
    <div class="card">
      <h2>Pago completado</h2>
      <p>Tu pedido se ha procesado correctamente.</p>
      <p class="order-id">Pedido #{{ shortOrderId }}</p>
      <div class="actions">
        <RouterLink to="/shop" class="btn">Seguir comprando</RouterLink>
        <RouterLink to="/" class="btn secondary">Ir al inicio</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useCheckoutStore } from '../stores/CheckoutStore'
import { useRouter } from 'vue-router'

const checkoutStore = useCheckoutStore()
const { paymentAttemptId } = storeToRefs(checkoutStore)
const router = useRouter()

const shortOrderId = computed(() => {
  if (!paymentAttemptId.value) return 'SIN-ID'
  return String(paymentAttemptId.value).replace(/-/g, '').slice(0, 8).toUpperCase()
})

onMounted(() => {
  if (!paymentAttemptId.value) {
    router.replace('/')
  }
})

</script>

<style scoped>
.success-page {
  max-width: 680px;
  margin: 36px auto;
  padding: 0 14px;
}

.card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  background: #fff;
}

h2 {
  margin: 0 0 8px;
  color: #2f855a;
}

p {
  margin: 0 0 18px;
  color: #4a5568;
}

.order-id {
  margin: 0 0 18px;
  font-weight: 700;
  color: #2d3748;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
}

.btn {
  padding: 10px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  color: #fff;
  background: #4a90e2;
}

.btn.secondary {
  background: #718096;
}
</style>
