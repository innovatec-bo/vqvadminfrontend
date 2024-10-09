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

const { changeStatusByOpportunity } = useOpportunity()
const { checkProcessForOpportunity } = useProcess()

const changeStatus = async () => {
  try {
    await changeStatusByOpportunity(props.opportunity.id, 7, {})
  } catch (err) {
    console.error('Error updating customer:', err)
  }
}

onMounted(() => {
})

const markProcedureAsDone = (procedureId, isChecked) => {
  console.log(`Procedimiento ${procedureId} marcado como: ${isChecked ? 'realizado' : 'no realizado'}`)
  checkProcessForOpportunity(props.opportunity.id, procedureId, {
    // eslint-disable-next-line camelcase
    is_check: isChecked,
  })

}
</script>

<template>
  <!-- Propiedades -->
  <div>
    <VCard title="Propiedades">
      <VCardText>
        <div v-if="props.opportunity.sales.properties && props.opportunity.sales.properties.length > 0">
          <div
            v-for="properti in props.opportunity.sales.properties"
            :key="properti.id"
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
                {{ properti.project_title }} | {{ properti.title }} 
              </VListItemTitle>
              <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
                <span>$ {{ properti.pivot_price }}</span>
              </VListItemSubtitle>
            </VCol>
          </div>
        </div>
      </VCardText>
    </VCard>
  </div>
  <!-- procesos  -->
  <div>
    <VCard
      title="Procesos"
      class="mt-5"
    >
      <VCardText class="d-flex align-bottom  gap-x-5">
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
              class="mx-2"
              :value="!!procedure.pivot.is_check"
              @change="markProcedureAsDone(procedure.id, procedure.pivot.is_check)"
            />
          </div>
        </div>
        <div v-else>
          <span>No hay procedimientos disponibles.</span>
        </div>
      </VCardText>
    </VCard>
  </div>

  <!-- Botón Generar Cotización -->
  <VCardText class="d-flex justify-center mt-4">
    <VBtn
      color="primary"
      large
      @click="changeStatus"
    >
      Finalizar Oportunidad
    </VBtn>
  </VCardText>
</template>

