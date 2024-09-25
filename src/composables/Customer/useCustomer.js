import { registerCustomer } from '@/services/Customer/customerService'
import { ref } from 'vue'

export function useCustomer(){
  const loading = ref(false)
  const error = ref(null)
  const customer = ref(null)
  const customers = ref([])

    
  const addCustomer = async data =>{
    loadingActivity.value = true
    error.value = null
    try {
      const response = await registerCustomer(data)

      customer.value = response.data
    } catch (err){
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('ERROR', 'FALTAN DATOS POR RELLENAR')
      }
      error.value =  err.message
    } finally {
      loading.value = false
    }
  }

  
  return {
    loading,
    error,
    customer,
    addCustomer,
  }
}

