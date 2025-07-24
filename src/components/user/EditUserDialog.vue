<!-- eslint-disable camelcase -->
<script setup>
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

const {loading, editUser } = useUser()
const formUser = ref({ ...props.user }) 
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

  const result = await editUser(formData);
  result.success && emit('userUpdated', formUser.value)
  dialogVisibleUpdate()
}
watch(() => props.user, newUser => {
  formUser.value = { ...newUser }
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
    <VCard title="Editar usuario" class="pa-sm-8 pa-5">
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
