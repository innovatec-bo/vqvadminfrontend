<script setup>
import { useProperty } from '@/composables/Realty/useProperty'
import { DEPARTAMENT } from '@/utils/constants'
import { formatCurrency } from '@/utils/currencyFormatter'

const route = useRoute('realty-property-id')
const {  getPropertyId, property } = useProperty()

const fetchProperty = async () =>{
  await getPropertyId(route.params.id)
}


const resolvePropertyStatusVariant = stat => {
  switch (stat) {
  case 'AVAILABLE':
    return { color: 'success', text: 'DISPONIBLE' }
  case 'PRESALE':
    return { color: 'warning', text: 'RESERVADO' }
  case 'SALE':
    return { color: 'error', text: 'VENDIDO' }
  case 'DELIVERED':
    return { color: 'error', text: 'ENTREGADO' }
  default:
    return { color: 'primary', text: 'NOTHING' }
  }
}

onMounted(fetchProperty)
</script>

<template>
  <div>
    <!-- 👉 Header  -->
    <div class="d-flex justify-space-between align-center flex-wrap gap-y-4 mb-6">
      <div>
        <div class="d-flex gap-2 align-center  flex-wrap">
          <h4 class="text-h4 font-weight-medium">
            Propiedad: {{ property?.code }}
          </h4>
        </div>
      </div>
    </div>
    <VRow>
      <VCol
        cols="12"
        lg="6"
      >
        <VCard class="overflow-visible course-details">
          <VCardText>
            <h5 class="text-h5 mb-3">
              <strong>Descripción</strong>
            </h5>
            <!-- eslint-disable-next-line vue/no-v-html -->
            <div v-html="property?.description" />
            <VDivider class="my-6" />
            <div>
              <h5 class="text-h5 mb-3">
                Financiamiento
              </h5>
              <div class="border rounded mt-3 px-5 py-4">
                <h4 class=" my-3">
                  Precio: {{ formatCurrency( property?.base_price) }} 
                </h4>
                <h4 class=" my-3">
                  Procentaje cuota inicial: {{ property?.percentage_initial_fee }} %
                </h4>
                <h4 class=" my-3">
                  Cuota Inicial: {{ formatCurrency( property?.initial_fee ) }} 
                </h4>
              </div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
      <VCol
        cols="12"
        lg="6"
      >
        <VCard class="overflow-visible course-details">
          <VCardText>
            <div class="d-flex gap-x-12 gap-y-5  flex-wrap">
              <div>
                <VList class="card-list">
                  <VListItem>
                    <VListItemTitle class="text-body-1">
                      <strong> Area: </strong>  {{ property?.surface }} m2
                    </VListItemTitle>
                    <VListItemTitle class="text-body-1">
                      <strong> Estado: </strong>
                      <VChip
                        label
                        size="small"
                        class="text-capitalize"
                        :color="resolvePropertyStatusVariant(property?.status).color"
                      >
                        {{ resolvePropertyStatusVariant(property?.status).text }}
                      </VChip>
                    </VListItemTitle>
                    <VListItemTitle class="text-body-1">
                      <strong> Tipo de Propiedad: </strong> {{ property?.property_type }} 
                    </VListItemTitle>
                    <VListItemTitle class="text-body-1">
                      <strong> 
                        {{ property?.property_type=='DEPARTAMENT' ? property.departament.is_balcony ? 'Con Terraza: ' : 'Sin Terraza': "" }}
                      </strong> 
                      {{ property?.property_type=='DEPARTAMENT' && property.departament.is_balcony ? property.departament.surface_balcony ? ': '+ property.departament.surface_balcony + 'm²' : '': "" }}
                    </VListItemTitle>
                  </VListItem>
                </VList>
              </div>
              <VList 
                v-if="property?.property_type === DEPARTAMENT"
                class="card-list"
              >
                <VListItem>
                  <VListItemTitle class="text-body-1">
                    <strong> Numero de Habitaciones: </strong>  {{ property?.departament.number_bedrooms }} 
                  </VListItemTitle>
                  <VListItemTitle class="text-body-1">
                    <strong> Numero de Baños: </strong> {{ property?.departament.number_bathrooms }} 
                  </VListItemTitle>
                  <VListItemTitle class="text-body-1">
                    <strong> Piso: </strong> {{ property?.departament.floor }} 
                  </VListItemTitle>
                  <VListItemTitle class="text-body-1">
                    <strong> Tipo de Departamento : </strong> {{ property?.departament.type_department_name }} 
                  </VListItemTitle>
                </VListItem>
              </VList>
              <VList 
                v-if="property?.property_type === PARK"
                class="card-list"
              >
                <VListItem>
                  <VListItemTitle class="text-body-1">
                    <strong> Piso: </strong> {{ property?.park.floor }} 
                  </VListItemTitle>
                  <VListItemTitle class="text-body-1">
                    <strong> Cubierta: </strong> {{ property?.park.covered }} 
                  </VListItemTitle>
                </VListItem>
              </VList>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
