<script setup>
import { useConversation } from '@/composables/Customer/useConversation'
import { useSales } from '@/composables/Sales/useSales'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { AllSalesPaginate, totalConversations, conversations, updateConversationStatus } = useConversation()
const { AllSalesPaginated, loadingSale, sales, totalSales } = useSales()

// Data table options
const searchQuery = ref('')
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

// Data table Headers
const headers = [
  { title: '', key: 'data-table-expand' },
  {
    title: 'Razon Social',
    key: 'social_reason',
  },
  {
    title: 'Nit/CI',
    key: 'nit',
  },
  {
    title: 'Metodo de Pago',
    key: 'payment_method',
  },
  {
    title: 'Total de Contrato',
    key: 'amount',
  },
  {
    title: 'Acción',
    key: 'action',
  },
  
]

const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage

  // sortBy.value = options.sortBy[0]?.key
  // orderBy.value = options.sortBy[0]?.order
}

const AllSales =  ()=>{
  AllSalesPaginated({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    search: searchQuery.value,
  })
}

const debouncedFetch = debounce(AllSales, 300)

watch([searchQuery, itemsPerPage, page], debouncedFetch, { immediate: true })
</script>

<template>
  <div>
    <VCard title="Lista de Ventas">
      <VCardText>
        <div class="d-flex justify-space-between flex-wrap gap-y-4">
          <AppTextField
            v-model="searchQuery"
            style="max-inline-size: 200px; min-inline-size: 200px;"
            placeholder="Search .."
            density="compact"
          />
          <div class="d-flex flex-row gap-4 align-center flex-wrap">
            <AppSelect
              v-model="itemsPerPage"
              density="compact"
              :items="[5, 10, 20, 50, 100]"
            />
          </div>
        </div>
      </VCardText>

      <VDivider />
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="sales"
        :headers="headers"
        :items-length="totalSales"
        class="text-no-wrap"
        expand-on-click
        @update:options="updateOptions"
      >
        <!-- Expanded Row Data -->
        <template #expanded-row="">
          <tr class="v-data-table__tr">
            <td :colspan="headers.length">
              <p class="my-1">
                City: Santa Cruz
              </p>
              <p class="my-1">
                Experience: Ninguna
              </p>
              <p>Post: Hola</p>
            </td>
          </tr>
        </template>
        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalSales) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalSales / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalSales / itemsPerPage), 5)"
            >
              <template #prev="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Previous
                </VBtn>
              </template>

              <template #next="slotProps">
                <VBtn
                  variant="tonal"
                  color="default"
                  v-bind="slotProps"
                  :icon="false"
                >
                  Next
                </VBtn>
              </template>
            </VPagination>
          </div>
        </template>
      </VDataTableServer>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.customer-title:hover{
  color: rgba(var(--v-theme-primary)) !important;
}
</style>
