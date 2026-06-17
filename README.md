# 🛍️ Mi Tienda Vue — Proyecto Didáctico

Aplicación de tienda online desarrollada con **Vue 3** para demostrar los conceptos fundamentales del framework: directivas, reactividad, componentes, enrutado, layouts, stores y más.

---

## 🚀 Tecnologías

| Tecnología | Versión | Uso |
|---|---|---|
| Vue 3 | 3.2 | Framework principal |
| Vue Router | 4 | Enrutado SPA |
| Pinia | última | Gestión de estado global |
| Vue Toastification | 2.0.0-rc.5 | Notificaciones |
| Vue CLI | 5 | Bundler y servidor de desarrollo |

---

## ⚙️ Instalación y arranque

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo (http://localhost:8080)
npm run serve

# Build de producción
npm run build
```

---

## 📁 Estructura del proyecto

```
src/
├── assets/          # CSS global (reset)
├── components/      # Componentes reutilizables
│   ├── NavBarComponent.vue
│   ├── ProductoComponent.vue
│   ├── CarritoComponent.vue
│   ├── BuscadorComponent.vue
│   ├── ContadorComponent.vue
│   └── PaginadorComponent.vue
├── layouts/         # Layouts de página
│   ├── MainLayout.vue
│   └── AuthLayout.vue
├── stores/          # Estado global con Pinia
│   ├── CarritoStore.js
│   ├── AuthStore.js
│   └── CheckoutStore.js
├── views/           # Vistas (una por ruta)
│   ├── HomeView.vue
│   ├── ShopView.vue
│   ├── CartView.vue
│   ├── LoginView.vue
│   ├── RegisterView.vue
│   ├── CheckoutView.vue
│   └── CheckoutSuccessView.vue
├── router/
│   └── index.js
├── App.vue
└── main.js
```

---

## 🧠 Conceptos demostrados

### 1. Reactividad — `ref` y `computed`

`ref` crea una variable reactiva: cuando cambia su valor, Vue actualiza automáticamente el DOM.  
`computed` deriva un valor de otros reactivos y se recalcula solo cuando sus dependencias cambian.

```javascript
const busqueda = ref('')

const tiendaFiltrada = computed(() =>
  tienda.filter(p => p.name.toLowerCase().includes(busqueda.value.toLowerCase()))
)
```

---

### 2. Directivas de template

Las directivas son atributos especiales del template que añaden comportamiento reactivo.

#### `v-bind` (`:`)
Enlaza un atributo HTML a una expresión JavaScript.
```html
<img :src="producto.img" :alt="producto.name" />
```

#### `v-model`
Enlace bidireccional entre un input y una variable reactiva. El input actualiza la variable y la variable actualiza el input.
```html
<input v-model="busqueda" placeholder="Buscar..." />
```

#### `v-if` / `v-else-if` / `v-else`
Renderiza o elimina elementos del DOM según una condición.
```html
<p v-if="carrito.length === 0">El carrito está vacío</p>
<div v-else>...</div>
```

#### `v-show`
Similar a `v-if` pero en lugar de eliminar el elemento, lo oculta con `display: none`. Útil cuando el elemento se muestra y oculta frecuentemente.

#### `v-for`
Itera sobre un array y renderiza un elemento por cada ítem. Siempre requiere `:key` para que Vue pueda identificar cada nodo.
```html
<ProductoComponent
  v-for="producto in productosPaginados"
  :key="producto.id"
  :producto="producto"
/>
```

#### `v-on` (`@`)
Escucha eventos del DOM o eventos personalizados de componentes.
```html
<button @click="handleLogin">Entrar</button>
```

---

### 3. Props y Emits

**Props**: datos que el componente padre pasa al hijo (flujo hacia abajo).  
**Emits**: eventos que el hijo lanza al padre para comunicar algo (flujo hacia arriba).

```javascript
// Hijo — recibe producto, emite 'comprar'
const props = defineProps(['producto'])
const emit = defineEmits(['comprar'])

function enviarEvento() {
  emit('comprar', { producto: props.producto, cantidad: cantidadSeleccionada.value })
}
```

```html
<!-- Padre — pasa prop y escucha emit -->
<ProductoComponent :producto="producto" @comprar="lanzarToastProducto" />
```

---

### 4. `v-model` en componentes propios

Para usar `v-model` en un componente personalizado, el componente debe recibir `modelValue` como prop y emitir `update:modelValue`.

```javascript
// BuscadorComponent.vue
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
```

```html
<input
  :value="modelValue"
  @input="$emit('update:modelValue', $event.target.value)"
/>
```

```html
<!-- Uso desde el padre — igual que un input nativo -->
<BuscadorComponent v-model="busqueda" />
```

---

### 5. Watch

`watch` observa una variable reactiva y ejecuta código cuando cambia. Se usa para efectos secundarios (llamadas a API, localStorage, logs...), no para derivar valores (eso es `computed`).

```javascript
// Resetear página al filtrar
watch(busqueda, () => {
  paginaActual.value = 1
})
```

---

### 6. Ciclo de vida — `onMounted`

`onMounted` se ejecuta cuando el componente ya está insertado en el DOM. Útil para redirecciones, peticiones iniciales o acceso a elementos del DOM.

```javascript
onMounted(() => {
  if (!paymentAttemptId.value) {
    router.replace('/')
  }
})
```

---

### 7. Layouts

Un layout es un componente que define la estructura visual compartida de un grupo de vistas (navbar, footer, fondo...). Las vistas hijas se renderizan donde está `<RouterView />`.

```
MainLayout → Navbar + contenido + Footer  (rutas principales)
AuthLayout → fondo azul oscuro centrado   (login, registro)
```

```javascript
// router/index.js
{
  path: '/',
  component: MainLayout,       // layout principal
  children: [
    { path: '/', component: HomeView },
    { path: '/shop', component: () => import('../views/ShopView.vue') }
  ]
}
```

---

### 8. Enrutado — Vue Router

**`RouterLink`**: navegación declarativa sin recargar la página. Vue Router añade automáticamente la clase `router-link-active` al enlace de la ruta activa.

```html
<RouterLink to="/shop" class="nav-button">🛍️ Tienda</RouterLink>
```

**`useRouter` y `useRoute`**: hooks para navegar y leer la ruta activa desde el script.

```javascript
const router = useRouter()
router.push('/login')      // navega añadiendo al historial
router.replace('/')        // navega sin añadir al historial
```

**Carga perezosa (lazy loading)**: las vistas que no son críticas se cargan solo cuando el usuario las visita, reduciendo el bundle inicial.

```javascript
// Carga estática — siempre disponible desde el arranque
import HomeView from '../views/HomeView.vue'

// Carga perezosa — se descarga solo al visitar la ruta
component: () => import('../views/ShopView.vue')
```

Los layouts y las vistas de uso frecuente (Home, Carrito) se importan estáticamente. El resto con carga perezosa.

---

### 9. Navigation Guards

Los guards se ejecutan antes de cada navegación y permiten redirigir o bloquear el acceso según condiciones (autenticación, permisos...).

```javascript
router.beforeEach((to) => {
  const authStore = useAuthStore()

  const rutasProtegidas = ['carrito', 'checkout', 'checkout-success']
  if (rutasProtegidas.includes(to.name) && !authStore.isLoggedIn) {
    return { name: 'login' }
  }

  return true
})
```

---

### 10. Stores con Pinia

Pinia gestiona el estado global de la aplicación. Cualquier componente puede leer o modificar el store sin necesidad de props ni emits.

#### CarritoStore
Persiste el carrito en `sessionStorage` para que sobreviva a recargas de página.

```javascript
export const useCarritoStore = defineStore('carrito', () => {
  const carrito = ref(cargarCarritoInicial())

  function agregarAlCarrito({ producto, cantidad }) { ... }
  function limpiarCarrito() { ... }

  const totalPrecio = computed(() =>
    carrito.value.reduce((acc, p) => acc + p.price * p.cantidad, 0)
  )

  return { carrito, agregarAlCarrito, limpiarCarrito, totalPrecio, carritoCount }
})
```

#### AuthStore
Gestiona la sesión del usuario con `localStorage`. Incluye seed de usuarios iniciales para poder hacer login sin backend.

```javascript
// Usuarios disponibles al arrancar
{ username: 'admin', password: '1234' }
{ username: 'maria', password: '1234' }
```

#### CheckoutStore
Gestiona el flujo de pago: estado del intento, caché de resultados para evitar doble procesamiento y reset tras completar el pedido.

---

### 11. `storeToRefs`

Al desestructurar un store de Pinia, las propiedades reactivas pierden su reactividad si se extraen directamente. `storeToRefs` mantiene la reactividad en la desestructuración.

```javascript
const carritoStore = useCarritoStore()
const { carrito, totalPrecio } = storeToRefs(carritoStore) // ✅ reactivo
const { limpiarCarrito } = carritoStore                     // funciones sin storeToRefs
```

---

## 🔐 Autenticación simulada

Sin backend, la autenticación se simula con `localStorage`:

- Los usuarios se inicializan en `localStorage` al arrancar la app si no existen
- El login comprueba credenciales contra el array guardado
- La sesión activa se persiste en `localStorage` y se recupera al recargar
- El logout elimina la sesión y limpia el carrito
- Las rutas protegidas redirigen a `/login` si no hay sesión activa

> En una aplicación real este flujo se sustituye por llamadas a una API REST con JWT.

---

## 👩‍💻 Autora

María del Carmen Martín Rodríguez
