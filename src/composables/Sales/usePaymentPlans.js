import { confirmPaymenPlanByid } from "@/services/Sales/PaymentPlansService"
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

  return{
    loadingPaymentPlans,
    paymentPlan,
    error,
    paymentPlans,
    confirmPaymentPlans,
  }
} 
