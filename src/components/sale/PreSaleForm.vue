<!-- eslint-disable camelcase -->
<script setup>
import { useProperty } from '@/composables/Realty/useProperty'
import { PaymentMethod } from '@/enums/PaymentMethod'
import { PropertyType } from '@/enums/PropertyType'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import InvoiceAddMoney from '../quote/InvoiceAddMoney.vue'
import InvoiceAddProperty from '../quote/InvoiceAddProperty.vue'

const props = defineProps({
  isDialogVisible: {
    type: Boolean,
    required: true,
  },
  opportunity: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:isDialogVisible'])

const { properties, propertiesForType } = useProperty()

const dialogVisibleUpdate = val => {
  emit('update:isDialogVisible', val)
}

const salesData = ref({
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

const addItem = newProduct => {
  salesData.value.properties.push(newProduct)
}

const generateSale = async () => {
  console.log(salesData)
}

watch(
  () => salesData.value.properties,
  newProperties => {
    let totalPrice = 0 // Variable para sumar los precios

    newProperties.forEach(property => {
      if (property.price) {
        const price = parseFloat(property.price) || 0 // Convertir a número

        property.priceIt = price * 0.03 // 3% del precio para priceIt
        totalPrice += price // Sumar el precio al total
      } else {
        property.priceIt = null
      }
    })

    // Asignar el total de los precios a `amount`
    salesData.value.amount = totalPrice

    // Calcular la cuota inicial como el 30% del total
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
            <VBtn
              color="primary"
              @click="generateSale"
            >
              Registrar Venta
            </VBtn>
          </h6>

          <!-- 👉 Issue Date -->
          <div class="d-flex align-center justify-sm-end mb-3">
            <span
              class="me-3"
              style="inline-size: 6rem;"
            >Date Issued</span>
            <span style="inline-size: 9.5rem;">
              <AppDateTimePicker
                density="compact"
                placeholder="YYYY-MM-DD"
                :config="{ position: 'auto right' }"
              />
            </span>
          </div>
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
              v-model="salesData.phone"
              label="Celular:"
              placeholder="77049267"
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
            <InvoiceAddProperty
              :properties="salesData.properties"
              @add-property="addItem"
            />  
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
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              v-model="salesData.amount"
              label="Total en Contrato :"
              placeholder="Placeholder Text"
              outlined
              dense
              class="custom-salesforce-input"
            />
          </VCol>
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
              title="Cuota Inicial"
              :amount="salesData.initial_fee"
              :differs="salesData.differs_initial_fee"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <InvoiceAddMoney
              title="Saldo"
              :amount="salesData.amount - salesData.initial_fee"
              :differs="salesData.differs_balance"
            />
          </VCol>
          <VCol
            cols="12"
            sm="6"
            style="padding-block: 0;padding-inline: 8px;"
          >
            <AppTextField
              v-model="salesData.contract_signing_date"
              label="Firma de Contrato :"
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
              label="Fecha de Deposito:"
              placeholder="Placeholder Text"
              outlined
              dense
              class="custom-salesforce-input"
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
