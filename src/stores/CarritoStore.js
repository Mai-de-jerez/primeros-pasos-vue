// src/stores/CarritoStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCarritoStore = defineStore('carrito', () => {
  const CARRITO_SESSION_KEY = 'app:carrito'

  function cargarCarritoInicial() {
    const guardado = sessionStorage.getItem(CARRITO_SESSION_KEY)
    if (!guardado) return []

    try {
      const parseado = JSON.parse(guardado)
      return Array.isArray(parseado) ? parseado : []
    } catch {
      return []
    }
  }

  const carrito = ref(cargarCarritoInicial())

  function persistirCarrito() {
    sessionStorage.setItem(CARRITO_SESSION_KEY, JSON.stringify(carrito.value))
  }

  function agregarAlCarrito({ producto, cantidad }) {
    const existe = carrito.value.find(p => p.id === producto.id)
    if (existe) {
      existe.cantidad += cantidad
    } else {
      carrito.value.push({ ...producto, cantidad })
    }

    persistirCarrito()
  }

  function limpiarCarrito() {
    carrito.value = []
    sessionStorage.removeItem(CARRITO_SESSION_KEY)
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
    limpiarCarrito,
    totalPrecio,
    carritoCount
  }
})