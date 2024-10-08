<script setup>
import poraIcon from '@/assets/icons/poraIcon.png'
import { useProperty } from '@/composables/Realty/useProperty'

import { onMounted } from 'vue'

const props = defineProps({
  opportunity: {
    type: Object,
    required: true,
  },
})

const { property, allProperty, properties } = useProperty()

const markProcedureAsDone = (procedureId, isChecked) => {
  // Aquí puedes implementar la lógica para actualizar el estado del procedimiento.
  console.log(`Procedimiento ${procedureId} marcado como: ${isChecked ? 'realizado' : 'no realizado'}`)
}

onMounted(() => {
  allProperty({
    page: 1,
    itemsPerPage: 500,
  })
})
</script>

<template>
  <!-- Saldos -->
  <div>
    <VRow class="mb-2 mt-2">
      <VCol
        cols="4"
        class="border rounded-sm mx-1"
      >
        <VListItemTitle class="font-weight-medium">
          Saldo
        </VListItemTitle>
        <VListItemSubtitle class="text-disabled d-flex justify-between mt-1">
          <span class="text-h5">$ {{ props.opportunity.sales.amount -props.opportunity.sales.initial_fee }}</span>
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
          <span class="text-h5">$ {{ props.opportunity.sales.initial_fee }}</span>
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
          <!-- <span>${{ props.opportunity.sales.amount }}</span> -->
          <span class="text-h5">${{ props.opportunity.sales.amount }}</span>
        </VListItemSubtitle>
      </VCol>
    </VRow>
  </div>

  <!-- Propiedades -->
  <div>
    <VCard title="Propiedades">
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
        >
          <thead>
            <tr>
              <th>
                Type
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
              :key="item.dessert"
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
                {{ item.is_paid }}
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
              class="mx-2"
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


  <!-- Botón Generar Cotización -->
  <VCardText class="d-flex justify-center mt-4">
    <VBtn
      color="primary"
      large
      @click="generateQuote"
    >
      Siguiente Etapa
    </VBtn>
  </VCardText>
</template>
