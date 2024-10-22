import { getProcessesbyOpportunityForStage, updateCheckProcessByIdForOpportunity } from "@/services/Process/processService"

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
      console.log(processData)

      const response = await updateCheckProcessByIdForOpportunity(opportunityId, processId, processData)

      showSuccessToast('Marcado Exitoso', 'Se Actualizo el estado del proceso')
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
