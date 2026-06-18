// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' 
import CartView from '../views/CartView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'
import { useAuthStore } from '../stores/AuthStore'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/', 
        name: 'home',
        component: HomeView
      },
      {
        path: '/carrito',
        name: 'carrito',
        component: CartView
      },
      {
        path: '/shop', 
        name: 'shop',
        component: () => import('../views/ShopView.vue')
      },
      {
        path: '/shop/:id',
        name: 'producto-detalle',
        component: () => import('../views/ProductoDetailView.vue')
      },
      {
        path: '/checkout',
        name: 'checkout',
        component: () => import('../views/CheckoutView.vue')
      },
      {
        path: '/checkout/success',
        name: 'checkout-success',
        component: () => import('../views/CheckoutSuccessView.vue')
      }
    ]
  },

  {
    path: '/',
    component: AuthLayout,
    children: [
      {
        path: '/login', 
        name: 'login',
        component: () => import('../views/LoginView.vue')
      },
      {
        path: '/registro', 
        name: 'registro',
        component: () => import('../views/RegisterView.vue')
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../views/NotFoundView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if ((to.name === 'carrito' || to.name === 'checkout' || to.name === 'checkout-success') && !authStore.isLoggedIn) {
    return { name: 'login' }
  }

  return true
})

export default router