import { exportCustomer, getPerfilCustomer, listCustomerPaginate, registerCustomer } from '@/services/Customer/customerService'

// eslint-disable-next-line case-police/string-check
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
        type_customer: data.type_customer,
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
      }else{
        showWarningNotification('Advertencia', 'Hubo un problema al registar al cliente')
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

  const getPerfilCutomerbyId = async id => {
    try{
      loading.value = true

      const response = await getPerfilCustomer(id)

      customer.value = response.data
    }catch(error){
      console.error(error)
    } finally {
      loading.value = false
    }
  }

  const exportCustomerExcel = async () => {
    try{
      const response = await exportCustomer()
      
      if (!(response instanceof Blob)) {
        throw new Error('Respuesta inválida del servidor con el BLOB')
      }

      const blob = new Blob([response], { 
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      })

      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')

      link.href = url
      link.setAttribute('download', 'clientes.xlsx') 
      document.body.appendChild(link)
      link.click()

      window.URL.revokeObjectURL(url)
      document.body.removeChild(link)
    }catch(error){
      console.error('Error en exportación:', error)
    }
  }

  const searchCustomers = async query => {
    loading.value = true
    
    try {
      const response = await listCustomerPaginate({
        search: query,
        page: 1,
        itemsPerPage: 10,
      })
  
      customers.value = response.data.data
      totalCustomers.value = response.data.total
    } catch (err) {
      console.error('Error en búsqueda de clientes:', err)
    } finally {
      loading.value = false
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
    getPerfilCutomerbyId,
    exportCustomerExcel,
    searchCustomers,
  }
}

