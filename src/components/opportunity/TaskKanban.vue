<!-- eslint-disable camelcase -->
<script setup>
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProperty } from '@/composables/Realty/useProperty'
import { StagesOpportunity } from '@/enums/StagesOpportunity'
import { StateActivity } from '@/enums/StateActivity'
import { ref, watch } from 'vue'
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
  opportunityKanban: { type: Object, required: true },
})

const emit = defineEmits(['update:isDialogVisible'])

const stageOptions = Object.values(StagesOpportunity).map(stage => ({
  title: stage.label,
  value: stage.value,
}))

// Obtener funciones y variables de `useProperty`
const { allProperty, properties } = useProperty()

const { getallTypeActivities, typeActivities, registerActivity, loadingActivity, changeStatusActivity } = useActivity()
const { getOpportunitybyId, opportunity, changeOpportunity, loadingOpportunity } = useOpportunity()

const navigationTab = ref('Informacion')

const newActivity = ref({
  title: null,
  description: null,
  type_activity_id: null,
  scheduled_at: null,
  opportunity_id: null,
  assigned_to: null,
})

const dialogVisibleUpdate = () => {
  emit('update:isDialogVisible', false)
}

const tabItems = ['Informacion', 'Agregar Actividad', 'Lista de Actividades']

// Cargar las propiedades cuando se abra el diálogo
const fetchProperties = async () => {
  await allProperty({ page: 1, itemsPerPage: 100 }) 
}

// Función para obtener todas las actividades
const allTypeActivity = async () => {
  await getallTypeActivities()
}

const fetchOpportunityData = async () => {
  if (props.opportunityKanban?.id) {
    await getOpportunitybyId(props.opportunityKanban.id)
  }
}

const addActivity = async () => {
  await registerActivity(newActivity.value)
  newActivity.value = {
    title: null,
    description: null,
    type_activity_id: null,
    scheduled_at: null,
    opportunity_id: null,
    assigned_to: null,
  }
  dialogVisibleUpdate()
}

const saveData = async () => {
  console.log('antes del save:', opportunity)

  const data = {
    id: opportunity.value.id, // Acceder con .value
    stage_id: opportunity.value.stage_id,
    description: opportunity.value.description,
    property_id: opportunity.value.property_id,
    customer: {
      id: opportunity.value.customer.id,
      name: opportunity.value.customer.name,
      email: opportunity.value.customer.email,
      ci: opportunity.value.customer.ci,
      cod_phone: opportunity.value.cod_phone,
      phone: opportunity.value.customer.phone,
    },
  }

  await changeOpportunity(opportunity.value.id, data)
  dialogVisibleUpdate()
}

const confirmActivity = async activityId => {
  await changeStatusActivity(activityId, {
    state_activity: StateActivity.COMPLETED.value,
  })
  dialogVisibleUpdate()
}

// Vigilar el estado del diálogo y cargar las propiedades cuando se abra
watch(() => props.isDialogVisible, async newValue => {
  if (newValue === true) {
    fetchOpportunityData()
    allTypeActivity()
    newActivity.value.opportunity_id = props.opportunityKanban?.id ?? null
    newActivity.value.assigned_to = props.opportunityKanban?.user_id ?? null
    await fetchProperties() // Cargar las propiedades aquí
  }
})
</script>

