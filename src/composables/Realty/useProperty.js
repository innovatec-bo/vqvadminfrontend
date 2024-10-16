import { allProperties, allPropertiesProject, deletePropertyById, getPropertiesForType, getPropertyById, registerProperty, updateProperty } from '@/services/Realty/propertyService'
import { showSuccessNotification } from '@/utils/notifications'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'


export function useProperty() {
  const userData = useCookie('userData').value

  const loadingProperty = ref(false)
  const error = ref(null)
  const router = useRouter()
  const property = ref(null)
  const properties = ref([])
  const totalProperties = ref(0)

  const addProperty = async propertyListingData => {
    loadingProperty.value = true
    error.value = null
    try {
      console.log('este es el formulario:', propertyListingData)

      const propertyTypes = {
        1: 'DEPARTAMENT',
        2: 'PARK',
      }

      const propertyType = propertyTypes[propertyListingData.propertyDetails.propertyType.value] || 'UNKNOWN'

      console.log(propertyType)

      const propertyData = {
        code: propertyListingData.propertyDetails.code,
        surface: propertyListingData.propertyFeatures.surface,
        description: propertyListingData.propertyDetails.description,
        // eslint-disable-next-line camelcase
        delivery_date: propertyListingData.propertyDetails.deliveryDate,
        // eslint-disable-next-line camelcase
        base_price: propertyListingData.propertyDetails.price,
        // eslint-disable-next-line camelcase
        percentage_initial_fee: propertyListingData.propertyDetails.percentageinitialfee,
        // eslint-disable-next-line camelcase
        property_type: propertyType,
        // eslint-disable-next-line camelcase
        property_type_id: propertyListingData.propertyDetails.propertyType.value,
        // eslint-disable-next-line camelcase
        project_id: propertyListingData.propertyDetails.projectType.value,
        // eslint-disable-next-line camelcase
        benefits: propertyListingData.propertyFeatures.benefitsDetails.map(benefit => benefit.value),
        features: propertyListingData.propertyFeatures.featureDetails.map(feature => feature.value),
        // eslint-disable-next-line camelcase
        type_department_id: propertyType === DEPARTAMENT ? propertyListingData.propertyFeatures.typeDepartmentsDetails.value : null,
        // eslint-disable-next-line camelcase
        number_bathrooms: propertyType !== LAND ? propertyListingData.propertyFeatures.bathroomCount : "",
        // eslint-disable-next-line camelcase
        number_bedrooms: propertyType !== LAND ? propertyListingData.propertyFeatures.bedroomCount : "",
        // eslint-disable-next-line camelcase
        number_floors: propertyType !== LAND && propertyType !== DEPARTAMENT ? propertyListingData.propertyFeatures.floorNo : "",
        floors: propertyType === DEPARTAMENT ? propertyListingData.propertyFeatures.floor : "",
        // eslint-disable-next-line camelcase
        number_rooms: '',
      }

      console.log(propertyData)

      const response = await registerProperty(propertyData)

      console.log('Respuesta del servidor:', response)
      showSuccessNotification('CREACION EXITOSA', 'LA PROPIEDAD FUE REGISTRADA EXITOSAMENTE')

      router.push('/realty/property/list')
    } catch (err) {
      console.log(err)
      if(err.response && err.response.status == 422){
        showWarningNotification('ERROR', 'FALTAN DATOS POR RELLENAR')
      }
    } finally {
      loadingProperty.value = false
    }
  }

  const editProperty = async (propertyDataForm) => {
    loadingProperty.value = true
    error.value = null
    try {
      const propertyData = {
        title: propertyDataForm.title,
        code: propertyDataForm.code,
        surface: propertyDataForm.surface,
        base_price: propertyDataForm.base_price,
        percentage_initial_fee: propertyDataForm.percentage_initial_fee,
        property_type: propertyDataForm.property_type.value,
        number_bathrooms: propertyDataForm.departament.number_bathrooms,
        number_bedrooms: propertyDataForm.departament.number_bedrooms,
        floor: propertyDataForm.departament.floor,
        covered: propertyDataForm?.covered ? true : false,
      }

      const response = await updateProperty(propertyDataForm.id, propertyData);
      showSuccessNotification('Actualización Exitosa', 'La propiedad ha sido actualizada correctamente.')
    } catch (err) {
      console.error(err)
      if(err.response && err.response.status == 422){
        showWarningNotification('Validación', 'Faltan datos por rellenar')
        return
      }
      showErrorNotification('Error de Actualización', 'Hubo un problema al actualizar la propiedad.')
    } finally {
      loadingProperty.value = false
    }
  }

  const allProperty = async pagination => {
    try {
      const response = await allProperties(pagination)

      console.log('respuesta', response)
      properties.value = response.data.data
      totalProperties.value = response.data.total

    } catch(err){
      console.log(err)
    }
  }

  const allPropertybyProject = async (pagination, id) => {
    try {
      const response = await allPropertiesProject(pagination, id)

      console.log('respuesta', response)
      properties.value = response.data.data
      totalProperties.value = response.data.total

    } catch(err){
      console.log(err)
    }
  }

  const removeProperty = async id => {
    try {
      const response = await deletePropertyById(id)

      console.log(response)
      showSuccessNotification('ELIMINACION EXITOSA', 'LA PROPIEDAD FUE ELIMINADA EXITOSAMENTE')
    } catch (err) {
      console.log(err)
    }
  }

  const getPropertyId = async id => {
    try {
      const response = await getPropertyById(id)

      property.value = response.data
    } catch (err) {
      console.log(err)
    }
  }

  const propertiesForType = async type =>{
    try{
      const response = await getPropertiesForType(type)

      console.log('propertyfortype ', response.data)

      return  response.data

    }catch (err){
      console.log(err)
    }
  }

  
  return {
    loadingProperty,
    error,
    addProperty,
    editProperty,
    getPropertyId,
    allProperty,
    allPropertybyProject,
    propertiesForType,
    removeProperty,
    properties: computed(() => properties.value),
    property,
    totalProperties: computed(() => totalProperties.value),

  }
}


