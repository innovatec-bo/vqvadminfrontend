<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import EditPropertyDialog from '@/components/realty/property/EditPropertyDialog.vue'
import { useBillboardFace } from '@/composables/BillboardFace/useBillboardFace'
import { formatCurrency } from '@/utils/currencyFormatter'
import { paginationMeta } from '@api-utils/paginationMeta'
import dayjs from 'dayjs'
import { debounce } from 'lodash'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { getAllBillboardFaces,  billboardFaces, billboardFace, totalBillboardFaces } = useBillboardFace()

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
    title: 'Codigo',
    key: 'code',
  },
  {
    title: 'Cara',
    key: 'face',
  },
  {
    title: 'Estado',
    key: 'status',
  },
  {
    title: 'Rentado desde',
    key: 'rented_from',
  },
  {
    title: 'Disponible desde',
    key: 'available_from',
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
  getAllBillboardFaces({
    itemsPerPage: itemsPerPage.value,
    page: page.value,
    search: searchQuery.value,
  })
}

const debouncedFetch = debounce(fetchList, 300)

// Observar múltiples reactivos con opción immediate
watch([searchQuery, itemsPerPage, page], debouncedFetch, { immediate: true })

const resolveBillboardFaceStatus = stat => {
  switch (stat) {
  case 'ROJO':
    return { color: 'danger', text: 'ROJO' }
  case 'AMARILLO':
    return { color: 'warning', text: 'AMARILLO' }
  case 'VERDE':
    return { color: 'success', text: 'VERDE' }
  default:
    return { color: 'primary', text: 'INDEFINIDO' }
  }
}

const deleteProperty = async id => {
  await removeProperty(id)
  fetchList()
}

const handleUpdateBillboardFace = async item => {
  isDialogEditPropertyVisible.value = true
  billboardFace.value = { ...item }
}

const handleBillboardFaceUpdated = updatedProperty => {
  const index = billboardFaces.value.findIndex(p => p.id === updatedProperty.id)
  if (index !== -1) {
    billboardFaces.value[index] = { ...updatedProperty }
  }
}


// const ExportExcell = async ()=>{
//   await exportPropertyExcel()
// }
</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <div>
          <h5 class="text-h5">
            Caras
          </h5>
          <div class="text-body-1">
            En total son {{ totalBillboardFaces }} caras.
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
          <!-- <RouterLink :to="{ name: 'billboards-register' }">
            <VBtn>
              Agregar Valla
            </VBtn>
          </RouterLink> -->
        </div>
      </VCardText>
      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="billboardFaces"
        :headers="headers"
        :items-length="itemsPerPage.value === -1 ? billboardFaces.value.length : totalBillboardFaces"
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
            :color="resolveBillboardFaceStatus(item.status).color"
          >
            {{ resolveBillboardFaceStatus(item.status).text }}
          </VChip>
        </template>

        <!-- Rented From -->
        <template #item.rented_from="{ item }">
          <span>{{ item.rented_from ? dayjs(item.rented_from).format('DD-MM-YYYY') : '-' }}</span>
        </template>

        <!-- Available From -->
        <template #item.available_from="{ item }">
          <span>{{ item.available_from ? dayjs(item.available_from).format('DD-MM-YYYY') : '-' }}</span>
        </template>

        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalBillboardFaces) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalBillboardFaces / itemsPerPage)"
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
            <VIcon
              icon="ti ti-edit"
              @click="handleUpdateBillboardFace(item)"
            />
          </IconBtn>
        </template>
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
    <EditPropertyDialog
      v-if="billboardFace"
      v-model:is-dialog-visible="isDialogEditPropertyVisible"
      :billboardFace="billboardFace"
      @property-updated="handleBillboardFaceUpdated"
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
