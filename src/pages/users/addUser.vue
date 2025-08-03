<script setup>
import { useUser } from '@/composables/User/useUser';
import avatar1 from '@images/logos/vqvlogo.png';
import { ref } from 'vue';

const { addUser } = useUser()

const refInputEl = ref(null);
const avatarImg = ref(avatar1);
const avatarFile = ref(null);
const name = ref('')
const last_name = ref('')
const email = ref(null);
const cod_phone = ref(null);
const phone = ref(null)

const errors = ref({
  title: '',
  description: '',
})

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
    // addUser({
    //   name: name.value,
    //   last_name: last_name.value,
    //   email: email.value,
    //   cod_phone: cod_phone.value,
    //   phone: phone.value
    // })
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('last_name', last_name.value)
    formData.append('email', email.value)
    formData.append('cod_phone', cod_phone.value)
    formData.append('phone', phone.value)
    formData.append('password', phone.value)
    formData.append('rol', 'ANUNCIANTE')
    formData.append('user_type', 'PERSON')
    if (avatarFile.value) 
    {
      formData.append('image', avatarFile.value)
    }
    addUser(formData)
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
        <RouterLink :to="{ name: 'users-list-users' }">
          <VBtn
            variant="tonal"
            color="primary"
          >
            Cancelar
          </VBtn>
        </RouterLink>
        <VBtn @click="registerUser">
          Registrar anunciante
        </VBtn>
      </div>
    </div>

    <VRow class="justify-center">
      <VCol md="8">
        <VCard title="Informaci&oacute;n del anunciante">
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
