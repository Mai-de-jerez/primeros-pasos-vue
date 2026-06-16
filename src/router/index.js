// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue' 

const routes = [
  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'), 
    children: [
      {
        path: '/', 
        name: 'home',
        component: HomeView
      },
      {
        path: '/carrito', 
        name: 'carrito',
        component: () => import('../views/CartView.vue') 
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
    component: () => import('../layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login', 
        name: 'login',
        component: () => import('../views/LoginView.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router