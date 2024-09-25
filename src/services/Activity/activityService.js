import { $api } from "@/utils/api"

export const register = async ActivityData => {
  return await $api('/activity', {
    method: 'POST',
    body: ActivityData,
  })
}

export const get = async id => {
  return await $api(`/activity/${id}`, {
    method: 'GET',
  })
}

export const allTypeActivities= async  ()=>{
  return await $api(`/typeActivities`, {
    method: 'GET',
  })
}

export const changeStatus = async (id, data)=> {
  return await $api(`/activity/${id}/status`, {
    method: 'PATCH',
    body: data,
  })
}
  
export const getByOportunity = async (oportunityId, asesorId) => {
  return await $api(`/activity/oportunity/${oportunityId}/asesor/${asesorId}`, {
    method: 'GET',
  })
}
  
export const getByAsesorFecha= async (asesorid, pagination) =>{
  return await $api(`/activity/asesor/${asesorid}/fecha`, {
    method: 'GET',
    params: pagination,
  })
}

export const getByAsesorRangoFecha= async (asesorid, pagination) =>{
  return await $api(`/activity/asesor/${asesorid}/fecha-rango`, {
    method: 'GET',
    params: pagination,
  })
}
