<script setup>
import { computed, ref, watch } from 'vue'

// Definir props para recibir información desde el componente padre
const props = defineProps({
  title: {
    type: String, // Puede ser "Cuota Inicial" o "Saldo Restante"
    default: '',
  },
  amount: {
    type: Number, // El total a diferir
    default: 0,
  },
  differs: {
    type: Array, // Array para almacenar las cuotas o pagos
    default: () => [],
  },
})

// Inicializar los pagos basados en la prop differs
const payments = ref([...props.differs])

// Función para agregar un nuevo pago
const addPayment = () => {
  payments.value.push({ id: payments.value.length + 1, amount: '', date: '' })
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
    <!-- Título dinámico (Cuota Inicial o Saldo Restante) -->
    <h3>{{ props.title }}</h3>

    <!-- Mostrar el monto total que se diferirá -->
    <VTextField
      v-model="props.amount"
      label="Monto Total a Diferir"
      type="number"
      class="mb-4"
    />

    <!-- Inputs para los pagos -->
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
