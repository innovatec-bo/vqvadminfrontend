<!-- eslint-disable camelcase -->
<script setup>
import { useCategory } from '@/composables/Category/useCategory'
import { useUser } from '@/composables/User/useUser'
import { watch } from 'vue'

const props = defineProps({
  isDialogVisible: { type: Boolean, required: true },
  user: { type: Object, required: true },
})

const emit = defineEmits(['update:isDialogVisible', 'userUpdated'])

const listStatus = ref([
  { value: 'active', title: 'ACTIVO' },
  { value: 'inactive', title: 'INACTIVO' },
])

const userTypes = [
  {value: 'PERSON', text: 'Persona'},
  {value: 'ORGANIZATION', text: 'Organizacion'}
];

const {loading, editUser } = useUser()
const { allCategories, categories } = useCategory()

allCategories({
  itemsPerPage: 200,
  page: 1,
})
// const formUser = ref({ ...props.user }) 
const formUser = ref({
  ...props.user,
  organization: props.user.organization ?? {},
  person: props.user.person ?? {},
})
const refInputEl = ref(null);
const avatarImg = computed({
  get() {
    return formUser.value.avatar?.md ?? null
  },
  set(newVal) {
    if (!formUser.value.avatar) {
      formUser.value.avatar = {}
    }
    formUser.value.avatar.md = newVal
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

const saveUser = async () => {
  const formData = new FormData()
  formData.append('_method', 'PUT')
  formData.append('id', formUser.value.id)  
  formData.append('name', formUser.value.name)
  formData.append('last_name', formUser.value.last_name)
  formData.append('email', formUser.value.email)
  formData.append('cod_phone', formUser.value.cod_phone)
  formData.append('phone', formUser.value.phone)
  formData.append('user_type', formUser.value.user_type)
  formData.append('entity_status', formUser.value.entity_status)

  if (avatarFile.value) 
  {
    formData.append('image', avatarFile.value)
  }
  if (formUser.value.user_type === 'PERSON' && formUser.value.person) {
    formData.append('ci', formUser.value.person.ci)
  } else if (formUser.value.user_type === 'ORGANIZATION' && formUser.value.organization) {
    formData.append('social_reason', formUser.value.organization.social_reason)
    formData.append('category_id', formUser.value.organization.category?.id ?? '')
    formData.append('name_contact', formUser.value.organization.name_contact)
    formData.append('phone_contact', formUser.value.organization.phone_contact)
    formData.append('commision_percentage', formUser.value.organization.commision_percentage)
    formData.append('nit', formUser.value.organization.nit)
  }
  // for (let [key, value] of formData.entries()) 
  // {
  //   console.log(`${key}:`, value)
  // }
  const result = await editUser(formData);
  result.success && emit('userUpdated', formUser.value)
  dialogVisibleUpdate()
}
watch(() => props.user, newUser => {
  formUser.value = {
    ...newUser,
    person: newUser.person ?? null,
    organization: newUser.organization ?? null,
  }
})
watch(() => formUser.value.user_type, newVal => {
  if (newVal === 'PERSON' && !formUser.value.person) {
    formUser.value.person = { ci: '' }
  } else if (newVal === 'ORGANIZATION' && !formUser.value.organization) {
    formUser.value.organization = {
      social_reason: '',
      category_id: null,
      name_contact: '',
      phone_contact: '',
      commision_percentage: '',
      nit: ''
    }
  }
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
    <VCard title="Editar proveedor" class="pa-sm-8 pa-5">
      <VCardText>
        <VForm @submit.prevent="saveUser">
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
                v-model="formUser.name"
                label="Nombres"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol cols="12" md="6">
              <AppTextField
                v-model="formUser.last_name"
                label="Apellidos"
                placeholder="..."
                outlined
              />
            </VCol>
            <VCol cols="6">
              <AppTextField
                v-model="formUser.email"
                label="Correo"
              />
            </VCol>
            <VCol cols="6">
              <AppTextField
                v-model="formUser.cod_phone"
                label="Codigo de tel&eacute;fono"
                placeholder="+591"
              />
            </VCol>
            <VCol cols="6">
              <AppTextField
                v-model="formUser.phone"
                label="Tel&eacute;fono"
                placeholder=""
              />
            </VCol>
            <VCol cols="12" md="6">
              <AppSelect
                v-model="formUser.entity_status"
                label="Estado"
                placeholder="Seleccione un estado"
                :items="listStatus"
                item-title="title"
                item-value="value"
                outlined
              />
            </VCol>
            <VCol cols="6">
                <AppAutocomplete
                  v-model="formUser.user_type"
                  placeholder="Elija una opcion"
                  :items="userTypes"
                  label="Tipo de usuario"
                  item-value="value"
                  item-title="text"
                  :menu-props="{ maxHeight: '200px' }"
                >
                  <template #append>
                    <VSlideXReverseTransition mode="out-in">
                    </VSlideXReverseTransition>
                  </template>
                </AppAutocomplete>
              </VCol>
              <VCol cols="6" v-if="formUser.user_type === 'PERSON'">
                <AppTextField
                  v-model="formUser.person.ci"
                  label="C.I."
                  placeholder=""
                />
              </VCol>
              <VCol cols="6" v-if="formUser.user_type === 'ORGANIZATION'">
                <AppTextField
                  v-model="formUser.organization.social_reason"
                  label="Raz&oacute;n social"
                  placeholder=""
                />
              </VCol>
              <VCol cols="12" v-if="formUser.user_type === 'ORGANIZATION'">
                <VRow>
                  <VCol cols="6">
                    <AppAutocomplete
                      v-model="formUser.organization.category"
                      placeholder="Elija una opcion"
                      :items="categories"
                      label="Categor&iacute;a"
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
                  <VCol cols="6">
                    <AppTextField
                      v-model="formUser.organization.name_contact"
                      label="Nombre de contacto"
                      placeholder=""
                    />
                  </VCol>
                  <VCol cols="6">
                    <AppTextField
                      v-model="formUser.organization.phone_contact"
                      label="Tel&eacute;fono de contacto"
                      placeholder=""
                    />
                  </VCol>
                  <VCol cols="6">
                    <AppTextField
                      v-model="formUser.organization.commision_percentage"
                      label="Porcentaje de comisi&oacute;n"
                      placeholder=""
                    />
                  </VCol>
                  <VCol cols="6">
                    <AppTextField
                      v-model="formUser.organization.nit"
                      label="NIT"
                      placeholder=""
                    />
                  </VCol>
                </VRow>
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
                :disabled="loading"
                :loading="loading"
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
