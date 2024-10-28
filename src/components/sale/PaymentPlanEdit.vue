<!-- eslint-disable camelcase -->
<script setup>
import { usePaymentPlans } from '@/composables/Sales/usePaymentPlans'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  opportunity: {
    type: Object,
    required: true,
  },
  payment: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'updateDeliveryDate'])
const { updatePaymentPlans } = usePaymentPlans()

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const projectData = ref(structuredClone(toRaw(props.payment)))
const opportunityData = ref(structuredClone(toRaw(props.opportunity)))

watch(props, () => {
  projectData.value = structuredClone(toRaw(props.payment))
  opportunityData.value =structuredClone(toRaw(props.opportunity))
})

const payments = ref([])

const addPayment = () => {
  payments.value.push({  amount: '', date: '', type: projectData.value.type })
}

const removePayment = index => {
  payments.value.splice(index, 1)
}

const currentTotal = computed(() => {
  return payments.value.reduce((sum, payment) => {
    const amount = parseFloat(payment.amount) || 0
    
    return sum + amount
  }, 0)
})


const onFormSubmit = async () => {
  try {
    await updatePaymentPlans(projectData.value.id, {
      date: projectData.value.date,
      differData: payments.value,
    })

  } catch (err) {
    console.error('Error updating customer:', err)
  }finally{
    emit('updateDeliveryDate', opportunityData.value.id)
    emit('update:isDialogVisible', false)
    payments.value = []

  }
}

const resetForm = () => {
  emit('update:isDialogVisible', false)
  payments.value = []
  errorMessage.value = '' // Limpiar el mensaje de error
}
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="800"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard class="pa-sm-8 pa-5">
      <!-- 👉 Title -->
      <VCardTitle class="text-h3 text-center">
        Editar Pago
      </VCardTitle>
      <VCardText>
        <VRow class="mx-5">
          <VCol cols="6">
            <h3>
              Monto a Pagar : $ {{ projectData.amount }}
            </h3>
          </VCol>
          <VCol cols="6">
            <VTextField
              v-model="projectData.date"
              label="Cambiar Fecha"
              type="date"
              :rules="[requiredValidator]"
            />
          </VCol>
        </VRow>
        
        <VCard
          flat
          class="d-flex flex-column pa-5 px-5"
        >
          <!-- Inputs para los pagos -->
          <div
            v-for="(payment, index) in payments"
            :key="payment.id"
            class="d-flex align-center my-4"
          >
            <!-- Input para la cantidad -->
            <VTextField
              v-model="payment.amount"
              label="Monto"
              type="number"
              class="mr-4"
              outlined
              :rules="[requiredValidator]"
            />

            <!-- Input para la fecha -->
            <VTextField
              v-model="payment.date"
              label="Fecha de Pago"
              type="date"
              class="mr-3"
              outlined
              :rules="[requiredValidator]"
            />

            <!-- Botón para eliminar el pago -->
            <VBtn
              color="error"
              @click="removePayment(index)"
            >
              <VIcon icon="tabler-square-x" />
            </VBtn>
          </div>
          
          <div v-if="payments.length > 0">
            <strong>Monto Restante:</strong> ${{ (projectData.amount - currentTotal).toFixed(2) }}
          </div> 
         
          <!-- Botón para agregar más pagos -->
          <VBtn
            color="primary"
            variant="tonal"
            class="mt-4"
            size="small"
            @click="addPayment"
          >
            Diferir Pago
          </VBtn>
        </VCard>
        <VCol
          cols="12"
          class="d-flex flex-wrap justify-center gap-4"
        >
          <VBtn @click="onFormSubmit">
            Guardar
          </VBtn>
          <VBtn
            color="error"
            variant="tonal"
            @click="resetForm"
          >
            Cancel
          </VBtn>
        </VCol>
      </VCardText>
    </VCard>
  </VDialog>
</template>

