<!-- eslint-disable camelcase -->
<script setup>
import { useActivity } from '@/composables/Activity/useActivity'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProperty } from '@/composables/Realty/useProperty'
import { StagesOpportunity } from '@/enums/StagesOpportunity'

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

const dialogVisibleUpdate = () => {
  emit('update:isDialogVisible', false)
}

const saveData = async () => {
  console.log('antes del save:', opportunity)

  const data = {
    id: opportunity.value.id, 
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

const fetchOpportunityData = async () => {
  if (props.opportunityKanban?.id) {
    await getOpportunitybyId(props.opportunityKanban.id)
  }
}

const fetchProperties = async () => {
  await allProperty({ page: 1, itemsPerPage: 100 }) 
}

watch(() => props.isDialogVisible, async newValue => {
  if (newValue === true) {
    fetchOpportunityData()
    await fetchProperties()
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
    <VCard>
      <VCardTitle class="text-h4 font-weight-semibold mb-4">
        <h4>Información del Cliente y Oportunidad</h4>
      </VCardTitle>

      <VCardText>
        <VForm @submit.prevent="saveData">
          <VRow dense>
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
            <VCol cols="12">
              <AppAutocomplete
                v-model="opportunity.property_id"
                label="Departamento de Interés"
                placeholder="Selecciona un Departamento"
                :items="properties.map(property => ({title:property.title, value:property.id}))"
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
