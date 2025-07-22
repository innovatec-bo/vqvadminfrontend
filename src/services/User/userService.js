import { $api } from "@/utils/api"

export const getUsersPaginate = async paginationData =>{
  return await $api('/users', {
    method: 'GET',
    params: paginationData,
  })
}

export const updateUserProfile = async profileData =>{
  for (let pair of profileData.entries()) {
    console.log(pair[0]+ ': ' + pair[1])
  }
  return await $api('/users/update_profile', {
    method: 'POST',
    body: profileData,
  })
}

export const registerUser = async userData =>{
  for (let pair of userData.entries()) 
  {
    console.log(pair[0]+ ': ' + pair[1])
  }
  
  return await $api('/users', {
    method: 'POST',
    body: userData,
  })
}

export const getUserById = async userId => {
  return await $api(`/users/${userId}`, {
    method: 'GET',
  })
}
