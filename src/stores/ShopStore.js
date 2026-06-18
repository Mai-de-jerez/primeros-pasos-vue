import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

const PRODUCTOS_POR_PAGINA = 5

const productos = [
  { id: 1, name: "Pizza", quantity: 2, img: "/img/joshuemd-pizza-329523.jpg", price: 10.99 }, 
  { id: 2, name: "Crepes", quantity: 1, img: "/img/pexels-berries-1869421_1920.jpg", price: 5.99 },
  { id: 3, name: "Eggs", quantity: 12, img: "/img/pexels-beans-1834984_1920.jpg", price: 8.99 },
  { id: 4, name: "Cheesecake", quantity: 6, img: "/img/einladung_zum_essen-tart-2409958_1920.jpg", price: 12.99 },
  { id: 5, name: "Churros", quantity: 1, img: "/img/daria-yakovleva-churros-2188871_1920.jpg", price: 15.99 }, 
  { id: 6, name: "Sushi", quantity: 10, img: "/img/sontung57-sushi-balls-5878892_1920.jpg", price: 20.99 }, 
  { id: 7, name: "Pasta", quantity: 1, img: "/img/pexels-pasta-1854245_1920.jpg", price: 10.99 },
  { id: 8, name: "Carrot-Cake", quantity: 3, img: "/img/pexels-baked-goods-1846460_1920.jpg", price: 6.99 },
  { id: 9, name: "Salmón", quantity: 5, img: "/img/wow_pho-food-712665_1920.jpg", price: 9.99 },
  { id: 10, name: "Hamburguesa", quantity: 2, img: "/img/niekverlaan-hamburger-494706_1920.jpg", price: 11.99 }
]

export const useShopStore = defineStore('shop', () => { 
  const busqueda = ref('')
  const paginaActual = ref(1)

  const tiendaFiltrada = computed(() =>
    productos.filter(p =>
      p.name.toLowerCase().includes(busqueda.value.toLowerCase())
    )
  )

  const totalPaginas = computed(() =>
    Math.ceil(tiendaFiltrada.value.length / PRODUCTOS_POR_PAGINA)
  )

  const productosPaginados = computed(() => {
    const inicio = (paginaActual.value - 1) * PRODUCTOS_POR_PAGINA
    return tiendaFiltrada.value.slice(inicio, inicio + PRODUCTOS_POR_PAGINA)
  })

  function cambiarPagina(pagina) {
    paginaActual.value = pagina
  }

  function getProductoById(id) {
    return productos.find(p => p.id === Number(id)) || null
  }

  // Resetea página al filtrar
  watch(busqueda, () => {
    paginaActual.value = 1
  })

  return {
    busqueda,
    paginaActual,
    tiendaFiltrada,
    totalPaginas,
    productosPaginados,
    cambiarPagina,
    getProductoById
  }
})