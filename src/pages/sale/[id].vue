<!-- eslint-disable camelcase -->
<script setup>
import InvoiceAddPaymentDrawer from '@/views/apps/invoice/InvoiceAddPaymentDrawer.vue'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSales } from '../../composables/Sales/useSales'

const route = useRoute()
const { sale, getSalebyId } = useSales()

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

const loadSale = async () => {
  try {
    await getSalebyId(route.params.id)
    invoice.value = {
      id: sale.value.id,
      issuedDate: sale.value.created_at,
      expiration_date: sale.value.expiration_date,
      customer: {
        social_reason: sale.value.social_reason,
        phone: sale.value.phone,
        nit: sale.value.nit,
        address: sale.value.address,
        workplace: sale.value.workplace,
        email: sale.value.email,
      },
      observations: sale.value.observations,
      payment_method: 'Tarjeta de crédito',
      contract_signing_date: '22-10-2023',
      amount: sale.value.amount,
      initial_fee: sale.value.initial_fee,
      balance: sale.value.balance,
      opportunity_id: sale.value.opportunity_id,
      properties: sale.value.properties,
    }

    // setTimeout(() => {
    //   printInvoice()
    // }, 5000)
  } catch (error) {
    console.error('Error al obtener la cotización:', error)
  }
}

const printInvoice = () => {
  window.print()
}

onBeforeMount(loadSale)
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
                Formulario de Cotizacion 
              </strong>
            </div>

            <!-- 👉 Right Content -->
            <div class="mt-4 ma-sm-4">
              <!-- 👉 Issue Date -->
              <p class="my-3">
                <span>Fecha de emision: </span>
                <span>{{ invoice.issuedDate }}</span>
              </p>

              <!-- 👉 Due Date -->
              <p class="mb-0">
                <span>Fecha de Validacion: </span>
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
                    <td class="pe-6 pb-1">
                      Rason Social:
                    </td>
                    <td class="pb-1">
                      <span class="font-weight-medium">
                        {{ invoice.customer.social_reason }}
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Celular:
                    </td>
                    <td class="pb-1">
                      {{ invoice.customer.phone }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Direccion:
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
                      C.I./NIT:
                    </td>
                    <td class="pb-1">
                      {{ invoice.customer.nit }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Correo:
                    </td>
                    <td class="pb-1">
                      {{ invoice.customer.email }}
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Trabajo:
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
                  Departamento
                </th>
                <th scope="col">
                  Superficie
                </th>
                <th scope="col">
                  Piso
                </th>
                <th scope="col">
                  Balcon
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
                  {{ property.title }}
                </td>
                <td class="text-no-wrap">
                  {{ property.surface }} m2
                </td>
                <td class="text-no-wrap">
                  {{ property.code }} Piso
                </td>
                <td class="text-no-wrap">
                  {{ property.isfacade ? 'Sí' : 'No' }}
                </td>
                <td class="text-center">
                  ${{ property.pivot_price }}
                </td>
                <td class="text-center">
                  ${{ property.pivot_price_it }}
                </td>
                <td class="text-center">
                  ${{ property.pivot_price_contrato }}
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
                          Cuota Inicial:
                        </p>
                        <p class="mb-2">
                          SubTotal:
                        </p>
                        <p class="mb-2">
                          Total:
                        </p>
                      </div>
                    </td>

                    <td class="font-weight-medium text-high-emphasis">
                      <p class="mb-2">
                        ${{ invoice.initial_fee }}
                      </p>
                      <p class="mb-2">
                        ${{ invoice.balance }}
                      </p>
                      <p class="mb-2">
                        ${{ invoice.amount }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </VCardText>

          <VCardText class="add-products-form">
            <VRow>
              <VCol
                cols="12"
                sm="6"
                class="mt-15"
              >
                <VDivider thickness="4" />
                <div class="text-center my-1">
                  <span>
                    <strong>
                      Firma del Cliente 
                    </strong>
                  </span>
                </div>
              </VCol>
              <VCol
                cols="12"
                sm="6"
                class="mt-15"
              >
                <VDivider thickness="4" />
                <div class="text-center my-1">
                  <span> <strong>
                    Firma Asesor Comercial
                  </strong>  </span>
                </div>
              </VCol>
            </VRow>
          </VCardText>

          <VDivider />
          <VCardText>
            <div class="d-flex mx-sm-4">
              <span><strong>
                El comprador deberá realizar todos los pagos acordados, en las cuentas indicadas de Canzza Desarrolladora Inmobiliaria Srl. y entregar el respectivo comprobante de depósito.
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
