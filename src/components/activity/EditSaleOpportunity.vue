<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import poraIcon from '@/assets/icons/poraIcon.png'
import { useProperty } from '@/composables/Realty/useProperty'
import { onMounted } from 'vue'

const props = defineProps({
  opportunity: {
    type: Object,
    required: true,
  },
})

const { property, allProperty, properties } = useProperty()

const markProcedureAsDone = (procedureId, isChecked) => {
  // Aquí puedes implementar la lógica para actualizar el estado del procedimiento.
  console.log(`Procedimiento ${procedureId} marcado como: ${isChecked ? 'realizado' : 'no realizado'}`)
}

onMounted(() => {
  allProperty({
    page: 1,
    itemsPerPage: 500,
  })
})
</script>

<template>
  <!-- Sección de Perfil -->
  <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
    <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
      <h4 class="mb-4">
        Perfil
      </h4>
      <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
        <div class="d-flex align-center gap-x-3">
          <span class="text-5xl font-weight-medium">
            {{ avatarText(props.opportunity.customer.name) }}
          </span>
          <div class="d-flex flex-column">
            <RouterLink
              :to="{ name: 'apps-ecommerce-customer-details-id', params: { id: 1 } }"
              class="font-weight-medium"
            >
              {{ props.opportunity.customer.name }}
            </RouterLink>
            <span class="text-sm text-disabled">{{ props.opportunity.customer.phone }}</span>
          </div>
        </div>

        <VBtn
          color="secondary"
          @click="openHistory"
        >
          Editar Perfil
        </VBtn>
      </div>
    </div>
  </VCardText>

  <!-- Sección de Proyecto -->
  <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
    <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
      <h4 class="mb-4">
        Proyecto
      </h4>
      <div class="d-flex align-center justify-center justify-sm-space-between flex-wrap gap-4">
        <!-- Selección del departamento -->
        <AppSelect
          label="Departamento de interés"
          :items="properties.map(property => ({
            name: property.title,
            value: property.id,
            avatar: poraIcon,
          }))"
          item-title="name"
          item-value="name"
          placeholder="Select Item"
          multiple
          clearable
          clear-icon="tabler-x"
        >
          <template #selection="{ item }">
            <VChip>
              <template #prepend>
                <VAvatar
                  start
                  :image="poraIcon"
                />
              </template>

              <span>{{ item.title }}</span>
            </VChip>
          </template>
        </AppSelect>
      </div>
    </div>
  </VCardText>

  <!-- Sección de Procedimientos -->
  <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
    <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
      <h4 class="mb-4">
        Procedimientos
      </h4>
      <div v-if="props.opportunity.procedure && props.opportunity.procedure.length > 0">
        <div
          v-for="procedure in props.opportunity.procedure"
          :key="procedure.id"
          class="d-flex align-center justify-between"
        >
          <span>{{ procedure.title }}</span>
          <VCheckbox
            v-model="procedure.pivot.is_check"
            label="Realizado?"
            @change="markProcedureAsDone(procedure.id, procedure.pivot.is_check)"
          />
        </div>
      </div>
      <div v-else>
        <span>No hay procedimientos disponibles.</span>
      </div>
    </div>
  </VCardText>
  

  <!-- Botón Generar Cotización -->
  <VCardText class="d-flex justify-center mt-4">
    <VBtn
      color="primary"
      large
      @click="generateQuote"
    >
      Generar Ventaaaaa
    </VBtn>
  </VCardText>
</template>

