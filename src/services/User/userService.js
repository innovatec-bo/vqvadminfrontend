import { $api } from "@/utils/api"


export const getUsersPaginate = async paginationData =>{
  return await $api('/users', {
    method: 'GET',
    body: paginationData,
  })
}

export const updateUserProfile = async profileData =>{
  return await $api('/users/update_profile', {
    method: 'PUT',
    body: profileData,
  })
}

export const getUserById = async userId => {
  return await $api(`/users/${userId}`, {
    method: 'GET',
  })
}
