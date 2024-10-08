<script setup>
import { PaymentMethod } from '@/enums/PaymentMethod'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import InvoiceAddMoney from './InvoiceAddMoney.vue'
import InvoiceAddProperty from './InvoiceAddProperty.vue'

const props = defineProps({
  data: {
    type: null,
    required: true,
  },
})

const emit = defineEmits([
  'push',
  'remove',
])


// 👉 Add item function
const addItem = newProduct => {
  emit('push', newProduct) // Emite el evento hacia el abuelo
}


const removeProduct = id => {
  emit('remove', id)
}
</script>

<template>
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
        <!-- 👉 Address -->
        <p class="mb-0">
          Office 149, 450 South Brand Brooklyn
        </p>
      </div>

      <!-- 👉 Right Content -->
      <div class="mt-4 ma-sm-4">
        <!-- 👉 Invoice Id -->
        <h6 class="d-flex align-center font-weight-medium justify-sm-end text-xl mb-3">
          <span
            class="me-3 text-h4"
            style="inline-size: 6rem;"
          >Invoice</span>
          <span>
            <AppTextField
              disabled
              prefix="#"
              density="compact"
              style="inline-size: 9.5rem;"
            />
          </span>
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
            v-model="props.data.social_reason"
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
            v-model="props.data.nit"
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
            v-model="props.data.workplace"
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
            v-model="props.data.address"
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
            v-model="props.data.phone"
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
            :properties="props.data.properties"
            @add-property="addItem"
          />  
        </VCol>
        <VCol
          cols="12"
          sm="6"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppSelect
            v-model="props.data.payment_method"
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
            v-model="props.data.amount"
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
          <InvoiceAddMoney />
        </VCol>
        <VCol
          cols="12"
          sm="6"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <InvoiceAddMoney />
        </VCol>
        <VCol
          cols="12"
          sm="6"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppTextField
            v-model="props.data.contract_signing_date"
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
            v-model="props.data.observations"
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
</template>
