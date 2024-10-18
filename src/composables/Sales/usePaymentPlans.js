import { confirmPaymenPlanByid, update } from "@/services/Sales/PaymentPlansService"
import { showSuccessNotification } from "@/utils/notifications"

export function usePaymentPlans (){
  const loadingPaymentPlans = ref(false)
  const paymentPlans = ref([])
  const error = ref(null)
  const paymentPlan = ref(null)

  const confirmPaymentPlans = async id => {
    try{
      const response = await confirmPaymenPlanByid(id)

      showSuccessNotification('Actualizacion Exitosa', 'Se confirmo el pago')
    }catch (err){
      console.log(err)
    }
  }
  
  const updatePaymentPlans = async (id, data) => {
    loadingPaymentPlans.value = true
    error.value = null
    try{
      console.log(data)

      const response =await update(id, data)

      paymentPlan.value= response.data
      showSuccessNotification('ACTUALIZACION EXITOSA', '')
      console.log(response)
    } catch (err) {
      console.log(err)
      if(err.response && err.response.status== 422){
        showWarningNotification('ERROR', 'FALTAN DATOS POR RELLENAR')
      }
      error.value =  err.message
    } finally {
      loadingPaymentPlans.value = false
    }
  }

  return{
    loadingPaymentPlans,
    paymentPlan,
    error,
    paymentPlans,
    confirmPaymentPlans,
    updatePaymentPlans,
  }
} 
