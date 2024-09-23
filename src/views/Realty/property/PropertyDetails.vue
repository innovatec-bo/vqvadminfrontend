<script setup>
const props = defineProps({
  formData: {
    type: null,
    required: true,
  },
})

const emit = defineEmits(['update:formData'])

const listpropertype = ref([
  { value: '1', title: 'Departamento' },
  { value: '2', title: 'Parqueo' },
])

const listProjects = ref([
  { value: '1', title: 'PORA' },
  { value: '2', title: 'OGA' },
])

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
          Datos Principales 
        </h3>
      </VCol>
      <VCol cols="6">
        <!-- 👉 Title Property -->
        <AppTextField
          v-model="formData.code"
          label="Codigo"
          type="text"
          placeholder="A1"
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol cols="6">
        <AppDateTimePicker
          v-model="formData.deliveryDate"
          label="Fecha de Entrega"
          placeholder="......"
         
          :rules="[requiredValidator]"
        />
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

      <VCol
        cols="12"
        sm="6"
      >
        <!-- 👉 Property Type -->
        <AppSelect
          v-model="formData.propertyType"
          label="Tipo de Propiedad"
          placeholder="Seleccione un tipo de propiedad"
          :items="listpropertype"
          return-object
          :rules="[requiredValidator]"
        />
      </VCol>    
      
      <VCol
        cols="12"
        sm="6"
      >
        <!-- 👉 Property Type -->
        <AppSelect
          v-model="formData.projectType"
          label="Proyecto"
          placeholder="Seleccione un tipo de propiedad"
          :items="listProjects"
          return-object
          :rules="[requiredValidator]"
        />
      </VCol>  
      <VCol cols="12">
        <!-- 👉 Description -->
        <AppTextarea
          v-model="formData.description"
          label="Descripcion"
          rows="3"
          :rules="[requiredValidator]"
        />
      </VCol>
    </VRow>
  </VForm>
</template>
