<script setup>
import { useActivity } from '@/composables/Activity/useActivity'
import { useCustomer } from '@/composables/Customer/useCustomer'
import { onMounted } from 'vue'

const content = ref('')
const { getallTypeActivities, typeActivities } = useActivity()
const { addCustomer, loading, error, customer } = useCustomer()

const allTypeActivity = async () => {
  await getallTypeActivities()
}

const registerCustomer = async () => {

}

onMounted(allTypeActivity)
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
          color="secondary"
        >
          Discard
        </VBtn>
        <VBtn
          variant="tonal"
          color="primary"
        >
          Save Draft
        </VBtn>
        <VBtn>Publish Product</VBtn>
      </div>
    </div>

    <VRow>
      <VCol md="8">
        <!-- 👉 Product Information -->
        <VCard
          class="mb-6"
          title="Informacion del Cliente"
        >
          <VCardText>
            <VRow>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Nombre (Obligatorio)"
                  placeholder="Diego Rojas"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <VRow class="mx-1">
                  <AppSelect
                    class="px-1"
                    label="Cod Pais"
                    :items="['+591']"
                  />
                  <AppTextField
                    type="number"
                    label="Celular"
                    placeholder="76543210"
                  />
                </VRow>
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="Correo (Opcional)"
                  placeholder="alex@canzza.com"
                />
              </VCol>
              <VCol
                cols="12"
                md="6"
              >
                <AppTextField
                  label="CI (Opcional)"
                  placeholder="0123-4567"
                />
              </VCol>
              <VCol>
                <span class="mb-1">Descripcion (Opcional)</span>
                <TiptapEditor
                  v-model="content"
                  placeholder="Descripcion del Cliente "
                  class="border rounded"
                />
              </VCol>
            </VRow>
          </VCardText>
        </VCard>
      </VCol>

      <VCol
        md="4"
        cols="12"
      >
        <!-- 👉 Organize -->
        <VCard title="Informacion Adicional">
          <VCardText>
            <div class="d-flex flex-column gap-y-4">
              <AppSelect
                placeholder="Seleccione un Estado (Obligatorio)"
                label="Estado del Cliente"
                :items="typeActivities.map(activity => activity.name)"
              />
              <AppSelect
                placeholder="Metodo de Contacto (Opcional)"
                label="Metodo de Contacto (Opcional)"
                :items="['Men\'s Clothing', 'Women\'s Clothing', 'Kid\'s Clothing']"
              />
              <AppSelect
                placeholder="Como nos Conocio (Opcional)"
                label="Como nos Conocio (Opcional)"
                :items="['Published', 'Inactive', 'Scheduled']"
              />
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
  .drop-zone {
    border: 2px dashed rgba(var(--v-theme-on-surface), 0.12);
    border-radius: 6px;
  }
</style>

<style lang="scss">
.inventory-card{
  .v-radio-group,
  .v-checkbox {
    .v-selection-control {
      align-items: start !important;

      .v-selection-control__wrapper{
        margin-block-start: -0.375rem !important;
      }
    }

    .v-label.custom-input {
      border: none !important;
    }
  }

  .v-tabs.v-tabs-pill {
    .v-slide-group-item--active.v-tab--selected.text-primary {
      h6{
        color: #fff !important
      }
    }
  }

}

.ProseMirror{
  p{
    margin-block-end: 0;
  }

  padding: 0.5rem;
  outline: none;

  p.is-editor-empty:first-child::before {
    block-size: 0;
    color: #adb5bd;
    content: attr(data-placeholder);
    float: inline-start;
    pointer-events: none;
  }
}
</style>
