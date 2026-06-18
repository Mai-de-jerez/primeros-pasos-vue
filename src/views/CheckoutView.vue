<template>
	<section class="checkout">
        <div class="title">
            <h3>Checkout</h3>
        </div>		

		<p v-if="carrito.length === 0" class="msg warn">
			El carrito esta vacio.
		</p>

		<form v-else class="form" @submit.prevent="pagar">
			<label>
				Nombre
				<input v-model.trim="form.nombre" type="text" placeholder="Tu nombre" />
			</label>
			<p v-if="errores.nombre" class="error">{{ errores.nombre }}</p>

			<label>
				Email
				<input v-model.trim="form.email" type="email" placeholder="tu@email.com" />
			</label>
			<p v-if="errores.email" class="error">{{ errores.email }}</p>

			<label>
				Metodo de pago
				<select v-model="form.metodo">
					<option value="tarjeta">Tarjeta</option>
					<option value="paypal">PayPal</option>
					<option value="telf">Telefono</option>
				</select>
			</label>

			<div v-if="form.metodo === 'tarjeta'" class="bloque">
				<label>
					Numero tarjeta
					<input v-model.trim="form.tarjeta" type="text" inputmode="numeric" placeholder="1234 5678 9012 3456" />
				</label>
				<p v-if="errores.tarjeta" class="error">{{ errores.tarjeta }}</p>

				<div class="row">
					<label>
						Expiracion (MM/YY)
						<input v-model.trim="form.expiracion" type="text" inputmode="numeric" placeholder="08/30" />
					</label>
					<label>
						CVV
						<input v-model.trim="form.cvv" type="text" inputmode="numeric" placeholder="123" />
					</label>
				</div>
				<p v-if="errores.expiracion" class="error">{{ errores.expiracion }}</p>
				<p v-if="errores.cvv" class="error">{{ errores.cvv }}</p>
			</div>

			<div v-if="form.metodo === 'paypal'" class="bloque">
				<label>
					Email PayPal
					<input v-model.trim="form.paypal" type="email" placeholder="paypal@email.com" />
				</label>
				<p v-if="errores.paypal" class="error">{{ errores.paypal }}</p>
			</div>

			<div v-if="form.metodo === 'telf'" class="bloque">
				<label>
					Telefono
					<input v-model.trim="form.telefono" type="text" inputmode="tel" placeholder="600123123 o +34600123123" />
				</label>
				<p v-if="errores.telefono" class="error">{{ errores.telefono }}</p>
			</div>

			<div class="resumen">
				<span>Total a pagar</span>
				<strong>{{ totalPrecio.toFixed(2) }} EUR</strong>
			</div>

			<p v-if="checkoutStore.paymentStatus === checkoutStore.PAYMENT_STATUS.FAILED" class="error">
				{{ checkoutStore.paymentError }}
			</p>
			<p v-if="checkoutStore.paymentStatus === checkoutStore.PAYMENT_STATUS.SUCCESS" class="msg ok">
				Pago completado.
			</p>
			<button class="btn-volver" type="button" @click="volverAlCarrito">Volver al carrito</button>
			<button class="btn-pagar" type="submit" :disabled="isProcessing || pagoConfirmado">
				{{ isProcessing ? 'Procesando...' : pagoConfirmado ? 'Pago ya procesado' : 'Pagar' }}
			</button>
		</form>
	</section>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCarritoStore } from '../stores/CarritoStore'
import { useCheckoutStore } from '../stores/CheckoutStore'
import { computed, reactive, ref, onMounted } from 'vue'

const carritoStore = useCarritoStore()
const checkoutStore = useCheckoutStore()
const router = useRouter()
const { carrito, totalPrecio } = storeToRefs(carritoStore)

const form = reactive({
	nombre: '',
	email: '',
	metodo: 'tarjeta',
	tarjeta: '',
	expiracion: '',
	cvv: '',
	paypal: '',
	telefono: ''
})

const errores = reactive({
	nombre: '',
	email: '',
	tarjeta: '',
	expiracion: '',
	cvv: '',
	paypal: '',
	telefono: ''
})

const pagoConfirmado = ref(false)
const isProcessing = computed(() => checkoutStore.paymentStatus === checkoutStore.PAYMENT_STATUS.PROCESSING)

