import { $api } from "@/utils/api"

export const registerBillboard = async data => {
  return await $api('/billboards', {
    method: 'POST',
    body: data,
  })
}
export const getPropertyById = async propertyId => {
  return await $api(`/property/${propertyId}`, {
    method: 'GET',
  })
}
export const allBillboards = async pagination =>{
  return await $api(`/billboards`, {
    method: 'GET',
    params: pagination,
  })
}

export const allPropertiesProject = async (pagination, projectId) =>{
  return await $api(`/project/${projectId}/properties`, {
    method: 'GET',
    params: pagination,
  })
}

export const updateProperty = async (propertyId, PropertyData)=> {
  return await $api(`/property/${propertyId}`, {
    method: 'PATCH',
    body: PropertyData,
  })
}

export const deletePropertyById = async propertyId => {
  return await $api(`/property${propertyId}`, {
    method: 'DELETE',
  })
}

export const getPropertiesForType = async type => {
  return await $api(`/properties/${type}`, {
    method: 'GET',
  })
}

export const getPropertiesAvailable = async () => {
  return await $api(`/available/properties`, {
    method: 'GET',
  })
}

export const exportProperty = async () => {
  return await $api(`/export/property`, {
    method: 'GET',
  })
}

