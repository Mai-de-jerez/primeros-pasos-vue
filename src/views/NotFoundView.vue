<template>
  <div>
    <div class="not-found-card">
      <div class="not-found-code">404</div>
      <h1 class="not-found-title">¡Página no encontrada!</h1>
      <p class="not-found-msg">Vaya, parece que esta página no existe o fue movida.</p>
      <RouterLink to="/" class="not-found-btn">🏠 Volver al inicio</RouterLink>
    </div>
  </div>
</template>

<script setup>
// NotFoundView — sin lógica adicional
</script>

<style scoped>
.not-found {
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  padding: 40px 16px;
}

.not-found-card {
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 16px;
  padding: 56px 48px;
  text-align: center;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 4px 24px rgba(74, 144, 226, 0.08);
}

.not-found-code {
  font-size: 7rem;
  font-weight: 900;
  color: #4a90e2;
  line-height: 1;
  letter-spacing: -4px;
  margin-bottom: 8px;
}

.not-found-title {
  font-size: 1.6rem;
  color: #1e3a5f;
  margin-bottom: 12px;
}

.not-found-msg {
  color: #64748b;
  font-size: 1rem;
  margin-bottom: 32px;
  line-height: 1.6;
}

.not-found-btn {
  display: inline-block;
  padding: 12px 32px;
  background: #4a90e2;
  color: white;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  border: 2px solid #4a90e2;
  transition: all 0.2s;
}

.not-found-btn:hover {
  background: white;
  color: #4a90e2;
}
</style>
