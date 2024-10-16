import { $api } from "@/utils/api"

export const getProcessesbyOpportunityForStage = async (opportunityId, stageId) => {
  return await $api(`/opportunity/${opportunityId}/stage/${stageId}`, {
    method: 'GET',
  })
}

export const updateCheckProcessByIdForOpportunity = async (opportunityId, processId, processData) => {
  return await $api(`/opportunity/${opportunityId}/procedure/${processId}`, {
    method: 'PATCH',
    body: processData,
  })
}
