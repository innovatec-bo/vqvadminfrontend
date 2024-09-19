import { $microservice } from "@/utils/api"

export const getClientStatus = async clientId=>{
  return await $microservice(`/whatssap/status/${clientId}`, {
    method: 'GET',
  })
}
export const disconnectClient= async clientId =>{
  return await $microservice(`/whatssap/disconnect/${clientId}`, {
    method: 'DELETE',
  })
}
