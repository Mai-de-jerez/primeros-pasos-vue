<template> 
  <div>
    <p>{{ contadorValue }}</p>
    <button @click="sumarleUno">+</button>
    <button @click="restarleUno">-</button>
    <button @click="resetearValor">Reset</button>
  </div> 
</template>

<script setup>
import { ref, defineProps, defineEmits, onMounted } from 'vue'

const contadorValue = ref(0);
// Esto es para recibir props desde el componente padre (App.vue) y poder mostrar el título que le pasamos desde allí
const props = defineProps(['titulo', 'valorInicialContador']);
//Esto es para emtir un evento al componente padre (App.vue) para que pueda recibir el valor del contador y hacer algo con él
const emit = defineEmits(['contadorCambiado', 'contadorNegativoIntento']);

// onMounted() es un hook de ciclo de vida que se ejecuta cuando el componente se monta en el DOM. 
// con .value podemos acceder al valor de la variable reactiva contadorValue y asignarle 
// el valor inicial que recibimos desde el componente padre (App.vue) a través de la prop valorInicialContador.
onMounted(() => {
  console.log('ContadorComponent montado');
  contadorValue.value = props.valorInicialContador || 0;
});

// con emit() podemos emitir un evento al componente padre (App.vue) para que pueda recibir el valor del contador y hacer algo con él.
function sumarleUno() {
  contadorValue.value++
  emit('contadorCambiado', contadorValue.value)
}

function restarleUno() {
  if (contadorValue.value <= 0) {
    emit('contadorNegativoIntento')
    return
  }
  contadorValue.value--
  emit('contadorCambiado', contadorValue.value)
}

function resetearValor() {
  contadorValue.value = 0
  emit('contadorCambiado', contadorValue.value)
}

</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background-color: #f8fafc;
}

button {
  font-size: 0.85rem;
  height: 32px;
  padding: 0 10px;        
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  white-space: nowrap;    
}

button:hover {
  background-color: #357abd;
}

p {
  min-width: 28px;
  text-align: center;
  font-weight: 600;
  font-size: 1rem;
  color: #2d3748;
  margin: 0;
}
</style>