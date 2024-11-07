<script setup>
import { useConversation } from '@/composables/Customer/useConversation'
import { useSales } from '@/composables/Sales/useSales'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import { ref, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { AllSalesPaginate, totalConversations, conversations, updateConversationStatus } = useConversation()
const { AllSalesPaginated, loadingSale, sales, totalSales } = useSales()

// Data table options
const searchQuery = ref('')
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

// Data table Headers (Reordered)
const headers = [
  { title: '', key: 'data-table-expand' },
  { title: 'Nit/CI', key: 'nit' },
  { title: 'Razón Social', key: 'social_reason' },
  { title: 'Método de Pago', key: 'payment_method' },
  { title: 'Total de Contrato', key: 'amount' },
  { title: 'Acción', key: 'action' },
]

// Function to display payment method as "Al Contado" if it's CASH
const displayPaymentMethod = method => {
  if (method === 'CASH') {
    return 'Al Contado'
  } else if (method === 'DIRECTCREDIT') {
    return 'Crédito Directo'
  } else if (method === 'BANKCREDIT') {
    return 'Crédito Bancario'
  }
  
  return method
}


const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
}

const AllSales = () => {
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
            placeholder="Buscar..."
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
        <template #expanded-row="{ item }">
          <tr class="v-data-table__tr">
            <td :colspan="headers.length">
              <div class="mb-2">
                <strong>Propiedades:</strong>
                <ul>
                  <li
                    v-for="property in item.properties"
                    :key="property.id"
                  >
                    {{ property.title }} - {{ property.code }} ({{ property.surface }} m²)
                  </li>
                </ul>
              </div>
              <div class="mb-2">
                <strong>Pagos Iniciales:</strong>
                <ul>
                  <li
                    v-for="payment in item.initial_payments"
                    :key="payment.id"
                  >
                    Fecha: {{ payment.date }}, Monto: {{ payment.amount }}, Pagado: {{ payment.is_paid ? 'Sí' : 'No' }}
                  </li>
                </ul>
              </div>
              <div>
                <strong>Pagos de Saldo:</strong>
                <ul>
                  <li
                    v-for="balance in item.balance_payments"
                    :key="balance.id"
                  >
                    Fecha: {{ balance.date }}, Monto: {{ balance.amount }}, Pagado: {{ balance.is_paid ? 'Sí' : 'No' }}
                  </li>
                </ul>
              </div>
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

        <template #item.payment_method="{ item }">
          {{ displayPaymentMethod(item.payment_method) }}
        </template>

        <template #item.amount="{ item }">
          {{ item.amount }} $
        </template>

        <template #item.action="{ item }">
          <div class="d-flex items-center gap-x-2">
            <RouterLink :to="{ name: 'sale-id', params: { id: item.id } }">
              <IconBtn>
                <VIcon icon="tabler-eye" />
              </IconBtn>
            </RouterLink>
          </div>
        </template>
      </VDataTableServer>
    </VCard>
  </div>
</template>

<style lang="scss" scoped>
.customer-title:hover {
  color: rgba(var(--v-theme-primary)) !important;
}
</style>
