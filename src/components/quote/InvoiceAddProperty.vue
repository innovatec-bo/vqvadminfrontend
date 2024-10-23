<!-- eslint-disable camelcase -->
<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useProperty } from '@/composables/Realty/useProperty'
import { PropertyType } from '@/enums/PropertyType'

const props = defineProps({
  properties: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits([
  'removeProduct',
  'totalAmount',
  'addProperty',
])

const { properties: propertyApi, propertiesForType } = useProperty()

const propertyPark = ref([])
const propertyDepartament = ref([])

const addPark = () =>{
  const newProduct = {
    property_id: null,
    price: null,
    property_type: PropertyType.PARK.value,
    property_type_name: PropertyType.PARK.label,
  }

  emit('addProperty', newProduct) 
}

const removeProperty = index =>{
  emit('removeProduct', index) 
}

// selectedProperty=() => {
//   return this.property.property_type === PropertyType.DEPARTAMENT.value
//     ? this.propertyDepartament.find(item => item.id === this.property.property_id)
//     : this.propertyPark.find(item => item.id === this.property.property_id)
// }

onMounted(async () => {
  try {
    const departament = await propertiesForType(PropertyType.DEPARTAMENT.value)
 
    propertyDepartament.value = departament

    const park = await propertiesForType(PropertyType.PARK.value)

    propertyPark.value = park
    
  } catch (error) {
    console.error('Error al obtener las propiedades:', error)
  }
})
</script>

<template>
  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1 ">
      <VRow
        v-for="(property, index) in props.properties"
        :key="index"
      >
        <VCol
          cols="12"
          sm="4"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppSelect
            v-model="property.property_id"
            :label="property.property_type_name"
            placeholder="Selecciona una propiedad"
            :items="property.property_type === PropertyType.DEPARTAMENT.value ? propertyDepartament : propertyPark"
            item-title="title"
            item-value="id"
            outlined
            dense
            class="custom-salesforce-input"
          />
          <span
            v-if="property.property_id && property.property_type === PropertyType.DEPARTAMENT.value "
            style="font-size:smaller ; padding-block: "
          > 
            <strong>
              {{ propertyDepartament[property.property_id -1].departament.isfacade === 1? 'Con Fachada': 'Sin Fachada' }},
            </strong>
            {{ propertyDepartament[property.property_id -1].surface }}   <strong> m2,</strong>
            {{ propertyDepartament[property.property_id -1].departament.number_bedrooms }} Habitacion(s),  
          </span>
        </VCol>

        <VCol
          cols="12"
          sm="2"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppTextField
            v-model="property.price"
            label="Precio"
            placeholder="$"
            outlined
            dense
            class="custom-salesforce-input"
          />
        </VCol>

        <VCol
          cols="12"
          sm="2"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppTextField
            v-model="property.price_it"
            label="3% (IT):"
            placeholder="%"
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
            v-model="property.price_contrato"
            label="Precio Contrato:"
            placeholder="Escribe el precio"
            outlined
            dense
            class="custom-salesforce-input"
          />
        </VCol>
        <VCol
          cols="12"
          sm="1"
          class="my-4"
        >
          <VBtn
            color="error"
            size="small"
            @click="removeProperty(index)"
          >
            <VIcon icon="tabler-square-x" />
          </VBtn>
        </VCol>
        <VCol
          cols="12" 
          style=" font-size: small;padding-block: 0;padding-inline: 4px"
        />
      </VRow>

      <!-- Botón para agregar nueva propiedad -->
      <div class="d-flex justify-end mt-3">
        <VBtn
          color="secondary"
          @click="addPark"
        >
          Agregar Parqueo
        </VBtn>
      </div>
    </div>
  </VCard>
</template>
