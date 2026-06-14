<template>
  <div class="buscador-container">
    <input 
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="🔍 Buscar producto..." 
      class="buscador"
    />
    <button v-if="modelValue" class="btn-limpiar" @click="$emit('update:modelValue', '')">✕</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
// con defineProps  podemos recibir props desde el componente padre (App.vue) y poder mostrar el valor que le pasamos desde allí
defineProps(['modelValue'])
// con defineEmits podemos emitir un evento al componente padre (App.vue) para que pueda recibir el valor del buscador y hacer algo con él
defineEmits(['update:modelValue'])
</script>

<style scoped>
.buscador-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin: 16px auto;
  max-width: 400px;
  position: relative;
}

.buscador {
  width: 100%;
  padding: 12px 20px;
  border: 2px solid #e2e8f0;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.buscador:focus {
  border-color: #4a90e2;
}

.btn-limpiar {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  color: #718096;
  font-size: 1rem;
  cursor: pointer;
  padding: 4px 8px;
}

.btn-limpiar:hover {
  color: #2d3748;
}
</style>