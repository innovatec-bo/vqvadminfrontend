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
const quotes = ref([])

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
  <!-- Sección de Cotizaciones -->
  <VCardText class="d-flex align-bottom flex-sm-row flex-column justify-center gap-x-5">
    <div class="user-profile-info w-100 mt-16 pt-6 pt-sm-0 mt-sm-0">
      <h4 class="mb-4">
        Cotizaciones
      </h4>
      
      <!-- Tabla de cotizaciones -->
      <VTable
        v-if="quotes.length"
        class="mt-4"
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Monto</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="quote in quotes"
            :key="quote.id"
          >
            <td>{{ quote.id }}</td>
            <td>{{ quote.date }}</td>
            <td>{{ quote.amount }}</td>
            <td>{{ quote.status }}</td>
          </tr>
        </tbody>
      </VTable>
      <p v-else>
        No hay cotizaciones disponibles.
      </p>
    </div>
  </VCardText>

  <!-- Botón Generar Cotización -->
  <VCardText class="d-flex justify-center mt-4">
    <VBtn
      color="primary"
      large
      class="mx-2" 
      @click="generateQuote"
    >
      Nueva Cotizacion
    </VBtn>
    <VBtn
      color="primary"
      class="mx-auto"
    >
      Siguiente Etapa
    </VBtn>
  </VCardText>
</template>

