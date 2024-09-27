import { ref } from 'vue'
import { disconnectClient, getAllMessages, getClientStatus } from './../../services/Whatssap/whatssapService'

export function useWhatssap(){
  const isAuthenticated = ref(false)
  const errorMessage  = ref(null)
  const messages = ref([])
  const chat = ref(null)

  const checkAuthStatus = async clientId =>{
    try{
      const response= await getClientStatus(clientId)

      console.log(response)
      if(response.status){
        isAuthenticated.value = true
      }else{
        isAuthenticated.value = false
      }
    }catch(error){
      console.error(error)
    }
  }

  const logoutWhatssapWeb= async clientId => {
    try{
      await disconnectClient(clientId)
      isAuthenticated.value = false
    }catch(error){
      console.error(error)
    }
  }

  const getInfoChat = async (clientId, chatId) =>{
    try {
      const response = await getChat(clientId, chatId)

      chat.value = response
    }catch (err){
      console.error(err)
    }
  }

  const getAllMessagesForChat = async (clientId, chatId) => {
    try {
      const response = await getAllMessages(clientId, chatId)

      
      messages.value = response.messages
      
    }catch(err){
      console.error(err)
    }
  }
  
  return {
    isAuthenticated,
    errorMessage,
    checkAuthStatus,
    getAllMessagesForChat,
    logoutWhatssapWeb,
    getInfoChat,
    messages,
  }
}
