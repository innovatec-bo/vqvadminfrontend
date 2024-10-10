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
const paymentPlan = ref('')


const openDeliveryForm = () => {
  confirmDelivery.value = true
}

const editPaymentPlan = item => {
  console.log('entro aqui')
  openEditPaymentPlan.value = true
  paymentPlan.value = { ...item }
}

const markProcedureAsDone = (procedureId, isChecked) => {
  console.log(`Procedimiento ${procedureId} marcado como: ${isChecked ? 'realizado' : 'no realizado'}`)
  checkProcessForOpportunity(props.opportunity.id, procedureId, {
    is_check: isChecked,
  })
}

const confirmPayment = paymentplanId => {
  console.log(paymentplanId)
  confirmPaymentPlans( paymentplanId)
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
  <div>
    <VCard
      title="Propiedades"
      class="mt-5"
    >
      <VCardText>
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
      </VCardText>
    </VCard>
  </div>

  <!-- cuota inicial  -->
  <div>
    <VCard
      title="Cuota Inicial"
      class="mt-5"
    >
      <VCardText>
        <VTable
          density="compact"
          class="text-no-wrap"
          style="font-size: 12px;"
        >
          <thead>
            <tr>
              <th>
                Tipo
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
              v-for="item in props.opportunity.sales.payment_plans"
              :key="item.id"
            >
              <td>
                {{ item.type }}
              </td>
              <td>
                {{ new Date(item.date).toLocaleDateString() }}
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
      </VCardText>
    </VCard>
  </div>
  <!-- saldo -->

  <!-- procesos  -->
  <div>
    <VCard
      title="Procesos"
      class="mt-5"
    >
      <VCardText class="d-flex align-bottom  gap-x-5">
        <div v-if="props.opportunity.procedure && props.opportunity.procedure.length > 0">
          <div
            v-for="procedure in props.opportunity.procedure"
            :key="procedure.id"
            class="d-flex align-center justify-between"
          >
            <VCheckbox
              v-model="procedure.pivot.is_check"
              :label="procedure.title"
              :true-value="1"
              :false-value="0"
              @change="markProcedureAsDone(procedure.id, procedure.pivot.is_check)"
            />
          </div>
        </div>
        <div v-else>
          <span>No hay procedimientos disponibles.</span>
        </div>
      </VCardText>
    </VCard>
  </div>

  <!-- Botón pasar estado -->
  <VCardText class="d-flex justify-center mt-4">
    <VBtn
      color="primary"
      large
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
    :opportunity="paymentPlan"
    @update-delivery-date="updateDeliveryDate"
  />
</template>
