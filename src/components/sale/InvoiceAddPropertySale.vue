<!-- eslint-disable camelcase -->
<script setup>
import AppSelect from '@/@core/components/app-form-elements/AppSelect.vue'
import { useProperty } from '@/composables/Realty/useProperty'

const props = defineProps({
  propertiesform: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits([
  'totalAmount',
])

const { allProperty, properties } = useProperty()

const itemsPerPage = ref(100)
const page = ref(1)

onMounted(async () => {
  try {
    allProperty({
      itemsPerPage: itemsPerPage.value,
      page: page.value,
    })
    
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
        v-for="(property, index) in props.propertiesform"
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
            :rules="[requiredValidator]"
            placeholder="Selecciona una propiedad"
            :items="properties"
            item-title="title"
            item-value="id"
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
            v-model="property.price"
            :rules="[requiredValidator]"
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
            :rules="[requiredValidator]"
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
            :rules="[requiredValidator]"
            label="Precio Contrato:"
            placeholder="Escribe el precio"
            outlined
            dense
            class="custom-salesforce-input"
          />
        </VCol>
      </VRow>
    </div>
  </VCard>
</template>
