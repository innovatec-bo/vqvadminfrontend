<!-- eslint-disable camelcase -->
<script setup>
import { useSales } from '@/composables/Sales/useSales'
import { PaymentMethod } from '@/enums/PaymentMethod'
import { PropertyType } from '@/enums/PropertyType'
import { StagesOpportunity } from '@/enums/StagesOpportunity'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
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
const isSubmitting = ref(false)

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const loadingSale = ref(false)

const salesData = ref({
  social_reason: props.opportunity?.customer.name?? '',
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

const items = ['10', '20', '30']
const selectedPercentage =  ref('10')


const calculatedAmount = totalAmount => {
  // eslint-disable-next-line vue/no-mutating-props, camelcase
  salesData.value.initial_fee = (totalAmount * selectedPercentage.value) / 100

  return (totalAmount * selectedPercentage.value) / 100
}

const calculateInitialFeeDifference = () => {
  const totalDiffersInitialFee = salesData.value.differs_initial_fee.reduce((sum, fee) => sum + (fee.amount || 0), 0)

  return salesData.value.initial_fee - totalDiffersInitialFee
}

const calculateBalanceDifference = () => {
  const totalDiffersBalance = salesData.value.differs_balance.reduce((sum, balance) => sum + (balance.amount || 0), 0)

  return  (salesData.value.amount - salesData.value.initial_fee) - totalDiffersBalance
}

const handleLogin = async () => {
  isSubmitting.value= true
  await generateSalePage()
  isSubmitting.value = false
}

const onSubmit = () => {
  salesData.value?.validate().then(({ valid: isValid }) => {
    if (isValid) handleLogin()
  })
}

const isFormValid = computed(() => {
  return salesData.value.social_reason && 
         salesData.value.nit &&
         salesData.value.email &&
         salesData.value.phone &&
         salesData.value.amount &&
         salesData.value.initial_fee
})


const generateSalePage = async () => {
  if (!isFormValid.value) {
    alert('Por favor, completa todos los campos obligatorios.')
    
    return
  }
  loadingSale.value = true
  try {
    const initialFeeDifference = calculateInitialFeeDifference()
    const balanceDifference = calculateBalanceDifference()
    if (salesData.value.differs_balance.length === 0){
      salesData.value.differs_balance.push({
        date: new Date().toISOString().slice(0, 19).replace('T', ' '),
        amount: salesData.value.amount - salesData.value.initial_fee,
      })
    }

    console.log('data de la venta: ', salesData.value)

    if (props.stage === 'SALE') {
      console.log('entro a venta')
    } else if (props.stage === 'PRESALE') {
      await generateSale(salesData.value)
    }

    // await generateSaleChangeStage(salesData.value)

    emit('update:isDialogVisible', false)
    emit('registerSale', salesData.value.opportunity_id)
  } catch (error) {
    console.error('Error generando la venta:', error)
  } finally {
    loadingSale.value = false // Finaliza el estado de carga
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
</script>

<template>
  <VDialog
    :model-value="props.isDialogVisible"
    max-width="800"
    @update:model-value="dialogVisibleUpdate"
  >
    <!-- 👉 Dialog close btn -->
    <DialogCloseBtn @click="$emit('update:isDialogVisible', false)" />
    <VCard>
      <!--
        <VForm
        ref="salesData"
        @submit="onSubmit"
        > 
      -->
      <!-- SECTION Header -->
      <VCardText class="d-flex flex-wrap justify-space-between gap-y-5 flex-column flex-sm-row">
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
          <H3>Formulario de Venta</H3>
        </div>

        <!-- 👉 Right Content -->
        <div class="mt-4 ma-sm-4">
          <!-- 👉 Invoice Id -->
          <h6 class="d-flex align-center font-weight-medium justify-sm-end text-xl mb-3">
            <!--
              <VBtn
              block
              type="submit"
              :disabled="loading"
              :loading="loading"
              >
              Registrar Venta
              </VBtn> 
            -->
            <VBtn
              color="primary"
              :loading="loadingSale"
              :disabled="!isFormValid || loadingSale"
              @click="generateSalePage"
            >
              Registrar Venta
            </VBtn>
          </h6>
        </div>
      </VCardText>
      <!-- !SECTION -->
      <VDivider thickness="24" />

      <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row gap-y-5 gap-4">
        <VRow>
          <VCol
            cols="12"
            sm="8"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              v-model="salesData.social_reason"
              :rules="[requiredValidator]"
              label="Razon social:"
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
              label="C.I./NIT:"
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
              label="Lugar de Trabajo:"
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
              label="Direccion:"
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
              label="Correo:"
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
              label="Celular:"
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
              label="Telefono Fijo:"
              placeholder="33557292"
              outlined
              dense
              class="custom-salesforce-input"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VDivider thickness="24" />
      <!-- 👉 Add purchased products -->
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
              label="Tipo de Pago :"
              placeholder="Seleccione "
              :items="Object.values(PaymentMethod)"
              class="custom-salesforce-input"
            />
          </VCol>
          <AppSelect
            v-model="selectedPercentage"
            :rules="[requiredValidator]"
            label="% Cuota Inicial :"
            :items="items"
            placeholder="% Cuota inicial"
            class="mb-2"
          />
        </VRow>
      </VCardText>
      <VDivider thickness="24" />
      <!-- 👉 Total Amount -->
      <VCardText class="add-products-form">
        <VRow>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <InvoiceAddMoney
              :title="'Cuota Inicial: ' + calculatedAmount(salesData.amount) "
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
              :title="'Saldo: ' + (salesData.amount - salesData.initial_fee) "
              :amount="salesData.amount - salesData.initial_fee"
              :differs="salesData.differs_balance"
              :type="BALANCE"
            />
          </VCol>


          <VCol
            cols="12"
            sm="6"
            class="mt-12"
          >
            <VDivider thickness="4" />
            <div class="text-center my-1">
              <span>
                Firma del Cliente
              </span>
            </div>
          </VCol>
          <VCol
            cols="12"
            sm="6"
            class="mt-12"
          >
            <VDivider thickness="4" />
            <div class="text-center my-1">
              <span>
                Firma Gerente Administrativo
              </span>
            </div>
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
              placeholder="Descripcion..."
              row-height="20"
            />
          </VCol>
        </VRow>
      </VCardText>
      <VDivider thickness="24" />
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
      <!-- </VForm>  -->
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
