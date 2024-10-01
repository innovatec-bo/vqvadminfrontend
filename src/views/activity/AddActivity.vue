<!-- eslint-disable camelcase -->
<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProperty } from '@/composables/Realty/useProperty'
import { StagesOpportunity } from '@/enums/StagesOpportunity'
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

const stageOptions = Object.values(StagesOpportunity).map(stage => ({
  title: stage.label,
  value: stage.value,
}))

const historyDrawerVisible = ref(false)
const checkLastActivity = ref(false)

const newActivity = ref({
  title: '',
  description: '',
  type_activity_id: null,
  opportunity_id: null,
  assigned_to: null,
  scheduled_at: null,
})

const fetchProperties = async () => {
  await allProperty({ page: 1, itemsPerPage: 100 }) 
}

const { changeStatusActivity, updateActivity, getallTypeActivities, typeActivities } = useActivity()
const { getOpportunitybyId, opportunity, changeOpportunity, loadingOpportunity } = useOpportunity()
const { allProperty, properties } = useProperty()

const activitiesData = ref(structuredClone(toRaw(props.activitiesData)))

watch(props, () => {
  activitiesData.value = structuredClone(toRaw(props.activitiesData))
  getOpportunitybyId(activitiesData.value.opportunity_id)
  fetchProperties()
  allTypeActivity()
})

const allTypeActivity = async () => {
  await getallTypeActivities()
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
  }
}

const onSubmit = async() => {
  console.log(newActivity)
  emit('refreshActivities') 
  closeNavigationDrawer()

}

const openHistory =  () => {
  historyDrawerVisible.value = true
}

const complet = async()=>{

  emit('refreshActivities') 
  emit('update:isDrawerOpen', false) // Cerrar el drawer
}


const handleDrawerModelValueUpdate = val => {
  emit('update:isDrawerOpen', val)
}
</script>

<template>
  <VCard
    v-if="isDrawerOpen"
    title="Actividades y Etapa"
  >
    <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
      <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
        <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
          <div class="d-flex flex-wrap justify-center justify-sm-start flex-grow-1 gap-4">
            <h5 class="text-h5 text-center text-sm-start font-weight-medium mb-3">
              Diego Rojas Rios
            </h5>
          </div>

          <VBtn
            prepend-icon="tabler-check"
            @click="openHistory"
          >
            Historial
          </VBtn>
        </div>
      </div>
    </VCardText>
    <VCardText>
      <div class="d-flex align-center justify-space-between mb-2">
        <VLabel for="payment-terms">
          {{ activitiesData.title }}
        </VLabel>
        <VLabel for="payment-terms">
          <VChip
            label
            color="primary"
            class="mx-5"
          >
            {{ activitiesData.type_activity }}
          </VChip>
        </VLabel>
        <div>
          <VSwitch
            id="payment-terms"
            v-model="checkLastActivity"
          />
        </div>
      </div>
      <VForm class="mt-4">
        <VWindow class=" mx-3">
          <VRow>
            <VCol
              cols="12"
              sm="6"
            >
              <VRow>
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
                </VCol>
              </VRow>
            </VCol>
            <VDivider vertical="true" />
            <VCol
              cols="12"
              sm="6"
            >
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="opportunity.customer.name"
                    label="Nombre del Cliente"
                    placeholder="Ingresa el nombre"
                    outlined
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="opportunity.customer.email"
                    label="Email del Cliente (Opcional)"
                    placeholder="Ingresa el email"
                    outlined
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="opportunity.customer.phone"
                    label="Número de Teléfono"
                    placeholder="Ingresa el teléfono"
                    outlined
                    dense
                    maxlength="9"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="opportunity.customer.ci"
                    label="CI del Cliente(Opcional)"
                    placeholder="Ingresa el CI"
                    outlined
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppAutocomplete
                    v-model="opportunity.property_id"
                    label="Departamento de Interés"
                    placeholder="Selecciona un Departamento"
                    :items="properties.map(property => ({title:property.title, value:property.id}))"
                    outlined
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppSelect
                    label="Tipo de Compra"
                    placeholder="Selecciona un Tipo"
                    :items="['CONTADO', 'CREDITO DIRECTO']"
                    outlined
                  />
                </VCol>
                <!--
                  <VCol
                  cols="12"
                  md="6"
                  >
                  <AppTextField
                  label="Precio de Negociacion"
                  placeholder="Ingresa el Precio Final"
                  outlined
                  />
                  </VCol>
                  <VCol
                  cols="12"
                  md="6"
                  >
                  <AppTextField
                  label="Anticipo"
                  placeholder="Ingresa el Precio Final"
                  outlined
                  />
                  </VCol> 
                -->
              </VRow>
            </VCol>
            <VCol
              cols="12"
              style="align-items: center;"
            >
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
                @click="onSubmit"  
              >
                Guardar
              </VBtn> 
            </VCol>
          </VRow>
        </VWindow>
      </VForm>
    </VCardText>
  </VCard>
  <CustomerHistory v-model:is-drawer-open="historyDrawerVisible" />
</template>
