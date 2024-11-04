<script setup>
import { useProperty } from '@/composables/Realty/useProperty'
import { DEPARTAMENT } from '@/utils/constants'

const route = useRoute('realty-property-id')
const {  getPropertyId, property } = useProperty()

const fetchProperty = async () =>{
  await getPropertyId(route.params.id)
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
        lg="8"
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
                <h5 class=" my-3">
                  Precio: {{ property?.base_price }} 
                </h5>
                <h5 class=" my-3">
                  Procentaje cuota inicial: {{ property?.percentaje_initial_fee }} %
                </h5>
                <h5 class=" my-3">
                  Cuota Inicial: {{ property?.initial_fee }} %
                </h5>
              </div>
            </div>
            <VDivider class="my-6" />
            <div class="d-flex gap-x-12 gap-y-5 flex-wrap">
              <div>
                <VList class="card-list">
                  <VListItem>
                    <VListItemTitle class="text-body-1">
                      <strong> Area: </strong>  {{ property?.surface }} m2
                    </VListItemTitle>
                    <VListItemTitle class="text-body-1">
                      <strong> Estado: </strong> {{ property?.status }} 
                    </VListItemTitle>
                    <VListItemTitle class="text-body-1">
                      <strong> Tipo de Propiedad: </strong> {{ property?.property_type }} 
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
