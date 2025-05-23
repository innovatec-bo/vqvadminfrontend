/* eslint-disable camelcase */
import { allBillboards, allPropertiesProject, deletePropertyById, exportProperty, getPropertiesAvailable, getPropertiesForType, getPropertyById, updateProperty } from '@/services/Billboard/billboardService'
import { showErrorToast, showSuccessNotification, showSuccessToast, showWarningToast } from '@/utils/notifications'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export function useBillboard(){
  const userData = useCookie('userData').value

  const loadingProperty = ref(false)
  const error = ref(null)
  const router = useRouter()
  const property = ref(null)
  const properties = ref([])
  const propertiesTypes = ref([])

  const totalProperties = ref(0)

  const addBillboard = async propertyListingData => {
    loadingProperty.value = true
    error.value = null
    try {
      console.log('este es el formulario:', propertyListingData)

      const status = {
        1: 'available',
        2: 'reserved',
        3: 'rented',
        4: 'inactive'
      }

      const billboardStatus = status[propertyListingData.status.value] || 'UNKNOWN'

      console.log(billboardStatus)

      // const propertyData = {
      //   code: propertyListingData.propertyDetails.code,
      //   surface: propertyListingData.propertyFeatures.surface,
      //   description: propertyListingData.propertyDetails.description,
      //   delivery_date: propertyListingData.propertyDetails.deliveryDate,
      //   base_price: propertyListingData.propertyDetails.price,
      //   percentage_initial_fee: propertyListingData.propertyDetails.percentageinitialfee,
      //   property_type: propertyType,
      //   property_type_id: propertyListingData.propertyDetails.propertyType.value,
      //   project_id: propertyListingData.propertyDetails.projectType.value,
      //   benefits: propertyListingData.propertyFeatures.benefitsDetails.map(benefit => benefit.value),
      //   features: propertyListingData.propertyFeatures.featureDetails.map(feature => feature.value),
      //   type_department_id: propertyType === DEPARTAMENT ? propertyListingData.propertyFeatures.typeDepartmentsDetails.value : null,
      //   number_bathrooms: propertyType !== LAND ? propertyListingData.propertyFeatures.bathroomCount : "",
      //   number_bedrooms: propertyType !== LAND ? propertyListingData.propertyFeatures.bedroomCount : "",
      //   number_floors: propertyType !== LAND && propertyType !== DEPARTAMENT ? propertyListingData.propertyFeatures.floorNo : "",
      //   floors: propertyType === DEPARTAMENT ? propertyListingData.propertyFeatures.floor : "",
      //   number_rooms: '',
      // }

      // console.log(propertyData)

      // const response = await registerBillboard(propertyData)

      // console.log('Respuesta del servidor:', response)
      // showSuccessNotification('Se Agrego una nueva valla', 'La valla fue registrada exitosamente.')

      // router.push('/billboards/list')
    } catch (err) {
      console.log(err)
      if(err.response && err.response.status == 422){
        showWarningNotification('Advertencia', 'Faltan Datos por Rellenar')
      }
    } finally {
      loadingProperty.value = false
    }
  }

  const editProperty = async propertyDataForm => {
    loadingProperty.value = true
    error.value = null
    try {
      const propertyData = {
        title: propertyDataForm.title,
        code: propertyDataForm.code,
        surface: propertyDataForm.surface,
        base_price: propertyDataForm.base_price,
        percentage_initial_fee: propertyDataForm.percentage_initial_fee,
        property_type: propertyDataForm.property_type,
        number_bathrooms: propertyDataForm?.departament?.number_bathrooms ?? '',
        number_bedrooms: propertyDataForm?.departament?.number_bedrooms ?? '',
        surface_balcony: propertyDataForm?.departament?.surface_balcony ?? '',
        is_balcony: propertyDataForm?.departament?.is_balcony,
        covered: propertyDataForm?.covered ? true : false,
      }

      const response = await updateProperty(propertyDataForm.id, propertyData)

      console.log(response)
      showSuccessToast('¡Propiedad actualizada exitosamente!', 'Los detalles de la propiedad han sido editados y guardados correctamente.')
      
      return { success: true, message: 'Actualización Exitosa' }
    } catch (err) {
      console.log(err)
      if(err.response && err.response.status == 422){
        showWarningToast('Validación fallida', 'Faltan datos por rellenar')
        
        return { success: false, message: 'Validación fallida' }
      }
      showErrorToast('Advertencia', 'Hubo un problema al actualizar la propiedad.')
      
      return { success: false, message: 'Error de actualización' }
    } finally {
      loadingProperty.value = false
    }
  }

  const allBillboard = async pagination => {
    try {
      const response = await allBillboards(pagination)

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
      showSuccessNotification('Elimino una Propidad Correctamente', 'Se Acaba de eliminar una propiedad con exito del sistema de inventario.')
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

      propertiesTypes.value  = response.data
      console.log('propertyfortype ', response.data)

      return  response.data

    }catch (err){
      console.log(err)
    }
  }

  
  const propertiesAvailbles = async () =>{
    try{
      const response = await getPropertiesAvailable()

      properties.value  = response.data
      console.log('properties: ', response.data)

      return  response.data

    }catch (err){
      console.log(err)
    }
  }
  
  const exportPropertyExcel = async () => {
    try{
      const response = await exportProperty()
        
      if (!(response instanceof Blob)) {
        throw new Error('Respuesta inválida del servidor con el BLOB')
      }
  
      const blob = new Blob([response], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
  
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
  
      link.href = url
      link.setAttribute('download', 'propiedades.xlsx') 
      document.body.appendChild(link)
      link.click()
  
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    }catch(error){
      console.error('Error en exportación:', error)
    }
  }
  
  return {
    loadingProperty,
    error,
    addBillboard,
    editProperty,
    getPropertyId,
    allBillboard,
    allPropertybyProject,
    propertiesForType,
    removeProperty,
    propertiesAvailbles,
    properties: computed(() => properties.value),
    property,
    totalProperties: computed(() => totalProperties.value),
    exportPropertyExcel,
  }
}


