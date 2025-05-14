<script setup>
import { useUser } from '@/composables/User/useUser'

const props = defineProps({
  userData: {
    type: Object,
    required: false,
    default: () => ({
      id: 0,
      fullName: '',
      company: '',
      role: '',
      username: '',
      country: '',
      contact: '',
      email: '',
      currentPlan: '',
      status: '',
      avatar: '',
      taskDone: null,
      projectDone: null,
      taxId: '',
      language: '',
    }),
  },
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
})

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

const onFormSubmit = async() => {
  // emit('update:isDialogVisible', false)
  // emit('submit', userData.value)
  const result = await updateProfile(userData.value)
  result.success && emit('profileUpdated', userData.value)
  // dialogVisibleUpdate()
  emit('update:isDialogVisible', false)
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
