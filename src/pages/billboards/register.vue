<script setup>
import { useBillboard } from '@/composables/Billboard/useBillboard'
import { ref } from 'vue'

const { addBillboard } = useBillboard()
const name = ref('')
const location = ref('')
const status = ref('')
const billboard_type_id = ref('')
const city_id = ref('');

const errors = ref({
  title: '',
  description: '',
})

const listStatus = ref([
  { value: '1', title: 'Disponible' },
  { value: '2', title: 'No disponible' },
])

const listStructureType = ref([
  { value: '1', title: 'Digital A' },
  { value: '2', title: 'Digital B' },
  { value: '3', title: 'Digital C' },
  { value: '4', title: 'Estatica A' },
  { value: '5', title: 'Estatica B' },
  { value: '6', title: 'Estatica C' },
])

const listCities = ref([
  { value: '1', title: 'Santa Cruz' },
])

const validateForm = () => {
  errors.value.title = title.value ? '' : 'El título es obligatorio.'
  errors.value.description = description.value ? '' : 'La descripción es obligatoria.'
  
  return !errors.value.title && !errors.value.description
}

const registerBillboard = async () => {
  if (validateForm()) 
  {
    addBillboard({
      name: name.value,
      location: location.value,
      status: status.value
    })
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Registrar Valla
        </h4>
      </div>
      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn
          variant="tonal"
          color="primary"
        >
          Cancelar
        </VBtn>
        <VBtn @click="registerBillboard">
          Registrar Valla
        </VBtn>
      </div>
    </div>

    <VRow>
      <VCol md="8">
        <VCard title="Informacion de la valla">
          <VCardText>
            <VRow>
              <VCol cols="12">
                <AppTextField
                  v-model="name"
                  label="Nombre"
                  placeholder=""
                  :error="!!errors.name"
                  :error-messages="errors.name"
                />
              </VCol>
              <VCol>
                <AppTextarea
                  v-model="location"
                  label="Ubicacion"
                  rows="2"
                  :error="!!errors.location"
                  :error-messages="errors.location"
                />
              </VCol>
              <VCol
                cols="6"
              >
                <!-- 👉 Billboard  status -->
                <AppSelect
                  v-model="status"
                  label="Estado"
                  placeholder="Seleccione un estado"
                  :items="listStatus"
                  return-object
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol
                cols="6"
              >
                <!-- 👉 Billboard type -->
                <AppSelect
                  v-model="billboard_type_id"
                  label="Tipo"
                  placeholder="Seleccione un tipo de valla"
                  :items="listStructureType"
                  return-object
                  :rules="[requiredValidator]"
                />
              </VCol>
              <VCol
                cols="6"
              >
                <!-- 👉 Billboard city -->
                <AppSelect
                  v-model="city_id"
                  label="Ciudad"
                  placeholder="Seleccione una ciudad"
                  :items="listCities"
                  return-object
                  :rules="[requiredValidator]"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
