<script setup>
import { usePaymentPlans } from '@/composables/Sales/usePaymentPlans'
import { useSales } from '@/composables/Sales/useSales'

const props = defineProps({
  sales: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'refreshCustomer',
  'updateStageId',
])

const { confirmPaymentPlans } = usePaymentPlans()
const {  SaleChangeSignature } = useSales()

const confirmPayment = async paymentplanId => {
  console.log(paymentplanId)
  await confirmPaymentPlans( paymentplanId)
  emit('refreshCustomer') 
  emit('updateStageId', props.opportunity.id)
}

const confirmationSignature = async saleid => {
  console.log('entra a firma')
  await SaleChangeSignature( saleid)
}

const displayPaymentMethod = method => {
  if (method === 'CASH') {
    return 'Al Contado'
  } else if (method === 'DIRECTCREDIT') {
    return 'Crédito Directo'
  } else if (method === 'BANKCREDIT') {
    return 'Crédito Bancario'
  }
  
  return method
}

const displayStatus = status => {
  if (status === 'SALE') {
    return 'VENDIDO'
  } else if (status === 'DISCARD') {
    return 'CANCELADO'
  }else if (status === 'PRESALE') {
    return 'RESERVADO'
  }   else if (status === 'DELIVERY') {
    return 'ENTREGADO'
  }
  
  return status
}
</script>

<template>
  <div v-if="props.sales.length === 0">
    <VCard title="Ventas">
      <VCardText>
        No hay ventas disponibles
      </VCardText>
    </VCard>
  </div>
  <div v-else>
    <VRow>
      <VCol cols="12">
        <VCard title="Ventas">
          <VTable
            density="compact"
            class="text-no-wrap my-2"
          >
            <thead>
              <tr>
                <th>
                  ID
                </th>
                <th>
                  Metodo de Pago
                </th>
                <th>
                  Propiedades
                </th>
                <th>
                  Total
                </th>
                <th>
                  Estado
                </th>
                <th>
                  Fecha
                </th>
               
                <th>
                  Accion
                </th>
              </tr>
            </thead>
  
            <tbody>
              <tr
                v-for="item in props.sales"
                :key="item.id"
              >
                <td>
                  {{ item.id }}
                </td>
                <td>
                  {{ displayPaymentMethod(item.payment_method) }}
                </td>
                <td>
                  <div
                    v-for="property in item.properties" 
                    :key="property.id"
                    class="d-flex gap-x-2"
                  >
                    {{ property.title }} | {{ property.code }} 
                  </div>
                </td>
                <td>
                  {{ formatCurrency(item.amount ) }}
                </td>
                <td>
                  {{ displayStatus(item.status ) }}
                </td>
                <td>
                  {{ item.creation_date }}
                </td>
              
                <td>
                  <div class="d-flex items-center gap-x-2">
                    <RouterLink :to="{ name: 'sale-id', params: { id: item.id } }">
                      <IconBtn>
                        <VIcon icon="tabler-eye" />
                      </IconBtn>
                    </RouterLink>
                    <VCheckbox
                      v-model="item.confirmation_signature"
                      :true-value="1"
                      :false-value="0"
                      @change="confirmationSignature(item.id)"
                    >
                      <VTooltip
                        activator="parent"
                        location="top"
                      >
                        Confirmar firma
                      </VTooltip>
                    </VCheckbox>
                  </div>
                </td>
              </tr>
            </tbody>
          </VTable>
        </VCard>
      </VCol>
    </VRow>
    <div 
      v-for="item in props.sales"
      :key="item.id"
      class="my-5"
    >
      <VCard v-if="item.status != 'DISCARD'">
        <VCardText>
          <h3>
            Venta: {{ item.id }}
          </h3>
          <br>
          <VRow>
            <VCol
              col="6"
              class="border mx-2"
            >
              <strong>
                Cuotas Iniciales
              </strong>
              <VTable
                v-if=" item.initial_payments && item.initial_payments.length > 0"
                density="compact"
                class="text-no-wrap my-2"
              >
                <thead>
                  <tr>
                    <th>
                      Fecha
                    </th>
                    <th>
                      Monto
                    </th>
                    <th>
                      Estado
                    </th>
                    <th>
                      Action
                    </th>
                  </tr>
                </thead>
        
                <tbody>
                  <tr
                    v-for="initial in item.initial_payments"
                    :key="initial.id"
                  >
                    <td>
                      {{ initial.date }}
                    </td>
                    <td>
                      {{ initial.amount }}
                    </td>
                    <td>
                      {{ initial.is_paid? "Pagado": "Pendiente" }}
                    </td>
                    
                    <td>
                      <VCheckbox
                        v-model="initial.is_paid"
                        :true-value="1"
                        :false-value="0"
                        :disabled="initial.is_paid === 1"
                        @change="confirmPayment(initial.id)"
                      >
                        <VTooltip
                          activator="parent"
                          location="top"
                        >
                          Confirmar Pago
                        </VTooltip>
                      </VCheckbox>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
      
            <VCol
              col="6"
              class="border mx-2"
            >
              <strong>
                Saldos
              </strong>
              <VTable
                v-if=" item.balance_payments && item.balance_payments.length > 0"
                density="compact"
  
                class="text-no-wrap my-2"
              >
                <thead>
                  <tr>
                    <th>
                      Fecha
                    </th>
                    <th>
                      Monto
                    </th>
                    <th>
                      Estado
                    </th>
                    <th>
                      Action
                    </th>
                  </tr>
                </thead>
       
                <tbody>
                  <tr
                    v-for="balance in item.balance_payments"
                    :key="balance.id"
                  >
                    <td>
                      {{ balance.date }}
                    </td>
                    <td>
                      {{ balance.amount }}
                    </td>
                    <td>
                      {{ balance.is_paid? "Pagado": "Pendiente" }}
                    </td>
                    <td>
                      <VRow>
                        <VCheckbox
                          v-model="balance.is_paid"
                          :true-value="1"
                          :false-value="0"
                          :disabled="balance.is_paid === 1"
                          @change="confirmPayment(balance.id)"
                        >
                          <VTooltip
                            activator="parent"
                            location="top"
                          >
                            Confirmar Pago
                          </VTooltip>
                        </VCheckbox>
                      </VRow>
                    </td>
                  </tr>
                </tbody>
              </VTable>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </div>
  </div>
</template>
