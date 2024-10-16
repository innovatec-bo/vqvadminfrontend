import { createSale } from "@/services/Sales/saleService"
import { showSuccessNotification } from "@/utils/notifications"

export function useSales (){
  const loadingSale = ref(false)
  const sales = ref([])
  const error = ref(null)
  const sale = ref(null)

  const generateSale = async saleData =>{
    loadingSale.value = true
    try{
      const response = await createSale(saleData)

      showSuccessNotification('Venta generada con Exito', 'Se registro una nueva venta')
      console.log('venta: ', response)
      sale.value = response.data
    }catch(err){
      error.value = err
    }finally{
      loadingSale.value=false
    }
  }

  return{
    loadingSale,
    sales,
    error,
    sale,
    generateSale,
  }
} 
