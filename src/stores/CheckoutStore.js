import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const PAYMENT_STATUS = {
	IDLE: 'idle',
	PROCESSING: 'processing',
	SUCCESS: 'success',
	FAILED: 'failed'
}

function createAttemptId() {
	if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
		return crypto.randomUUID()
	}

	return `attempt-${Date.now()}-${Math.floor(Math.random() * 100000)}`
}

export const useCheckoutStore = defineStore('checkout', () => {
	const cartSnapshot = ref([])
	const step = ref(1)
	const paymentStatus = ref(PAYMENT_STATUS.IDLE)
	const paymentAttemptId = ref(null)
	const paymentError = ref('')

	// Cache simple de resultados para evitar procesar dos veces el mismo intento.
	const paymentResultsByAttempt = ref({})

	const hasItems = computed(() => cartSnapshot.value.length > 0)

	const totalCheckout = computed(() =>
		cartSnapshot.value.reduce((acc, item) => acc + item.price * item.cantidad, 0)
	)

	function hydrateFromCart(items) {
		const safeItems = Array.isArray(items) ? items : []

		cartSnapshot.value = safeItems.map(item => ({ ...item }))
		step.value = 1
		paymentStatus.value = PAYMENT_STATUS.IDLE
		paymentAttemptId.value = null
		paymentError.value = ''
	}

	function nextStep() {
		if (step.value < 3) {
			step.value += 1
		}
	}

	function prevStep() {
		if (step.value > 1) {
			step.value -= 1
		}
	}

	function startPaymentAttempt() {
		if (paymentStatus.value === PAYMENT_STATUS.PROCESSING && paymentAttemptId.value) {
			return paymentAttemptId.value
		}

		const attemptId = createAttemptId()
		paymentAttemptId.value = attemptId
		paymentStatus.value = PAYMENT_STATUS.PROCESSING
		paymentError.value = ''

		return attemptId
	}

	function isAttemptProcessed(attemptId) {
		return Boolean(paymentResultsByAttempt.value[attemptId])
	}

	function getAttemptResult(attemptId) {
		return paymentResultsByAttempt.value[attemptId] || null
	}

	function finishPaymentSuccess(attemptId) {
		paymentStatus.value = PAYMENT_STATUS.SUCCESS
		paymentError.value = ''

		paymentResultsByAttempt.value[attemptId] = {
			status: PAYMENT_STATUS.SUCCESS,
			timestamp: Date.now()
		}
	}

	function finishPaymentFailure(attemptId, message = 'Pago rechazado') {
		paymentStatus.value = PAYMENT_STATUS.FAILED
		paymentError.value = message

		paymentResultsByAttempt.value[attemptId] = {
			status: PAYMENT_STATUS.FAILED,
			error: message,
			timestamp: Date.now()
		}
	}

	function resetCheckout() {
		cartSnapshot.value = []
		step.value = 1
		paymentStatus.value = PAYMENT_STATUS.IDLE
		paymentAttemptId.value = null
		paymentError.value = ''
		paymentResultsByAttempt.value = {}
	}

	return {
		PAYMENT_STATUS,
		cartSnapshot,
		step,
		paymentStatus,
		paymentAttemptId,
		paymentError,
		hasItems,
		totalCheckout,
		hydrateFromCart,
		nextStep,
		prevStep,
		startPaymentAttempt,
		isAttemptProcessed,
		getAttemptResult,
		finishPaymentSuccess,
		finishPaymentFailure,
		resetCheckout
	}
})
