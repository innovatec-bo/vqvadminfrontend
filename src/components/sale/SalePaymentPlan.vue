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
  salesPayment: {
    type: Array,
    required: true,
  }, 
})

const emit = defineEmits(['update:isDialogVisible', 'updateDeliveryDate'])
const { updatePaymentPlans } = usePaymentPlans()

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const opportunityData = ref(structuredClone(toRaw(props.opportunity)))

watch(props, () => {
  opportunityData.value =structuredClone(toRaw(props.opportunity))
  console.log('Sales Payment:', props.salesPayment)
})

const payments = ref([])

const resetForm = () => {
  emit('update:isDialogVisible', false)
  payments.value = []
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
        Confirmar Fecha
      </VCardTitle>
      <VCardText>
        <VCardText>
          <VRow>
            <VCol
              cols="12"
              style="padding-block: 0;padding-inline: 8px;"
            >
              <span> Monto a Pagar : {{ opportunityData }}</span>
            </VCol>
          </VRow>
        </VCardText>
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

