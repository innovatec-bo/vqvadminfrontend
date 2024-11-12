<!-- eslint-disable camelcase -->
<script setup>
import { useSales } from '@/composables/Sales/useSales'
import { PaymentMethod } from '@/enums/PaymentMethod'
import { PropertyType } from '@/enums/PropertyType'
import { StagesOpportunity } from '@/enums/StagesOpportunity'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { VCol } from 'vuetify/lib/components/index.mjs'
import InvoiceAddMoney from '../quote/InvoiceAddMoney.vue'
import InvoiceAddPropertySale from './InvoiceAddPropertySale.vue'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  opportunity: {
    type: Object,
    required: true,
  },
  stage: {
    type: String,
    required: true,
  },

})

const emit = defineEmits(['update:isDialogVisible', 'registerSale'])
const { generateSale, generateSaleChangeStage } = useSales()
const loadingSale = ref(false)

const items = ['30', '50', '80', '100']
const selectedPercentage =  ref('30')

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const salesData = ref({
  social_reason: props.opportunity?.customer.name?? '',
  creation_date: new Date().toISOString().split('T')[0],
  nit: '',
  address: '',
  email: props.opportunity?.customer.email?? '',
  phone: props.opportunity?.customer.phone?? '',
  workplace: props.opportunity?.customer.workplace?? '',
  payment_method: null,
  contract_signing_date: null,
  amount: null,
  initial_fee: null,
  observations: '',
  opportunity_id: props.opportunity?.id ?? null,
  stage_id: StagesOpportunity.SALE.value,
  balance: null,
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
  quote_id: null,
})

const calculatedAmount = totalAmount => {
  // eslint-disable-next-line vue/no-mutating-props, camelcase
  salesData.value.initial_fee = (totalAmount * selectedPercentage.value) / 100
  salesData.value.balance = totalAmount - salesData.value.initial_fee

  return (totalAmount * selectedPercentage.value) / 100
}

const isGeneralFormValid = computed(() => {
  return salesData.value.social_reason && 
         salesData.value.nit &&
         salesData.value.email &&
         salesData.value.phone &&
         salesData.value.amount &&
         salesData.value.creation_date &&
         salesData.value.payment_method &&
         salesData.value.balance 
})

const arePropertiesValid = computed(() => {
  return salesData.value.properties.every(property => 
    property.property_id !== null &&
    property.price !== null &&
    property.price_it !== null &&
    property.price_contrato !== null,
  )
})

const isDiffersInitialFeeValid = computed(() => {
  if (salesData.value.differs_initial_fee.length === 0) return true

  return salesData.value.differs_initial_fee.every(item => 
    item.amount !== null,
  )
})

const isDiffersBalanceValid = computed(() => {
  if (salesData.value.differs_balance.length === 0) return true

  return salesData.value.differs_balance.every(item => 
    item.amount !== null,
  )
})

const isInitialFeeValid = computed(() => {
  if (salesData.value.differs_initial_fee.length === 0) {
    return true
  }

  const totalDiffersInitialFee = salesData.value.differs_initial_fee.reduce((sum, item) => {
    return sum + (parseFloat(item.amount) || 0) 
  }, 0)

  const totalFee = parseFloat(totalDiffersInitialFee)
  const initialFee = parseFloat(salesData.value.initial_fee)

  console.log(totalFee)
  console.log(initialFee)

  return totalFee === initialFee // Comparar con initial_fee
})

const isBalanceValid = computed(() => {
  if (salesData.value.differs_balance.length === 0) {
    return true
  }

  const totalDiffersBalance = salesData.value.differs_balance.reduce((sum, item) => {
    return sum + (parseFloat(item.amount) || 0) 
  }, 0)

  const totalFee = parseFloat(totalDiffersBalance)
  const balance = parseFloat(salesData.value.balance)
  
  console.log(totalFee)
  console.log(balance)
  
  return totalFee === balance // Comparar con initial_fee
})

