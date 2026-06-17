// src/stores/AuthStore.js
import { ref, computed } from 'vue'

// Seed inicial — si no hay usuarios en localStorage los creamos
if (!localStorage.getItem('usuarios')) {
  localStorage.setItem('usuarios', JSON.stringify([
    { username: 'admin', password: '1234' },
    { username: 'maria', password: '1234' },
    { username: 'pepe', password: '1234' },
    { username: 'juan', password: '1234' }

  ]))
}

const usuarioActivo = ref(JSON.parse(localStorage.getItem('sesion')) || null)

export function useAuthStore() {

  const isLoggedIn = computed(() => usuarioActivo.value !== null)

  function login(username, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const encontrado = usuarios.find(u => u.username === username && u.password === password)
    if (encontrado) {
      usuarioActivo.value = { username: encontrado.username }
      localStorage.setItem('sesion', JSON.stringify(usuarioActivo.value))
      return true
    }
    return false
  }

  function logout() {
    usuarioActivo.value = null
    localStorage.removeItem('sesion')
  }

  function registro(username, password) {
    const usuarios = JSON.parse(localStorage.getItem('usuarios'))
    const existe = usuarios.find(u => u.username === username)
    if (existe) return false
    usuarios.push({ username, password })
    localStorage.setItem('usuarios', JSON.stringify(usuarios))
    return true
  }

  return {
    usuarioActivo,
    isLoggedIn,
    login,
    logout,
    registro
  }
}