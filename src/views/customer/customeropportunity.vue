<script setup>
import { useProcess } from '@/composables/Process/useProcess'
import { formatCurrency } from '@/utils/currencyFormatter'

const props = defineProps({
  opportunities: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'refreshCustomer',
])

const { checkProcessForOpportunity } = useProcess()

const markProcedureAsDone = async (procedureId, opportunityId, isChecked) => {
  console.log(`Procedimiento ${procedureId} marcado como: ${isChecked ? 'realizado' : 'no realizado'}`)
  await checkProcessForOpportunity(opportunityId, procedureId, {
    // eslint-disable-next-line camelcase
    is_check: !isChecked,
  })
  emit('refreshCustomer') 
}

const getOpportunityLabel = (index, total) => {
  if (index === 0) return 'Última oportunidad'
  if (index === total - 1) return 'Primera oportunidad'
  
  return `${total - index}ª oportunidad`
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard
        v-for="(item, index) in props.opportunities"
        :key="item.id"
        class="mb-3"
      >
        <VCardText>
          <div class="d-flex justify-content-between ">
            <div style="flex-grow: 1;">
              <h2>
                {{ getOpportunityLabel(index, props.opportunities.length) }}
              </h2>
            </div>
            <div>
              <strong>
                Fecha: {{ item.start_date }}
              </strong>
            </div>
          </div>
          <div>
            <span>
              <strong>
                Estado: 
              </strong>
              {{ item.stage.title }}
            </span>
            <br>
            <strong>Propiedad de Interes: </strong>
            <span>
              {{ item.property.title }}  |   {{ formatCurrency( item.property.base_price ) }} |   {{ item.property.surface }} m2 
            </span>

            <div class="my-5">
              <h3 class="my-1">
                Procesos
              </h3>
              <div
                v-if="item.procedure && item.procedure.length > 0"
                class="d-flex flex-wrap gap-2 "
              >
                <div
                  v-for="procedure in item.procedure"
                  :key="procedure.id"
                >
                  <VChip
                    :color="procedure.pivot.is_check ? 'primary' : 'secondary'"
                    variant="outlined"
                    class="my-1"
                    style="cursor: pointer;"
                    fill-dot
                    @click="markProcedureAsDone(procedure.id, item.id , procedure.pivot.is_check)"
                  >
                    <VIcon
                      v-if="procedure.pivot.is_check"
                      icon="tabler-check"
                      class="mr-2"
                    />
                    {{ procedure.title }}
                  </VChip>
                  <VTooltip
                    activator="parent"
                    location="top"
                  >
                    {{ procedure.pivot.is_check? 'Deshacer Proceso': 'Confirmar Proceso' }}
                  </VTooltip>
                </div>
              </div>
              <div v-else>
                <span>No hay procedimientos disponibles.</span>
              </div>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