const isFormValid = computed(() => {
  return isGeneralFormValid.value && 
   arePropertiesValid.value && isDiffersInitialFeeValid.value && isDiffersBalanceValid.value 
})

const generateSalePage = async () => {
  if (!isInitialFeeValid.value) {
    // showWarningToast('Validación fallida', 'La suma de las diferencias de la cuota inicial no son correctas')
    alert('Por favor, diferencias del anticipo ')
    
    return
  }
  if (!isBalanceValid.value) {
    // showWarningToast('Validación fallida', 'La suma de las diferencias del balance no son correctas')
    alert('Por favor, diferencias del balance ')
    
    return
  }
  if (!isFormValid.value) {
    alert('Por favor, completa todos los campos obligatorios.')
    
    return
  }
  loadingSale.value = true
  try {
    if (salesData.value.differs_balance.length === 0){
      salesData.value.differs_balance.push({
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        amount: salesData.value.amount - salesData.value.initial_fee,
      })
    }

    if (salesData.value.differs_initial_fee.length === 0){
      salesData.value.differs_initial_fee.push({
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        amount: salesData.value.initial_fee,
      })
    }

    console.log('data de la venta: ', salesData.value)
    if (props.stage === 'SALE') {
      await generateSale(salesData.value)
      console.log('entro a venta')
    } else if (props.stage === 'PRESALE') {
      await generateSaleChangeStage(salesData.value)
    }
    emit('update:isDialogVisible', false)
    emit('registerSale', salesData.value.opportunity_id)
  } catch (error) {
    console.error('Error generando la venta:', error)
  } finally {
    loadingSale.value = false 
  }
}

watch(
  () => salesData.value.properties,
  newProperties => {
    let totalPrice = 0 // Variable para sumar los precios
    newProperties.forEach(property => {
      if (property.price) {
        const price = parseFloat(property.price) || 0 // Convertir a número

        property.price_it = price * 0.03 // 3% del precio para priceIt
        property.price_contrato = price + property.price_it
        totalPrice += property.price_contrato

      } else {
        property.price_it = null
      }
    })

    salesData.value.amount = totalPrice
    salesData.value.initial_fee = totalPrice * 0.30
  },
  { deep: true },
)

