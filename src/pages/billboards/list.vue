<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import EditBillboardDialog from '@/components/billboard/EditBillboardDialog.vue'
import { useBillboard } from '@/composables/Billboard/useBillboard'
import { formatCurrency } from '@/utils/currencyFormatter'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { allBillboards, billboards, billboard, totalBillboards } = useBillboard()

const searchQuery = ref()
const itemsPerPage = ref(20)
const page = ref(1)
const isDialogEditBillboardVisible = ref(false)

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
    title: 'Estructura',
    key: 'billboard_structure.name',
  },
  {
    title: 'Tamanio',
    key: 'size',
  },
  {
    title: 'Precio',
    key: 'price_per_month',
  },
  {
    title: 'Ubicacion',
    key: 'location',
  },
  {
    title: 'Departamento',
    key: 'city.department',
  },
  {
    title: 'Ciudad',
    key: 'city.name',
  },
  {
    title: 'Zona',
    key: 'zone.name',
  },
  {
    title: 'Anunciante',
    key: 'advertiser.full_name',
  },
  {
    title: 'Accion',
    key: 'actions',
    sortable: false,
  },
]

const fetchList = () => {
  allBillboards({
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

const handleUpdateBillboard = async item => {
  isDialogEditBillboardVisible.value = true
  billboard.value = { ...item }
}

const handleBillboardUpdated = updatedBillboard => {
  const index = billboards.value.findIndex(p => p.id === updatedBillboard.id)
  if (index !== -1) {
    billboards.value[index] = { ...updatedBillboard }
  }
}

</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <div>
          <h5 class="text-h5">
            Billboards
          </h5>
          <div class="text-body-1">
            En total son {{ totalBillboards }} Billboards.
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
          <RouterLink :to="{ name: 'billboards-register' }">
            <VBtn>
              Agregar Billboard
            </VBtn>
          </RouterLink>
        </div>
      </VCardText>
      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="billboards"
        :headers="headers"
        :items-length="itemsPerPage.value === -1 ? billboards.value.length : totalBillboards.valueOf"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <!-- Price -->
        <template #item.base_price="{ item }">
          <div class="d-flex align-center gap-4">
            <span class="text-capitalize">{{ formatCurrency( item.base_price ) }}  </span>
          </div>
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
              {{ paginationMeta({ page, itemsPerPage }, totalBillboards) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalBillboards / itemsPerPage)"
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
          <!-- <IconBtn>
            <RouterLink :to="{ name: 'realty-property-id', params: { id: item.id } }">
              <VIcon icon="ti ti-eye" />
            </RouterLink>
          </IconBtn> -->
          <IconBtn>
            <VIcon
              icon="ti ti-edit"
              @click="handleUpdateBillboard(item)"
            />
          </IconBtn>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
    <EditBillboardDialog
      v-model:is-dialog-visible="isDialogEditBillboardVisible"
      :billboard="billboard"
      @billboard-updated="handleBillboardUpdated"
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
