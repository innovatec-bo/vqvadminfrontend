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

const projectData = ref(structuredClone(toRaw(props.opportunity)))

watch(props, () => {
  projectData.value = structuredClone(toRaw(props.opportunity))
})

const onFormSubmit = async () => {
  emit('update:isDialogVisible', false)
  try {
    await changeStatusByOpportunity(props.opportunity.id, 5, {
      delivery_date: projectData.value.sales.delivery_date,
    })
  } catch (err) {
    console.error('Error updating customer:', err)
  }
}

const resetForm = () => {
  emit('update:isDialogVisible', false)
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
              <VTextField
                v-model="projectData.sales.delivery_date"
                label="Fecha de Entrega"
                type="date"
                :rules="[requiredValidator]"
              />
            </VCol>
          </VRow>
        </VCardText>
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
      </VCardText>
    </VCard>
  </VDialog>
</template>

