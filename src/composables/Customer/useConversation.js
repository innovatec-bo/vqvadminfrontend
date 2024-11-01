import { listConversationPaginate, updateStatusConversation } from "@/services/Customer/conversationService"
import { computed, ref } from "vue"
import { showSuccessNotification, showWarningNotification } from "@/utils/notifications"

export function useConversation() {
  const loading = ref(false)
  const error = ref(null)
  const conversation = ref(null)
  const conversations = ref ([])
  const totalConversations = ref(0)

  
  const allConversationsPaginate = async paginated => {
    loading.value = true
    try {
      const response = await listConversationPaginate(paginated)

      console.log(response)
      conversations.value = response.data.data
      totalConversations.value = response.data.total
    
    }catch (error){
      error.value = error.message
      console.log(error)
    } finally {
      loading.value = false
    }
  }

  
  const updateConversationStatus = async (id, status) => {
    loading.value = true
    try {
      const response = await updateStatusConversation(id, status)

      console.log(response)
      showSuccessNotification('Estado Actualizado', 'Se Actualizo el estado de la IA')

    }catch (error){
      error.value = error.message
      console.log(error)
    }finally {
      loading.value = false
    }
  }

  
  return {
    loading,
    error,
    conversation,
    conversations: computed(()=> conversations.value),
    totalConversations: computed(()=> totalConversations.value),
    allConversationsPaginate,
    updateConversationStatus,
  }

}
