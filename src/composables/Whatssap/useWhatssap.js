import { disconnectClient, getClientStatus } from './../../services/Whatssap/whatssapService'

export function useWhatssap(){
  const isAuthenticated = ref(false)
  const errorMessage  = ref(null)

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
  
  return {
    isAuthenticated,
    errorMessage,
    checkAuthStatus,
    logoutWhatssapWeb,
  }
}
