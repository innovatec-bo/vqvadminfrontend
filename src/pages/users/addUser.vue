<script setup>
import { useUser } from '@/composables/User/useUser'
import { ref } from 'vue'

const { addUser } = useUser()

const name = ref('')
const last_name = ref('')
const email = ref(null);
const cod_phone = ref(null);
const phone = ref(null)

const errors = ref({
  title: '',
  description: '',
})

const validateForm = () => {
  errors.value.name = name.value ? '' : 'El nombre es obligatorio.'
  errors.value.last_name = last_name.value ? '' : 'El apellido es obligatorio.'
  errors.value.email = email.value ? '' : 'El correo es obligatorio.'
  errors.value.cod_phone = cod_phone.value ? '' : 'El codigo de telefono es obligatorio.'
  errors.value.phone = phone.value?'' : 'El telefono es obligatorio'
  
  return !errors.value.name && 
          !errors.value.last_name &&
          !errors.value.email &&
          !errors.value.cod_phone &&
          !errors.value.phone 
}

const registerUser = async () => {
  if (validateForm()) 
  {
    addUser({
      name: name.value,
      last_name: last_name.value,
      email: email.value,
      cod_phone: cod_phone.value,
      phone: phone.value
    })
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Registrar Anunciante
        </h4>
      </div>
      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn
          variant="tonal"
          color="primary"
        >
          Cancelar
        </VBtn>
        <VBtn @click="registerUser">
          Registrar anunciante
        </VBtn>
      </div>
    </div>

    <VRow class="justify-center">
      <VCol md="8">
        <VCard title="Informaci&oacute;n del billboard">
          <VCardText>
            <VRow>
              <VCol cols="6">
                <AppTextField
                  v-model="name"
                  label="Nombre"
                  placeholder=""
                  :error="!!errors.name"
                  :error-messages="errors.name"
                />
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="last_name"
                  label="Apellido"
                  :error="!!errors.last_name"
                  :error-messages="errors.last_name"
                />
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="email"
                  label="Correo"
                  :error="!!errors.email"
                  :error-messages="errors.email"
                />
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="cod_phone"
                  label="Codigo de tel&eacute;fono"
                  placeholder="+591"
                  :error="!!errors.cod_phone"
                  :error-messages="errors.cod_phone"
                />
              </VCol>
              <VCol cols="6">
                <AppTextField
                  v-model="phone"
                  label="Tel&eacute;fono"
                  placeholder=""
                  :error="!!errors.phone"
                  :error-messages="errors.phone"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
