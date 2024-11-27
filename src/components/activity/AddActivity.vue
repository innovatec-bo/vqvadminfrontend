<!-- eslint-disable camelcase -->
<script setup>
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { ref, watch } from 'vue'

// Props y eventos
const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
  opportunityKanban: { type: Object, required: true },
  typeActivities: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(['update:isDialogVisible', 'formCancelled'])

// Actividades
const { registerActivity, loadingActivity } = useActivity()
const { generateProspect } = useOpportunity()

// Estado para nueva actividad
const newActivity = ref({
  title: null,
  description: null,
  type_activity_id: null,
  scheduled_at: null,
  opportunity_id: null,
  assigned_to: null,
})

// Función para cerrar el diálogo
const dialogVisibleUpdate = () => {
  emit('formCancelled')
  emit('update:isDialogVisible', false)
}

// Agregar una nueva actividad
const addActivity = async () => {
  await registerActivity(newActivity.value)
  console.log('opportunityKanban', props.opportunityKanban.stage)
  if(props.opportunityKanban.stage === 'LEAD'){ //ES LEAD ?
    await generateProspect(props.opportunityKanban.id, {})
  } 
  newActivity.value = {
    title: null,
    description: null,
    type_activity_id: null,
    scheduled_at: null,
    opportunity_id: null,
    assigned_to: null,
  }
  emit('update:isDialogVisible', false)
}

// Vigilar el estado del diálogo
watch(() => props.isDialogVisible, async newValue => {
  if (newValue === true) {
    newActivity.value.opportunity_id = props.opportunityKanban?.id ?? null
    newActivity.value.assigned_to = props.opportunityKanban?.user_id ?? null
    console.log(props.opportunityKanban)
  }
})
</script>

<template>
  <VDialog
    max-width="1000"
    :model-value="props.isDialogVisible"
    persistent
    :close-on-esc="false"
    @update:model-value="dialogVisibleUpdate"
  >
    <DialogCloseBtn @click="dialogVisibleUpdate" />

    <VCard class="pa-sm-8">
      <VCardItem>
        <VCardTitle class="text-h3 font-weight-medium mb-3">
          Agregar Actividad
        </VCardTitle>
        <VCardText>
          <VForm @submit.prevent="addActivity">
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="newActivity.title"
                  label="Titulo de la Actividad"
                  placeholder="Escribe un Titulo"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppSelect
                  v-model="newActivity.type_activity_id"
                  label="Seleccione una Actividad"
                  placeholder="Seleccione una Actividad"
                  :items="props.typeActivities.map(activity => ({
                    title: activity.name,
                    value: activity.id,
                  }))"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppDateTimePicker
                  v-model="newActivity.scheduled_at"
                  label="Fecha"
                  placeholder="Seleccione una Fecha"
                  :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                />
              </VCol>
              <VCol cols="12">
                <AppTextarea
                  v-model="newActivity.description"
                  label="Detalla tu Actividad"
                  placeholder="Describe la actividad"
                />
              </VCol>
              <VCol
                cols="12"
                class="text-center"
              >
                <VBtn
                  type="submit"
                  class="me-3"
                  :disabled="loadingActivity"
                  :loading="loadingActivity"
                >
                  Agregar Actividad
                </VBtn>
                <VBtn
                  color="secondary"
                  variant="tonal"
                  @click="dialogVisibleUpdate"
                >
                  Cancelar
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCardItem>
    </VCard>
  </VDialog>
</template>
