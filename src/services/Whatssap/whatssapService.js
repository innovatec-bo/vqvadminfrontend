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
export const getChat = (clientId, chatId) => {
  return $microservice(`/whatssap/chat/${clientId}/${chatId}`, {
    method: 'GET',
  })
}
export const getAllMessages = async (clientId, chatId) => {
  return await $microservice(`/whatssap/messages/${clientId}/${chatId}`, {
    method: 'GET',
  })
}
export const inizializateClientWhatssap = async clientId=>{
  return await $microservice('/whatssap/initialize', {
    method: 'POST',
    body: JSON.stringify({ clientId }),
  })
}
