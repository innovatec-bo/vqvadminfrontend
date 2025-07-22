<!-- eslint-disable camelcase -->
<script setup>
import { useBillboard } from '@/composables/Billboard/useBillboard'
import { useBillboardStructure } from '@/composables/BillboardStructure/useBillboardStructure'
import { useCity } from '@/composables/City/useCity'
import { useUser } from '@/composables/User/useUser'
import { useZone } from '@/composables/Zone/useZone'
import { watch } from 'vue'

const { allUsers,  users} = useUser()
const { allCities, cities } = useCity()
const { allZones, zones } = useZone()
const { allBillboardStructures, billboardStructures } = useBillboardStructure()

const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
  billboard: { type: Object, required: true, default: null },
})

allUsers({
  itemsPerPage: 100,
  page: 1,
  role: 'ANUNCIANTE'
})
allCities({
  itemsPerPage: 200,
  page: 1,
})
allZones({
  itemsPerPage: 200,
  page: 1,
})
allBillboardStructures({
  itemsPerPage: 200,
  page: 1,
})

const emit = defineEmits(['update:isDialogVisible', 'billboardUpdated'])

const { loadingBillboard, editBillboard } = useBillboard()
const formBillboard = ref({ ...props.billboard }) 

const dialogVisibleUpdate = () => {
  emit('update:isDialogVisible', false)
}

const saveBillboard = async () => {
  const result = await editBillboard(formBillboard.value)

  result.success && emit('billboardUpdated', formBillboard.value)
  dialogVisibleUpdate()
}
watch(() => props.billboard, newBillboard => {
  formBillboard.value = { ...newBillboard }
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
      title="Editar billboard"
      class="pa-sm-8 pa-5"
    >
      <VCardText>
        <VForm @submit.prevent="saveBillboard">
          <VRow dense>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formBillboard.name"
                label="Nombre"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="formBillboard.location"
                label="Ubicacion"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppAutocomplete
                v-model="formBillboard.city"
                placeholder="Elija una ciudad"
                :items="cities"
                label="Ciudad"
                :item-title="item => `${item.name}, ${item.department}`"
                :item-value="item => item"
                persistent-hint
                :menu-props="{ maxHeight: '200px' }"
              >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppAutocomplete
                v-model="formBillboard.zone"
                placeholder="Elija una zona"
                :items="zones"
                label="Zona"
                item-title="name"
                :item-value="item => item"
                persistent-hint
                :menu-props="{ maxHeight: '200px' }"
              >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppAutocomplete
                v-model="formBillboard.billboard_structure"
                placeholder="Elija una opcion"
                :items="billboardStructures"
                label="Estructura"
                item-title="name"
                :item-value="item => item"
                persistent-hint
                :menu-props="{ maxHeight: '200px' }"
              >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
            </VCol>
            <VCol cols="12" md="6">
              <AppAutocomplete
                v-model="formBillboard.advertiser"
                placeholder="Elija una opcion"
                :items="users"
                label="Proveedor"
                :item-title="item => `${item.full_name} (${item.email})`"
                :item-value="item => item"
                persistent-hint
                :menu-props="{ maxHeight: '200px' }"
              >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
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
                :disabled="loadingBillboard"
                :loading="loadingBillboard"
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
