<script setup>
import { useUser } from '@/composables/User/useUser'

const props = defineProps({
  userData: {
    type: Object,
    required: false,
    default: () => ({
      id: 0,
      fullName: '',
      email: '',
      avatar: '',
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

const avatarFile = ref([])
const previewAvatar = ref(props.userData.avatar.sm)

const onAvatarChange = files => {
  if (!files || files.length === 0) return

  const selectedFile = files[0]

  const reader = new FileReader()
  reader.onload = () => {
    previewAvatar.value = reader.result
  }
  reader.readAsDataURL(selectedFile)
}

const emit = defineEmits([
  'submit',
  'update:isDialogVisible',
])
const { updateProfile } = useUser()
const userData = ref(structuredClone(toRaw(props.userData)))
const isUseAsBillingAddress = ref(false)

watch(props, () => {
  userData.value = structuredClone(toRaw(props.userData))
})

const onFormSubmit = async () => {
  const formData = new FormData()
  formData.append('_method', 'PUT')

  Object.entries(userData.value).forEach(([key, value]) => {
    if (value !== null && typeof value === 'object' && !(value instanceof File)) {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  })

  if (avatarFile.value && avatarFile.value.length > 0) {
    formData.append('image', avatarFile.value[0])
  }

  const result = await updateProfile(formData)

  if (result.success) {
    emit('profileUpdated', userData.value)
    emit('update:isDialogVisible', false)
  }
}
const onFormSubmit_old = async () => {
  const formData = new FormData()
  formData.append('_method', 'PUT')
  Object.entries(userData.value).forEach(([key, value]) => {
    formData.append(key, value)
  })

  if (avatarFile.value && avatarFile.value.length > 0) {
    formData.append('image', avatarFile.value[0])
  }

  console.log('AvatarFile:', avatarFile.value[0])
  console.log('FormData entries:')
  formData.append('name', userData.name)
  for (let pair of formData.entries()) {
    console.log(pair[0]+ ': ' + pair[1])
  }

  const result = await updateProfile(formData)
  if (result.success) {
    emit('profileUpdated', userData.value)
    emit('update:isDialogVisible', false)
  }
}

const onFormReset = () => {
  userData.value = structuredClone(toRaw(props.userData))
  emit('update:isDialogVisible', false)
}

const dialogModelValueUpdate = val => {
  emit('update:isDialogVisible', val)
}
</script>

<template>
  <VDialog
    :width="$vuetify.display.smAndDown ? 'auto' : 677"
    :model-value="props.isDialogVisible"
    @update:model-value="dialogModelValueUpdate"
  >
    <!-- Dialog close btn -->
    <DialogCloseBtn @click="dialogModelValueUpdate(false)" />

    <VCard class="pa-sm-8 pa-5">
      <VCardItem class="text-center">
        <VCardTitle class="text-h3 mb-3">
          Editar informaci&oacute;n del usuario
        </VCardTitle>
      </VCardItem>

      <VCardText>
        <!-- 👉 Form -->
        <VForm
          ref="refForm"
          class="mt-6"
          @submit.prevent="onFormSubmit"
        >
          <VRow class="justify-center">
            <!-- 👉 Avatar preview -->
            <VCol
              cols="12"
              class="text-center"
            >
            <VImg
              v-if="previewAvatar"
              :src="previewAvatar"
              class="mt-4 mx-auto"
              max-width="150"
            />
            </VCol>

            <!-- 👉 Avatar input -->
            <VCol
              cols="12"
              md="6"
            >
            <VFileInput
              label="Seleccionar foto de perfil"
              accept="image/*"
              prepend-icon="ti ti-camera"
              :multiple="false"
              v-model="avatarFile"
              @update:model-value="onAvatarChange"
            />
            </VCol>
          </VRow>
          <VRow>
            <!-- 👉 First Name -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.name"
                label="Nombre"
                placeholder=""
              />
            </VCol>
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.last_name"
                label="Apellido"
                placeholder=""
              />
            </VCol>

            <!-- 👉 Email -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.email"
                label="Email"
                :readonly=true
                placeholder="johndoe@email.com"
              />
            </VCol>

            <!-- 👉 Cod. Phone -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.cod_phone"
                label="Cod. Tel&eacute;fono"
                placeholder=""
              />
            </VCol>

            <!-- 👉 Phone -->
            <VCol
              cols="12"
              md="6"
            >
              <AppTextField
                v-model="userData.phone"
                label="Tel&eacute;fono"
                placeholder=""
              />
            </VCol>

            <!-- 👉 Submit and Cancel -->
            <VCol
              cols="12"
              class="d-flex flex-wrap justify-center gap-4"
            >
              <VBtn type="submit">
                Guardar
              </VBtn>

              <VBtn
                color="secondary"
                variant="tonal"
                @click="onFormReset"
              >
                Cancelar
              </VBtn>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </VDialog>
</template>
