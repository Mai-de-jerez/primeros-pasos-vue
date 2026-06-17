<template>
  <div class="login-container">
    <h2>Iniciar sesión</h2>
    <div class="login-form">
      <input v-model="credentials.username" placeholder="Usuario" class="login-input" />
      <input v-model="credentials.password" type="password" placeholder="Contraseña" class="login-input" />
      <button class="login-btn" @click="handleLogin">Entrar</button>
      <button class="home-btn" @click="goHome">Volver al home</button>
      <button class="register-btn" @click="router.push('/registro')">¿No tienes cuenta? Regístrate</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore'

const toast = useToast()
const router = useRouter()
const { login } = useAuthStore()

const credentials = ref({
  username: '',
  password: ''
})

function handleLogin() {
  const exito = login(credentials.value.username, credentials.value.password)
  if (exito) {
    toast.success('¡Bienvenido! 👋')
    router.push('/')
  } else {
    credentials.value.username = ''
    credentials.value.password = ''
    toast.error('Credenciales incorrectas')
  }
}

function goHome() {
  router.push('/')
}
</script>

<style scoped>
.login-container {
  max-width: 360px;
  margin: 60px auto;
  background: white;
  border: 1px solid #e1e4e8;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

h2 {
  text-align: center;
  color: #2d3748;
  margin: 0 0 24px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-input {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.login-input:focus {
  border-color: #4a90e2;
}

.login-btn {
  padding: 12px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.login-btn:hover {
  background: #357abd;
}

.home-btn {
  padding: 12px;
  background: #e2e8f0;
  color: #2d3748;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.home-btn:hover {
  background: #cbd5e0;
}

.register-btn {
  padding: 12px;
  background: transparent;
  color: #4a90e2;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.register-btn:hover {
  background: #4a90e2;
  color: white;
}
</style>

