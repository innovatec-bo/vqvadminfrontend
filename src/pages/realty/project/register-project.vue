<script setup>
import { useProject } from '@/composables/Realty/useProject'
import { ref } from 'vue'

const { addProyect } = useProject()
const title = ref()
const description = ref('')
const numPisos = ref('')

const registerProyect = async () => {

  addProyect({
    title: title.value,
    description: description.value,
    // eslint-disable-next-line camelcase
    num_pisos: numPisos.value, 
  })
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
      <!-- todo que el boton cancelar valla a tras -->
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
        <!-- 👉 Project Information -->
        <VCard title="Informacion del Proyecto">
          <VCardText>
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="title"
                  label="Titulo del Proyecto"
                  placeholder="......"
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol>
                <AppTextarea
                  v-model="description"
                  label="Descripcion (Opcional)"
                  rows="3"
                  :rules="[requiredValidator]"
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
      </vcol>
    </VRow>
  </div>
</template>

