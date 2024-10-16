import { router } from '@/plugins/1.router'
import { ofetch } from 'ofetch'
import { URL_ADMIN, URL_MICROSERVICIO } from './constants'


export const $api = ofetch.create({
  baseURL: URL_ADMIN,
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
  async onResponseError(error) {
    if (error.response && error.response.status === 401) {
      if (useCookie('accessToken')) {
        useCookie('accessToken').value = null
      }
      await router.push('/auth/login')
    }
    
    return Promise.reject(error)
  },
})

export const $microservice = ofetch.create({
  baseURL: URL_MICROSERVICIO,
  async onRequest({ options }) {
    const accessToken = useCookie('accessToken').value
    if (accessToken) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    }
  },
  async onResponseError(error) {
    if (error.response && error.response.status === 401) {
      if (useCookie('accessToken')) {
        useCookie('accessToken').value = null
      }
      await router.push('/auth/login')
    }
    
    return Promise.reject(error)
  },
})


