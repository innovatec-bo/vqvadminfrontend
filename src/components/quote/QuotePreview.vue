<!-- eslint-disable camelcase -->
<script setup>
import { PropertyType } from '@/enums/PropertyType'
import InvoiceAddPaymentDrawer from '@/views/apps/invoice/InvoiceAddPaymentDrawer.vue'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const props = defineProps({
  invoiceData: {
    type: null,
    default: {
      id: 1,
      invoiceNumber: '',
      invoiceDate: '',
      
    },
  },
})

const isAddPaymentSidebarVisible = ref(false)
const isSendPaymentSidebarVisible = ref(false)

console.log(PropertyType.DEPARTAMENT.label)

const invoice = ref({
  id: 5036,
  issuedDate: '20-10-2023',
  expiration_date: '25-11-2023',
  customer: {
    social_reason: 'Diego Rojas Rios',
    phone: '77049267',
    nit: '12570076',
    address: 'Av/ España 5 anillo doble vía',
    workplace: '(687) 660-2473',
    email: 'diego.rojas@example.com',
  },
  observations: 'El cliente solicita la entrega antes de fin de mes.',
  payment_method: 'Tarjeta de crédito',
  contract_signing_date: '22-10-2023',
  amount: 150000,
  initial_fee: 30000,
  balance: 120000,
  opportunity_id: 7895,
  properties: [
    {
      property_id: 101,
      price: 75000,
      price_it: 5000,
      price_contrato: 80000,

      property_type: PropertyType.DEPARTAMENT.value,
      property_type_name: PropertyType.DEPARTAMENT.label,
    },
    {
      property_id: 102,
      price: 80000,
      price_it: 6000,
      price_contrato: 86000,

      property_type: PropertyType.PARK.value,
      property_type_name: PropertyType.PARK.label,
    },
  ],
})

const printInvoice = () => {
  window.print()
}

onMounted(() => {
  printInvoice()
})
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
                <span>Fecha: </span>
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
                :key="property.property_id"
              >
                <td class="text-no-wrap">
                  {{ property.property_type_name }}
                </td>
                <td class="text-no-wrap">
                  300 m2
                </td>
                <td class="text-no-wrap">
                  1 Piso
                </td>
                <td class="text-no-wrap">
                  Fachada
                </td>
                <td class="text-center">
                  ${{ property.price }}
                </td>
                <td class="text-center">
                  ${{ property.price_it }}
                </td>
                <td class="text-center">
                  ${{ property.price_contrato }}
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
                  Salesperson:
                </h6>
                <span>Alfie Solomons</span>
              </div>
              <p>Thanks for your business</p>
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
                Este documento tiene validez únicamente hasta el <span style="text-decoration: underline;">31/10/2024</span>.
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
