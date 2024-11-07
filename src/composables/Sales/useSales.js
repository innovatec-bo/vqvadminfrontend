import { createSale, createSaleChangeStage, getSale, listSalesPaginated } from "@/services/Sales/saleService"
import { showSuccessNotification } from "@/utils/notifications"

export function useSales (){
  const loadingSale = ref(false)
  const sales = ref([])
  const totalSales = ref(0)
  const error = ref(null)
  const sale = ref(null)

  const generateSaleChangeStage = async saleData =>{
    loadingSale.value = true
    try{
      const response = await createSaleChangeStage(saleData)

      showSuccessToast('Creacion Exitosa', 'La venta ha sido creada correctamente.')

      console.log('venta: ', response)
      sale.value = response.data
    }catch(err){
      console.log(err)
      if(err.response && err.response.status == 422){
        showWarningToast('Validación fallida', 'Faltan datos por rellenar')
        
        return { success: false, message: 'Validación fallida' }
      }
      showErrorToast('Error al crear la venta', 'Hubo un problema al crear la venta.')
      
      return { success: false, message: 'Error de actualización' }
    }finally{
      loadingSale.value=false
    }
  }
  
  const generateSale = async saleData =>{
    loadingSale.value = true
    try{
      const response = await createSale(saleData)

      showSuccessNotification('Venta generada con Exito', 'Se registro una nueva venta')
      
      console.log('venta: ', response)
      sale.value = response.data
    }catch(err){
      if(err.response && err.response.status == 422){
        showWarningToast('Validación fallida', 'Faltan datos por rellenar')
        
        return { success: false, message: 'Validación fallida' }
      }
      showErrorToast('Error al crear la venta', 'Hubo un problema al crear la venta.')
      
      return { success: false, message: 'Error de actualización' }
    }finally{
      loadingSale.value=false
    }
  }

  
  const getSalebyId = async id => {
    loadingSale.value = true
    try{
      const response = await getSale(id)

      console.log(response.data)

      sale.value = response.data
      
    }catch (error){
      console.log(error)
    }finally{
      loadingSale.value = false
    }
  }

  const AllSalesPaginated = async pagination => {
    loadingSale.value = true
    try{
      const response = await listSalesPaginated(pagination)

      sales.value = response.data.data
      totalSales.value = response.data.total
    }catch (error){
      console.log(error)
    }finally{
      loadingSale.value = false
    }

  }

  
  return{
    loadingSale,
    sales,
    error,
    sale,
    totalSales,

    generateSale,
    generateSaleChangeStage,
    getSalebyId,
    AllSalesPaginated,
  }
} 
