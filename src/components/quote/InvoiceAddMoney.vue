<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    default: 0,
  },
  differs: {
    type: Array,
    default: () => [],
  },
})

const payments = ref(props.differs)

// Función para agregar un nuevo pago
const addPayment = () => {
  payments.value.push({  amount: '', date: '' })

  // eslint-disable-next-line vue/no-mutating-props
  props.differs = payments.value
}

// Función para eliminar un pago
const removePayment = index => {
  payments.value.splice(index, 1)
}

// Cálculo de la suma actual de los pagos
const currentTotal = computed(() => {
  return payments.value.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount) || 0
    
    return sum + amount
  }, 0)
})

// Verificar que la suma de los pagos no exceda el monto total (amount) establecido
watch(currentTotal, newTotal => {
  if (newTotal > props.amount) {
    alert('El total de los pagos no puede exceder el monto total.')
  }
})
</script>

<template>
  <VCard
    flat
    border
    class="d-flex flex-column pa-5"
  >
    <h3 class="mb-2">
      {{ props.title }}
    </h3>
    <div
      v-for="(payment, index) in payments"
      :key="payment.id"
      class="d-flex align-center mb-4"
    >
      <!-- Input para la cantidad -->
      <VTextField
        v-model="payment.amount"
        label="Monto"
        type="number"
        class="mr-4"
        outlined
      />

      <!-- Input para la fecha -->
      <VTextField
        v-model="payment.date"
        label="Fecha de Pago"
        type="date"
        class="mr-3"
        outlined
      />

      <!-- Botón para eliminar el pago -->
      <VBtn
        color="error"
        @click="removePayment(index)"
      >
        <VIcon icon="tabler-square-x" />
      </VBtn>
    </div>

    <!-- Mostrar la suma actual de los pagos -->
    <div class="mt-4">
      <strong>Suma Actual de Pagos: </strong> ${{ currentTotal.toFixed(2) }}
    </div>

    <!-- Botón para agregar más pagos -->
    <VBtn
      color="secondary"
      class="mt-4"
      @click="addPayment"
    >
      Agregar Pago
    </VBtn>
  </VCard>
</template>
