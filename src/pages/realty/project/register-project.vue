<script setup>
import { useProject } from '@/composables/Realty/useProject'
import { ref } from 'vue'

const { addProyect } = useProject()
const title = ref('')
const description = ref('')
const numPisos = ref('')

const errors = ref({
  title: '',
  description: '',
})

const validateForm = () => {
  errors.value.title = title.value ? '' : 'El título es obligatorio.'
  errors.value.description = description.value ? '' : 'La descripción es obligatoria.'
  
  return !errors.value.title && !errors.value.description
}

const registerProyect = async () => {
  if (validateForm()) {
    addProyect({
      title: title.value,
      description: description.value,
      // eslint-disable-next-line camelcase
      num_pisos: numPisos.value, 
    })
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Registrar tu Proyecto
        </h4>
      </div>
      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn
          variant="tonal"
          color="primary"
        >
          Cancelar
        </VBtn>
        <VBtn @click="registerProyect">
          Registrar Proyecto
        </VBtn>
      </div>
    </div>

    <VRow>
      <VCol md="8">
        <VCard title="Informacion del Proyecto">
          <VCardText>
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="title"
                  label="Titulo del Proyecto"
                  placeholder="......"
                  :error="!!errors.title"
                  :error-messages="errors.title"
                />
              </VCol>
              <VCol>
                <AppTextarea
                  v-model="description"
                  label="Descripcion"
                  rows="3"
                  :error="!!errors.description"
                  :error-messages="errors.description"
                />
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="numPisos"
                  label="Numero de pisos (Departamentos)"
                  placeholder="......"
                  type="number"
                  min="0"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
