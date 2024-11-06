<!-- eslint-disable camelcase -->
<script setup>
import { useQuote } from '@/composables/Quote/useQuote'
import { formatCurrency } from '@/utils/currencyFormatter'
import InvoiceAddPaymentDrawer from '@/views/apps/invoice/InvoiceAddPaymentDrawer.vue'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const { getQuotebyId, quote } = useQuote()

const isAddPaymentSidebarVisible = ref(false)
const isSendPaymentSidebarVisible = ref(false)

const invoice = ref({
  id: null,
  issuedDate: '20-10-2023',
  expiration_date: null,
  customer: {
    social_reason: null,
    phone: null,
    nit: null,
    address: null,
    workplace: null,
    email: null,
  },
  observations: null,
  payment_method: null,
  contract_signing_date: null,
  amount: null,
  initial_fee: null,
  balance: null,
  opportunity_id: null,
  properties: [
    {
      id: null,
      pivot_price: null,
      pivot_price_it: null,
      pivot_price_contrato: null,
      isfacade: false,
      code: null,
      surface: null,
      property_type: null,
      title: '',
    },
  ],
})

const loadQuote = async () => {
  try {
    await getQuotebyId(route.params.id)
    invoice.value = {
      id: quote.value.id,
      issuedDate: quote.value.created_at,
      expiration_date: quote.value.expiration_date,
      customer: {
        social_reason: quote.value.social_reason,
        phone: quote.value.phone,
        nit: quote.value.nit,
        address: quote.value.address,
        workplace: quote.value.workplace,
        email: quote.value.email,
      },
      observations: quote.value.observations,
      payment_method: 'Tarjeta de crédito',
      contract_signing_date: '22-10-2023',
      amount: quote.value.amount,
      initial_fee: quote.value.initial_fee,
      balance: quote.value.balance,
      opportunity_id: quote.value.opportunity_id,
      properties: quote.value.properties,
    }
  } catch (error) {
    console.error('Error al obtener la cotización:', error)
  }
}

const printInvoice = () => {
  window.print()
}

onBeforeMount(loadQuote)
</script>

