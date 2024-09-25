import { $api } from "@/utils/api"

export const registerCustomer = async data =>{
  return await $api('/customer/register', {
    method: 'POST',
    data,
  })
}
