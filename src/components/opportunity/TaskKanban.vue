<script setup>
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'

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


const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const { getOpportunitybyId, opportunity } = useOpportunity()

const navigationTab = ref('Informacion')

const tabItems = [
  'Informacion',
  'Agregar Actividad',
  'Lista de Actividades',
]

const fetchOpportunityData = async () => {
  if (props.opportunityKanban?.id) {
    await getOpportunitybyId(props.opportunityKanban.id)
  }
}

const saveData = async () => {
  console.log('Datos actualizados correctamente')
}

watch(() => props.isDialogVisible, newValue => {
  if (newValue === true) {
    console.log('El diálogo se ha abierto, realizando la consulta.')
    fetchOpportunityData()
  }
})
</script>

<template>
  <VDialog
    :model-value="isDialogVisible"
    :width="$vuetify.display.smAndDown ? 'auto' : 880"
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
        <!-- Pestaña 1: Información -->
        <VWindow v-model="navigationTab">
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
                      <AppSelect
                        label="Seleccione una Actividad"
                        placeholder="Seleccione una Actividad"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppDateTimePicker
                        label="Fecha"
                        placeholder="Seleccione una Fecha"
                      />
                    </VCol>
                    <VCol
                      cols="12"
                      md="6"
                    >
                      <AppDateTimePicker
                        label="Hora"
                        placeholder="Seleccione una Hora"
                        :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }"
                      />
                    </VCol>
                    <VCol cols="12">
                      <AppTextarea
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
                  { title: 'Actividad', value: 'type_activity.name' },
                  { title: 'Fecha', value: 'date' },
                  { title: 'Hora', value: 'time' },
                  { title: 'Estado', value: 'state_activity' },
                  { title: 'Descripción', value: 'description_activity' },
                  { title: 'Acciones', value: 'actions', sortable: false }
                ]"
                :items="opportunity.activities || []"
              />
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
