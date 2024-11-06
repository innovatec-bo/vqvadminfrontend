<!-- eslint-disable camelcase -->
<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import EditDeliveryOpportunity from '@/components/activity/EditDeliveryOpportunity.vue'
import EditPreSaleOpportunity from '@/components/activity/EditPreSaleOpportunity.vue'
import EditProspectOpportunity from '@/components/activity/EditProspectOpportunity.vue'
import EditSaleOpportunity from '@/components/activity/EditSaleOpportunity.vue'
import SellerReport from '@/components/report/SellerReport.vue'
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { watch } from 'vue'
import CustomerHistory from '../Bitacora/CustomerHistory.vue'

const props = defineProps({
  activitiesData: {
    type: Object,
    required: true,
    default: () => ({
      title: '',
      description: '',
      // eslint-disable-next-line camelcase
      schedule_at: '',
    }),
  },
  isDrawerOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits([
  'update:isDrawerOpen',
  'refreshActivities',
])

const historyDrawerVisible = ref(false)
const checkLastActivity = ref(false)
const columnRadio = ref('radio-1')

const newActivity = ref({
  title: '',
  description: '',
  type_activity_id: null,
  opportunity_id: null,
  assigned_to: null,
  scheduled_at: null,
  status: 'COMPLETED',
})

const { completedActivityAndRegister, getallTypeActivities, typeActivities, loadingActivity } = useActivity()
const { getOpportunitybyId, opportunity } = useOpportunity()
const activitiesData = ref(structuredClone(toRaw(props.activitiesData)))

const handleStageIdUpdate = opportunityId => {
  console.log('esta consultando de nuevo despues de cambiar etapa ')
  getOpportunitybyId(opportunityId)
}

watch(props, () => {
  activitiesData.value = structuredClone(toRaw(props.activitiesData))
  getOpportunitybyId(activitiesData.value.opportunity_id)
  allTypeActivity()
})

const allTypeActivity = async () => {
  await getallTypeActivities()
}

const onRefreshOpportunity = () => {
  getOpportunitybyId(activitiesData.value.opportunity_id)
}

const closeNavigationDrawer = () => {
  emit('update:isDrawerOpen', false)
  newActivity.value = {
    title: null,
    description: null,
    type_activity_id: null,
    scheduled_at: null,
    opportunity_id: null,
    assigned_to: null,
    status: 'COMPLETED',
  }
  emit('refreshActivities') 
}

const onSubmit = async() => {
  let action = ''
  if (columnRadio.value === 'radio-1') {
    action = 'COMPLETED'
  } else if (columnRadio.value === 'radio-2') {
    action = 'CANCELLED'
  }
  completedActivityAndRegister(activitiesData.value.id, {
    title: newActivity.value.title,
    description: newActivity.value.description,
    type_activity_id: newActivity.value.type_activity_id,
    scheduled_at: newActivity.value.scheduled_at,
    assigned_to: opportunity.value.user_id,
    property_id: opportunity.value.property_id,
    opportunity_id: opportunity.value.id,
    status: action,
  })
  
  closeNavigationDrawer()

  // emit('refreshActivities') 

}

const openHistory =  () => {
  historyDrawerVisible.value = true
}

const complet = async () =>{
  emit('update:isDrawerOpen', false) // Cerrar el drawer
  emit('refreshActivities') 
}

const activitySwitch  = state =>{
  return state === 'COMPLETED'
}

const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}

const updateNewProperty = () => {
  console.log('Se escucho el evento en AddActivity')
  emit('refreshActivities') 
}

const formatDate = dateString => {
  const date = new Date(dateString)

  const day = date.getDate() // Día del mes

  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]

  const month = months[date.getMonth()] // Mes en formato humano

  const hours = date.getHours().toString().padStart(2, '0') // Hora con dos dígitos
  const minutes = date.getMinutes().toString().padStart(2, '0') // Minutos con dos dígitos

  // Retorna la fecha en formato: 7 de marzo, 14:00
  return `${day} de ${month}, ${hours}:${minutes}`
}
</script>

