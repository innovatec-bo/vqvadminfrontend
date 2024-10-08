import { getProcessesbyOpportunityForStage, updateCheckProcessByIdForOpportunity } from "@/services/Process/processService"
import { showSuccessNotification } from "@/utils/notifications"

export function useProcess(){
  const process = ref(null)
  const loadingProcess = ref (false)
  const errorProcess = ref (false)
  const processes = ref([])

  const allProcessesOpportunityForStage = async (opportunityId, stageId) => {
    try{
      const response = await getProcessesbyOpportunityForStage(opportunityId, stageId)

      processes.value = response.data
    } catch (err){
      console.log(err)
    }
  }

  const checkProcessForOpportunity = async (opportunityId, processId, processData) => {
    try{
      const response = await updateCheckProcessByIdForOpportunity(opportunityId, processId, processData)

      showSuccessNotification('Marcado Exitoso', 'Se Actualizo el estado del proceso')
    }catch (err){
      console.log(err)
    }
  }

  return {
    process,
    loadingProcess,
    errorProcess,
    processes,
    allProcessesOpportunityForStage,
    checkProcessForOpportunity,
  }
    
} 
