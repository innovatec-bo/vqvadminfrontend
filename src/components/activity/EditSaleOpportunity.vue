<!-- eslint-disable camelcase -->
<script setup>
import poraIcon from '@/assets/icons/poraIcon.png'
import { useOpportunity } from '@/composables/Opportunity/useOpportunity'
import { useProcess } from '@/composables/Process/useProcess'
import { usePaymentPlans } from '@/composables/Sales/usePaymentPlans'
import DeliveryForm from '../sale/DeliveryForm.vue'
import PaymentPlanEdit from '../sale/PaymentPlanEdit.vue'
import PreSaleForm from '../sale/PreSaleForm.vue'
import SalePaymentPlan from '../sale/SalePaymentPlan.vue'

const props = defineProps({
  opportunity: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['updateStageId'])
const { checkProcessForOpportunity } = useProcess()
const { confirmPaymentPlans } = usePaymentPlans()
const { changeStatusByOpportunity, loadingOpportunity } = useOpportunity()


const confirmDelivery = ref(false)
const openEditPaymentPlan = ref(false)
const generateSaleDialog = ref(false)
const paymentPlan = ref('')


const totalAmount = computed(() => {
  return props.opportunity.sales.reduce((sum, sale) => sum + sale.amount, 0)
})

const totalInitialFee = computed(() => {
  return props.opportunity.sales.reduce((sum, sale) => sum + sale.initial_fee, 0)
})

const totalBalance = computed(() => {
  return totalAmount.value - totalInitialFee.value
})

const openDeliveryForm = () => {
  confirmDelivery.value = true
}

const openSaleForm = () => {
  generateSaleDialog.value = true
}

const editPaymentPlan = item => {
  if ( item.is_paid === 1){
    showWarningToast('Advertencia', 'No se puede editar un pago ya realizado.')
    
    return 
  }
  console.log('entro aqui')
  openEditPaymentPlan.value = true
  paymentPlan.value = { ...item }
}

const registerSale = async opportunityId => {
  emit('updateStageId', opportunityId)
}

const markProcedureAsDone = async procedure => {
  console.log(`Procedimiento ${procedure.id} marcado como: ${procedure.pivot.is_check ? 'realizado' : 'no realizado'}`)
  await checkProcessForOpportunity(props.opportunity.id, procedure.id, {
    is_check: !procedure.pivot.is_check, 
  })
  procedure.pivot.is_check = !procedure.pivot.is_check
  emit('updateStageId', props.opportunity.id)
}

const confirmPayment = async paymentplanId => {
  console.log(paymentplanId)
  await confirmPaymentPlans( paymentplanId)
  emit('updateStageId', props.opportunity.id)
}

const changeStage = async opportunityId => {
  await changeStatusByOpportunity(opportunityId, 5, {})

  emit('updateStageId', opportunityId)
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
              <span class="text-h6">{{ formatCurrency(totalBalance) }}</span>
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
              <span class="text-h6">{{ formatCurrency(totalInitialFee) }}</span>
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
              <span class="text-h6">{{ formatCurrency(totalAmount) }} </span>
            </VListItemSubtitle>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </div>

  <!-- Propiedades -->
  <div class="my-5">
    <span style="font-size: 14px; font-weight: 500;">
      Propiedades
    </span> 
    <div v-if="props.opportunity.sales.length > 0">
      <div
        v-for="sale in props.opportunity.sales"
        :key="sale.id"
      >
        <div
          v-for="property in sale.properties"
          :key="property.id"
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
              {{ property.project_title }} | {{ property.title }}
            </VListItemTitle>
            <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
              <span>$ {{ property.pivot_price }}</span>
            </VListItemSubtitle>
          </VCol>
        </div>
      </div>
    </div>
  </div>

  <!-- Anticipo -->
  <div class="mb-4">
    <span style="font-size: 14px; font-weight: 500; ">
      Anticipo
    </span> 
    <VTable
      v-if="props.opportunity.initial_payments && props.opportunity.initial_payments.length > 0"
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
          v-for="item in props.opportunity.initial_payments"
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
                v-if="item.is_paid === 0"
                fill-dot
                style="cursor: pointer;"
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
      Saldos
    </span> 
    <VTable
      v-if="props.opportunity.balance_payments && props.opportunity.balance_payments.length > 0"
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
          v-for="item in props.opportunity.balance_payments"
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
              > 
                <VTooltip
                  activator="parent"
                  location="top"
                >
                  Confirmar Pago
                </VTooltip>
              </VCheckbox> 
              <div 
                v-if="item.is_paid === 0"
                fill-dot
                style="cursor: pointer;"
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
          @click="markProcedureAsDone(procedure)" 
        >
          <VIcon
            v-if="procedure.pivot.is_check"
            icon="tabler-check"
            class="mr-2"
          />
          {{ procedure.title }}
        </VChip>
        <VTooltip
          activator="parent"
          location="top"
        >
          {{ procedure.pivot.is_check? 'Deshacer Proceso': 'Confirmar Proceso' }}
        </VTooltip>
      </div>
    </div>
    <div v-else>
      <span>No hay procedimientos disponibles.</span>
    </div>
  </div>

  <!-- Botón pasar estado -->
  <VCardText class="d-flex  mt-4">
    <VBtn
      color="primary"
      variant="tonal"
      class="mx-auto"
      size="small"
      @click="openSaleForm"
    >
      Generar Venta
    </VBtn> 
   
    <VBtn
      color="primary"
      class="mx-auto"
      size="small"
     
      @click="changeStage(props.opportunity.id)"
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
  <PreSaleForm
    v-model:is-dialog-visible="generateSaleDialog"
    :opportunity="props.opportunity"
    stage="SALE"
    @register-sale="registerSale"
  />
  <SalePaymentPlan
    v-model:is-dialog-visible="openSaleEditPaymentPlan"
    :opportunity="props.opportunity"
    :sales-payment="salePaymentPlan"
    @update-delivery-date="updateDeliveryDate"
  />
</template>
