import { $api } from "@/utils/api"

export const registerBillboardFace = async data => {
  return await $api('/billboard_faces', {
    method: 'POST',
    body: data,
  })
}

export const getBillboardFaceById = async billboardFaceId => {
  return await $api(`/billboard_faces/${billboardFaceId}`, {
    method: 'GET',
  })
}

export const allBillboardFaces = async pagination =>{
  return await $api(`/billboard_faces`, {
    method: 'GET',
    params: pagination,
  })
}

export const updateBillboardFace = async (billboardFaceId, billboardFaceData)=> {
  return await $api(`/billboard_faces/${billboardFaceId}`, {
    method: 'PATCH',
    body: billboardFaceData,
  })
}
