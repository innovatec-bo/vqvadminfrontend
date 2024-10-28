<!-- eslint-disable camelcase -->
<script setup>
import AddQuoteInvoice from '@/components/quote/AddQuoteInvoice.vue'
import { useCustomer } from '@/composables/Customer/useCustomer'
import { useQuote } from '@/composables/Quote/useQuote'
import { PropertyType } from '@/enums/PropertyType'
import { onMounted } from 'vue'

const { generateQuote } = useQuote()
const { allCustomerPaginate,  customers } = useCustomer()
const loadingQuote = ref(false)

const quoteData = ref({
  social_reason: '',  
  nit: '',
  address: '',
  email: '',
  phone: '',
  workplace: '',
  expiration_date: null,
  creation_date: new Date().toISOString().split('T')[0],
  observations: '',
  payment_method: null,
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
  differs_initial_fee: [],
  differs_balance: [],
})

const isGeneralFormValid  = computed(() => {
  return quoteData.value.social_reason && 
         quoteData.value.nit &&
         quoteData.value.email &&
         quoteData.value.phone &&
         quoteData.value.amount &&
         quoteData.value.creation_date &&
         quoteData.value.expiration_date &&
         quoteData.value.payment_method &&
         quoteData.value.balance &&
         quoteData.value.customer_id 
})

const arePropertiesValid = computed(() => {
  return quoteData.value.properties.every(property => 
    property.property_id !== null &&
    property.price !== null &&
    property.price_it !== null &&
    property.price_contrato !== null,
  )
})

const isDiffersInitialFeeValid = computed(() => {
  if (quoteData.value.differs_initial_fee.length === 0) return true

  return quoteData.value.differs_initial_fee.every(item => 
    item.amount !== null,
  )
})

const isInitialFeeValid = computed(() => {
  if (quoteData.value.differs_initial_fee.length === 0) {
    return true
  }

  const totalDiffersInitialFee = quoteData.value.differs_initial_fee.reduce((sum, item) => {
    return sum + (item.amount || 0) // Sumar los amounts, considerando que podrían ser null
  }, 0)

  const totalFee = parseFloat(totalDiffersInitialFee)
  const initialFee = parseFloat(quoteData.value.initial_fee)
  
  return totalFee === initialFee // Comparar con initial_fee
})


const isFormValid = computed(() => {
  return isGeneralFormValid.value && arePropertiesValid.value && isDiffersInitialFeeValid.value 
})

const addProduct = newProduct => {
  quoteData.value.properties.push(newProduct)
}

const removeProduct = id => {
  quoteData.value.properties.splice(id, 1)
}

const generateCotization = async() =>{

  if (!isInitialFeeValid.value) {
    showWarningToast('Validación fallida', 'La suma de las diferencias de la cuota inicial no son correctas')
    
    return // Terminar la ejecución si la validación falla
  }
  if (!isFormValid.value) {
    alert('Por favor, completa todos los campos obligatorios.')
    
    return
  }
  loadingQuote.value = true
  try{
    console.log(quoteData)
    await generateQuote(quoteData.value)
  } catch (error) {
    console.error('Error generando la venta:', error)
  } finally {
    loadingQuote.value = false
  }
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
    const selectedCustomer = customers.value.find(customer => customer.id == newCustomerId)
    if (selectedCustomer) {
      quoteData.value.social_reason = selectedCustomer.name
      quoteData.value.email = selectedCustomer.email
      quoteData.value.phone = selectedCustomer.phone
      quoteData.value.nit = selectedCustomer.ci
      quoteData.value.opportunity_id = selectedCustomer.opportunity_id
      
      // Asignar property_id si no es null
      if (selectedCustomer.property_id !== null) {
        quoteData.value.properties[0].property_id = selectedCustomer.property_id
      }
    }
    quoteData.value.customer_id = newCustomerId
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
            :rules="[requiredValidator]"
            label="Clientes"
            placeholder="Selecciona un Cliente"
            :items="customers.map(customer => ({title:customer.name, value:customer.id}))"
            outlined
          />
        </VCol>
        <VCardText>
          <VBtn
            :loading="loadingQuote"
            :disabled="!isFormValid || loadingQuote"
            class="mb-2"
            @click="generateCotization"
          >
            Guardar Cotizacion
          </VBtn>
        </VCardText>
      </VCard>
    </vcol>
  </VRow>
</template>
