<!-- eslint-disable camelcase -->
<script setup>
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProperty } from '@/composables/Realty/useProperty'
import { StagesOpportunity } from '@/enums/StagesOpportunity'

const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
  property: { type: Object, required: true },
})

const emit = defineEmits(['update:isDialogVisible', 'propertyUpdated'])

const listpropertype = ref([
  { value: 'DEPARTAMENT', title: 'Departamento' },
  { value: 'PARK', title: 'Parqueo' },
])

const { loadingProperty, editProperty } = useProperty()
const formProperty = ref({ ...props.property }) 

const dialogVisibleUpdate = () => {
  emit('update:isDialogVisible', false)
}

const saveProperty = async () => {
    await editProperty(formProperty.value);
    emit('propertyUpdated', formProperty.value)
    dialogVisibleUpdate()
}

watch(() => props.property, (newProperty) => {
  formProperty.value = { ...newProperty }
})
</script>

<template>
  <VDialog
    max-width="800"
    :model-value="props.isDialogVisible"
    persistent
    :close-on-esc="false"
    @update:model-value="dialogVisibleUpdate"
  >
    <DialogCloseBtn @click="dialogVisibleUpdate" />
    <VCard
      title="Editar propiedad"
      class="pa-sm-8 pa-5"
    >
      <VCardText>
        <VForm @submit.prevent="saveProperty">
          <VRow dense>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formProperty.code"
                label="Código"
                placeholder="A1"
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
            <AppSelect
                    v-model="formProperty.property_type"
                    label="Tipo de propiedad"
                    placeholder="Seleccione un tipo"
                    :items="listpropertype"
                    return-object
                    outlined
                  />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formProperty.base_price"
                label="Precio de la propiedad"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formProperty.percentage_initial_fee"
                label="% Cuota inicial"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol cols="12">
              <AppTextField
                v-model="formProperty.title"
                label="Título comercial"
                placeholder="Título comercial"
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formProperty.departament.floor"
                label="Numero de piso"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
            <AppTextField
                v-model="formProperty.surface"
                label="Superficie"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formProperty.departament.number_bedrooms"
                label="Numero de habitaciones"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formProperty.departament.number_bathrooms"
                label="Numero de baños"
                placeholder="..."
                outlined
              />
            </VCol>
            <!-- Botones de Acción -->
            <VCol
              cols="12"
              class="text-right mt-6"
            >
              <VBtn
                color="secondary"
                variant="tonal"
                class="me-3"
                @click="dialogVisibleUpdate"
              >
                Cancelar
              </VBtn>
              <VBtn
                type="submit"
                color="primary"
                class="me-3"
                :disabled="loadingProperty"
                :loading="loadingProperty"
              >
                Guardar 
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
