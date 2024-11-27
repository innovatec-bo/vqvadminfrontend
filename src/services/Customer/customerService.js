import { $api } from "@/utils/api"

export const registerCustomer = async customerData =>{
  return await $api('/customer/register/prospect', {
    method: 'POST',
    body: customerData,
  })
}
export const getCustomer = async id =>{

}
export const getPerfilCustomer = async id =>{
  return await $api(`/customer/perfil/${id}`, {
    method: 'GET',
  })
}
export const  listCustomerPaginate = async pagination => {
  return await $api('customer/list-paginated', {
    method: 'GET',
    params: pagination,
  })
}
