import { changeStageSignature, createSale, createSaleChangeStage, discardSale, exportSale, getSale, listSalesPaginated } from "@/services/Sales/saleService"
import { showSuccessNotification } from "@/utils/notifications"
import { useRouter } from "vue-router"

export function useSales (){
  const loadingSale = ref(false)
  const sales = ref([])
  const totalSales = ref(0)
  const error = ref(null)
  const router = useRouter()
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
      if(err.response && err.response.status == 409){
        showWarningNotification('Advertencia', err.response._data.message)
        
      }else{

        showErrorToast('Error al crear la venta', 'Hubo un problema al crear la venta.')
      }
      
      return { success: false, message: 'Error de actualización' }
    }finally{
      loadingSale.value=false
    }
  }

  const SaleChangeStageDiscard = async id =>{
    loadingSale.value = true
    try{
      const response = await discardSale(id)

      showSuccessToast('Actualizacion Exitosa', 'La venta fue descartada')

      console.log('venta: ', response)
      sale.value = response.data
    }catch(err){
      console.log(err)
      if(err.response && err.response.status == 422){
        // showWarningToast('Validación fallida', 'Faltan datos por rellenar')
        
        // return { success: false, message: 'Validación fallida' }
      }
      showErrorToast('Error', 'Hubo un problema al actualizar la venta.')
      
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
      router.push(`/sale/${sale.value.id}`)
    }catch(err){
      if(err.response && err.response.status == 422){
        showWarningToast('Validación fallida', 'Faltan datos por rellenar')
      }
      if(err.response && err.response.status == 409){
        showWarningNotification('Advertencia', err.response._data.error)
      }else{
        showErrorToast('Error al crear la venta', 'Hubo un problema al crear la venta.')
      }
      
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
      console.log(sales)
      totalSales.value = response.data.total
    }catch (error){
      console.log(error)
    }finally{
      loadingSale.value = false
    }

  }

  const SaleChangeSignature = async id =>{
    loadingSale.value = true
    try{
      const response = await changeStageSignature(id)

      showSuccessToast('Actualizacion Exitosa', 'La venta fue actualizada')

      console.log('venta: ', response)
      sale.value = response.data
    }catch(err){
      console.log(err)
      if(err.response && err.response.status == 422){
        // showWarningToast('Validación fallida', 'Faltan datos por rellenar')
        
        // return { success: false, message: 'Validación fallida' }
      }
      showErrorToast('Error', 'Hubo un problema al actualizar la venta.')
      
      return { success: false, message: 'Error de actualización' }
    }finally{
      loadingSale.value=false
    }
  }

  const exportSaleExcel = async () => {
    try{
      const response = await exportSale()
        
      if (!(response instanceof Blob)) {
        throw new Error('Respuesta inválida del servidor con el BLOB')
      }
  
      const blob = new Blob([response], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })
  
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
  
      link.href = url
      link.setAttribute('download', 'ventas.xlsx') 
      document.body.appendChild(link)
      link.click()
  
      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    }catch(error){
      console.error('Error en exportación:', error)
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
    SaleChangeStageDiscard,
    SaleChangeSignature,
    exportSaleExcel,
  }
} 
