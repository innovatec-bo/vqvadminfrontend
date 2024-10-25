<!-- eslint-disable camelcase -->
<script setup>
import { useProcess } from '@/composables/Process/useProcess'
import { useQuote } from '@/composables/Quote/useQuote'
import EditCustomerDialog from '../customer/EditCustomerDialog.vue'
import PreSaleForm from '../sale/PreSaleForm.vue'

const props = defineProps({
  opportunity: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['updateStageId'])
const { checkProcessForOpportunity } = useProcess()
const { changeStatusQuotes } = useQuote()
const opencustomerDialog = ref(false)
const generateSaleDialog = ref(false)

const opencustomer = () =>{
  opencustomerDialog.value = true
}

const openSaleForm = () => {
  generateSaleDialog.value = true
}

const registerSale = async opportunityId => {
  emit('updateStageId', opportunityId)
}

const markProcedureAsDone = async (procedureId, isChecked) => {
  // Aquí puedes implementar la lógica para actualizar el estado del procedimiento.
  console.log(`Procedimiento ${procedureId} marcado como: ${isChecked ? 'realizado' : 'no realizado'}`)
  await checkProcessForOpportunity(props.opportunity.id, procedureId, {
    is_check: !isChecked,
  })
  emit('updateStageId', props.opportunity.id)
}

const statusQuote = async (quoteId, statusquote) => {
  const newStatus = statusquote === 'APPROVED' ? 'NOT_APPROVED' : 'APPROVED'

  console.log(`Procedimiento ${quoteId} marcado como: ${statusquote}`)
  await  changeStatusQuotes(quoteId, {
    status: newStatus,
  })
  emit('updateStageId', props.opportunity.id)
}
</script>

<template>
  <!-- Sección de Perfil -->
  <div class="d-flex align-bottom flex-sm-row flex-column">
    <div class="user-profile-info">
      <span style="font-size: 14px; font-weight: 500; ">
        Perfil
      </span> 
     
      <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
        <div class="d-flex align-center gap-x-3">
          <span class="text-4xl font-weight-medium">
            {{ avatarText(props.opportunity.customer.name) }}
          </span>
          <div
            class="d-flex flex-column py-2"
            style="font-size: 14px;"
          >
            <RouterLink
              :to="{ name: 'apps-ecommerce-customer-details-id', params: { id: 1 } }"
              class="font-weight-base"
            >
              {{ props.opportunity.customer.name }}
            </RouterLink>
            <span class="text-sm text-disabled">{{ props.opportunity.customer.phone }}</span>
          </div>
          <VBtn
            color="secondary"
            variant="tonal"
            size="small"

            @click="opencustomer"
          >
            Editar Perfil
          </VBtn>
        </div>
      </div>
    </div>
  </div>
  <!-- procesos  -->
  <div>
    <span style="font-size: 14px; font-weight: 500; ">
      Procesos
    </span> 
     
    <div
      v-if="props.opportunity.procedure && props.opportunity.procedure.length > 0"
      class="d-flex flex-wrap gap-2 my-5"
    >
      <div
        v-for="procedure in props.opportunity.procedure"
        :key="procedure.id"
      >
        <VChip
          :color="procedure.pivot.is_check ? 'primary' : 'secondary'"
          variant="outlined"
          class="my-1"
          style="cursor: pointer;"
          fill-dot
          @click="markProcedureAsDone(procedure.id, procedure.pivot.is_check)" 
        >
          <VIcon
            v-if="procedure.pivot.is_check"
            icon="tabler-check"
            class="mr-2"
          />
          {{ procedure.title }}
        </VChip>
      </div>
    </div>
    <div v-else>
      <span>No hay procedimientos disponibles.</span>
    </div>
  </div>

  <!-- Cotizacion  -->
  <div>
    <span style="font-size: 14px; font-weight: 500; ">
      Cotizaciones
    </span> 
    <div
      v-if="props.opportunity.quotes && props.opportunity.quotes.length > 0"
      class="d-flex flex-wrap gap-2 my-5"
    >
      <VTable
        density="compact"
        class="text-no-wrap "
        style="font-size: 12px;"
      >
        <thead>
          <tr>
            <th>
              Nombre
            </th>
            <th>
              Propiedad
            </th>
            <th>
              Fecha
            </th>
            <!--
              <th>
              Monto
              </th> 
            -->
            <th />
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="item in props.opportunity.quotes"
            :key="item.id"
          >
            <td>
              {{ item.social_reason }}
            </td>
            <td>
              {{ item.properties[0].title }}
            </td>
            <td>
              {{ new Date(item.created_at).toLocaleDateString() }}
            </td>
            <!--
              <td>
              {{ item.amount }}
              </td> 
            -->
            <td>
              <!-- Todo: aprobar  -->
              <VRow>
                <VCheckbox
                  v-model="item.status"
                  true-value="APPROVED"
                  false-value="NOT_APPROVED"
                  @click="statusQuote(item.id, item.status)" 
                >
                  <VTooltip
                    activator="parent"
                    location="top"
                  >
                    Aprobar Cotizacion
                  </VTooltip>
                </VCheckbox>

                <VIcon
                  icon="tabler-eye"
                  class="my-auto"
                />
              </VRow>
            </td>
          </tr>
        </tbody>
      </VTable>
    </div>
    
    <div v-else>
      <span>No hay procedimientos disponibles.</span>
    </div>
  </div>
  <!-- Botón Generar Cotización -->
  <VCardText class="d-flex justify-center mt-4">
    <RouterLink
      :to="{ name: 'quote-add-quote' }"
      class="text-white"
    >
      <VBtn
        color="primary"
        class="mx-1" 
        variant="tonal"
        size="small"
      >
        Generar Cotización
      </VBtn>
    </RouterLink>
    <VBtn
      color="primary"
      class="mx-auto"
      size="small"
      @click="openSaleForm"
    >
      Generar Venta
    </VBtn>
  </VCardText>


  <!-- Cards -->
  <EditCustomerDialog
    v-model:is-dialog-visible="opencustomerDialog"
    :opportunity-kanban="props.opportunity"
  />
  <PreSaleForm
    v-model:is-dialog-visible="generateSaleDialog"
    :opportunity="props.opportunity"
    stage="PRESALE"
    @register-sale="registerSale"
  />
</template>

