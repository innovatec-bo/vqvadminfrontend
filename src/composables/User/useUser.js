import { getUserById, getUsersPaginate, updateUserProfile } from "@/services/User/userService"

export function useUser(){
  const user = ref(null)
  const users= ref([])
  const totalUsers=ref(null)
  const loading = ref(false)
  const error = ref(null)

  const allSellerUsers = async () => {
    loading.value = true
    try {
      const response = await getUsersPaginate()

      users.value = response.data
      totalUsers.value = response.total
    } catch (error) {
      console.error(error)
      error.value = error.message
    }finally{
      loading.value = false
    }
  }

  const getById = async id => {
    try {
      const response = await getUserById(id)
      user.value = response.data
    } catch (err) {
      console.log(err)
    }
  }

  const updateProfile = async profileDataForm => {
    loading.value = true
    error.value = null
  
    try {
      const response = await updateUserProfile(profileDataForm)
  
      showSuccessToast(
        '¡El perfil ha sido actualizado exitosamente!',
        'Los detalles del perfil han sido editados y guardados correctamente.'
      )
  
      return { success: true, message: 'Actualización Exitosa' }
    } catch (err) {
      if (err.response && err.response.status === 422) {
        showWarningToast('Validación fallida', 'Faltan datos por rellenar')
        return { success: false, message: 'Validación fallida' }
      }
  
      showErrorToast('Advertencia', 'Hubo un problema al actualizar los datos del perfil.')
      return { success: false, message: 'Error de actualización' }
    } finally {
      loading.value = false
    }
  }
  
  const updateProfile__ = async profileDataForm => {
      loading.value = true
      error.value = null
      
      try {
        // const profileData = {
        //   _method:'PUT',
        //   name: profileDataForm.name,
        //   last_name: profileDataForm.last_name,
        //   cod_phone: profileDataForm.cod_phone,
        //   phone: profileDataForm.status,
        //   image: profileDataForm.image?profileDataForm.image:null
        // }
        const response = await updateUserProfile(profileDataForm)
  
        showSuccessToast('¡El perfil ha sido actualizado exitosamente!', 'Los detalles del perfil han sido editados y guardados correctamente.')
        
        return { success: true, message: 'Actualización Exitosa' }
      } catch (err) {
  
        if(err.response && err.response.status == 422){
          showWarningToast('Validación fallida', 'Faltan datos por rellenar')
          
          return { success: false, message: 'Validación fallida' }
        }
        showErrorToast('Advertencia', 'Hubo un problema al actualizar los datos del perfil.')
        
        return { success: false, message: 'Error de actualización' }
      } finally {
        loading.value = false
      }
    }

  
  return {
    allSellerUsers,
    updateProfile,
    getById,
    user,
    users,
    totalUsers,
    loading,
    error,
  }
}

