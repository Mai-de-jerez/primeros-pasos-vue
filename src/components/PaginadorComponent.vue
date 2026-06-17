<template>
  <div class="paginador">
    <button class="btn-pagina" :disabled="paginaActual === 1" @click="$emit('cambiarPagina', paginaActual - 1)">←</button>
    <span class="pagina-info">{{ paginaActual }} / {{ totalPaginas }}</span>
    <button class="btn-pagina" :disabled="paginaActual === totalPaginas" @click="$emit('cambiarPagina', paginaActual + 1)">→</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  paginaActual: { type: Number, required: true },
  totalPaginas: { type: Number, required: true }
})
defineEmits(['cambiarPagina'])
</script>

<style scoped>
.paginador {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 20px;
}

.btn-pagina {
  padding: 8px 16px;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  background: white;
  color: #4a90e2;
  font-weight: bold;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-pagina:hover:not(:disabled) {
  background: #4a90e2;
  color: white;
}

.btn-pagina:disabled {
  border-color: #e2e8f0;
  color: #cbd5e0;
  cursor: not-allowed;
}

.pagina-info {
  color: #4a90e2;
  font-weight: bold;
  font-size: 1rem;
}
</style>