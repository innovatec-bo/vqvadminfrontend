<script setup>
import { useSales } from '@/composables/Sales/useSales'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import Swal from 'sweetalert2'
import { ref, watch } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const { AllSalesPaginated, exportSaleExcel, SaleChangeStageDiscard, SaleChangeSignature, sales, totalSales } = useSales()

// Data table options
const searchQuery = ref('')
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()
const userData = useCookie('userAbilityRules').value

// Data table Headers (Reordered)
const headers = [
  { title: '', key: 'data-table-expand' },
  { title: 'Nit/CI', key: 'nit' },
  { title: 'Cliente', key: 'social_reason' },
  { title: 'Método de Pago', key: 'payment_method' },
  { title: 'Total Contrato', key: 'amount' },
  { title: 'Estado', key: 'status' },
  { title: 'Firma', key: 'confirmation_signature' },
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

const displayStatus = status => {
  if (status === 'SALE') {
    return 'VENDIDO'
  } else if (status === 'DISCARD') {
    return 'CANCELADO'
  } else if (status === 'DELIVERY') {
    return 'ENTREGADO'
  }
  
  return status
}


const updateOptions = options => {
  page.value = options.page
  itemsPerPage.value = options.itemsPerPage
}

const deleteSale = id => {
  Swal.fire({
    title: "Quieres dar de baja la venta?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "confirmar",
  }).then(result => {
    if (result.isConfirmed) {
      SaleChangeStageDiscard(id)
      AllSales()
      Swal.fire({
        text: "La Venta fue dado de baja",
        icon: "success",
      })
    }
  })
}

const AllSales = () => {
  AllSalesPaginated({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    search: searchQuery.value,
  })
}

const confirmationSignature = async saleid => {
  console.log('entra a firma')
  await SaleChangeSignature( saleid)
}

const ExportExcell = async ()=>{
  await exportSaleExcel()
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
          <VBtn
            v-if="userData.some(rule => rule.action === 'manage' && rule.subject === 'ADMINISTRADOR')"
            prepend-icon="tabler-screen-share"
            variant="tonal"
            color="secondary"
            class="mx-3"
            @click="ExportExcell"
          >
            Export
          </VBtn>
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
              <div class="mb-2 mx-10">
                <strong>Propiedades:</strong>
                <ul>
                  <li
                    v-for="property in item.properties"
                    :key="property.id"
                  >
                    {{ property.title }} | {{ property.code }} | ({{ property.surface }} m²)
                  </li>
                </ul>
              </div>
              <div class="mb-2 mx-10">
                <strong>Pagos Iniciales:</strong>
                <ul>
                  <li
                    v-for="payment in item.initial_payments"
                    :key="payment.id"
                  >
                    Fecha: {{ payment.date }} | Monto: {{ formatCurrency(payment.amount) }} | Pagado: {{ payment.is_paid ? 'Sí' : 'No' }}
                  </li>
                </ul>
              </div>
              <div class="mb-2 mx-10">
                <strong>Pagos de Saldo:</strong>
                <ul>
                  <li
                    v-for="balance in item.balance_payments"
                    :key="balance.id"
                  >
                    Fecha: {{ balance.date }} | Monto: {{ formatCurrency(balance.amount ) }} | Pagado: {{ balance.is_paid ? 'Sí' : 'No' }}
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
          {{ formatCurrency(item.amount ) }}
        </template>

        <template #item.status="{ item }">
          {{ displayStatus(item.status ) }}
        </template>
        <template #item.confirmation_signature="{ item }">
          <VCheckbox
            v-model="item.confirmation_signature"
            :true-value="1"
            :false-value="0"
            @change="confirmationSignature(item.id)"
          >
            <VTooltip
              activator="parent"
              location="top"
            >
              Confirmar firma
            </VTooltip>
          </VCheckbox>
        </template>
        <template #item.action="{ item }">
          <div class="d-flex items-center gap-x-2">
            <RouterLink :to="{ name: 'sale-id', params: { id: item.id } }">
              <IconBtn>
                <VIcon icon="tabler-eye" />
              </IconBtn>
            </RouterLink>
            <IconBtn
              v-if="userData.some(rule => rule.action === 'manage' && rule.subject === 'ADMINISTRADOR')"
              icon="tabler-trash"
              @click="deleteSale(item.id)"
            />
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