<template>
  <section v-if="invoice">
    <VRow>
      <VCol>
        <VCard>
          <!-- SECTION Header -->
          <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row print-row">
            <!-- 👉 Left Content -->
            <div class="ma-sm-4">
              <div class="d-flex align-center mb-6">
                <!-- 👉 Logo -->
                <VNodeRenderer
                  :nodes="themeConfig.app.logo"
                  class="me-3"
                />
                <!-- 👉 Title -->
                <h6 class="font-weight-bold text-capitalize text-h4">
                  {{ themeConfig.app.title }}
                </h6>
              </div>

              <strong class="mb-0">
                Formulario de Cotización   
              </strong>
            </div>

            <!-- 👉 Right Content -->
            <div class="mt-4 ma-sm-4 text-end">
              <!-- 👉 Issue Date -->
              <p class="my-3">
                <span>Fecha de Emisión: </span>
                <span>{{ invoice.issuedDate }}</span>
              </p>

              <!-- 👉 Due Date -->
              <p class="mb-0">
                <span>Fecha de Validación: </span>
                <span>{{ invoice.expiration_date }}</span>
              </p>
            </div>
          </VCardText>
          <!-- !SECTION -->
          <VDivider />
          <!-- 👉 Payment Details -->
          <VCardText class="d-flex justify-space-between flex-wrap flex-column flex-sm-row print-row">
            <div class="ma-sm-4">
              <table>
                <tbody>
                  <tr>
                    <td class="pe-6 pb-1 font-bold">
                      <Strong>
                        Razón Social:
                      </Strong>
                    </td>
                    <td class="pb-1">
                      <span class="font-weight-medium">
                        {{ invoice.customer.social_reason }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1 ">
                      <strong>
                        Celular:
                      </strong>
                    </td>
                    <td class="pb-1">
                      {{ invoice.customer.phone }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      <strong>
                        Dirección:
                      </strong>
                    </td>
                    <td class="pb-1">
                      {{ invoice.customer.address }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="mt-4 ma-sm-4">
              <table>
                <tbody>
                  <tr>
                    <td class="pe-6 pb-1">
                      <strong>
                        C.I./NIT:
                      </strong>
                    </td>
                    <td class="pb-1">
                      {{ invoice.customer.nit }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      <strong>
                        Correo:
                      </strong>
                    </td>
                    <td class="pb-1">
                      {{ invoice.customer.email }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      <strong>
                        Trabajo:
                      </strong>
                    </td>
                    <td class="pb-1">
                      {{ invoice.customer.workplace }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VCardText>

          <!-- 👉 Table -->
          <VDivider />

          <VTable class="invoice-preview-table">
            <thead>
              <tr>
                <th scope="col">
                  Propiedad
                </th>
                <th scope="col">
                  tipo
                </th>
                <th scope="col">
                  Superficie
                </th>
                <th scope="col">
                  Piso
                </th>
                <th scope="col">
                  Caracteristicas
                </th>
                <th scope="col">
                  Precio
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  3% (IT)
                </th>
                <th
                  scope="col"
                  class="text-center"
                >
                  Precio Contrato:
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="property in invoice.properties"
                :key="property.id"
              >
                <td class="text-no-wrap">
                  {{ property.code }}
                </td>
                <td class="text-no-wrap">
                  {{ property.property_type }}
                </td>
                <td class="text-no-wrap">
                  {{ property.surface }} m2
                </td>
                <td
                  v-if="property.floor_park"
                  class="text-no-wrap"
                >
                  {{ property.floor_park }} 
                </td>
                <td
                  v-if="property.floor_departmennt"
                  class="text-no-wrap"
                >
                  {{ property.floor_departmennt }} 
                </td>
                
                <td class="text-no-wrap">
                  {{ property.isfacade ? 'Fachada ,' : '' }} 
                  {{ property.number_bedrooms ? property.number_bedrooms + " Dormitorios" : '' }} 
                  {{ property.cover ? property.cover : '' }} 
                </td>
                
                <td class="">
                  {{ formatCurrency(property.pivot_price ) }}
                </td>
                <td class="text-center">
                  {{ formatCurrency(property.pivot_price_it ) }}
                </td>
                <td class="text-center">
                  {{ formatCurrency(property.pivot_price_contrato) }}
                </td>
              </tr>
            </tbody>
          </VTable>

          <VDivider class="mb-2" />

          <!-- Total -->
          <VCardText class="d-flex justify-space-between flex-column flex-sm-row print-row">
            <div class="my-2 mx-sm-4 text-base">
              <div class="d-flex align-center mb-1">
                <h6 class="text-base font-weight-medium me-1">
                  Asesor Comercial:
                </h6>
                <span>Belen Fernandez</span>
              </div>
            </div>

            <div class="my-2 mx-sm-4">
              <table>
                <tbody>
                  <tr>
                    <td class="text-end">
                      <div class="me-5">
                        <p class="mb-2">
                          Anticipo:
                        </p>
                        <p class="mb-2">
                          Saldo por Pagar:
                        </p>
                        <p class="mb-2">
                          Precio Contrato:
                        </p>
                      </div>
                    </td>

                    <td class="font-weight-medium text-high-emphasis text-end">
                      <p class="mb-2">
                        <!-- ${{ invoice.initial_fee }} -->
                        {{ formatCurrency(invoice.initial_fee) }}
                      </p>
                      <p class="mb-2">
                        {{ formatCurrency(invoice.balance) }}
                      </p>
                      <p class="mb-2">
                        {{ formatCurrency(invoice.amount) }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VCardText>

       
          <VDivider />
          <VCardText>
            <div class="d-flex mx-sm-4">
              <span><strong>
                El comprador deberá realizar todos los pagos acordados, en las cuentas indicadas de Canzza Desarrolladora Inmobiliaria S.R.L. y entregar el respectivo comprobante de depósito.
              </strong></span>
            </div>
          </VCardText>
          <VDivider />
          <VCardText>
            <div class="d-flex mx-sm-4">
              <span><strong>
                Todos los gastos administrativos, inscripción en derechos reales y honorarios profesionales para consolidar el derecho de propiedad a favor del comprador deben ser asumidos por el comprador.</strong></span>
            </div>
          </VCardText>
          <VDivider />
          <VCardText>
            <div class="d-flex mx-sm-4">
              <span><strong>
                Este documento tiene validez únicamente hasta el <span style="text-decoration: underline;">{{ invoice.expiration_date }}</span>.
              </strong></span>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <!-- 👉 Add Payment Sidebar -->
    <InvoiceAddPaymentDrawer v-model:is-drawer-open="isAddPaymentSidebarVisible" />

    <!-- 👉 Send Invoice Sidebar -->
    <InvoiceSendInvoiceDrawer v-model:is-drawer-open="isSendPaymentSidebarVisible" />
  </section>
</template>

<style lang="scss">
.invoice-preview-table {
  --v-table-row-height: 44px !important;
}

@media print {
  .v-theme--dark {
    --v-theme-surface: 255, 255, 255;
    --v-theme-on-surface: 94, 86, 105;
  }

  body {
    background: none !important;
  }

  @page { margin: 0; size: auto; }

  .layout-page-content,
  .v-row,
  .v-col-md-9 {
    padding: 0;
    margin: 0;
  }

  .product-buy-now {
    display: none;
  }

  .v-navigation-drawer,
  .layout-vertical-nav,
  .app-customizer-toggler,
  .layout-footer,
  .layout-navbar,
  .layout-navbar-and-nav-container {
    display: none;
  }

  .v-card {
    box-shadow: none !important;

    .print-row {
      flex-direction: row !important;
    }
  }

  .layout-content-wrapper {
    padding-inline-start: 0 !important;
  }

  .v-table__wrapper {
    overflow: hidden !important;
  }
}
</style>
