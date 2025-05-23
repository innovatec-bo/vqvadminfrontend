<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import EditPropertyDialog from '@/components/realty/property/EditPropertyDialog.vue'
import { useBillboard } from '@/composables/Billboard/useBillboard'
import { formatCurrency } from '@/utils/currencyFormatter'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { allBillboard, exportPropertyExcel,  properties, property, totalProperties, removeProperty } = useBillboard()

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
    title: 'Nombre',
    key: 'name',
  },
  {
    title: 'Ubicacion',
    key: 'location',
  },
  {
    title: 'Tamanio',
    key: 'size',
  },
  {
    title: 'Estado',
    key: 'status',
  },
  {
    title: 'Precio',
    key: 'price_per_month',
  },
  {
    title: 'Departamento',
    key: 'billboard.city.department',
  },
  {
    title: 'Ciudad',
    key: 'billboard.city.name',
  },
  {
    title: 'Accion',
    key: 'actions',
    sortable: false,
  },
]

const fetchList = () => {
  allBillboard({
    itemsPerPage: itemsPerPage.value,
    page: page.value,
    search: searchQuery.value,
  })
}

const debouncedFetch = debounce(fetchList, 300)

// Observar múltiples reactivos con opción immediate
watch([searchQuery, itemsPerPage, page], debouncedFetch, { immediate: true })

const resolvePropertyStatusVariant = stat => {
  switch (stat) {
  case 'available':
    return { color: 'success', text: 'DISPONIBLE' }
  case 'reserved':
    return { color: 'warning', text: 'RESERVADO' }
  case 'rented':
    return { color: 'error', text: 'RENTADO' }
  case 'inactive':
    return { color: 'error', text: 'INACTIVO' }
  default:
    return { color: 'primary', text: 'NOTHING' }
  }
}

const deleteProperty = async id => {
  await removeProperty(id)
  fetchList()
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


const ExportExcell = async ()=>{
  await exportPropertyExcel()
}
</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <div>
          <h5 class="text-h5">
            Vallas
          </h5>
          <div class="text-body-1">
            En total son {{ totalProperties }} Vallas.
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
          <VBtn
            prepend-icon="tabler-screen-share"
            variant="tonal"
            color="secondary"
            @click="ExportExcell"
          >
            Export
          </VBtn>
          <RouterLink :to="{ name: 'billboards-register' }">
            <VBtn>
              Agregar Valla
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
            <span class="text-capitalize">{{ formatCurrency( item.base_price ) }}  </span>
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
