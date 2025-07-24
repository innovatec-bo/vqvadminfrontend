import { $api } from "@/utils/api";

export const getUsersPaginate = async paginationData =>{
  return await $api('/users', {
    method: 'GET',
    params: paginationData,
  })
}

export const updateUserProfile = async profileData =>{
  return await $api('/users/update_profile', {
    method: 'POST',
    body: profileData,
  })
}

export const registerUser = async data =>{
  return await $api('/users', {
    method: 'POST',
    body: data,
  })
}

export const getUserById = async userId => {
  return await $api(`/users/${userId}`, {
    method: 'GET',
  })
}

export const updateUser = async (id, data)=> {
  return await $api(`/users/${id}`, {
    method: 'POST',
    body: data,
  })
}
