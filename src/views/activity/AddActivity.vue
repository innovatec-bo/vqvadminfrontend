<!-- eslint-disable camelcase -->
<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import EditDeliveryOpportunity from '@/components/activity/EditDeliveryOpportunity.vue'
import EditPreSaleOpportunity from '@/components/activity/EditPreSaleOpportunity.vue'
import EditProspectOpportunity from '@/components/activity/EditProspectOpportunity.vue'
import EditSaleOpportunity from '@/components/activity/EditSaleOpportunity.vue'
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProperty } from '@/composables/Realty/useProperty'
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

const newActivity = ref({
  title: '',
  description: '',
  type_activity_id: null,
  opportunity_id: null,
  assigned_to: null,
  scheduled_at: null,
  status: 'COMPLETED',
})

const fetchProperties = async () => {
  await allProperty({ page: 1, itemsPerPage: 100 }) 
}

const { changeStatusActivity, completedActivityAndRegister, updateActivity, getallTypeActivities, typeActivities, loadingActivity } = useActivity()
const { getOpportunitybyId, opportunity, changeOpportunity, loadingOpportunity } = useOpportunity()
const { allProperty, properties } = useProperty()

const activitiesData = ref(structuredClone(toRaw(props.activitiesData)))


const handleStageIdUpdate = newStageId => {
  getOpportunitybyId(opportunity.id)
}


watch(props, () => {
  activitiesData.value = structuredClone(toRaw(props.activitiesData))
  getOpportunitybyId(activitiesData.value.opportunity_id)
  fetchProperties()
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
}

const onSubmit = async() => {
  completedActivityAndRegister(activitiesData.value.opportunity_id, {
    title: newActivity.value.title,
    description: newActivity.value.description,
    type_activity_id: newActivity.value.type_activity_id,
    scheduled_at: newActivity.value.scheduled_at,
    assigned_to: opportunity.value.user_id,
    property_id: opportunity.value.property_id,
    opportunity_id: opportunity.value.id,
    status: 'COMPLETED',
  })

  // emit('refreshActivities') 
  // closeNavigationDrawer()

}

const openHistory =  () => {
  historyDrawerVisible.value = true
}

const complet = async()=>{

  emit('refreshActivities') 
  emit('update:isDrawerOpen', false) // Cerrar el drawer
}

const activitySwitch  = state =>{
  return state === 'COMPLETED'
}


const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <!-- Row to hold two VCard components side by side -->
  <VRow class="d-flex justify-space-between">
    <!-- First VCard (Activities and Stage) -->
    <VCol cols="12">
      <!-- Adjust the column size based on your needs -->
      <VCard v-if="isDrawerOpen">
        <VCardTitle class="pt-10">
          <VRow>
            <VCol
              cols="12"
              sm="6"
              class="pl-5"
            >
              Etapas
            </VCol>
            <VCol
              cols="12"
              sm="6"
            >
              <VChip
                label
                color="primary"
              >
                {{ opportunity.stage.title }}
              </VChip>
            </VCol>
          </VRow>
        </VCardTitle>
        <VCardText>
          <VForm>
            <VWindow class="mx-3">
              <VRow>
                <VCol
                  cols="12"
                  sm="6"
                >
                  <VRow>
                    <VCol cols="12">
                      <VSwitch
                        v-for="(activity, index) in opportunity.activities"
                        :key="activity.id"
                        :v-model="activitySwitch(activity.state_activity)"
                        :label="activity.title"
                      />
                    </VCol>
                    <VCol cols="12">
                      <AppTextField
                        v-model="newActivity.title"
                        label="Titulo de la actividad"
                        placeholder="......"
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
                        :items="typeActivities.map(activity => ({ title: activity.name, value: activity.id }))"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppDateTimePicker
                        v-model="newActivity.scheduled_at"
                        label="Seleccione la fecha y hora"
                        placeholder="Select date and time"
                        :config="{ enableTime: true, dateFormat: 'Y-m-d H:i' }"
                        :rules="[requiredValidator]"
                      />
                    </VCol>
                    <VCol cols="12">
                      <AppTextarea
                        v-model="newActivity.description"
                        label="Descripcion"
                        rows="3"
                        :rules="[requiredValidator]"
                      />
                      <VBtn
                        size="small"
                        color="secondary"
                        class="my-2 mx-2"
                        @click="closeNavigationDrawer"
                      >
                        Cancelar
                      </VBtn>
                      <VBtn
                        size="small"
                        color="error"
                        class="my-2 mx-2"
                      >
                        Dar de Baja
                      </VBtn>
                      <VBtn
                        size="small"
                        color="primary"
                        class="mx-auto"
                        :loading="loadingActivity"
                        :disabled="loadingActivity"
                        @click="onSubmit"
                      >
                        Guardar
                      </VBtn>
                    </VCol>
                  </VRow>
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                  style="align-items: center;"
                >
                  <EditProspectOpportunity
                    v-if="opportunity.stage_id === 2"
                    :opportunity="opportunity"
                    @update-stage-id="handleStageIdUpdate"
                  />
                  <EditPreSaleOpportunity
                    v-if="opportunity.stage_id === 3"
                    :opportunity="opportunity"
                  />
                  <EditSaleOpportunity
                    v-if="opportunity.stage_id === 4"
                    :opportunity="opportunity"
                    @refresh-activities="onRefreshOpportunity"
                  />
                  <EditDeliveryOpportunity
                    v-if="opportunity.stage_id === 5"
                    :opportunity="opportunity"
                    @refresh-activities="onRefreshOpportunity"
                  />
                </VCol>
              </VRow>
            </VWindow>
          </VForm>
        </VCardText>
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