onMounted(() => {
  checkoutStore.resetCheckout()
})

function limpiarErrores() {
	Object.keys(errores).forEach((k) => {
		errores[k] = ''
	})
}

function validarExpiracion(valor) {
	const m = valor.match(/^(\d{2})\/(\d{2})$/)
	if (!m) return false
	const mes = Number(m[1])
	const year = Number(m[2])
	if (mes < 1 || mes > 12) return false

	const hoy = new Date()
	const yy = hoy.getFullYear() % 100
	const mm = hoy.getMonth() + 1
	if (year < yy) return false
	if (year === yy && mes < mm) return false
	return true
}

function validar() {
	limpiarErrores()
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

	if (!form.nombre) errores.nombre = 'Nombre obligatorio.'
	if (!emailRegex.test(form.email)) errores.email = 'Email invalido.'

	if (form.metodo === 'tarjeta') {
		const card = form.tarjeta.replace(/\s+/g, '')
		if (!/^\d{16}$/.test(card)) errores.tarjeta = 'Tarjeta de 16 digitos numericos.'
		if (!validarExpiracion(form.expiracion)) errores.expiracion = 'Expiracion invalida.'
		if (!/^\d{3}$/.test(form.cvv)) errores.cvv = 'CVV de 3 digitos numericos.'
	}

	if (form.metodo === 'paypal') {
		if (!emailRegex.test(form.paypal)) errores.paypal = 'Email de PayPal invalido.'
	}

	if (form.metodo === 'telf') {
		const phone = form.telefono.replace(/\s+/g, '')
		if (!/^(\+34)?[67]\d{8}$/.test(phone)) {
			errores.telefono = 'Telefono invalido (ej: 600123123 o +34600123123).'
		}
	}

	return Object.values(errores).every((v) => !v)
}

async function pagar() {
	if (!validar() || carrito.value.length === 0) return

	if (pagoConfirmado.value) return

	const attemptId = checkoutStore.startPaymentAttempt()
	if (checkoutStore.isAttemptProcessed(attemptId)) {
		const result = checkoutStore.getAttemptResult(attemptId)
		if (result?.status === checkoutStore.PAYMENT_STATUS.SUCCESS) {
			router.push({ name: 'checkout-success' })
		}
		return
	}

	await new Promise((resolve) => setTimeout(resolve, 900))
	checkoutStore.finishPaymentSuccess(attemptId)
	carritoStore.limpiarCarrito()
	pagoConfirmado.value = true
	router.push({ name: 'checkout-success' })
}

function volverAlCarrito() {
	router.push({ name: 'carrito' })
}
</script>

<style scoped>
.title {
  text-align: center;
  margin-bottom: 24px;
}

.title h3 {
  color: #4a90e2;
  font-size: 1.8rem;
  font-weight: 800;
}

.checkout {
  max-width: 560px;
  margin: 32px auto;
  padding: 0 16px;
}

.form {
  display: grid;
  gap: 16px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 4px 24px rgba(74, 144, 226, 0.08);
}

label {
  display: grid;
  gap: 6px;
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

input, select {
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #e2e8f0;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}

input:focus, select:focus {
  border-color: #4a90e2;
}

.bloque {
  border: 2px dashed #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  display: grid;
  gap: 12px;
  background: #f8fafc;
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.resumen {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #f0f7ff;
  border-radius: 10px;
  border: 1px solid #bee3f8;
  font-size: 1.1rem;
  color: #2d3748;
}

.resumen strong {
  color: #4a90e2;
  font-size: 1.3rem;
}

.btn-volver {
  padding: 12px;
  background: white;
  color: #4a90e2;
  border: 2px solid #4a90e2;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-volver:hover {
  background: #f0f7ff;
}

.btn-pagar {
  padding: 14px;
  background: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-pagar:hover:not(:disabled) {
  background: #357abd;
}

.btn-pagar:disabled {
  background: #a0bfe0;
  cursor: not-allowed;
}

.error {
  color: #c53030;
  font-size: 0.85rem;
  margin: 0;
}

.msg {
  margin: 0;
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.9rem;
}

.msg.warn {
  background: #fffbeb;
  color: #975a16;
  border: 1px solid #f6e05e;
}

.msg.ok {
  background: #f0fff4;
  color: #2f855a;
  border: 1px solid #9ae6b4;
}
</style>