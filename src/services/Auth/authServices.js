import { $api } from "@/utils/api"

export const login = async credentials => {
  return await $api('/authen/login', {
    method: 'POST',
    body: credentials,
  })
}

export const logout = () => {
  return $api.post('/logout')
}

export const changePassword = async credentials => {
  return $api('/change_password', { 
    method: 'PUT',
    body: credentials,
  })
}

export const forgotPassword = async credentials => {
  return $api('/authen/forgot-password', { 
    method: 'POST',
    body: credentials,
  })
}

export const resetPassword = async datos => {
  return $api('/authen/reset-password', { 
    method: 'PUT',
    body: datos,
  })
}

export const checkAuthStatus = () => {
  return $api.get('/auth-status')
}

export const verifyToken = async (token, email) => {
  return $api(`/authen/verify-token/${token}/${email}`, {
    method: 'GET',
  })
}
