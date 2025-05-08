/* eslint-disable camelcase */
import { allBillboardFaces, getBillboardFaceById, updateBillboardFace } from '@/services/BillboardFace/billboardFaceService'
import { showErrorToast, showSuccessToast, showWarningToast } from '@/utils/notifications'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export function useBillboardFace(){
  const userData = useCookie('userData').value

  const loadingBillboardFace = ref(false)
  const error = ref(null)
  const router = useRouter()
  const billboardFace = ref(null)
  const billboardFaces = ref([])

  const totalBillboardFaces = ref(0)

  const addBillboardFace = async propertyListingData => {
    loadingBillboardFace.value = true
    error.value = null
    try {
      console.log('este es el formulario:', propertyListingData)

      const status = {
        1: 'ROJO',
        2: 'AMARILLO',
        3: 'VERDE',
      }

      const billboardStatus = status[propertyListingData.status.value] || 'UNKNOWN'

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
      loadingBillboardFace.value = false
    }
  }

  const editBillboardFace = async billboardFaceDataForm => {
    loadingBillboardFace.value = true
    error.value = null
    try {
      const propertyData = {
        title: billboardFaceDataForm.title,
        code: billboardFaceDataForm.code,
        surface: billboardFaceDataForm.surface,
        base_price: billboardFaceDataForm.base_price,
        percentage_initial_fee: billboardFaceDataForm.percentage_initial_fee,
        property_type: billboardFaceDataForm.property_type,
        number_bathrooms: billboardFaceDataForm?.departament?.number_bathrooms ?? '',
        number_bedrooms: billboardFaceDataForm?.departament?.number_bedrooms ?? '',
        surface_balcony: billboardFaceDataForm?.departament?.surface_balcony ?? '',
        is_balcony: billboardFaceDataForm?.departament?.is_balcony,
        covered: billboardFaceDataForm?.covered ? true : false,
      }

      const response = await updateBillboardFace(billboardFaceDataForm.id, propertyData)

      showSuccessToast('¡La cara de la valla ha sido actualizada exitosamente!', 'Los detalles de la cara de la valla han sido editados y guardados correctamente.')
      
      return { success: true, message: 'Actualización Exitosa' }
    } catch (err) {

      if(err.response && err.response.status == 422){
        showWarningToast('Validación fallida', 'Faltan datos por rellenar')
        
        return { success: false, message: 'Validación fallida' }
      }
      showErrorToast('Advertencia', 'Hubo un problema al actualizar la cara de la valla.')
      
      return { success: false, message: 'Error de actualización' }
    } finally {
      loadingBillboardFace.value = false
    }
  }

  const getAllBillboardFaces = async pagination => {
    try {
      const response = await allBillboardFaces(pagination)

      billboardFaces.value = response.data.data
      totalBillboardFaces.value = response.data.total

    } catch(err){
      console.log(err)
    }
  }

  const billboardFaceById = async id => {
    try {
      const response = await getBillboardFaceById(id)

      billboardFace.value = response.data
    } catch (err) {
      console.log(err)
    }
  }
  
  return {
    loadingBillboardFace,
    error,
    addBillboardFace,
    editBillboardFace,
    billboardFaceById,
    getAllBillboardFaces,
    billboardFaces: computed(() => billboardFaces.value),
    billboardFace,
    totalBillboardFaces: computed(() => totalBillboardFaces.value)
  }
}


