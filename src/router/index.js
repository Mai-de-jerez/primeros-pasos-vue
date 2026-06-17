// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' 
import CartView from '../views/CartView.vue'
import MainLayout from '../layouts/MainLayout.vue'
import AuthLayout from '../layouts/AuthLayout.vue'

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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router