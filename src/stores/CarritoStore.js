// src/stores/CarritoStore.js
import { ref, computed } from 'vue'

const carrito = ref([])

export function useCarritoStore() {
  
  function agregarAlCarrito({ producto, cantidad }) {
    const existe = carrito.value.find(p => p.id === producto.id)
    if (existe) {
      existe.cantidad += cantidad
    } else {
      carrito.value.push({ ...producto, cantidad })
    }
  }

  // Calculamos el total de dinero
  const totalPrecio = computed(() => 
    carrito.value.reduce((acc, p) => acc + p.price * p.cantidad, 0)
  )

  // Calculamos el total de items para la Navbar
  const carritoCount = computed(() => 
    carrito.value.reduce((acc, p) => acc + p.cantidad, 0)
  )

  return {
    carrito,
    agregarAlCarrito,
    totalPrecio,
    carritoCount
  }
}