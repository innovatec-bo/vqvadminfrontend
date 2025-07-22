<script setup>
import { useUser } from '@/composables/User/useUser'
import { ref } from 'vue'

const content = ref('')
const { addUser, loading, error, user } = useUser()

// Datos del formulario
const userForm = ref({
  name: null,
  countryCode: '+591',
  phone: null,
  email: null,
  ci: null,
  description: null,
  // eslint-disable-next-line camelcase
  type_user: null,
})

// Referencia para el formulario
const formRef = ref(null)

// Validaciones personalizadas
const isRequired = value => !!value || 'Este campo es obligatorio.'
const isMinLength = (value, length) => (value && value.length >= length) || `Debe tener al menos ${length} caracteres.`
const isValidEmail = value => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Debe ser un correo válido.'

// Registro de cliente
const registerUser = async () => {
  // Validar el formulario antes de enviar
  console.log(userForm.value)
  if (formRef.value.validate()) {
    await addUser(userForm.value)
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Registrar Usuario
        </h4>
        <span>Agrega nuevo usuario</span>
      </div>

      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn
          variant="tonal"
          color="primary"
        >
          <RouterLink
            class="text-primary ms-2 mb-1"
            :to="{ name: 'users-list-users' }"
          >
            Cancelar
          </RouterLink>
        </VBtn>
        <VBtn
          :disabled="loading"
          :loading="loading"
          @click="registerUser"
        >
          Registrar Usuario
        </VBtn>
      </div>
    </div>

    <!-- Formulario v-form -->
    <VForm
      ref="formRef"
      v-slot="{ errors }"
    >
      <VRow>
        <VCol>
          <VCard
            class="mb-6"
            title="Información del Usuario"
          >
            <VCardText>
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="userForm.name"
                    label="Nombre (Obligatorio)"
                    placeholder="Diego Rojas"
                    :rules="[isRequired, (v) => isMinLength(v, 3)]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <VRow>
                    <VCol md="4">
                      <AppSelect
                        v-model="userForm.countryCode"
                        label="Cod País"
                        :items="[
                          '+1', // Estados Unidos y Canadá
                          '+52',
                          '+55', // Brasil
                          '+54', // Argentina
                          '+49', // Alemania
                          '+33', // Francia
                          '+34', // España
                          '+39', // Italia
                          '+86', // China
                          '+81', // Japón
                          '+7', // Rusia
                          '+591' // Bolivia
                        ]"
                      />
                    </VCol>
                    <VCol md="8">
                      <AppTextField
                        v-model="userForm.phone"
                        type="number"
                        label="Celular"
                        placeholder="76543210"
                        :rules="[isRequired, (v) => isMinLength(v, 8)]"
                      />
                    </VCol>
                  </VRow>
                </VCol>
                <VCol
                  cols="12"
                  md="4"
                >
                  <AppTextField
                    v-model="userForm.email"
                    label="Correo (Opcional)"
                    placeholder="alex@canzza.com"
                    :rules="[(v) => isValidEmail(v)]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="4"
                >
                  <AppTextField
                    v-model="userForm.ci"
                    label="CI (Opcional)"
                    placeholder="0123-4567"
                  />
                </VCol>
                <VCol md="4">
                  <AppSelect
                    v-model="userForm.type_customer"
                    label="Tipo de cliente"
                    :items="[
                      'Olvidadizo', 
                      'Familiar',
                      'Decidido',
                      'Indeciso',
                      'Exigente',
                      'Referido',
                      'Inversionista',
                      'Recuperado',
                      'Curioso',
                    ]"
                  />
                </VCol>
                <VCol>
                  <AppTextarea
                    v-model="userForm.description"
                    label="Descripción (opcional)"
                    placeholder="Ingresa una descripción"
                    rows="3"
                    auto-grow
                    outlined
                  />
                </VCol>
              </VRow>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </VForm>
  </div>
</template>

<style lang="scss" scoped>
.drop-zone {
  border: 2px dashed rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 6px;
}
</style>
