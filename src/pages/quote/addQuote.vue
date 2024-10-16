<!-- eslint-disable camelcase -->
<script setup>
import AddQuoteInvoice from '@/components/quote/AddQuoteInvoice.vue'
import { PropertyType } from '@/enums/PropertyType'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'

const quoteData = ref({
  social_reason: '',
  nit: null,
  address: '',
  email: '',
  phone: '',
  workplace: '',
  date_listing: null,
  obersvations: '',
  payment_method: null,
  contract_signing_date: null,
  amount: null,
  initial_fee: null,
  opportunity_id: null,
  customer_id: null,
  properties: [{
    property_id: null,
    price: null,
    priceIt: null,
    property_type: PropertyType.DEPARTAMENT.value,
    property_type_name: PropertyType.DEPARTAMENT.label,
  }],
  differs_initial_fee: [{
    date: null,
    amount: null,
  }],
  differs_balance: [{
    date: null,
    amount: null,
  }],
})

const isSendSidebarActive = ref(false)
const paymentTerms = ref(true)
const clientNotes = ref(false)
const paymentStub = ref(false)

const isSendPaymentSidebarVisible = ref(false)

const addProduct = newProduct => {
  quoteData.value.properties.push(newProduct) // Agrega el nuevo producto a la lista de propiedades
}

const removeProduct = id => {
}

const generateCotization = async =>{
  console.log(quoteData)
}

watch(
  () => quoteData.value.properties,
  newProperties => {
    let totalPrice = 0 // Variable para sumar los precios

    newProperties.forEach(property => {
      if (property.price) {
        // Convertir el precio a número para evitar la concatenación
        const price = parseFloat(property.price) || 0 // Si no es un número válido, usar 0

        property.priceIt = price * 0.03 // 3% del precio
        totalPrice += price // Sumar el precio de la propiedad al total
      } else {
        property.priceIt = null
      }
    })

    quoteData.value.amount = totalPrice // Asignar el total de los precios a `amount`
  },
  { deep: true },
)
</script>

<template>
  <VRow>
    <!-- 👉 InvoiceEditable -->
    <VCol
      cols="12"
      md="9"
    >
      <AddQuoteInvoice
        :data="quoteData"
        @push="addProduct"
        @remove="removeProduct"
      />
    </VCol>

    <!-- 👉 Right Column: Invoice Action -->
    <VCol
      cols="12"
      md="3"
    >
      <VCard class="mb-8">
        <VCardText>
          <!-- 👉 Send Invoice -->
          <VBtn
            block
            prepend-icon="tabler-send"
            class="mb-2"
            @click="generateCotization"
          >
            Send Invoice
          </VBtn>

          <!-- 👉 Preview -->
          <VBtn
            block
            color="default"
            variant="tonal"
            class="mb-2"
            :to="{ name: 'apps-invoice-preview-id', params: { id: '5036' } }"
          >
            Preview
          </VBtn>

          <!-- 👉 Save -->
          <VBtn
            block
            color="default"
            variant="tonal"
            @click="isAddPaymentSidebarActive = true"
          >
            Save
          </VBtn>
        </VCardText>
      </VCard>
      <!-- 👉 Payment Terms -->
      <div class="d-flex align-center justify-space-between mb-2">
        <VLabel for="payment-terms">
          Payment Terms
        </VLabel>
        <div>
          <VSwitch
            id="payment-terms"
            v-model="paymentTerms"
          />
        </div>
      </div>

      <!-- 👉  Client Notes -->
      <div class="d-flex align-center justify-space-between mb-2">
        <VLabel for="client-notes">
          Client Notes
        </VLabel>
        <div>
          <VSwitch
            id="client-notes"
            v-model="clientNotes"
          />
        </div>
      </div>

      <!-- 👉  Payment Stub -->
      <div class="d-flex align-center justify-space-between">
        <VLabel for="payment-stub">
          Payment Stub
        </VLabel>
        <div>
          <VSwitch
            id="payment-stub"
            v-model="paymentStub"
          />
        </div>
      </div>
    </VCol>

    <!-- 👉 Invoice send drawer -->
    <InvoiceSendInvoiceDrawer v-model:is-drawer-open="isSendSidebarActive" />
  </VRow>

  <!-- 👉 Send Invoice Sidebar -->
  <InvoiceSendInvoiceDrawer v-model:is-drawer-open="isSendPaymentSidebarVisible" />
</template>
