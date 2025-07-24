<!-- eslint-disable camelcase -->
<script setup>
import { useBillboard } from '@/composables/Billboard/useBillboard'
import { useBillboardFace } from '@/composables/BillboardFace/useBillboardFace'
import { watch } from 'vue'

const { allBillboards, billboards } = useBillboard()
allBillboards({
  itemsPerPage: 1000,
  page: 1,
})
const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
  billboardFace: { type: Object, required: true },
})

const emit = defineEmits(['update:isDialogVisible', 'billboardFaceUpdated'])

const listStatus = ref([
  { value: 'ROJO', title: 'ROJO' },
  { value: 'AMARILLO', title: 'AMARILLO' },
  { value: 'VERDE', title: 'VERDE' },
])

const { loadingBillboardFace, editBillboardFace } = useBillboardFace()
const formBillboardFace = ref({ ...props.billboardFace }) 
const refInputEl = ref(null);
const avatarImg = computed({
  get() {
    return formBillboardFace.value.images?.md ?? null
  },
  set(newVal) {
    if (!formBillboardFace.value.images) {
      formBillboardFace.value.images = {}
    }
    formBillboardFace.value.images.md = newVal
  }
})
const avatarFile = ref(null);

const changeAvatar = (event) => {
  const { files } = event.target
  if (files && files.length) 
  {
    const file = files[0]
    avatarFile.value = file

    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      if (typeof fileReader.result === 'string') 
      {
        avatarImg.value = fileReader.result
      }
    }
  }
}

const dialogVisibleUpdate = () => {
  emit('update:isDialogVisible', false)
}

function formatDateToYMD(date) 
{
  if (!date) return ''
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const saveBillboardFace = async () => {
  const formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('id', formBillboardFace.value.id)  
  formData.append('code', formBillboardFace.value.code)
  formData.append('billboard_id', formBillboardFace.value.billboard.id)
  formData.append('face', formBillboardFace.value.face)
  formData.append('location_detail', formBillboardFace.value.location_detail)
  formData.append('status', formBillboardFace.value.status)
  formData.append('available_from', formatDateToYMD(formBillboardFace.value.available_from))
  formData.append('rented_from', formatDateToYMD(formBillboardFace.value.rented_from))

  if (avatarFile.value) 
  {
    formData.append('image', avatarFile.value)
  }

  const result = await editBillboardFace(formData);
  result.success && emit('billboardFaceUpdated', formBillboardFace.value)
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
          <VCol cols="12" class="d-flex">
            <VAvatar
              rounded
              style="width: 300px; height: 200px;"
              class="me-6"
              :image="avatarImg"
            />
            <div class="d-flex flex-column justify-center gap-4">
              <div class="d-flex flex-wrap gap-2">
                <VBtn color="primary" @click="refInputEl?.click()">
                  <VIcon icon="tabler-cloud-upload" class="d-sm-none" />
                  <span class="d-none d-sm-block">Seleccionar imagen</span>
                </VBtn>
                <input
                  ref="refInputEl"
                  type="file"
                  name="file"
                  accept=".jpeg,.png,.jpg"
                  hidden
                  @change="changeAvatar"
                />
              </div>
              <p class="text-body-1 mb-0">
                Formatos permitidos: JPG, JPEG o PNG
              </p>
            </div>
          </VCol>
          <VRow dense>
            <VCol cols="12" md="6">
              <AppTextField
                v-model="formBillboardFace.code"
                label="Código"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol cols="6">
                <AppAutocomplete
                  v-model="formBillboardFace.billboard"
                  placeholder="Elija una opcion"
                  :items="billboards"
                  label="Billboard"
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
            <VCol cols="12" md="6">
              <AppDateTimePicker
              v-model="formBillboardFace.rented_from"
              label="Rentado desde"
              placeholder=""
              clearable
            />
            </VCol>
            <VCol cols="12" md="6">
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
