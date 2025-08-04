<script setup>
import { useCategory } from '@/composables/Category/useCategory';
import { useUser } from '@/composables/User/useUser';
import avatar1 from '@images/avatars/default-avatar.png';
import { ref } from 'vue';

const { loading, addUser } = useUser()
const { allCategories, categories } = useCategory()

const refInputEl = ref(null);
const avatarImg = ref(avatar1);
const avatarFile = ref(null);
const name = ref('');
const last_name = ref('');
const email = ref(null);
const cod_phone = ref(null);
const phone = ref(null);
const userType = ref('PERSON');
//Required for organizations
const socialReason = ref(null);
const category = ref(null);
const nameContact = ref(null);
const phoneContact = ref(null);
const commisionPercentage = ref(null);
const nit = ref(null);
//Required for person
const ci = ref(null);

allCategories({
  itemsPerPage: 200,
  page: 1,
})

const userTypes = [
  {value: 'PERSON', text: 'Persona'},
  {value: 'ORGANIZATION', text: 'Organizacion'}
];

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
  errors.value.userType = userType.value?'' : 'El tipo de usuario es obligatorio'
  
  if (userType.value === 'PERSON') 
  {
    errors.value.ci = ci.value ? '' : 'El CI es obligatorio.'
  } 
  else if (userType.value === 'ORGANIZATION') 
  {
    errors.value.socialReason = socialReason.value ? '' : 'La razón social es obligatoria.'
    errors.value.category = category.value ? '' : 'La categoría es obligatoria.'
    errors.value.nameContact = nameContact.value ? '' : 'El nombre del contacto es obligatorio.'
    const phoneContactValue = Number(phoneContact.value)
    if (!phoneContact.value) {
      errors.value.phoneContact = 'Este campo es obligatorio.'
    } else if (!Number.isInteger(phoneContactValue)) {
      errors.value.phoneContact = 'Solo se permiten caracteres numericos.'
    }

    const value = Number(commisionPercentage.value)
    if (!commisionPercentage.value) {
      errors.value.commisionPercentage = 'Este campo es obligatorio.'
    } else if (!Number.isInteger(value) || value < 0 || value > 100) {
      errors.value.commisionPercentage = 'Debe ser un número entero entre 0 y 100.'
    }
    errors.value.nit = nit.value ? '' : 'El NIT es obligatorio.'
  }

  return Object.values(errors.value).every(error => !error)
}

const registerUser = async () => {
  if (validateForm()) 
  {
    const formData = new FormData()
    formData.append('name', name.value)
    formData.append('last_name', last_name.value)
    formData.append('email', email.value)
    formData.append('cod_phone', cod_phone.value)
    formData.append('phone', phone.value)
    formData.append('password', phone.value)
    formData.append('rol', 'ANUNCIANTE')
    formData.append('user_type', userType.value)
    if (avatarFile.value) 
    {
      formData.append('image', avatarFile.value)
    }

    if (userType.value === 'PERSON') 
    {
      formData.append('ci', ci.value)
    } 
    else if (userType.value === 'ORGANIZATION') 
    {
      formData.append('social_reason', socialReason.value)
      formData.append('category_id', category.value.id)
      formData.append('name_contact', nameContact.value)
      formData.append('phone_contact', phoneContact.value)
      formData.append('commision_percentage', commisionPercentage.value)
      formData.append('nit', nit.value)
    }

    // for (let [key, value] of formData.entries()) 
    // {
    //   console.log(`${key}:`, value)
    // }
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
        <VBtn 
          @click="registerUser"
          :disabled="loading"
          :loading="loading"
          >
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
              <VCol cols="6">
                <AppAutocomplete
                  v-model="userType"
                  placeholder="Elija una opcion"
                  :items="userTypes"
                  label="Tipo de usuario"
                  item-value="value"
                  item-title="text"
                  :menu-props="{ maxHeight: '200px' }"
                  :error="!!errors.userType"
                  :error-messages="errors.userType"
                >
                  <template #append>
                    <VSlideXReverseTransition mode="out-in">
                    </VSlideXReverseTransition>
                  </template>
                </AppAutocomplete>
              </VCol>
              <VCol cols="12" v-if="userType === 'PERSON'">
                <VRow>
                  <VCol cols="6">
                    <AppTextField
                      v-model="ci"
                      label="C.I."
                      placeholder=""
                      :error="!!errors.name"
                      :error-messages="errors.name"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="12" v-if="userType === 'ORGANIZATION'">
                <VRow>
                  <VCol cols="6">
                    <AppTextField
                      v-model="socialReason"
                      label="Raz&oacute;n social"
                      placeholder=""
                      :error="!!errors.socialReason"
                      :error-messages="errors.socialReason"
                    />
                  </VCol>
                  <VCol cols="6">
                    <AppAutocomplete
                      v-model="category"
                      placeholder="Elija una opcion"
                      :items="categories"
                      label="Categor&iacute;a"
                      item-title="name"
                      :item-value="item => item"
                      persistent-hint
                      :menu-props="{ maxHeight: '200px' }"
                      :error="!!errors.category"
                      :error-messages="errors.category"
                    >
                      <template #append>
                        <VSlideXReverseTransition mode="out-in">
                        </VSlideXReverseTransition>
                      </template>
                    </AppAutocomplete>
                  </VCol>
                  <VCol cols="6">
                    <AppTextField
                      v-model="nameContact"
                      label="Nombre de contacto"
                      placeholder=""
                      :error="!!errors.nameContact"
                      :error-messages="errors.nameContact"
                    />
                  </VCol>
                  <VCol cols="6">
                    <AppTextField
                      v-model="phoneContact"
                      label="Tel&eacute;fono de contacto"
                      placeholder=""
                      :error="!!errors.phoneContact"
                      :error-messages="errors.phoneContact"
                    />
                  </VCol>
                  <VCol cols="6">
                    <AppTextField
                      v-model="commisionPercentage"
                      label="Porcentaje de comisi&oacute;n"
                      placeholder=""
                      :error="!!errors.commisionPercentage"
                      :error-messages="errors.commisionPercentage"
                    />
                  </VCol>
                  <VCol cols="6">
                    <AppTextField
                      v-model="nit"
                      label="NIT"
                      placeholder=""
                      :error="!!errors.nit"
                      :error-messages="errors.nit"
                    />
                  </VCol>
                </VRow>
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
