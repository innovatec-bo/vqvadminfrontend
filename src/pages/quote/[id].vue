<script setup>
import InvoiceAddPaymentDrawer from '@/views/apps/invoice/InvoiceAddPaymentDrawer.vue'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'

const props = defineProps({
  invoiceData: {
    type: null,
    default: {
      id: 0,
      invoiceNumber: '',
      invoiceDate: '',
      
    },
  },
})

const isAddPaymentSidebarVisible = ref(false)
const isSendPaymentSidebarVisible = ref(false)

const invoice = ref( {
  id: 5036,
  issuedDate: `20-19`,
  client: {
    address: '78083 Laura Pines',
    company: 'Richardson and Sons LLC',
    companyEmail: 'pwillis@cross.org',
    country: 'Bhutan',
    contact: '(687) 660-2473',
    name: 'Andrew Burns',
  },
  service: 'Unlimited Extended License',
  total: 3171,
  invoiceStatus: 'Paid',
  balance: -205,
  dueDate: `20-25`,
})

const paymentDetails = ref({
  totalDue: '$12,110.55',
  bankName: 'American Bank',
  country: 'United States',
  iban: 'ETD95476213874685',
  swiftCode: 'BR91905',
})

const purchasedProducts = [
  {
    name: 'Vuexy Admin Template',
    description: 'HTML Admin Template',
    qty: 1,
    cost: 32,
  },
  {
    name: 'Frest Admin Template',
    description: 'Angular Admin Template',
    qty: 1,
    cost: 22,
  },
  {
    name: 'Apex Admin Template',
    description: 'HTML Admin Template',
    qty: 2,
    cost: 17,
  },
  {
    name: 'Robust Admin Template',
    description: 'React Admin Template',
    qty: 1,
    cost: 66,
  },
]

const printInvoice = () => {
  window.print()
}
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

              <!-- 👉 Address -->
              <p class="mb-0">
                Office 149, 450 South Brand Brooklyn
              </p>
              <p class="my-2">
                San Diego County, CA 91905, USA
              </p>
              <p class="mb-0">
                +1 (123) 456 7891, +44 (876) 543 2198
              </p>
            </div>

            <!-- 👉 Right Content -->
            <div class="mt-4 ma-sm-4">
              <!-- 👉 Invoice ID -->
              <h6 class="font-weight-medium text-h4">
                Invoice #{{ invoice.id }}
              </h6>

              <!-- 👉 Issue Date -->
              <p class="my-3">
                <span>Fecha: </span>
                <span>22/10/2024</span>
              </p>

              <!-- 👉 Due Date -->
              <p class="mb-0">
                <span>Fecha de Validacion: </span>
                <span>25/10/2024</span>
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
                        Diego Rojas Rios
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Celular:
                    </td>
                    <td class="pb-1">
                      77049267
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Direccion:
                    </td>
                    <td class="pb-1">
                      Av/ España 5 anillo dovle via
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
                      3278550
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Correo:
                    </td>
                    <td class="pb-1">
                      diegorojasrios31@gmail.com
                    </td>
                  </tr>
                  <tr>
                    <td class="pe-6 pb-1">
                      Trabajo:
                    </td>
                    <td class="pb-1">
                      Twiiti SRL
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
                v-for="item in purchasedProducts"
                :key="item.name"
              >
                <td class="text-no-wrap">
                  Departamento A-1
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
                  $69300
                </td>
                <td class="text-center">
                  $700
                </td>
                <td class="text-center">
                  $70000
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
                          Subtotal:
                        </p>
                        <p class="mb-2">
                          Discount:
                        </p>
                        <p class="mb-2">
                          Tax:
                        </p>
                        <p class="mb-2">
                          Total:
                        </p>
                      </div>
                    </td>

                    <td class="font-weight-medium text-high-emphasis">
                      <p class="mb-2">
                        $154.25
                      </p>
                      <p class="mb-2">
                        $00.00
                      </p>
                      <p class="mb-2">
                        $50.00
                      </p>
                      <p class="mb-2">
                        $204.25
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
                Este documento tiene validez únicamente hasta el <span style="text-decoration: underline;">{{ props.data.expiration_date }}</span>.
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
