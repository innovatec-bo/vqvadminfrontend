<script setup>
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { StateActivity } from '@/enums/StateActivity'
import { VDataTable } from 'vuetify/labs/VDataTable'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  opportunityKanban: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const { getallTypeActivities, typeActivities, registerActivity, loadingActivity, changeStatusActivity } = useActivity()


const dialogVisibleUpdate = () => {
  emit('update:isDialogVisible', false)
}

const { getOpportunitybyId, opportunity } = useOpportunity()

const navigationTab = ref('Informacion')

const tabItems = [
  'Informacion',
  'Agregar Actividad',
  'Lista de Actividades',
]

const newActivity = ref({
  title: null,
  description: null,
  // eslint-disable-next-line camelcase
  type_activity_id: null,
  // eslint-disable-next-line camelcase
  scheduled_at: null,
  // eslint-disable-next-line camelcase
  opportunity_id: null,
  // eslint-disable-next-line camelcase
  assigned_to: null,
})

const allTypeActivity = async () => {
  await getallTypeActivities()
}

const fetchOpportunityData = async () => {
  if (props.opportunityKanban?.id) {
    await getOpportunitybyId(props.opportunityKanban.id)
  }
}

const addActivity= async () =>{
  await registerActivity(newActivity.value)
  dialogVisibleUpdate()
}

const saveData = async () => {
  console.log('Datos actualizados correctamente')
}

const confirmActivity = async activityId =>{
  await changeStatusActivity(activityId, {
    // eslint-disable-next-line camelcase
    state_activity: StateActivity.COMPLETED.value,
  })
  dialogVisibleUpdate()

}

watch(() => props.isDialogVisible, newValue => {
  if (newValue === true) {
    console.log('El diálogo se ha abierto, realizando la consulta.')
    fetchOpportunityData()
    allTypeActivity()
    // eslint-disable-next-line camelcase
    newActivity.value.opportunity_id = props.opportunityKanban?.id ?? null
    // eslint-disable-next-line camelcase
    newActivity.value.assigned_to = props.opportunityKanban?.user_id ?? null
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
    <!-- Botón para cerrar el diálogo -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />

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
        <VWindow v-model="navigationTab">
          <!-- Pestaña 1: Información -->
          <VWindowItem :value="tabItems[0]">
            <VCardItem>
              <VCardTitle class="text-h3 font-weight-medium mb-3">
                Información del Cliente y Oportunidad
              </VCardTitle>
              <VCardText>
                <VForm @submit.prevent="saveData">
                  <VRow>
                    <VCol
                      cols="12"
                      sm="8"
                    >
                      <VRow>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="opportunity.customer.name"
                            label="Nombre del Cliente"
                            placeholder="Ingresa el nombre"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="opportunity.customer.email"
                            label="Email del Cliente"
                            placeholder="Ingresa el email"
                          />
                        </VCol>
                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VRow>
                            <VCol
                              cols="12"
                              md="9"
                            >
                              <VTextField
                                v-model="opportunity.customer.phone"
                                label="Teléfono del Cliente"
                                placeholder="Ingresa el teléfono"
                              />
                            </VCol>
                            <VCol
                              cols="12"
                              md="3"
                              class="d-flex align-center justify-center"
                            >
                              <a
                                :href="'https://wa.me/' + opportunity.customer.phone"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="d-inline-block w-100"
                                @click.stop
                              >
                                <VBtn
                                  color="success"
                                  class="w-100"
                                  style="min-inline-size: 30px;"
                                >
                                  <VIcon icon="tabler-brand-whatsapp" />
                                </VBtn>
                              </a>
                            </VCol>
                          </VRow>
                        </VCol>


                        <VCol
                          cols="12"
                          md="6"
                        >
                          <VTextField
                            v-model="opportunity.ci"
                            label="CI del Cliente"
                            placeholder="Ingresa el CI"
                          />
                        </VCol>
                      </VRow>
                    </VCol>
                    <VDivider vertical />
                    <VCol
                      cols="12"
                      sm="4"
                    >
                      <VTextField
                        label="Nombre del Cliente"
                        placeholder="Ingresa el nombre"
                      />
                    </VCol>
                    
                    <VCol
                      cols="12"
                      md="12"
                    >
                      <VTextField
                        label="Descripción de la Oportunidad"
                        placeholder="Ingresa una descripción"
                        multiline
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      class="text-center"
                    >
                      <VBtn
                        type="submit"
                        class="me-3"
                      >
                        Guardar Cambios
                      </VBtn>
                      <VBtn
                        color="secondary"
                        variant="tonal"
                      >
                        Cancelar
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCardItem>
          </VWindowItem>

          <!-- Pestaña 2: Agregar Actividad -->
          <VWindowItem :value="tabItems[1]">
            <VCardItem>
              <VCardTitle class="text-h3 font-weight-medium mb-3">
                Agregar Actividad
              </VCardTitle>
              <VCardText>
                <VForm @submit.prevent="() => {}">
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
                        @click="addActivity"
                      >
                        Agregar Actividad
                      </VBtn>
                      <VBtn
                        color="secondary"
                        variant="tonal"
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
          <VWindowItem :value="tabItems[2]">
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
      </vwindow>
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
