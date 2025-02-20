<script setup>
const props = defineProps({
  quotes: {
    type: Object,
    required: true,
  },
})

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
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Cotizaciones">
        <div v-if="props.quotes.length === 0">
          <VCardText>
            No hay cotizaciones disponibles
          </VCardText>
        </div>
        <div v-else>
          <VTable
            density="compact"
            class="text-no-wrap my-2"
          >
            <thead>
              <tr>
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
                  Gerencia
                </th>
                <th>
                  Cliente
                </th>
                <th>
                  Accion
                </th>
              </tr>
            </thead>
  
            <tbody>
              <tr
                v-for="item in props.quotes"
                :key="item.id"
              >
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
                  <span class="my-2">
                    {{ item.status === 'APPROVED' ? 'Aprobado' : 'No Aprobado' }}
                  </span>
                </td>
                <td>
                  <span class="my-2">
                    {{ item.status_customer === 'APPROVED' ? 'Aprobado' : 'No Aprobado' }}
                  </span>
                </td>
                <td>
                  {{ item.creation_date }}
                </td>
                <td>
                  <div class="d-flex items-center gap-x-2">
                    <RouterLink :to="{ name: 'quote-id', params: { id: item.id } }">
                      <IconBtn>
                        <VIcon icon="tabler-eye" />
                      </IconBtn>
                    </RouterLink>
                  </div>
                </td>
              </tr>
            </tbody>
          </VTable>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>
