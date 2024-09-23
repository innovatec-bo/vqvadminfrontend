<script setup>
import { useProperty } from '@/composables/Realty/useProperty'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { allProperty, properties, property, totalProperties, removeProperty } = useProperty()

const searchQuery = ref()
const itemsPerPage = ref(10)
const page = ref(1)
const isDialogEditPropertyVisible = ref(false)

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
}

// Headers
const headers = [
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
  case 'PRESOLD':
    return { color: 'warning', text: 'PRE VENTA' }
  case 'SOLD':
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

const viewProperty = async item => {
  await router.push({ name: 'owner-property-id', params: { id: item.id } })
}

const updateProperty = async item => {
  isDialogEditPropertyVisible.value = true
  property.value = item
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
            :model-value="itemsPerPage"
            :items="[
              { value: 10, title: '10' },
              { value: 25, title: '25' },
              { value: 50, title: '50' },
              { value: 100, title: '100' },
              { value: -1, title: 'All' },
            ]"
            style="inline-size: 5rem;"
            @update:model-value="value => itemsPerPage.value = parseInt(value, 10)"
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
        :items-per-page-options="[
          { value: 10, title: '10' },
          { value: 25, title: '25' },
          { value: 50, title: '50' },
          { value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' },
        ]"
        :items="properties"
        :items-length="itemsPerPage.value === -1 ? properties.value.length : totalProperties.value"
        :headers="headers"
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
            v-if="item.park"
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
              @click="updateProperty(item)"
            />
          </IconBtn>
          <IconBtn @click="deleteProperty(item.id)">
            <VIcon icon="tabler-trash" />
          </IconBtn>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
    <EditProperty
      v-model:isDialogVisible="isDialogEditPropertyVisible"
      :property="property"
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
