<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  formData: {
    type: Object,
    required: true,
  },
  propertyType: {
    type: [String, Number],
    required: false,
  },
})

const emit = defineEmits(['update:formData'])
const formData = ref(props.formData)

const listdepartmentype = ref([
  { value: '1', title: 'Departamento dúplex' },
  { value: '2', title: 'Departamento penthouse' },
])

// const { benefits, features, typeDepartments, loading, error, allBenefits, allFeatures, AllTypeDepartment } = useAttribute()


// let ListBenefits = ref(['Seleccione un Beneficio'])
// let ListFeatures = ref(['Seleccione una Caracteristica'])
// let ListDepartment = ref(['Seleccione tipo de Departamento'])


// onMounted(async () => {
//   await allBenefits()
//   ListBenefits.value = benefits.value.map(benefit => ({ title: benefit.name, value: benefit.id }))
  
//   await allFeatures()
//   ListFeatures.value = features.value.map(feature => ({ title: feature.name, value: feature.id }))
// })

watch(formData, () => {
  emit('update:formData', formData.value)
})
</script>

<template>
  <VForm>
    <VRow>
      <VCol cols="12">
        <h3 class="text-center">
          CARACTERISTICAS 
        </h3>
      </VCol>
      <VCol cols="6">
        <!-- 👉 Cantidad de Pisos -->
        <AppTextField
          v-model="formData.floor"
          type="number"
          label="Numero De Piso"
          placeholder="..."
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol cols="6">
        <!-- 👉 Cantidad de Pisos -->
        <AppTextField
          v-model="formData.surface"
          label="Superficie"
          suffix="(m²)"
          type="number"
          placeholder="..."
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol
        v-if="props.propertyType.value === '1' "        
        cols="12"
        sm="4"
      >
        <!-- 👉 Habitaciones -->
        <AppTextField
          v-model="formData.bedroomCount"
          label="Habitaciones"
          placeholder="..."
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol
        v-if="props.propertyType.value === '1'"
        cols="12"
        sm="4"
      >
        <!-- 👉 Baños -->
        <AppTextField
          v-model="formData.bathroomCount"
          label="Baños"
          placeholder="..."
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol
        v-if="props.propertyType.value === '1' "
        cols="12"
        sm="4"
      >
        <!-- 👉 Cantidad de Pisos -->
        <AppTextField
          v-model="formData.floorNo"
          label="Cantidad  de pisos"
          placeholder="..."
          :rules="[requiredValidator]"
        />
      </VCol>
     
      <VCol
        v-if="props.propertyType.value === '1' "

        cols="12"
        sm="6"
      >
        <!-- 👉 Property Type -->
        <AppSelect
          v-model="formData.typeDepartmentsDetails"
          label="Tipo de Propiedad"
          placeholder="Seleccione un tipo de propiedad"
          :items="listdepartmentype"
          return-object
          :rules="[requiredValidator]"
        />
      </VCol>
      <VCol
        v-if="props.propertyType.value === '1' " 
        cols="12"
      >
        <!-- 👉 Otras Caracteristicas -->
        <!--
          <AppSelect
          v-model="formData.featureDetails"
          label="Otras  características (opcional)"
          placeholder="Seleccione  uno o varios caracteristicas"
          multiple
          chips
          :items="ListFeatures"
          :rules="[requiredValidator]"
          return-object
          /> 
        -->
      </VCol>
      <VCol
        v-if="props.propertyType.value === '2' "
        cols="6 my-5"        
      >
        <VCheckbox
          v-model="formData.covered"
          label="Cubierto"
        />
      </VCol>
      <VCol  
        v-if="props.propertyType.value === '1' "
        cols="12"
      >
        <!-- 👉 Otras Caracteristicas -->
        <!--
          <AppSelect
          v-model="formData.typeDepartmentsDetails"
          label="Tipos de Departamento"
          placeholder="Seleccione  una tipo de Departamento"
          :items="ListDepartment"
          :rules="[requiredValidator]"
          return-object
          /> 
        -->
      </VCol>
      <VCol cols="12">
        <!-- 👉 Beneficios de la zona -->
        <!--
          <AppSelect
          v-model="formData.benefitsDetails"
          label="Beneficios de la zona"
          placeholder="Seleccione  uno o varios beneficios"
          multiple
          chips
          :items="ListBenefits"
          :rules="[requiredValidator]"
          return-object
          /> 
        -->
      </VCol>
    </VRow>
  </VForm>
</template>
