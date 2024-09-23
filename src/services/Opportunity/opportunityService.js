import { $api } from "@/utils/api"

export const allOpportunityKanban = async userId => {
  return await $api(`/opportunity/kanban/${userId}`, {
    method: 'GET',
  })
}
export const getOpportunity = async opportunityId => {
  return await $api(`/opportunity/get-opportunity/${opportunityId}`, {
    method: 'GET',
  })
}