<template>
  <!-- Row to hold two VCard components side by side -->
  <VRow class="d-flex justify-space-between">
    <!-- First VCard (Activities and Stage) -->
    <VCol cols="12">
      <!-- Adjust the column size based on your needs -->
      <VCard v-if="isDrawerOpen">               
        <VCardText>
          <VWindow class="mx-2 my-2">
            <VRow>
              <VCol
                cols="12"
                sm="5"
              >
                <VRow>
                  <VCol cols="12">
                    <span style="font-size: 18px; font-weight: 500;">
                      Actividad
                    </span>
                  </VCol>
                  <VCol cols="12">
                    <div class="mb-2">
                      <span style="font-size: 14px; font-weight: 500;">
                        {{ props.activitiesData.title }}  • {{ formatDate(props.activitiesData.scheduled_at) }}
                      </span>
                      <br>
                      <span style="font-size: 12px; font-weight: 500;">
                        {{ props.activitiesData.description }} 
                      </span>
                    </div>
                    <VRadioGroup
                      v-model="columnRadio"
                      style="font-size: 14px;"
                    
                      inline
                    >
                      <span class="my-1">
                        ¿Se realizó?
                      </span> 
                      <VRadio
                        label="Si"
                        value="radio-1"
                        density="compact"
                        class="mx-2"
                      />
                      <VRadio
                        label="No"
                        value="radio-2"
                        class="mx-2"

                        density="compact"
                      />
                    </VRadioGroup>
                    <VDivider class="mt-2" />
                  </VCol>
                  <VCol cols="12">
                    <AppTextField
                      v-model="newActivity.title"
                      label="Título de la actividad"
                      placeholder="..."
                    />
                  </VCol>
                  <VCol cols="12">
                    <AppSelect
                      v-model="newActivity.type_activity_id"
                      label="Tipo de actividad"
                      placeholder="Selecciona el tipo de actividad"
                      :items="typeActivities.map(activity => ({ title: activity.name, value: activity.id }))"
                    />
                  </VCol>
                  <VCol cols="12">
                    <AppDateTimePicker
                      v-model="newActivity.scheduled_at"
                      label="Seleccione la fecha y hora"
                      placeholder="Seleccione la fecha y hora"
                      :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                      :rules="[requiredValidator]"
                    />
                  </VCol>
                  <VCol cols="12">
                    <AppTextarea
                      v-model="newActivity.description"
                      label="Descripción"
                      rows="3"
                      :rules="[requiredValidator]"
                    />
                  </VCol>
               
                  <VCol>
                    <VBtn
                      color="primary"
                      class="mx-auto"
                      size="small"
                      :loading="loadingActivity"
                      :disabled="loadingActivity"
                      @click="onSubmit"
                    >
                      Crear Actividad
                    </VBtn>
                    <VBtn
                      color="primary"
                      class="mx-1" 
                      variant="tonal"
                      size="small"
                    >
                      Dar de Baja
                    </VBtn>
                  </VCol>
                </VRow>
              </VCol>
              <VCol
                cols="12"
                sm="7"
                style="align-items: center;"
              >
                <VRow class="mb-2">
                  <VCol cols="6">
                    <span style="font-size: 18px; font-weight: 500; ">
                      Etapa
                    </span>
                  </VCol>                
                  <VCol
                    cols="12"
                    md="6"
                    class="d-flex justify-end align-center"
                  >
                    <VChip
                      label
                      color="primary"
                    >
                      {{ opportunity.stage.title }}
                    </VChip>
                  </VCol>
                </VRow>
                <EditProspectOpportunity
                  v-if="opportunity.stage_id === 2"
                  :opportunity="opportunity"
                  @update-stage-id="handleStageIdUpdate"
                  @update:new-property="updateNewProperty" 
                />
                <EditPreSaleOpportunity
                  v-if="opportunity.stage_id === 3"
                  :opportunity="opportunity"
                  @update-stage-id="handleStageIdUpdate"
                  @update:new-property="updateNewProperty" 
                />
                <EditSaleOpportunity
                  v-if="opportunity.stage_id === 4"
                  :opportunity="opportunity"
                  @refresh-activities="onRefreshOpportunity"
                  @update-stage-id="handleStageIdUpdate"
                />
                <EditDeliveryOpportunity
                  v-if="opportunity.stage_id === 5"
                  :opportunity="opportunity"
                  @refresh-activities="onRefreshOpportunity"
                  @update-stage-id="handleStageIdUpdate"
                  @complet="complet"
                />
              </VCol>
            </VRow>
          </VWindow>
        </VCardText>
      </VCard>
      <VCard
        v-else
        title="Reporte de Actividades"
      >
        <SellerReport />
      </VCard>
    </VCol>

    <!-- Second VCard (Customer History) -->
    <VCol
      cols="12"
      md="6"
    >
      <CustomerHistory v-model:is-drawer-open="historyDrawerVisible" />
    </VCol>
  </VRow>
</template>
