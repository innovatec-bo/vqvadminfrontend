<!-- eslint-disable camelcase -->
<script setup>
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProcess } from '@/composables/Process/useProcess'
import { StagesOpportunity } from '@/enums/StagesOpportunity'
import EditCustomerDialog from '../customer/EditCustomerDialog.vue'

const props = defineProps({
  opportunity: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['updateStageId', 'update:newProperty'])
const { checkProcessForOpportunity } = useProcess()

const { changeStatusByOpportunity, loadingOpportunity } = useOpportunity()
const opencustomerDialog = ref(false)

const opencustomer = () =>{
  opencustomerDialog.value = true
}

const updateNewProperty = () => {
  console.log('Se escucho el evento en EditProspectOpportunity')
  emit('update:newProperty')
}

const generatePreSale = async opportunityId => {
  await changeStatusByOpportunity(opportunityId, StagesOpportunity.PRESALE.value, {})

  emit('updateStageId', opportunityId)
}

const markProcedureAsDone = async procedure => {
  console.log(`Procedimiento ${procedure.id} marcado como: ${procedure.pivot.is_check ? 'realizado' : 'no realizado'}`)

  await checkProcessForOpportunity(props.opportunity.id, procedure.id, {
    is_check: !procedure.pivot.is_check, 
  })

  procedure.pivot.is_check = !procedure.pivot.is_check

  emit('updateStageId', props.opportunity.id)
}
</script>

<template>
  <!-- Sección de Perfil -->
  <div class="d-flex align-bottom flex-sm-row flex-column  ">
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
          <div>
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
          @click="markProcedureAsDone(procedure)" 
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
              <!-- Todo: ponerle rutas  para ver la cotizacion por id -->
              <RouterLink :to="{ name: 'quote-id', params: { id: item.id } }">
                <IconBtn>
                  <VIcon icon="tabler-eye" />
                </IconBtn>
              </RouterLink>
            </td>
          </tr>
        </tbody>
      </VTable>
    </div>
    <div v-else>
      <span>No hay cotizaciones disponibles.</span>
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
      :disabled="loadingOpportunity"
      :loading="loadingOpportunity"
      @click="generatePreSale(props.opportunity.id)"
    >
      Siguiente Etapa
    </VBtn>
  </VCardText>
  <EditCustomerDialog
    v-model:is-dialog-visible="opencustomerDialog"
    :opportunity-kanban="props.opportunity"
    @update:new-property="updateNewProperty" 
  />
</template>

