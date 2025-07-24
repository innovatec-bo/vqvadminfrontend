<script setup>
import { useBillboard } from '@/composables/Billboard/useBillboard'
import { useBillboardFace } from '@/composables/BillboardFace/useBillboardFace'
import avatar1 from '@images/logos/vqvlogo.png'
import { ref } from 'vue'

const { allBillboards, billboards } = useBillboard()
const { addBillboardFace } = useBillboardFace()


const refInputEl = ref(null);
const avatarImg = ref(avatar1);
const avatarFile = ref(null);
const code = ref('');
const billboard = ref(null);
const face = ref('');
const location_detail = ref('');
const status = ref(null);
const available_from = ref(null);
const rented_from = ref(null);

allBillboards({
  itemsPerPage: 1000,
  page: 1,
})

const errors = ref({
  title: '',
  description: '',
})

const statusList = [
  'ROJO',
  'AMARILLO',
  'VERDE'
];

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

const validateForm = () => {
  errors.value.code = code.value ? '' : 'El codigo es obligatorio.'
  errors.value.billboard = billboard.value ? '' : 'El billboard es obligatoria.'
  errors.value.face = face.value ? '' : 'Este dato es obligatorio.'
  errors.value.location_detail = location_detail.value ? '' : 'El detalle de la ubicacion es obligatorio.'
  errors.value.status = status.value?'' : 'El estado es obligatorio'
  
  return !errors.value.code && 
          !errors.value.billboard &&
          !errors.value.face &&
          !errors.value.location_detail &&
          !errors.value.status
}

const registerBillboardFace = async () => {
  if (validateForm()) 
  {
    const formData = new FormData()
    
    formData.append('code', code.value)
    formData.append('billboard_id', billboard.value.id)
    formData.append('face', face.value)
    formData.append('location_detail', location_detail.value)
    formData.append('status', status.value)
    formData.append('available_from', available_from.value)
    formData.append('rented_from', rented_from.value)

    if (avatarFile.value) 
    {
      formData.append('image', avatarFile.value)
    }

    addBillboardFace(formData);
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Registrar billboard face
        </h4>
      </div>
      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn
          variant="tonal"
          color="primary"
        >
          Cancelar
        </VBtn>
        <VBtn @click="registerBillboardFace">
          Registrar billboard face
        </VBtn>
      </div>
    </div>

    <VRow class="justify-center">
      <VCol md="8">
        <VCard title="Informaci&oacute;n del billboard face">
          <VCardText>
            <VRow>
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
              <VCol cols="6">
                <AppTextField
                  v-model="code"
                  label="C&oacute;digo"
                  placeholder=""
                  :error="!!errors.code"
                  :error-messages="errors.code"
                />
              </VCol>
              <VCol cols="6">
                <AppAutocomplete
                  v-model="billboard"
                  placeholder="Elija una opcion"
                  :items="billboards"
                  label="Billboard"
                  item-title="name"
                  :item-value="item => item"
                  persistent-hint
                  :menu-props="{ maxHeight: '200px' }"
                  :error="!!errors.billboard"
                  :error-messages="errors.billboard"
                >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="face"
                  label="Cara"
                  placeholder=""
                  :error="!!errors.face"
                  :error-messages="errors.face"
                />
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="location_detail"
                  label="Detalle de ubicaci&oacute;n"
                  placeholder=""
                  :error="!!errors.location_detail"
                  :error-messages="errors.location_detail"
                />
              </VCol>
              <VCol cols="6">
                <AppAutocomplete
                  v-model="status"
                  placeholder="Elija una opcion"
                  :items="statusList"
                  label="Estado"
                  :menu-props="{ maxHeight: '200px' }"
                  :error="!!errors.status"
                  :error-messages="errors.status"
                >
                <template #append>
                  <VSlideXReverseTransition mode="out-in">
                  </VSlideXReverseTransition>
                </template>
              </AppAutocomplete>
              </VCol>
              <VCol cols="12" md="6">
                <AppDateTimePicker
                v-model="rented_from"
                label="Rentado desde"
                placeholder=""
                clearable
              />
              </VCol>
              <VCol cols="12" md="6">
                <AppDateTimePicker
                v-model="available_from"
                label="Disponible desde"
                placeholder=""
              />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
