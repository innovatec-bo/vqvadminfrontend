<!-- eslint-disable camelcase -->
<script setup>
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  opportunity: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible', 'onRefreshSale'])

const { changeStatusByOpportunity } = useOpportunity()

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

// const projectData = ref({
//   delivery_date: '',
// })
const projectData = ref(structuredClone(toRaw(props.opportunity)))

watch(props, () => {
  projectData.value = structuredClone(toRaw(props.opportunity))
})

// watch(() => props.isDialogVisible, newVal => {
//   console.log("Modal visibility changed:", newVal)
// })


const onFormSubmit = async () => {
  emit('update:isDialogVisible', false)
  try {
    await changeStatusByOpportunity(props.opportunity.id, 5)
    emit('onRefreshSale') 
  
  } catch (err) {
    console.error('Error updating customer:', err)
  }
}

const resetForm = () => {
  emit('update:isDialogVisible', false)

  // projectData.value = structuredClone(toRaw(props.projectData))
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
      <VCardItem>
        <VCardTitle class="text-h3 text-center">
          Confirmar Fecha
        </VCardTitle>
      </VCardItem>
      <VCardText>
        <!-- 👉 Form -->
     
        <VRow>
          <VCardText>
            <VRow>
              <VCol cols="12">
                <AppDateTimePicker
                  v-model="projectData.sales.delivery_date"
                  label="Confirmar la fecha y hora de Entrega"
                  :rules="[requiredValidator]"
                  @change="() => console.log('Date changed')"
                />
              </VCol>
            </VRow>
          </VCardText>
          <!-- Botones -->
          <VCol
            cols="12"
            class="d-flex flex-wrap justify-center gap-4"
          >
            <VBtn @click="onFormSubmit">
              Pasar a Entrega
            </VBtn>
            <VBtn
              color="secondary"
              variant="tonal"
              @click="resetForm"
            >
              Cancel
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

