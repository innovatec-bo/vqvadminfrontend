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

const addPayment = () => {
  payments.value.push({  amount: '', date: '' })

  // eslint-disable-next-line vue/no-mutating-props
  props.differs = payments.value
}

const removePayment = index => {
  payments.value.splice(index, 1)
  
  // eslint-disable-next-line vue/no-mutating-props
  props.differs = payments.value

}

// Cálculo de la suma actual de los pagos
const currentTotal = computed(() => {
  return payments.value.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount) || 0
    
    return sum + amount
  }, 0)
})

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
      {{ props.title }} :   {{ props.amount }}
    </h3>
    <div
      v-for="(payment, index) in payments"
      :key="payment.id"
      class="d-flex align-center "
    >
      <!-- Input para la cantidad -->
      <VCol cols="5">
        <VTextField
          v-model="payment.date"
          label="Fecha"
          type="date"
          outlined
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol cols="5">
        <VTextField
          v-model="payment.amount"
          :rules="[requiredValidator]"
          :error-messages="!payment.amount ? '*campo obligatorio' : ''"
          label="Monto *"
          type="number"
          outlined
          dense
        />
      </VCol>

      <VBtn
        color="error"
        outlined
        class="mt-0"
        @click="removePayment(index)"
      >
        <VIcon icon="tabler-square-x" />
      </VBtn>
    </div>

    <!-- Mostrar la suma actual de los pagos -->
    <div class="mt-4">
      <strong>Suma Actual de Pagos: </strong> ${{ currentTotal.toFixed(2) }}
    </div>
    <!-- Mostrar el monto restante -->
    <div class="mt-4">
      <strong>Monto Restante:</strong> ${{ (props.amount - currentTotal).toFixed(2) }}
    </div>
    <!-- Botón para agregar más pagos -->
    <VBtn
      color="secondary"
      class="mt-4"
      @click="addPayment"
    >
      Diferir {{ props.title }}
    </VBtn>
  </VCard>
</template>