watch(
  () => salesData.value.quote_id,
  newQuoteId => {
    const selectedCustomer = props.opportunity.quotes.find(quote => quote.id == newQuoteId)
    if (selectedCustomer) {
      salesData.value.social_reason = selectedCustomer.social_reason
      salesData.value.email = selectedCustomer.email
      salesData.value.phone = selectedCustomer.phone
      salesData.value.nit = selectedCustomer.nit
      salesData.value.address = selectedCustomer.address
      salesData.value.opportunity_id = selectedCustomer.opportunity_id
      salesData.value.workplace = selectedCustomer.workplace
      salesData.value.observations = selectedCustomer.observations
      if (selectedCustomer.property_id !== null) {
        salesData.value.properties[0].property_id = selectedCustomer.properties[0]?.id
        salesData.value.properties[0].price = selectedCustomer.properties[0]?.pivot_price
      }
    }
    salesData.value.quote_id = newQuoteId
  },
)
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="1000"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />
    <VCard>
      <VCardText class="d-flex flex-wrap justify-space-between gap-y-5 flex-column flex-sm-row">
        <VNodeRenderer
          :nodes="themeConfig.app.logo"
          class="me-3"
        />
        <h4 class="font-weight-bold  text-h4 d-flex  align-center">
          Formulario de Ventas
        </h4>
        <VNodeRenderer
          :nodes="themeConfig.app.logopora"
          class="me-3"
        />
      </VCardText>  
      <VRow class=" justify-end ma-sm-2">
        <div class="d-flex align-center justify-sm-end mx-5 ">
          <span style="inline-size: 9.5rem;">
            <VTextField
              v-model="salesData.creation_date"
              label="Emisión"
              type="date"
              outlined
              :rules="[requiredValidator]"
            />
          </span>
        </div>
      </Vrow>

      <VDivider thickness="12" />
      <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row gap-y-5 gap-4">
        <VRow>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppAutocomplete
              v-model="salesData.quote_id"
              :rules="[requiredValidator]"
              label="Cotizaciones Aprobadas *"
              placeholder="Selecciona una"
              :items="props.opportunity.quotes
                .filter(quote => quote.status === 'APPROVED') // Filtrar solo aprobados
                .map(quote => ({
                  title: quote.properties[0]?.code + ' | ' + quote.amount + '$ ' || quote.social_reason + ' | ' + quote.amount + '$ ' , 
                  value: quote.id
                }))"
              outlined
            />
          </VCol>
         
          <VCol
            cols="12"
            sm="8"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              v-model="salesData.social_reason"
              :rules="[requiredValidator]"
              label="Cliente *"
              placeholder="Canzza"
              outlined
              dense
              class="custom-salesforce-input"
            />
          </VCol>
          <VCol
            cols="12"
            sm="4"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              v-model="salesData.nit"
              label="C.I./NIT *"
              :rules="[requiredValidator]"
              placeholder="0000000"
              outlined
              dense
              class="custom-salesforce-input"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              v-model="salesData.workplace"
              label="Lugar de Trabajo"
              placeholder="Placeholder Text"
              outlined
              dense
              class="custom-salesforce-input"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              v-model="salesData.address"
              label="Dirección"
              placeholder="Av/ Equipetrol ...."
              outlined
              dense
              class="custom-salesforce-input"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              v-model="salesData.email"
              label="Correo *"
              :rules="[requiredValidator]"
              placeholder="admin@gmail.com"
              type="email"
              outlined
              dense
              class="custom-salesforce-input"
            />
          </VCol>
          <VCol
            cols="12"
            sm="3"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              v-model="salesData.phone"
              :rules="[requiredValidator]"
              label="Celular *"
              placeholder="77049267"
              outlined
              dense
              class="custom-salesforce-input"
            />
          </VCol>
          <VCol
            cols="12"
            sm="3"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              label="Teléfono Fijo "
              placeholder="33557292"
              outlined
              dense
              class="custom-salesforce-input"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VDivider thickness="12" />
      <VCardText class="add-products-form">
        <VRow>
          <VCol
            cols="12"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <InvoiceAddPropertySale :propertiesform="salesData.properties" />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppSelect
              v-model="salesData.payment_method"
              :rules="[requiredValidator]"

              label="Tipo de Pago *"
              placeholder="Seleccione "
              :items="Object.values(PaymentMethod)"
              class="custom-salesforce-input"
            />
          </VCol>
          <AppSelect
            v-model="selectedPercentage"
            :rules="[requiredValidator]"
            label="% Anticipo *"
            :items="items"
            placeholder="% Anticipo"
            class="mb-2"
          />
        </VRow>
      </VCardText>
      <VDivider thickness="12" />
      <!-- 👉 Total Amount -->
      <VCardText class="add-products-form">
        <VRow>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <InvoiceAddMoney
              title="Anticipo "
              :amount="calculatedAmount(salesData.amount) "
              :differs="salesData.differs_initial_fee"
              :type="INITIAL_PAYMENT"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <InvoiceAddMoney
              title="Saldo por Pagar"
              :amount="salesData.amount - salesData.initial_fee"
              :differs="salesData.differs_balance"
              :type="BALANCE"
            />
          </VCol>
          <VCol
            cols="12"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextarea
              v-model="salesData.observations"
              auto-grow
              label="Observaciones del Cliente"
              rows="2"
              placeholder="Descripción..."
              row-height="20"
            />
          </VCol>
          <VCol
            cols="12"
            class="my-5"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <VBtn
              color="primary"
              :loading="loadingSale"
              :disabled="!isFormValid || loadingSale"
              @click="generateSalePage"
            >
              Registrar Venta
            </VBtn>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.share-project-dialog {
  .card-list {
    --v-card-list-gap: 1rem;
  }
}
</style>
