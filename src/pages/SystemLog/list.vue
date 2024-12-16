<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useSystemLog } from '@/composables/SystemLog/useSystemLog'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { getSystemLog, systemLog, total } = useSystemLog()

const searchQuery = ref()
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

// Headers
const headers = [
  {
    title: 'Usuario',
    key: 'username',
  },
  {
    title: 'ip',
    key: 'ip_address',
  },
  {
    title: 'Tipo',
    key: 'action_type',
  },
  {
    title: 'Description',
    key: 'description',
  },
  {
    title: 'severity',
    key: 'severity',
  },
  {
    title: 'fecha',
    key: 'created_at',

  },
 
]

const fetchProperties = () => {
  getSystemLog({
    itemsPerPage: itemsPerPage.value,
    page: page.value,
    search: searchQuery.value,
    sortBy: sortBy.value,
    orderBy: orderBy.value,
  })
}

const debouncedFetch = debounce(fetchProperties, 300)

// Observar múltiples reactivos con opción immediate
watch([searchQuery, itemsPerPage, page, sortBy, orderBy], debouncedFetch, { immediate: true })

const formatDate = dateString => {
  const date = new Date(dateString)
  const day = date.getDate() // Día del mes

  const months = [
    'enero',
    'febrero',
    'marzo',
    'abril',
    'mayo',
    'junio',
    'julio',
    'agosto',
    'septiembre',
    'octubre',
    'noviembre',
    'diciembre',
  ]

  const month = months[date.getMonth()] // Mes en formato humano
  const hours = date.getHours().toString().padStart(2, '0') // Hora con dos dígitos
  const minutes = date.getMinutes().toString().padStart(2, '0') // Minutos con dos dígitos

  // Retorna la fecha en formato: 7 de marzo, 14:00
  return `${day} de ${month}, ${hours}:${minutes}`
}
</script>

<template>
  <section>
    <VCard>
      <VCardText class="d-flex flex-wrap gap-4">
        <div>
          <h5 class="text-h5">
            Bitacora
          </h5>
          <div class="text-body-1">
            En total son {{ total }} items.
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
        </div>
      </VCardText>
      <VDivider />

      <!-- SECTION datatable -->
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"     
        :items="systemLog"
        :headers="headers"
        :items-length="itemsPerPage.value === -1 ? systemLog.value.length : total.valueOf"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <template #item.username="{ item }">
          <span> {{ item.username }}</span>
        </template>
        <template #item.created_at="{ item }">
          <span> {{ formatDate( item.created_at ) }}</span>
        </template>


        <template #bottom>
          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, total) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(total / itemsPerPage)"
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
      </VDataTableServer>
      <!-- SECTION -->
    </VCard>
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
