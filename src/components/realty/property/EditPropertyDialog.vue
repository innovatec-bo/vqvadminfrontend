<!-- eslint-disable camelcase -->
<script setup>
import { useBillboardFace } from '@/composables/BillboardFace/useBillboardFace'

const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
  billboardFace: { type: Object, required: true },
})

const emit = defineEmits(['update:isDialogVisible', 'propertyUpdated'])

const listStatus = ref([
  { value: 'ROJO', title: 'ROJO' },
  { value: 'AMARILLO', title: 'AMARILLO' },
  { value: 'VERDE', title: 'VERDE' },
])

const { loadingBillboardFace, editBillboardFace } = useBillboardFace()
const formBillboardFace = ref({ ...props.billboardFace }) 

const dialogVisibleUpdate = () => {
  emit('update:isDialogVisible', false)
}

const saveBillboardFace = async () => {
  const result = await editBillboardFace(formBillboardFace.value)

  result.success && emit('propertyUpdated', formBillboardFace.value)
  dialogVisibleUpdate()
}

watch(() => props.billboardFace, newBillboardFace => {
  formBillboardFace.value = { ...newBillboardFace }
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
      title="Editar cara"
      class="pa-sm-8 pa-5"
    >
      <VCardText>
        <VForm @submit.prevent="saveBillboardFace">
          <VRow dense>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formBillboardFace.code"
                label="Código"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formBillboardFace.face"
                label="Cara"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppSelect
                v-model="formBillboardFace.status"
                label="Estado"
                placeholder="Seleccione un estado"
                :items="listStatus"
                outlined
              />
            </VCol>
            
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formBillboardFace.location_detail"
                label="Detalle de la ubicacion"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
              v-model="formBillboardFace.rented_from"
              label="Rentado desde"
              placeholder=""
            />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppDateTimePicker
              v-model="formBillboardFace.available_from"
              label="Disponible desde"
              placeholder=""
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
                :disabled="loadingBillboardFace"
                :loading="loadingBillboardFace"
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
