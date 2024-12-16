import { $api } from "@/utils/api"


export const getUsersPaginate = async paginationData =>{
  return await $api('/users', {
    method: 'GET',
    body: paginationData,
  })
}
