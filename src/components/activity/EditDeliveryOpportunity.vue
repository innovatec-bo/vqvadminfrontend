<script setup>
import poraIcon from '@/assets/icons/poraIcon.png'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProcess } from '@/composables/Process/useProcess'

const props = defineProps({
  opportunity: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['updateStageId', 'complet'])
const { changeStatusByOpportunity } = useOpportunity()
const { checkProcessForOpportunity } = useProcess()

const changeStatus = async () => {
  try {
    await changeStatusByOpportunity(props.opportunity.id, 7, {})
    emit('complet')
  } catch (err) {
    console.error('Error updating customer:', err)
  }
}

const markProcedureAsDone = async (procedureId, isChecked) => {
  console.log(`Procedimiento ${procedureId} marcado como: ${isChecked ? 'realizado' : 'no realizado'}`)
  await checkProcessForOpportunity(props.opportunity.id, procedureId, {
    // eslint-disable-next-line camelcase
    is_check: !isChecked,
  })
  emit('updateStageId', props.opportunity.id)
}
</script>

<template>
  <!-- Propiedades -->
  <div class="my-5">
    <span style="font-size: 14px; font-weight: 500;">
      Propiedades
    </span> 
    <div v-if="props.opportunity.sales.length > 0">
      <div
        v-for="sale in props.opportunity.sales"
        :key="sale.id"
      >
        <div
          v-for="property in sale.properties"
          :key="property.id"
          class="d-flex align-center justify-between"
        >
          <VAvatar
            size="50"
            rounded
          >
            <img
              :src="poraIcon"
              alt="Logo pora"
              style="border-radius: 30%;"
            >
          </VAvatar>
          <VCol
            cols="12"
            md="7"
          >
            <VListItemTitle class="font-weight-medium">
              {{ property.project_title }} | {{ property.title }}
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
              <span> {{ formatCurrency(property.pivot_price ) }} </span>
            </VListItemSubtitle>
          </VCol>
        </div>
      </div>
    </div>
  </div>
  <!-- procesos  -->
  <div class="my-5">
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
 
  <!-- Botón Generar Cotización -->
  <VCardText class="d-flex justify-center mt-4">
    <VBtn
      color="primary"
      size="small"
      @click="changeStatus"
    >
      Finalizar Oportunidad
    </VBtn>
  </VCardText>
</template>

