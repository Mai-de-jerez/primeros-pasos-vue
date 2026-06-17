<template>
  <div class="register-container">
    <h2>Crear cuenta</h2>
    <div class="register-form">
      <input v-model="form.username" placeholder="Usuario" class="register-input" />
      <input v-model="form.password" type="password" placeholder="Contraseña" class="register-input" />
      <input v-model="form.confirmPassword" type="password" placeholder="Confirmar contraseña" class="register-input" />
      <button class="register-btn" @click="handleRegistro">Registrarse</button>
      <button class="login-btn" @click="router.push('/login')">¿Ya tienes cuenta? Inicia sesión</button>
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
const { registro } = useAuthStore()

const form = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

function handleRegistro() {
  if (!form.value.username || !form.value.password) {
    toast.error('Rellena todos los campos')
    return
  }
  if (form.value.password !== form.value.confirmPassword) {
    toast.error('Las contraseñas no coinciden')
    return
  }
  const exito = registro(form.value.username, form.value.password)
  if (exito) {
    toast.success('Cuenta creada, ya puedes iniciar sesión')
    router.push('/login')
  } else {
    toast.error('Ese usuario ya existe')
  }
}
</script>

<style scoped>
.register-container {
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

.register-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.register-input {
  padding: 12px 16px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.register-input:focus {
  border-color: #4a90e2;
}

.register-btn {
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

.register-btn:hover {
  background: #357abd;
}

.login-btn {
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

.login-btn:hover {
  background: #cbd5e0;
}
</style>