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
export const convertOpportunityProspect = async (id, opportunity) => {
  return await $api(`/opportunity/convert-prospect/${id}`, {
    method: 'PATCH',
    body: opportunity,
  })
}
export const updateOpportunity = async (id, opportunity) => {
  return await $api(`/opportunity/update/${id}`, {
    method: 'PATCH',
    body: opportunity,
  })
}
