import { $api } from "@/utils/api"

export const confirmPaymenPlanByid = async $id => {
  return await $api(`/sale/paymentPlans/${$id}/confirm`, {
    method: 'PATCH',
  })
}

export const update = async (id, data) => {
  return await $api(`/sale/paymentPlans/${id}`, {
    method: 'PATCH',
    body: data,
  })
}
