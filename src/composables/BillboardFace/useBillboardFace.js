/* eslint-disable camelcase */
// import { allBillboardFaces, getBillboardFaceById, registerBillboardFace, updateBillboardFace, uploadBillboardFaces } from '@/services/BillboardFace/billboardFaceService'
import * as billboardFaceService from '@/services/BillboardFace/billboardFaceService'
import { showErrorToast, showSuccessToast } from '@/utils/notifications'
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
    try 
    {
      const response = await billboardFaceService.registerBillboardFace(propertyListingData)
      showSuccessToast('¡La cara de la valla ha sido creada exitosamente!', 'Los detalles de la cara de la valla han sido guardados correctamente.');
      router.push('/billboard-faces/list');
    } 
    catch (err) 
    {
      if(err.response && err.response.status == 422)
      {
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
      const response = await billboardFaceService.updateBillboardFace(billboardFaceDataForm.get('id'), billboardFaceDataForm)

      showSuccessToast('¡La cara de la valla ha sido actualizada exitosamente!', 'Los detalles de la cara de la valla han sido editados y guardados correctamente.')
      
      return { success: true, message: 'Actualización Exitosa' }
    } catch (err) {

      if(err.response && err.response.status == 422){
        return err.response._data;
      }
      showErrorToast('Advertencia', 'Hubo un problema al actualizar la cara de la valla.')
      
      return { success: false, message: 'Error de actualización' }
    } finally {
      loadingBillboardFace.value = false
    }
  }

  const uploadBillboardFaces = async file => {
    loadingBillboardFace.value = true
    error.value = null
    try 
    {
      const response = await billboardFaceService.uploadBillboardFaces(file)
      showSuccessToast('¡El archivo ha sido cargado exitosamente!', 'El archivo fue procesado correctamente.');
      console.log(response);
      router.push('/billboard-faces/list');
    } 
    catch (err) 
    {
      console.log(err)
      if(err.response && err.response.status == 422)
      {
        showWarningNotification('Advertencia', 'Ocurrio un problema, revise el contenido del archivo')
      }
    } finally {
      loadingBillboardFace.value = false
    }
  }

  const getAllBillboardFaces = async pagination => {
    try {
      const response = await billboardFaceService.allBillboardFaces(pagination)

      billboardFaces.value = response.data.data
      totalBillboardFaces.value = response.data.total

    } catch(err){
      console.log(err)
    }
  }

  const billboardFaceById = async id => {
    try {
      const response = await billboardFaceService.getBillboardFaceById(id)

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
    uploadBillboardFaces,
    billboardFaces: computed(() => billboardFaces.value),
    billboardFace,
    totalBillboardFaces: computed(() => totalBillboardFaces.value)
  }
}


