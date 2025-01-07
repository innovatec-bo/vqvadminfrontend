<script setup>
import { useAuth } from '@/composables/Auth/useAuth'
import { showWarningNotification } from '@/utils/notifications'

const {
  loading,
  error,
  resetUserPassword,
} = useAuth()

const isFormValid = ref(false)
const refForm = ref()
const passwordLengthValidator = value => value.length >= 8 || 'La contraseña debe tener al menos 8 caracteres'
const  lastPassword   = ref('')
const  newPassword   = ref('')
const  newPasswordConfirmation   = ref('')

const isLastPasswordVisible = ref(false)
const isNewPasswordVisible = ref(false)
const isConfirmPasswordVisible = ref(false)


const onFormSubmit = async () => {
  const { valid } = await refForm.value?.validate()
  if (valid) {
    if (lastPassword.value === newPassword.value) {
      showWarningNotification('ERROR', 'La nueva contraseña no puede ser igual que la antigua contraseña.')
      
      return
    }

    if (newPassword.value !== newPasswordConfirmation.value) {
      showWarningNotification('ERROR', 'La nueva contraseña y la confirmación de la contraseña no coinciden')
      
      return
    }

    await resetUserPassword({
      // eslint-disable-next-line camelcase
      current_password: lastPassword.value,
      // eslint-disable-next-line camelcase
      new_password: newPassword.value,
      // eslint-disable-next-line camelcase
      new_password_confirmation: newPasswordConfirmation.value,
    })
    

    nextTick(() => {
      refForm.value?.reset()
      refForm.value?.resetValidation()
    })
  }
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Cambiar Contraseña">
        <VCardText>
          <VAlert
            variant="tonal"
            color="warning"
            class="mb-4"
          >
            <VAlertTitle class="mb-2">
              Asegúrate de que se cumplan estos requisitos:
            </VAlertTitle>
            <span>Mínimo 8 caracteres de longitud, Mayúsculas y símbolo</span>
          </VAlert>
          <VForm 
            ref="refForm"
            v-model="isFormValid"
            @submit.prevent="onFormSubmit"
          >
            <VRow>
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="lastPassword"
                  label="Antigua Contraseña"
                  placeholder="············"
                  :rules="[requiredValidator,passwordLengthValidator]"
                  :type="isLastPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isLastPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isLastPasswordVisible = !isLastPasswordVisible"
                />
              </VCol>
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="newPassword"
                  label="Nueva Contraseña"
                  placeholder="············"
                  :rules="[requiredValidator,passwordLengthValidator]"
                  :type="isNewPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isNewPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isNewPasswordVisible = !isNewPasswordVisible"
                />
              </VCol>
              <VCol
                cols="12"
                md="4"
              >
                <AppTextField
                  v-model="newPasswordConfirmation"
                  label="Confirmar Contraseña"
                  placeholder="············"
                  :rules="[requiredValidator,passwordLengthValidator]"
                  :type="isConfirmPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isConfirmPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isConfirmPasswordVisible = !isConfirmPasswordVisible"
                />
              </VCol>

              <VCol cols="12">
                <VBtn type="submit">
                  Cambiar Contraseña
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
