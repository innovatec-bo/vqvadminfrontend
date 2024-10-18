<!-- eslint-disable camelcase -->
<script setup>
import poraIcon from '@/assets/icons/poraIcon.png'
import { useProcess } from '@/composables/Process/useProcess'
import { usePaymentPlans } from '@/composables/Sales/usePaymentPlans'
import DeliveryForm from '../sale/DeliveryForm.vue'
import PaymentPlanEdit from '../sale/PaymentPlanEdit.vue'

const props = defineProps({
  opportunity: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['updateStageId'])
const { checkProcessForOpportunity } = useProcess()
const { confirmPaymentPlans } = usePaymentPlans()

const confirmDelivery = ref(false)
const openEditPaymentPlan = ref(false)

const openSaleEditPaymentPlan = ref(false)

// const salePaymentPlan = ref([])
const paymentPlan = ref('')


const openDeliveryForm = () => {
  confirmDelivery.value = true
}

const editPaymentPlan = item => {
  console.log('entro aqui')
  openEditPaymentPlan.value = true
  paymentPlan.value = { ...item }
}

// const editSalePaymentPlan = item => {
//   openSaleEditPaymentPlan.value = true
//   salePaymentPlan.value = item
// }

const markProcedureAsDone = async (procedureId, isChecked) => {
  console.log(`Procedimiento ${procedureId} marcado como: ${isChecked ? 'realizado' : 'no realizado'}`)
  await checkProcessForOpportunity(props.opportunity.id, procedureId, {
    is_check: !isChecked,
  })
  emit('updateStageId', props.opportunity.id)
}

const confirmPayment = async paymentplanId => {
  
  console.log(paymentplanId)
  await confirmPaymentPlans( paymentplanId)
  emit('updateStageId', props.opportunity.id)
}


const updateDeliveryDate = async opportunityId => {
  emit('updateStageId', opportunityId)
}
</script>

<template>
  <!-- Saldos -->
  <div>
    <VCard>
      <VCardText>
        <VRow>
          <VCol
            cols="4"
            class="border rounded-sm mx-1"
          >
            <VListItemTitle class="font-weight-medium">
              Saldo
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
              <span class="text-h6">$ {{ props.opportunity.sales.amount -props.opportunity.sales.initial_fee }}</span>
            </VListItemSubtitle>
          </VCol>
          <VCol
            cols="3"
            class="border rounded-sm mx-1"
          >
            <VListItemTitle class="font-weight-medium">
              Anticipo
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
              <span class="text-h6">$ {{ props.opportunity.sales.initial_fee }}</span>
            </VListItemSubtitle>
          </VCol>
          <VCol
            cols="4"
            class="border rounded-sm mx-1"
          >
            <VListItemTitle class="font-weight-medium">
              Precio Final
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
              <span class="text-h6">${{ props.opportunity.sales.amount }}</span>
            </VListItemSubtitle>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>

  <!-- Propiedades -->
  <div class="my-5">
    <span style="font-size: 14px; font-weight: 500; ">
      Propiedades
    </span> 
    <div v-if="props.opportunity.sales.properties && props.opportunity.sales.properties.length > 0">
      <div
        v-for="properti in props.opportunity.sales.properties"
        :key="properti.id"
        class="d-flex align-center justify-between"
      >
        <VAvatar
          size="50"
          rounded
        >
          <img
            :src="poraIcon"
            alt="Logo pora"
            style="border-radius: 30%;"
          >
        </VAvatar>
        <VCol
          cols="12"
          md="7"
        >
          <VListItemTitle class="font-weight-medium">
            {{ properti.project_title }} | {{ properti.title }} 
          </VListItemTitle>
          <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
            <span>$ {{ properti.pivot_price }}</span>
          </VListItemSubtitle>
        </VCol>
      </div>
    </div>
  </div>

  <!-- TODO: quitar los types -->
  <!-- cuota inicial  -->
  <div>
    <span style="font-size: 14px; font-weight: 500; ">
      Cuota Inicial
    </span> 
    <!--
      <div 
      fill-dot
      @click="editSalePaymentPlan(props.opportunity.sales.initial_payments)"
      >
      <VIcon
      size="25"
      icon="tabler-edit"
      /> 
    -->
    <VTable
      density="compact"
      class="text-no-wrap my-2"
      style="font-size: 12px;"
    >
      <thead>
        <tr>
          <th>
            Propiedad
          </th>
          <th>
            Fecha
          </th>
          <th>
            Monto
          </th>
          <th>
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in props.opportunity.sales.initial_payments"
          :key="item.id"
        >
          <td>
            {{ item.property_title }}
          </td>
          <td>
            {{ item.date }}
          </td>
          <td>
            {{ item.amount }}
          </td>
          <td>
            <VRow>
              <VCheckbox
                v-model="item.is_paid"
                :true-value="1"
                :false-value="0"
                :disabled="item.is_paid === 1"
                @change="confirmPayment(item.id)"
              />
              <div 
                fill-dot
                @click="editPaymentPlan(item)"
              >
                <VIcon
                  size="25"
                  icon="tabler-edit"
                />
              </div>
            </VRow>
          </td>
        </tr>
      </tbody>
    </VTable>
  </div>
  <!-- saldo -->
  <div>
    <span style="font-size: 14px; font-weight: 500; ">
      Saldo
    </span> 
    
   
    <VTable
      density="compact"
      class="text-no-wrap my-2"
      style="font-size: 12px;"
    >
      <thead>
        <tr>
          <th>
            Propiedad
          </th>
          <th>
            Fecha
          </th>
          <th>
            Monto
          </th>
          <th>
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="item in props.opportunity.sales.balance_payments"
          :key="item.id"
        >
          <td>
            {{ item.property_title }}
          </td>
          <td>
            {{ item.date }}
          </td>
          <td>
            {{ item.amount }}
          </td>
          <td>
            <VRow>
              <VCheckbox
                v-model="item.is_paid"
                :true-value="1"
                :false-value="0"
                :disabled="item.is_paid === 1"
                @change="confirmPayment(item.id)"
              />
              <div 
                fill-dot
                @click="editPaymentPlan(item)"
              >
                <VIcon
                  size="25"
                  icon="tabler-edit"
                />
              </div>
            </VRow>
          </td>
        </tr>
      </tbody>
    </VTable>
  </div>
  <!-- procesos  -->
  <div class="my-5">
    <span style="font-size: 14px; font-weight: 500; ">
      Procesos
    </span> 
     
    <div
      v-if="props.opportunity.procedure && props.opportunity.procedure.length > 0"
      class="d-flex flex-wrap gap-2 my-5"
    >
      <div
        v-for="procedure in props.opportunity.procedure"
        :key="procedure.id"
      >
        <VChip
          :color="procedure.pivot.is_check ? 'primary' : 'secondary'"
          variant="outlined"
          class="my-1"
          style="cursor: pointer;"
          fill-dot
          @click="markProcedureAsDone(procedure.id, procedure.pivot.is_check)" 
        >
          <VIcon
            v-if="procedure.pivot.is_check"
            icon="tabler-check"
            class="mr-2"
          />
          {{ procedure.title }}
        </VChip>
      </div>
    </div>
    <div v-else>
      <span>No hay procedimientos disponibles.</span>
    </div>
  </div>

  <!-- Botón pasar estado -->
  <VCardText class="d-flex justify-center mt-4">
    <VBtn
      color="primary"
      class="mx-auto"
     
      @click="openDeliveryForm"
    >
      Siguiente Etapa
    </VBtn>
  </VCardText>
 
  <DeliveryForm
    v-model:is-dialog-visible="confirmDelivery"
    :opportunity="props.opportunity"
    @update-delivery-date="updateDeliveryDate"
  />
  <PaymentPlanEdit
    v-model:is-dialog-visible="openEditPaymentPlan"
    :payment="paymentPlan"
    :opportunity="props.opportunity"
    @update-delivery-date="updateDeliveryDate"
  />
  
  <!--
    <SalePaymentPlan
    v-model:is-dialog-visible="openSaleEditPaymentPlan"
    :opportunity="props.opportunity"
    :sales-payment="salePaymentPlan"
    @update-delivery-date="updateDeliveryDate"
    /> 
  -->
</template>
