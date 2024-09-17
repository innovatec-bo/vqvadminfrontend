import { $api } from "@/utils/api"

export const registerProject = async ProjectData => {
  return await $api('/project', {
    method: 'POST',
    body: ProjectData,
  })
}

export const allProjects= async pagination =>{
  return await $api(`/projects`, {
    method: 'GET',
    params: pagination,
  })
}
  
export const updateProject = async (projectId, request)=> {
  return await $api(`/project/${projectId}`, {
    method: 'PUT',
    body: request,
  })
}

export const getProject = async projectId => {
  return await $api(`/project/${projectId}`, {
    method: 'GET',
  })
}
  
