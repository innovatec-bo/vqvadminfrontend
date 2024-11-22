<script setup>
import { useQuote } from '@/composables/Quote/useQuote'
import { StatusCustomerQuote } from '@/enums/StatusCustomerQuote'
import ECommerceAddCustomerDrawer from '@/views/apps/ecommerce/ECommerceAddCustomerDrawer.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'
import { onMounted } from 'vue'
import { VDataTableServer } from 'vuetify/labs/VDataTable'

const searchQuery = ref('')
const isAddCustomerDrawerOpen = ref(false)
const { allQuotePaginate, totalQuotes, quotes, changeStatusQuotes, changeStatusQuotesCustomer } = useQuote()
const userData = useCookie('userAbilityRules').value

// Data table options
const itemsPerPage = ref(10)
const status = ref()

const page = ref(1)
const sortBy = ref()
const orderBy = ref()

const headers = [
  // {
  //   title: 'NIT',
  //   key: 'nit',
  // },
  {
    title: 'Nombre',
    key: 'social_reason',
  },
  {
    title: 'Propiedades',
    key: 'properties',
  },
  {
    title: 'Celular',
    key: 'phone',
  },

  {
    title: 'Total',
    key: 'amount',
  },
  {
    title: 'Gerencia',
    key: 'status',
  },
  {
    title: 'Cliente',
    key: 'status_customer',
  },
  {
    title: 'Accion',
    key: 'action',
  },
]

const updateOptions = options => {
  page.value = options.page
  status.value = options.status
}

const statusQuote = async (quoteId, statusquote) => {
  const newStatus = statusquote === 'APPROVED' ? 'NOT_APPROVED' : 'APPROVED'

  console.log(`Procedimiento ${quoteId} marcado como: ${statusquote}`)
  await  changeStatusQuotes(quoteId, {
    status: newStatus,
  })
  onMounted()
}

const statusQuoteCustomer = async (quoteId, statusquote) => {
  const newStatus = statusquote === 'APPROVED' ? 'NOT_APPROVED' : 'APPROVED'

  console.log(`Procedimiento ${quoteId} marcado como: ${statusquote}`)
  await  changeStatusQuotesCustomer(quoteId, {
    status: newStatus,
  })
  onMounted()
}

const AllQuote =  ()=>{
  allQuotePaginate({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    status: status.value,
    search: searchQuery.value,
  })
  console.log(quotes)
}

const debouncedFetch = debounce(AllQuote, 300)

watch([searchQuery, itemsPerPage, page, status], debouncedFetch, { immediate: true })
</script>

<template>
  <div>
    <VCard title="Lista de Cotizaciones">
      <VCardText>
        <div class="my-2">
          <AppSelect
            v-model="status"
            label="Estado de aprobación del cliente"
            placeholder="Seleccione estado"
            style="max-inline-size: 200px; min-inline-size: 200px;"

            :items="Object.values(StatusCustomerQuote)"
          />
        </div>
        <div class="d-flex justify-space-between flex-wrap gap-y-4">
          <AppTextField
            v-model="searchQuery"
            style="max-inline-size: 500px; min-inline-size: 500px;"
            placeholder="Buscar por Nombre, Numero, Correo"
            density="compact"
          />
          <div class="d-flex flex-row gap-4 align-center flex-wrap">
            <AppSelect
              v-model="itemsPerPage"
              density="compact"
              :items="[5, 10, 20, 50, 100]"
            />
            <VBtn
              prepend-icon="tabler-screen-share"
              variant="tonal"
              color="secondary"
            >
              Export
            </VBtn>
            <RouterLink
              :to="{ name: 'quote-add-quote' }"
              class="text-white"
            >
              <VBtn prepend-icon="tabler-plus">
                Registrar Cotizacion
              </VBtn>
            </RouterLink>
          </div>
        </div>
      </VCardText>

      <VDivider />
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="quotes"
        :headers="headers"
        :items-length="totalQuotes"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <template #item.properties="{ item }">
          <div
            v-for="property in item.properties" 
            :key="property.id"
            class="d-flex gap-x-2"
          >
            {{ property.title }} | {{ property.code }} 
          </div>
        </template>
        <template #item.amount="{ item }">
          <div class="d-flex gap-x-2">
            {{ formatCurrency(item.amount ) }}
          </div>
        </template>
        <template #item.status="{ item }">
          <div class="d-flex items-center gap-x-2  ">
            <span class="my-2">
              {{ item.status === 'APPROVED' ? 'Aprobado' : 'No Aprobado' }}
            </span>
            <VCheckbox
              v-model="item.status"
              true-value="APPROVED"
              false-value="NOT_APPROVED"
              :disabled="!userData.some(rule => rule.action === 'manage' && rule.subject === 'ADMINISTRADOR')"
              @click="statusQuote(item.id, item.status)"
            >
              <VTooltip
                activator="parent"
                location="top"
              >
                {{ item.status == "NOT_APPROVED"? 'No aprovado por gerencia': 'Aprobado por Gerencia' }}
              </VTooltip>
            </VCheckbox>
          </div>
        </template>
        <template #item.status_customer="{ item }">
          <div class="d-flex items-center gap-x-2 ">
            <span class="my-2">
              {{ item.status_customer === 'APPROVED' ? 'Aprobado' : 'No Aprobado' }}
            </span>
            <VCheckbox
              v-model="item.status_customer"
              true-value="APPROVED"
              false-value="NOT_APPROVED"
              @click="statusQuoteCustomer(item.id, item.status_customer)"
            >
              <VTooltip
                activator="parent"
                location="top"
              >
                {{ item.status_customer == "NOT_APPROVED"? 'No aprobado por Cliente ': 'Aprobado por Cliente' }}
              </VTooltip>
            </VCheckbox>
          </div>
        </template>
        <!-- Actions -->

        <template #item.action="{ item }">
          <div class="d-flex items-center gap-x-2">
            <RouterLink :to="{ name: 'quote-id', params: { id: item.id } }">
              <IconBtn>
                <VIcon icon="tabler-eye" />
              </IconBtn>
            </RouterLink>
          </div>
        </template>

        <template #bottom>
          <VDivider />

          <div class="d-flex align-center justify-sm-space-between justify-center flex-wrap gap-3 pa-5 pt-3">
            <p class="text-sm text-disabled mb-0">
              {{ paginationMeta({ page, itemsPerPage }, totalQuotes) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalQuotes / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalQuotes / itemsPerPage), 5)"
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

    <ECommerceAddCustomerDrawer v-model:is-drawer-open="isAddCustomerDrawerOpen" />
  </div>
</template>

<style lang="scss" scoped>
.customer-title:hover{
  color: rgba(var(--v-theme-primary)) !important;
}
</style>
