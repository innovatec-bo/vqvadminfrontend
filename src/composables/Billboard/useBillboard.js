/* eslint-disable camelcase */
import * as billboardService from '@/services/Billboard/billboardService'
import { showErrorToast, showWarningToast } from '@/utils/notifications'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

export function useBillboard()
{
  const loadingBillboard = ref(false)
  const error = ref(null)
  const billboard = ref(null)
  const billboards = ref([])
  const router = useRouter()

  const totalBillboards = ref(0)

  const addBillboard = async formData => {
    loadingBillboard.value = true
    error.value = null
    try 
    {
      const data = {
        name: formData.name,
        location: formData.location,
        advertiser_id: formData.advertiser.id,
        city_id: formData.city.id,
        zone_id: formData.zone.id,
        billboard_structure_id: formData.billboard_structure.id,
        size: formData.size,
        price_per_month: formData.price_per_month,
        longitude: formData.longitude,
        latitude: formData.latitude
      }
      
      const response = await billboardService.registerBillboard(data)
      showSuccessNotification('Billboard agregado exitosamente', 'El billboard ha sido registrado en el sistema correctamente.');
      router.push('/billboards/list');
    } 
    catch (err) 
    {
      if(err.response && err.response.status == 422)
      {
        showWarningNotification('Advertencia', 'Faltan Datos por Rellenar')
      }
    } 
    finally 
    {
      loadingBillboard.value = false
    }
  }

  const editBillboard = async formData => {
    loadingBillboard.value = true
    error.value = null
    
    try {
      const data = {
        _method:'PUT',
        name: formData.title,
        advertiser_id: formData.advertiser.id,
        city_id: formData.city.id,
        zone_id: formData.zone.id,
        billboard_structure_id: formData.billboard_structure.id,
        entity_status: formData.entity_status,
        latitude: parseFloat(formData.latitude),
        longitude: parseFloat(formData.longitude),
      }

      await billboardService.updateBillboard(formData.id, data)

      showSuccessToast('¡Billboard actualizado exitosamente!', 'Los detalles del billboard han sido editados y guardados correctamente.')
      
      return { success: true, message: 'Actualización Exitosa' }
    } 
    catch (err) 
    {
      if(err.response && err.response.status == 422)
      {
        showWarningToast('Validación fallida', 'Faltan datos por rellenar')
        return { success: false, message: 'Validación fallida' }
      }
      showErrorToast('Advertencia', 'Hubo un problema al actualizar el billboard.')
      return { success: false, message: 'Error de actualización' }
    } 
    finally 
    {
      loadingBillboard.value = false
    }
  }

  const allBillboards = async pagination => {
    try 
    {
      const response = await billboardService.allBillboards(pagination)

      billboards.value = response.data.data
      totalBillboards.value = response.data.total
    } 
    catch(err)
    {
      console.log(err)
    }
  }

  const getBillboardById = async id => {
    try
    {
      const response = await billboardService.getBillboardById(id)
      billboard.value = response.data
    } 
    catch (err) 
    {
      console.log(err)
    }
  }

  return {
    loadingBillboard,
    error,
    addBillboard,
    editBillboard,
    getBillboardById,
    allBillboards,
    billboards: computed(() => billboards.value),
    billboard,
    totalBillboards: computed(() => totalBillboards.value),
  }
}


