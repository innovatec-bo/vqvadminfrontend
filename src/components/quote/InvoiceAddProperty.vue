<!-- eslint-disable camelcase -->
<script setup>
import { PropertyType } from '@/enums/PropertyType'
import { PaymentMethod } from '@/enums/PaymentMethod'

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

const addPark = () =>{
  const newProduct = {
    property_id: null,
    price: null,
    property_type: PropertyType.PARK.value,
    property_type_name: PropertyType.PARK.label,
  }

  emit('addProperty', newProduct) 
}

const addDepartament = () => {
  const newProduct = {
    property_id: null,
    price: null,
    property_type: PropertyType.DEPARTAMENT.value,
    property_type_name: PropertyType.DEPARTAMENT.label,
  }

  emit('addProperty', newProduct) // Emite el evento con el nuevo producto
}
</script>

<template>
  <VCard
    flat
    border
    class="d-flex flex-row"
  >
    <!-- 👉 Left Form -->
    <div class="pa-5 flex-grow-1">
      <VRow
        v-for="(property, index) in props.properties"
        :key="index"
      >
        <VCol
          cols="12"
          sm="4"
          style="padding-block: 0;padding-inline: 8px;"
        >
          <AppTextField
            :label="property.property_type_name"
            placeholder="Escribe el nombre del departamento"
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
            v-model="property.price"
            label="Precio:"
            placeholder="Escribe el precio"
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
            v-model="property.priceIt"
            label="3% (IT):"
            placeholder="Porcentaje IT"
            outlined
            dense
            class="custom-salesforce-input"
          />
        </VCol>
      </VRow>

      <!-- Botón para agregar nueva propiedad -->
      <div class="d-flex justify-end mt-4">
        <VBtn
          color="primary"
          class="me-2"
          @click="addDepartament"
        >
          Agregar Departamento
        </VBtn>

        <VBtn
          color="primary"
          @click="addPark"
        >
          Agregar Parqueo
        </VBtn>
      </div>
    </div>
  </VCard>
</template>
