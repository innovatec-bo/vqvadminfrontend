<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import EditPropertyDialog from '@/components/realty/property/EditPropertyDialog.vue'
import { useProperty } from '@/composables/Realty/useProperty'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { allProperty, properties, property, totalProperties, removeProperty } = useProperty()

const searchQuery = ref()
const itemsPerPage = ref(20)
const page = ref(1)
const isDialogEditPropertyVisible = ref(false)

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
}

// Headers
const headers = [
  {
    title: 'Titulo',
    key: 'title',
  },
  {
    title: 'Code',
    key: 'code',
  },
  {
    title: 'Precio',
    key: 'base_price',
  },
  {
    title: 'Tipo de Propiedad',
    key: 'typeProperty',
  },
  {
    title: 'Proyecto',
    key: 'project',
  },
  {
    title: 'Estado',
    key: 'status',
  },
  {
    title: 'Accion',
    key: 'actions',
    sortable: false,
  },
]

const fetchProperties = () => {
  allProperty({
    itemsPerPage: itemsPerPage.value,
    page: page.value,
    search: searchQuery.value,
  })
}

const debouncedFetch = debounce(fetchProperties, 300)

// Observar múltiples reactivos con opción immediate
watch([searchQuery, itemsPerPage, page], debouncedFetch, { immediate: true })

const resolvePropertyStatusVariant = stat => {
  switch (stat) {
  case 'AVAILABLE':
    return { color: 'success', text: 'DISPONIBLE' }
  case 'PRESALE':
    return { color: 'warning', text: 'PRE VENTA' }
  case 'SALE':
    return { color: 'error', text: 'VENDIDO' }
  case 'DELIVERED':
    return { color: 'error', text: 'ENTREGADO' }
  default:
    return { color: 'primary', text: 'NOTHING' }
  }
}

const deleteProperty = async id => {
  await removeProperty(id)
  fetchProperties()
}

const handleUpdateProperty = async item => {
  isDialogEditPropertyVisible.value = true
  property.value = { ...item }
}

const handlePropertyUpdated = updatedProperty => {
  const index = properties.value.findIndex(p => p.id === updatedProperty.id)
  if (index !== -1) {
    properties.value[index] = { ...updatedProperty }
  }
}
</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <div>
          <h5 class="text-h5">
            Mis Propiedades
          </h5>
          <div class="text-body-1">
            En total son {{ totalProperties }} Propiedades.
          </div>
        </div>
        <VSpacer />
        <div class="d-flex align-center flex-wrap gap-4">
          <AppSelect
            v-model="itemsPerPage"
            density="compact"
            :items="[5, 10, 20, 50, 100]"
          />
          <!-- 👉 Search  -->
          <AppTextField
            v-model="searchQuery"
            placeholder="Buscar..."
            density="compact"
            style="inline-size: 12.5rem;"
          />
          <RouterLink :to="{ name: 'realty-property-register' }">
            <VBtn>
              Agregar Propiedad
            </VBtn>
          </RouterLink>
        </div>
      </VCardText>
      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="properties"
        :headers="headers"
        :items-length="itemsPerPage.value === -1 ? properties.value.length : totalProperties.valueOf"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Price -->
        <template #item.base_price="{ item }">
          <div class="d-flex align-center gap-4">
            <span class="text-capitalize">{{ item.base_price }} $ </span>
          </div>
        </template>

        <!-- Plan -->
        <template #item.typeProperty="{ item }">
          <span
            v-if="item.parking"
            class="text-capitalize font-weight-medium"
          >Parqueo</span>
          <span
            v-if="item.departament"
            class="text-capitalize font-weight-medium"
          >Departamento</span>
        </template>

        <!-- Status -->
        <template #item.status="{ item }">
          <VChip
            label
            size="small"
            class="text-capitalize"
            :color="resolvePropertyStatusVariant(item.status).color"
          >
            {{ resolvePropertyStatusVariant(item.status).text }}
          </VChip>
        </template>


        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalProperties) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalProperties / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : 7"
            >
              <template #prev="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Anterior
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Siguiente
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>

        <!-- Actions -->
        <template #item.actions="{ item }">
          <IconBtn>
            <RouterLink :to="{ name: 'realty-property-id', params: { id: item.id } }">
              <VIcon icon="tabler-eye" />
            </RouterLink>
          </IconBtn>
          <IconBtn>
            <VIcon
              icon="tabler-edit"
              @click="handleUpdateProperty(item)"
            />
          </IconBtn>
          <IconBtn @click="deleteProperty(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
    <EditPropertyDialog
      v-model:is-dialog-visible="isDialogEditPropertyVisible"
      :property="property"
      @property-updated="handlePropertyUpdated"
    />
  </section>
</template>


<style lang="scss">
.text-capitalize {
  text-transform: capitalize;
}

.user-list-name:not(:hover) {
  color: rgba(var(--v-theme-on-background), var(--v-medium-emphasis-opacity));
}
</style>
