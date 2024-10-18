import { useCookie } from '@/@core/composable/useCookie'
import { ref } from 'vue'
import { disconnectClient, getAllMessages, getClientStatus, inizializateClientWhatssap } from './../../services/Whatssap/whatssapService'

export function useWhatssap(){
  const loadingConnect = ref(false)
  const isAuthenticated = ref(false)
  const errorMessage  = ref(null)
  const messages = ref([])
  const chat = ref(null)
  const userData= useCookie('userData').value
  const clientId = userData.cod_phone+userData.phone

  const checkAuthStatus = async () =>{
    try{
      const response= await getClientStatus(clientId)

      console.log('respuesta: ', response)
      if(response.status === true ){
        isAuthenticated.value = true
      }else{
        isAuthenticated.value = false
      }
    }catch(error){
      console.error(error)
    }
  }

  const logoutWhatssapWeb= async () => {
    try{
      await disconnectClient(clientId)
      isAuthenticated.value = false
    }catch(error){
      console.error(error)
    }
  }

  const getInfoChat = async chatId =>{
    try {
      const response = await getChat(clientId, chatId)

      chat.value = response
    }catch (err){
      console.error(err)
    }
  }

  const getAllMessagesForChat = async chatId => {
    try {
      const response = await getAllMessages(clientId, chatId)

      
      messages.value = response.messages
      
    }catch(err){
      console.error(err)
    }
  }

  const initializeConnectToWhatsapp = async () =>{
    loadingConnect.value= true
    try{
      await inizializateClientWhatssap(clientId)
    }catch (err){
      console.error(err)
    }finally {
      console.log('Initialize Connect To WhatsApp')
      loadingConnect.value = false
    }
  }



  return {
    isAuthenticated,
    errorMessage,
    checkAuthStatus,
    getAllMessagesForChat,
    logoutWhatssapWeb,
    getInfoChat,
    initializeConnectToWhatsapp,
    messages,
    loadingConnect,
  }
}
