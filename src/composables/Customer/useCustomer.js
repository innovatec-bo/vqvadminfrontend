import { listCustomerPaginate, registerCustomer } from '@/services/Customer/customerService'

// eslint-disable-next-line case-police/string-check
import { createThread } from '@/services/OpenAi/openAIService'
import { showSuccessNotification, showWarningNotification } from "@/utils/notifications"
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export function useCustomer(){
  const loading = ref(false)
  const error = ref(null)
  const customer = ref(null)
  const customers = ref([])
  const totalCustomers= ref(0)
  const router = useRouter()

    
  const addCustomer = async data =>{
    if (!data.name || !data.phone) {
      showWarningNotification('Falta Informacion', 'El nombre y el celular son obligatorios')
      
      return
    }
    loading.value = true
    error.value = null
    try {
      const thread = await createThread()

      const customerData = {
        name: data.name,
        phone: data.phone,

        thread: thread.id,
        email: data.email,
        ci: data.ci,
        // eslint-disable-next-line camelcase
        cod_phone: data.countryCode.replace(/\+/g, ''),
        description: data.description,
      }

      console.log(customerData)

      const response = await registerCustomer(customerData)

      console.log('Respuesta del servidor:', response)

      showSuccessNotification('Cliente agregado exitosamente', 'El cliente ha sido registrado en el sistema correctamente.')

      customer.value = response.data
      router.push('/customers/listCustomers')
    } catch (err){
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('Falta Informacion', 'El nombre y el celular son obligatorios')
      }
      if(err.response && err.response.status== 409){
        showWarningNotification('Advertencia', err.response._data.message)
      }
      
      error.value =  err.message
    } finally {
      loading.value = false
    }
  }

  const allCustomerPaginate = async paginated =>{
    try {
      const response=await listCustomerPaginate(paginated)

      console.log(response)
      customers.value = response.data.data
      totalCustomers.value = response.data.total
    }catch (err){
      console.log(err)
    }
  }

  
  return {
    loading,
    error,
    customer,
    customers: computed(() => customers.value),
    totalCustomers: computed(()=> totalCustomers.value),
    addCustomer,
    allCustomerPaginate,
  }
}

