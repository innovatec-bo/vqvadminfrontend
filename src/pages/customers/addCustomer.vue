<script setup>
import TiptapEditor from '@/@core/components/TiptapEditor.vue'
import { useCustomer } from '@/composables/Customer/useCustomer'
import { ref } from 'vue'

const content = ref('')
const { addCustomer, loading, error, customer } = useCustomer()

// Datos del formulario
const customerForm = ref({
  name: null,
  countryCode: '+591',
  phone: null,
  email: null,
  ci: null,
  description: null,
})

// Referencia para el formulario
const formRef = ref(null)

// Validaciones personalizadas
const isRequired = value => !!value || 'Este campo es obligatorio.'
const isMinLength = (value, length) => (value && value.length >= length) || `Debe tener al menos ${length} caracteres.`
const isValidEmail = value => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Debe ser un correo válido.'

// Registro de cliente
const registerCustomer = async () => {
  // Validar el formulario antes de enviar
  if (formRef.value.validate()) {
    await addCustomer(customerForm.value)
  }
}
</script>

<template>
  <div>
    <div class="d-flex flex-wrap justify-start justify-sm-space-between gap-y-4 gap-x-6 mb-6">
      <div class="d-flex flex-column justify-center">
        <h4 class="text-h4 font-weight-medium">
          Registrar Cliente
        </h4>
        <span>Agrega un Nuevo Cliente Potencial</span>
      </div>

      <div class="d-flex gap-4 align-center flex-wrap">
        <VBtn
          variant="tonal"
          color="primary"
        >
          <RouterLink
            class="text-primary ms-2 mb-1"
            :to="{ name: 'customers-list-customers' }"
          >
            Cancelar
          </RouterLink>
        </VBtn>
        <VBtn
          :disabled="loading"
          :loading="loading"
          @click="registerCustomer"
        >
          Registrar Cliente
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
            title="Información del Cliente"
          >
            <VCardText>
              <VRow>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="customerForm.name"
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
                        v-model="customerForm.countryCode"
                        label="Cod País"
                        :items="['+591']"
                      />
                    </VCol>
                    <VCol md="8">
                      <AppTextField
                        v-model="customerForm.phone"
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
                  md="6"
                >
                  <AppTextField
                    v-model="customerForm.email"
                    label="Correo (Opcional)"
                    placeholder="alex@canzza.com"
                    :rules="[(v) => isValidEmail(v)]"
                  />
                </VCol>
                <VCol
                  cols="12"
                  md="6"
                >
                  <AppTextField
                    v-model="customerForm.ci"
                    label="CI (Opcional)"
                    placeholder="0123-4567"
                  />
                </VCol>
                <VCol>
                  <span class="mb-1">Descripción (Opcional)</span>
                  <TiptapEditor
                    v-model="customerForm.description"
                    placeholder="Descripción del Cliente"
                    class="border rounded"
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
