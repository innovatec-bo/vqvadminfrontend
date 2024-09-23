<script setup>
const props = defineProps({
  formData: {
    type: null,
    required: true,
  },
})

const emit = defineEmits(['update:formData'])

const formData = ref(props.formData)

watch(formData, () => {
  emit('update:formData', formData.value)
})
</script>

<template>
  <VRow>
    <VCol cols="12">
      <h3 class="text-center">
        VISTA PREVIA
      </h3>
    </VCol>
    <p class="mx-auto">
      Confirme la información de su Inmueble y envíela para registrarla..
    </p>
    <VCol
      cols="12"
      md="7"
    >
      <table class="text-base">
        <tr>
          <td style="inline-size: 202px;">
            <p class="font-weight-medium mb-2 ">
              <strong>Codigo</strong>
            </p>
          </td>
          <td>
            <p class="mb-2">
              {{ formData.propertyDetails.code ? formData.propertyDetails.code : '' }}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="font-weight-medium mb-2">
              <strong>Precio</strong>
            </p>
          </td>
          <td>
            <p class="mb-2">
              {{ formData.propertyDetails.price ? formData.propertyDetails.price : '' }}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="font-weight-medium mb-2">
              <strong>Porcentaje de la cuota inicial</strong>
            </p>
          </td>
          <td>
            <p class="mb-2">
              {{ formData.propertyDetails.percentageinitialfee ? formData.propertyDetails.percentageinitialfee : '' }} %
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="font-weight-medium mb-2">
              <strong>Proyecto</strong>
            </p>
          </td>
          <td>
            <p class="mb-2">
              {{ formData.propertyDetails.projectType ? formData.propertyDetails.projectType.title : '' }}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <p class="font-weight-medium mb-2">
              Tipo de Propiedad
            </p>
          </td>
          <td>
            <p class="mb-2">
              {{ formData.propertyDetails.propertyType ? formData.propertyDetails.propertyType.title : '' }}
            </p>
          </td>
        </tr>
        
        <tr>
          <td>
            <p class="font-weight-medium mb-2">
              Numero de Pisos
            </p>
          </td>
          <td>
            <p class="mb-2">
              {{ formData.propertyFeatures.floor ? formData.propertyFeatures.floor : '' }} 
            </p>
          </td>
        </tr> 
       
        <tr>
          <td>
            <p class="font-weight-medium mb-2">
              Superficie
            </p>
          </td>
          <td>
            <p class="mb-2">
              {{ formData.propertyFeatures.surface ? formData.propertyFeatures.surface : '' }} (m²)
            </p>
          </td>
        </tr>
        
        <tr>
          <td v-if="formData.propertyDetails.propertyType.value === '1'">
            <VChip
              class="mb-2 mx-5"
              size="small"
              label
            >
              {{ formData.propertyFeatures.bedroomCount ? formData.propertyFeatures.bedroomCount : '' }} Dormitorios
            </VChip>
            <VChip
              class="mb-2 mx-5"
              size="small"
              label
            >
              {{ formData.propertyFeatures.bathroomCount ? formData.propertyFeatures.bathroomCount : '' }} Baños
            </VChip>
          </td>
        </tr>
      </table>
      <VSwitch
        v-model="formData.isDealDetailsConfirmed"
        label="Alguna Autorizacion "
        class="mb-3"
      />
    </VCol>
  </VRow>
</template>
