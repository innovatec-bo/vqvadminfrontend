import { $api } from "@/utils/api"

export const confirmPaymenPlanByid = async $id => {
  return await $api(`/sale/paymentPlans/${$id}/confirm`, {
    method: 'PATCH',
  })
}
