<!-- eslint-disable camelcase -->
<script setup>
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProperty } from '@/composables/Realty/useProperty'
import { StagesOpportunity } from '@/enums/StagesOpportunity'
import { onMounted } from 'vue'
import EditCustomerDialog from '../customer/EditCustomerDialog.vue'
import PreSaleForm from '../sale/PreSaleForm.vue'


const props = defineProps({
  opportunity: {
    type: Object,
    required: true,
  },
})


const { changeStatusByOpportunity, loadingOpportunity } = useOpportunity()
const opencustomerDialog = ref(false)

const generateSaleDialog = ref(false)

const opencustomer = () =>{
  opencustomerDialog.value = true
}

const openSaleForm = () => {
  generateSaleDialog.value = true
}

const generatePreSale = async opportunityId => {
  changeStatusByOpportunity(opportunityId, StagesOpportunity.PRESALE.value)
}

const markProcedureAsDone = (procedureId, isChecked) => {
  // Aquí puedes implementar la lógica para actualizar el estado del procedimiento.
  console.log(`Procedimiento ${procedureId} marcado como: ${isChecked ? 'realizado' : 'no realizado'}`)
}
</script>

<template>
  <!-- Sección de Perfil -->
  <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
    <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
      <h4 class="mb-4">
        Perfil
      </h4>
      <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
        <div class="d-flex align-center gap-x-3">
          <span class="text-5xl font-weight-medium">
            {{ avatarText(props.opportunity.customer.name) }}
          </span>
          <div class="d-flex flex-column">
            <RouterLink
              :to="{ name: 'apps-ecommerce-customer-details-id', params: { id: 1 } }"
              class="font-weight-medium"
            >
              {{ props.opportunity.customer.name }}
            </RouterLink>
            <span class="text-sm text-disabled">{{ props.opportunity.customer.phone }}</span>
          </div>
        </div>

        <VBtn
          color="secondary"
          @click="opencustomer"
        >
          Editar Informacion
        </VBtn>
      </div>
    </div>
  </VCardText>
  <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
    <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
      <h4 class="mb-4">
        Procedimientos
      </h4>
      <div v-if="props.opportunity.procedure && props.opportunity.procedure.length > 0">
        <div
          v-for="procedure in props.opportunity.procedure"
          :key="procedure.id"
          class="d-flex align-center justify-between"
        >
          <VCheckbox
            v-model="procedure.pivot.is_check"
            :label="procedure.title"
            :true-value="1"
            :false-value="0"
            @change="markProcedureAsDone(procedure.id, procedure.pivot.is_check)"
          />
        </div>
      </div>
      <div v-else>
        <span>No hay procedimientos disponibles.</span>
      </div>
    </div>
  </VCardText>


  <!-- Botón Generar Cotización -->
  <VCardText class="d-flex justify-center mt-4">
    <VBtn
      color="primary"
      large
      class="mx-1" 
      @click="generateQuote"
    >
      Agregar Cotizacion
    </VBtn>
    <VBtn
      color="primary"
      class="mx-auto"
      @click="openSaleForm"
    >
      Generar Venta
    </VBtn>
  </VCardText>
  <EditCustomerDialog
    v-model:is-dialog-visible="opencustomerDialog"
    :opportunity-kanban="props.opportunity"
  />
  <PreSaleForm
    v-model:is-dialog-visible="generateSaleDialog"
    :opportunity="props.opportunity"
  />
</template>

