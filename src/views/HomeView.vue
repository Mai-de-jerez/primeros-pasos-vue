<template>
  <!--DIRECTIVAS EN VUE-->
  <!-- v-if, v-else-if, v-else -->
  <div class="contador-container">
    <!-- :valorInicialContador → prop dinámica (v-bind) que inicializa el contador en 5 -->
    <!-- @contadorNegativo → escucha el emit del hijo y llama a lanzarToast con el valor recibido -->
    <p>Este contador lo inicializamos en 5 con :valorInicialContador="5" y le ponemos un titulo gracias a la prop 'titulo':</p>
     <div><ContadorComponent v-if="aparecer" titulo="Contador Título 1" :valorInicialContador="5"></ContadorComponent></div>
    <p>Este contador nos avisamos si ponemos un valor negativo gracias al evento 'contadorNegativoIntento' y otro titulo distinto:</p>
    <!-- titulo sin : → prop estática, se pasa como string directamente sin JavaScript -->
    <!-- @contadorNegativoIntento → escucha el emit del hijo y muestra un toast de error -->
    <div><ContadorComponent v-if="aparecer" titulo="Contador Título 2" @contadorNegativoIntento="mostrarAvisoNegativo"></ContadorComponent></div>
    <p>Este contador envía su valor en tiempo real al componente padre usando el evento '@contadorCambiado' y guarda el dato en la variable reactiva 'ultimoReset' gracias a $event:</p>
    <!-- :titulo → prop dinámica que recibe el name del primer producto del array tienda -->
    <!-- @contadorCambiado → cada vez que cambia el contador, $event guarda el valor emitido en ultimoReset -->
    <div><ContadorComponent v-if="aparecer" :titulo="tienda[0].name" @contadorCambiado= "ultimoReset = $event"></ContadorComponent></div>
    <p v-if="ultimoReset !== null">
      El último valor recibido en el padre es: <strong>{{ ultimoReset }}</strong>
    </p>
    <p v-else-if="2 != 2">El contador ha desaparecido</p>
    <div v-else>  
      <p>111</p>
      <form>  
        <button>2222</button>
      </form>
    </div>
  <!-- v-show (desaparece en el componente si aparecer es false pero se muestra en el DOM)-->
    <p v-show="aparecer">Este texto se muestra u oculta según 'aparecer'</p>
  </div>
</template>
  
<script setup>
import { useToast } from 'vue-toastification'
import { ref } from 'vue';
import ContadorComponent from '../components/ContadorComponent.vue';

const toast = useToast()
const aparecer = true;
const ultimoReset = ref(0);

function mostrarAvisoNegativo() {
  toast.error('¡El contador no puede ser negativo!')
}

const tienda = [
  { id: 1, name: "Pizza", quantity: 2, img: "https://foodish-api.com/images/pizza/pizza75.jpg", price: 10.99 }, 
  { id: 2, name: "Crepes", quantity: 1, img: "https://foodish-api.com/images/dosa/dosa7.jpg", price: 5.99 },
  { id: 3, name: "Eggs", quantity: 12, img: "https://foodish-api.com/images/idly/idly4.jpg", price: 8.99 },
  { id: 4, name: "Cheesecake", quantity: 6, img: "https://foodish-api.com/images/dessert/dessert9.jpg", price: 12.99 },
  { id: 5, name: "Chicken Breast", quantity: 1, img: "https://foodish-api.com/images/butter-chicken/butter-chicken3.jpg", price: 15.99 }, 
  { id: 6, name: "Sushi", quantity: 10, img: "https://foodish-api.com/images/rice/rice29.jpg", price: 20.99 }, 
  { id: 7, name: "Pasta", quantity: 1, img: "https://foodish-api.com/images/pasta/pasta31.jpg", price: 10.99 },
  { id: 8, name: "Helado", quantity: 3, img: "https://foodish-api.com/images/dessert/dessert24.jpg", price: 6.99 }
]

</script>

<style scoped>

h3 {
  text-align: center;
}

.contador-container {
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

</style>