<script setup>
import { watch } from 'vue'

const props = defineProps({
  formData: {
    type: null,
    required: true,
  },
  propertyType: {
    type: [String, Number],
    required: false,
  },
})

const emit = defineEmits(['update:formData'])
const formData = ref(props.formData)

watch(formData, () => {
  emit('update:formData', formData.value)
})
</script>

<template>
  <VForm>
    <VRow>
      <VCol cols="12">
        <h3 class="text-center">
          FINANCIAMIENTO
        </h3>
      </VCol>
      <VCol cols="6">
        <AppTextField
          v-model="formData.price"
          label="Precio de la propiedad"
          type="number"
          placeholder="..."
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol cols="6">
        <AppTextField
          v-model="formData.percentageinitialfee"
          label="% Cuota Inicial"
          type="number"
          placeholder="..."
          suffix="(%)"
          :rules="[requiredValidator]"
        />
      </VCol>
    </VRow>
  </VForm>
</template>
