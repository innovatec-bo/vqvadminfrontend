<!-- eslint-disable camelcase -->
<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useCustomer } from '@/composables/Customer/useCustomer'
import { useProperty } from '@/composables/Realty/useProperty'
import { onMounted, ref } from 'vue'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDialogVisible',
  'submit',
])

// Datos para el formulario
const selectedCustomer = ref(null)

const opportunityDetails = ref({
  title: '',
  description: '',
})

const { propertiesAvailbles, properties } = useProperty()
const { allCustomerPaginate, customers } = useCustomer()

const submitOpportunity = async () => {
  if (!selectedCustomer.value || !opportunityDetails.value.title) {
    // Validación simple
    alert('Por favor selecciona un cliente y llena todos los campos requeridos.')
    
    return
  }

  const data = {
    customer_id: selectedCustomer.value,
    ...opportunityDetails.value,
  }

  try {
    //await addOpportunity(data)
    emit('submit', data)
    emit('update:isDialogVisible', false)
  } catch (error) {
    console.error('Error al agregar la oportunidad:', error)
  }
}

// Cargar clientes
onMounted(async () => {
  await allCustomerPaginate({
    page: 1,
    itemsPerPage: 1000,
  })
  await propertiesAvailbles()
})
</script>

<template>
  <VDialog
    max-width="600"
    :model-value="props.isDialogVisible"
    persistent
    :close-on-esc="false"
    @update:model-value="(val) => $emit('update:isDialogVisible', val)"
  >
    <!-- Botón para cerrar el diálogo -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

    <VCard title="Agregar Oportunidad">
      <VCardText>
        <VRow>
          <VCol cols="12">
            <AppAutocomplete
              v-model="selectedCustomer"
              label="Cliente"
              placeholder="Selecciona un Cliente"
              :items="customers.map(customer => ({ title: customer.name, value: customer.id }))"
              outlined
            />
          </VCol>

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
        <VBtn
          color="secondary"
          @click="$emit('update:isDialogVisible', false)"
        >
          Cancelar
        </VBtn>
        <VBtn
          color="primary"
          @click="submitOpportunity"
        >
          Guardar
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
