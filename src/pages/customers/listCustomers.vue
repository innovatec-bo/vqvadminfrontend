<script setup>
import { useCookie } from '@/@core/composable/useCookie'
import { useCustomer } from '@/composables/Customer/useCustomer'
import ECommerceAddCustomerDrawer from '@/views/apps/ecommerce/ECommerceAddCustomerDrawer.vue'
import { paginationMeta } from '@api-utils/paginationMeta'
import { debounce } from 'lodash'

import { VDataTableServer } from 'vuetify/labs/VDataTable'

const searchQuery = ref('')
const isAddCustomerDrawerOpen = ref(false)

const { allCustomerPaginate, exportCustomerExcel, totalCustomers, customers } = useCustomer()
const userData = useCookie('userAbilityRules').value

// Data table options
const itemsPerPage = ref(10)
const page = ref(1)
const sortBy = ref()
const orderBy = ref()

// Data table Headers
const headers = [
  {
    title: 'CI',
    key: 'ci',
  },
  {
    title: 'Nombre',
    key: 'name',
  },
  {
    title: 'Celular',
    key: 'phone',
  },
  {
    title: 'Correo',
    key: 'email',
  },
  {
    title: 'Tipo',
    key: 'type_customer',
  },
  {
    title: 'Ultima Oportunidad',
    key: 'lastOpportunity',
  },
  {
    title: 'Accion',
    key: 'action',
  },
]

const AllCustomer =  ()=>{
  allCustomerPaginate({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    search: searchQuery.value,
  })
}

const ExportExcell = async ()=>{
  await exportCustomerExcel()
}

const updateOptions = options => {
  page.value = options.page
  sortBy.value = options.sortBy[0]?.key
  orderBy.value = options.sortBy[0]?.order
}

const debouncedFetch = debounce(AllCustomer, 300)

watch([searchQuery, itemsPerPage, page], debouncedFetch, { immediate: true })
</script>

<template>
  <div>
    <VCard title="Lista de Clientes">
      <VCardText>
        <div class="d-flex justify-space-between flex-wrap ">
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
            <VBtn
              v-if="userData.some(rule => rule.action === 'manage' && rule.subject === 'ADMINISTRADOR')"

              prepend-icon="tabler-screen-share"
              variant="tonal"
              color="secondary"
              @click="ExportExcell"
            >
              Export
            </VBtn>
            <RouterLink
              :to="{ name: 'customers-add-customer' }"
              class="text-white"
            >
              <VBtn prepend-icon="tabler-plus">
                Agregar Cliente
              </VBtn>
            </RouterLink>
          </div>
        </div>
      </VCardText>

      <VDivider />
      <VDataTableServer
        v-model:items-per-page="itemsPerPage"
        v-model:page="page"
        :items="customers"
        :headers="headers"
        :items-length="totalCustomers"
        class="text-no-wrap"
        @update:options="updateOptions"
      >
        <template #item.phone="{ item }">
          <div class="d-flex gap-x-2">
            <!-- Enlace a WhatsApp API -->
            <a
              :href="`https://api.whatsapp.com/send?phone=${item.cod_phone}${item.phone}`"
              target="_blank"
              rel="noopener noreferrer"
              class="text-body-1"
            >
              {{ item.cod_phone }} {{ item.phone }}
            </a>
          </div>
        </template>

        <!-- Actions -->
        <template #item.action="{ item }">
          <div class="d-flex items-center gap-x-2">
            <RouterLink :to="{ name: 'customers-id', params: { id: item.id } }">
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
              {{ paginationMeta({ page, itemsPerPage }, totalCustomers) }}
            </p>

            <VPagination
              v-model="page"
              :length="Math.ceil(totalCustomers / itemsPerPage)"
              :total-visible="$vuetify.display.xs ? 1 : Math.min(Math.ceil(totalCustomers / itemsPerPage), 5)"
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