<template>
  <VDialog
    max-width="850"
    :model-value="props.isDialogVisible"
    persistent
    :close-on-esc="false"
    @update:model-value="dialogVisibleUpdate"
  >
    <DialogCloseBtn @click="dialogVisibleUpdate" />

    <VCard class="pa-sm-8">
      <!-- Pestañas de navegación -->
      <VTabs v-model="navigationTab">
        <VTab
          v-for="item in tabItems"
          :key="item"
        >
          {{ item }}
        </VTab>
      </VTabs>

      <!-- Contenidos de las pestañas -->
      <VWindow v-model="navigationTab">
        <!-- Pestaña 1: Información -->
        <VWindowItem
          :value="tabItems[0]"
          style="max-block-size: 90vh; overflow-y: auto;"
        >
          <VCard>
            <VCardTitle class="text-h4 font-weight-semibold mb-4">
              Información del Cliente y Oportunidad
            </VCardTitle>

            <VCardText>
              <VForm @submit.prevent="saveData">
                <VRow>
                  <!-- Sección de Información del Cliente -->
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
                      label="Email del Cliente"
                      placeholder="Ingresa el email"
                      outlined
                    />
                  </VCol>

                  <VCol
                    cols="12"
                    md="6"
                  >
                    <VRow>
                      <!-- Select para el código de país -->
                      <VCol cols="4">
                        <AppSelect
                          v-model="opportunity.customer.cod_phone"
                          label="Código"
                          :items="['+591', '+1', '+52']"
                          placeholder="Cód."
                          outlined
                        />
                      </VCol>

                      <!-- Campo de texto para el número de teléfono -->
                      <VCol cols="8">
                        <AppTextField
                          v-model="opportunity.customer.phone"
                          label="Número de Teléfono"
                          placeholder="Ingresa el teléfono"
                          outlined
                          dense
                          maxlength="9"
                        />
                      </VCol>
                    </VRow>
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppTextField
                      v-model="opportunity.customer.ci"
                      label="CI del Cliente"
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
                      :items="properties.map(property => ({title:property.code, value:property.id}))"
                      outlined
                    />
                  </VCol>
                  <VCol
                    cols="12"
                    md="6"
                  >
                    <AppSelect
                      v-model="opportunity.stage_id"
                      label="Estado del Cliente"
                      placeholder="Selecciona un Estado"
                      :items="stageOptions"
                      item-text="label"
                      item-value="value"
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
                  <!-- Descripción de la Oportunidad -->
                  <VCol cols="12">
                    <AppTextarea
                      v-model="opportunity.description"
                      label="Descripción de la Oportunidad"
                      placeholder="Ingresa una descripción"
                      rows="3"
                      auto-grow
                      outlined
                    />
                  </VCol>

                  <!-- Botones de Acción -->
                  <VCol
                    cols="12"
                    class="text-center"
                  >
                    <VBtn
                      type="submit"
                      color="primary"
                      class="me-3"
                      :disabled="loadingOpportunity"
                      :loading="loadingOpportunity"
                    >
                      Guardar Cambios
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
          </VCard>
        </VWindowItem>

        <!-- Pestaña 2: Agregar Actividad -->
        <VWindowItem
          :value="tabItems[1]"
          style="max-block-size: 90vh; overflow-y: auto;"
        >
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
                      :items="typeActivities.map(activity => ({ title: activity.name, value: activity.id }))"
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
        </VWindowItem>
        <!-- Pestaña 3: Lista de Actividades -->
        <VWindowItem
          :value="tabItems[2]"
          style="max-block-size: 90vh; overflow-y: auto;"
        >
          <VCardItem>
            <VCardTitle class="text-h3 font-weight-medium mb-3">
              Lista de Actividades
            </VCardTitle>
            <VDataTable
              :headers="[
                { title: 'Actividad', value: 'title' },
                { title: 'Fecha', value: 'scheduled_at' },
                { title: 'Estado', value: 'state_activity' },
                { title: 'Descripción', value: 'description' },
                { title: 'Acciones', value: 'actions', sortable: false }
              ]"
              :items="opportunity.activities"
              item-value="id"
              class="elevation-1"
              :items-per-page="5"
            >
              <template #[`item.actions`]="{ item }">
                <VBtn
                  title="Marcar Como Realizada"
                  color="primary"
                  :disabled="item.state_activity !== StateActivity.PENDING.value"
                  @click="confirmActivity(item.id)"
                >
                  <VIcon icon="tabler-checkbox" />
                </VBtn>
              </template>
            </VDataTable>
          </VCardItem>
        </VWindowItem>
      </VWindow>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.refer-link-input {
  .v-field--appended {
    padding-inline-end: 0;
  }

  .v-field__append-inner {
    padding-block-start: 0.125rem;
  }
}
</style>
