<!-- eslint-disable camelcase -->
<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useProperty } from '@/composables/Realty/useProperty'
import { onMounted, ref } from 'vue'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  customerObject,
})

const emit = defineEmits('update:isDialogVisible')
const { propertiesAvailbles, properties } = useProperty()

const opportunityDetails = ref({
  title: '',
  description: '',
})

watch(
  () => props.customerObject,
 
  { immediate: true }, // Ejecuta el watch al inicializar
)

// const submitOpportunity = async () => {
//   const data = {
//     customer_id: customerId,
//     ...opportunityDetails.value,
//   }

//   try {
//     emit('update:isDialogVisible', false)
//   } catch (error) {
//     console.error('Error al agregar la oportunidad:', error)
//   }
// }

onMounted(async () => {
  await propertiesAvailbles()
})
</script>

<template>
  <VDialog
    max-width="600"
    :model-value="props.isDialogVisible"
    
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />
    <VCard title="Agregar Oportunidad">
      <VCardText>
        <VRow>
          <VCol
            cols="12"
            sm="6"
          >
            <AppSelect
              label="Propiedad de Interes"
              placeholder="Selecciona una Propiedad"
              :items="properties"
              outlined
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
          >
            <AppSelect
              label="Asesor Encargado"
              placeholder="Seleccine un Asesor"
              outlined
            />
          </VCol>
          <VCol cols="12">
            <VTextarea
              v-model="opportunityDetails.description"
              label="Descripción"
              placeholder="Agrega una descripción"
              rows="4"
              outlined
            />
          </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn color="primary">
          Guardar
        </VBtn>
        <VBtn
          color="error"
          @click="$emit('update:isDialogVisible', false)"
        >
          Cancelar
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
