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
  return await $api(`/activity/${id}/change_status_activity`, {
    method: 'PATCH',
    body: data,
  })
}

export const update = async (id, data)=> {
  return await $api(`/activity/${id}`, {
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

export const getByAsesorFechaFuture= async asesorid =>{
  return await $api(`/activity/asesor/${asesorid}/fecha-future`, {
    method: 'GET',
  })
}

export const getByAsesorFechaPast= async asesorid =>{
  return await $api(`/activity/asesor/${asesorid}/fecha-past`, {
    method: 'GET',
  })
}

export const getByAsesorRangoFecha= async (asesorid, pagination) =>{
  return await $api(`/activity/asesor/${asesorid}/fecha-rango`, {
    method: 'GET',
    params: pagination,
  })
}

export const completedActivity = async (idActivity, data) => {
  return await $api(`/activity/${idActivity}/change_status`, {
    method: 'PATCH',
    body: data,
  })
}

// Da de baja la oportunidad
export const discardActivity = async idActivity => {
  return await $api(`/activity/${idActivity}/discard`, {
    method: 'PATCH',
  })
}
