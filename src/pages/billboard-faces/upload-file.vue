<script setup>
import { useBillboardFace } from '@/composables/BillboardFace/useBillboardFace'
import { ref } from 'vue'

const { uploadBillboardFaces } = useBillboardFace()

const refInputEl = ref(null)
const excelFile = ref(null)
const errors = ref({
  file: '',
})

const changeFile = (event) => {
  const { files } = event.target
  if (files && files.length) 
  {
    const file = files[0]

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) 
    {
      errors.value.file = 'El archivo debe ser formato .xlsx, .xls o .csv'
      excelFile.value = null
      return
    }

    errors.value.file = ''
    excelFile.value = file
  }
}

const validateForm = () => {
  errors.value.file = excelFile.value ? '' : 'Debe seleccionar un archivo Excel (.xlsx) o CSV (.csv)'
  return !errors.value.file
}

const uploadFile = async () => {
  if (!validateForm()) 
  {
    console.log('❌ Error al validar:', JSON.parse(JSON.stringify(errors.value)))
    return
  }

  const formData = new FormData()
  formData.append('file', excelFile.value)

  console.log('✅ Subiendo archivo...')
  await uploadBillboardFaces(formData)
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Subir archivo de vallas
        </h4>
        <p class="text-subtitle-1">
          Solo se acepta archivos Excel (.xlsx, .xls) y CSV (.csv)
        </p>
      </div>
      <div class="d-flex gap-4 align-center flex-wrap">
        <RouterLink :to="{ name: 'billboard-faces-list' }">
          <VBtn variant="tonal" color="primary"> Cancelar </VBtn>
        </RouterLink>
        <VBtn @click="uploadFile" color="primary"> Subir archivo </VBtn>
      </div>
    </div>

    <VRow class="justify-center">
      <VCol md="6">
        <VCard title="Seleccionar archivo">
          <VCardText>
            <div class="d-flex flex-column align-center justify-center gap-4">
              <VIcon icon="tabler-file-upload" size="48" color="primary" />
              <p>Seleccione un archivo Excel (.xlsx, .xls) o CSV (.csv) para subir datos de vallas.</p>
              <VBtn color="primary" @click="refInputEl?.click()">
                Seleccionar archivo
              </VBtn>
              <input
                ref="refInputEl"
                type="file"
                accept=".xlsx,.xls,.csv"
                hidden
                @change="changeFile"
              />
              <p v-if="excelFile" class="text-body-2">
                Archivo seleccionado: <strong>{{ excelFile.name }}</strong>
              </p>
              <p v-if="errors.file" class="text-error">
                {{ errors.file }}
              </p>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
