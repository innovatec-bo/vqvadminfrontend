<script setup>
import { PaymentMethod } from '@/enums/PaymentMethod'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { VRow } from 'vuetify/lib/components/index.mjs'
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

const addItem = newProduct => {
  emit('push', newProduct) 
}

const removeProduct = id => {
  emit('remove', id)
}

const items = ['20', '30', '40', '50', '70', '80', '100']

const selectedPercentage =  ref('30')

const calculatedAmount = totalAmount => {
  // eslint-disable-next-line vue/no-mutating-props, camelcase
  props.data.initial_fee = (totalAmount * selectedPercentage.value) / 100 

  // eslint-disable-next-line vue/no-mutating-props, camelcase
  props.data.percentage_initial_fee = selectedPercentage.value

  // eslint-disable-next-line vue/no-mutating-props
  props.data.balance = totalAmount - props.data.initial_fee

  // eslint-disable-next-line vue/no-mutating-props
  return (totalAmount * selectedPercentage.value) / 100
}
</script>

<template>
  <VCard>
    <!-- SECTION Header -->
    <VCardText class="d-flex flex-wrap justify-space-between gap-y-5 flex-column flex-sm-row align-center">
      <VNodeRenderer
        :nodes="themeConfig.app.logo"
        class="me-3"
        style="align-self: center;"
      />
      <h4 class="font-weight-bold  text-h3 d-flex  align-center">
        Formulario de Cotizacion
      </h4>
      <VNodeRenderer
        :nodes="themeConfig.app.logopora"
        class="me-3"
        style="align-self: center;"
      />
    </VCardText>

    <VRow class=" justify-end ma-sm-2">
      <div class="d-flex align-center justify-sm-end mx-2 ">
        <span style="inline-size: 6rem;">Emisión </span>
        <span style="inline-size: 9.5rem;">
          <AppDateTimePicker
            v-model="props.data.creation_date"
            :rules="[requiredValidator]"
            density="compact"
            placeholder="YYYY-MM-DD"
            :config="{ position: 'auto right' }"
          />
        </span>
      </div>
      <div class="d-flex align-center justify-sm-end ">
        <span class="mx-2">Válido </span>
        <span style="inline-size: 9.5rem;">
          <AppDateTimePicker
            v-model="props.data.expiration_date"
            :rules="[requiredValidator]"
            density="compact"
            placeholder="YYYY-MM-DD"
            :config="{ position: 'auto right' }"
          />
        </span>
      </div>
    </Vrow>
    <VDivider thickness="12" />

    <VCardText class="d-flex flex-wrap justify-space-between flex-column flex-sm-row gap-y-5 gap-4">
      <VRow>
        <VCol
          cols="12"
          sm="8"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppTextField
            v-model="props.data.social_reason"
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
            v-model="props.data.nit"
            :rules="[requiredValidator]"
            label="C.I./NIT *"
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
            v-model="props.data.email"
            label="Correo *"
            placeholder="email@gmail.com"
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
            label="Dirección"
            placeholder="Av/ Equipetrol ...."
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
            v-model="props.data.phone"
            :rules="[requiredValidator]"
            label="Celular *"
            placeholder="77049267"
            outlined
            dense
            class="custom-salesforce-input"
          />
        </VCol>

        <!--
          <VCol
          cols="12"
          sm="3"
          style="padding-block: 0;padding-inline: 8px;"
          >
          <AppTextField
          v-model="props.data.landline"
          label="Teléfono Fijo"
          placeholder="33557292"
          outlined
          dense
          class="custom-salesforce-input"
          />
          </VCol> 
        -->
      </VRow>
    </VCardText>

    <VDivider thickness="12" />

    <!-- Añadir departamento o parqueo -->
    <VCardText class="add-products-form">
      <VRow>
        <VCol
          cols="12"
          style="padding-block: 0;padding-inline: 8px;"
          class="mb-2"
        >
          <InvoiceAddProperty
            :properties="props.data.properties"
            @add-property="addItem"
            @remove-product="removeProduct"
          />  
        </VCol>
        <VCol
          cols="12"
          sm="3"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppSelect
            v-model="props.data.payment_method"
            :rules="[requiredValidator]"
            label="Tipo de Pago *"
            placeholder="Seleccione "
            :items="Object.values(PaymentMethod)"
            class="custom-salesforce-input"
          />
        </VCol>
        <VCol
          cols="12"
          sm="3"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppTextField
            v-model="props.data.amount"
            :value="props.data.amount"
            :rules="[requiredValidator]"
            label="Total *"
            placeholder="1000.000,00"
            outlined
            dense
          />
        </VCol>
        <VCol
          cols="12"
          sm="3"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppSelect
            v-model="selectedPercentage"
            :items="items"
            label="Anticipo: %"
            placeholder="% Anticipo"
            class="mb-2"  
          />
        </VCol>
        <VCol
          cols="12"
          sm="3"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <div class=" text-center my-4"> 
            <h4> Saldo por pagar: </h4>
            <span>
              {{ formatCurrency(props.data.amount - props.data.initial_fee ) }}
            </span>
          </div>
        </VCol>
      </VRow>
    </VCardText>
    <VCardText class="add-products-form">
      <VRow>
        <VCol
          cols="12"
          sm="6"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <InvoiceAddMoney 
            title=" Anticipo " 
            :amount="calculatedAmount(props.data.amount)"
            :differs="props.data.differs_initial_fee " 
            :type="INITIAL_PAYMENT"
          />
        </VCol>
      
        <VCol
          cols="12"
          sm="6"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppTextarea
            v-model="props.data.observations"
            auto-grow
            label="Observaciones del Cliente"
            rows="3"
            placeholder="Descripción..."
            row-height="20"
          />
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
