<!-- eslint-disable camelcase -->
<script setup>
import AddQuoteInvoice from '@/components/quote/AddQuoteInvoice.vue'
import { useCustomer } from '@/composables/Customer/useCustomer'
import { useQuote } from '@/composables/Quote/useQuote'
import { PropertyType } from '@/enums/PropertyType'
import InvoiceSendInvoiceDrawer from '@/views/apps/invoice/InvoiceSendInvoiceDrawer.vue'
import { onMounted } from 'vue'

const { generateQuote, loadingQuote } = useQuote()
const { allCustomerPaginate,  customers } = useCustomer()

const quoteData = ref({
  social_reason: '',
  nit: null,
  address: '',
  email: '',
  phone: '',
  workplace: '',
  expiration_date: null,
  observations: '',
  payment_method: null,
  contract_signing_date: null,
  amount: null,
  initial_fee: null,
  balance: null,
  opportunity_id: null,
  customer_id: null,
  properties: [{
    property_id: null,
    price: null,
    price_it: null,
    price_contrato: null,
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
const isSendPaymentSidebarVisible = ref(false)

const addProduct = newProduct => {
  quoteData.value.properties.push(newProduct)
}

const removeProduct = id => {
  quoteData.value.properties.splice(id, 1)
}

const generateCotization = async() =>{
  console.log(quoteData)
  await generateQuote(quoteData.value)
  
 
}

onMounted(async () => {
  await allCustomerPaginate({
    page: 1,
    itemsPerPage: 100,
  })
})

watch(
  () => quoteData.value.properties,
  newProperties => {
    let totalPrice = 0 
    newProperties.forEach(property => {
      if (property.price) {
        const price = parseFloat(property.price) || 0

        property.price_it = price * 0.03 
        property.price_contrato = price + property.price_it
        totalPrice += property.price_contrato 
      } else {
        property.price_it = null
      }
    })
    quoteData.value.amount = totalPrice
  },
  { deep: true }, 
)

watch(
  () => quoteData.value.customer_id,
  newCustomerId => {
    const selectedCustomer = customers.value.find(customer => customer.id === newCustomerId)
    if (selectedCustomer) {
      quoteData.value.social_reason = selectedCustomer.name
      quoteData.value.email = selectedCustomer.email
      quoteData.value.phone = selectedCustomer.phone
      quoteData.value.opportunity_id = selectedCustomer.opportunity_id

    }
  },
)
</script>

<template>
  <VRow>
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
    <VCol
      cols="12"
      md="3"
    >
      <VCard class="mb-8">
        <VCol cols="12">
          <AppAutocomplete
            v-model="quoteData.customer_id"
            label="Clientes"
            placeholder="Selecciona un Cliente"
            :items="customers.map(customer => ({title:customer.name, value:customer.id}))"
            outlined
          />
        </VCol>
        <VCardText>
          <VBtn
            block
            class="mb-2"
            :loading="loadingQuote"
            :disabled="loadingQuote"
            @click="generateCotization"
          >
            Guardar  Cotizacion
          </VBtn>
        </VCardText>
      </VCard>

      <!-- 👉 Invoice send drawer -->
      <InvoiceSendInvoiceDrawer v-model:is-drawer-open="isSendSidebarActive" />
    </vcol>
  </VRow>

  <!-- 👉 Send Invoice Sidebar -->
  <InvoiceSendInvoiceDrawer v-model:is-drawer-open="isSendPaymentSidebarVisible" />
</template>
