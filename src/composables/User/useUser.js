import * as userService from "@/services/User/userService"
import { useRouter } from 'vue-router'
export function useUser()
{
  const user = ref(null)
  const users= ref([])
  const totalUsers=ref(null)
  const loading = ref(false)
  const error = ref(null)
  const router = useRouter()

  const allSellerUsers = async () => {
    loading.value = true
    try {
      const response = await userService.getUsersPaginate()

      users.value = response.data.data
      totalUsers.value = response.data.total
    } catch (error) {
      console.error(error)
      error.value = error.message
    }finally{
      loading.value = false
    }
  }

  const allUsers = async pagination => {
    loading.value = true
    try {
      const response = await userService.getUsersPaginate(pagination)

      users.value = response.data.data
      totalUsers.value = response.data.total
    } catch (error) {
      console.error(error)
      error.value = error.message
    }finally{
      loading.value = false
    }
  }

  const getById = async id => {
    try {
      const response = await userService.getUserById(id)
      user.value = response.data
    } catch (err) {
      console.log(err)
    }
  }

  const addUser = async data => {
    loading.value = true
    error.value = null
    try {
      const response = await userService.registerUser(data)
      showSuccessNotification('Usuario agregado exitosamente', 'El usuario ha sido registrado en el sistema correctamente.')
      user.value = response.data
      router.push('/users/listUsers')
    } 
    catch (err)
    {
      if(err.response && err.response.status== 422)
      {
        showWarningNotification('Falta Informacion', 'El nombre y el celular son obligatorios')
      }
      if(err.response && err.response.status== 409)
      {
        showWarningNotification('Advertencia', err.response._data.message)
      }
      else
      {
        showWarningNotification('Advertencia', 'Hubo un problema al registar al usuario')
      }
      error.value =  err.message
    } 
    finally
    {
      loading.value = false
    }
  }

  const editUser = async userDataForm => {
    loading.value = true
    error.value = null
    try {
      console.log(userDataForm.get('id'));
      for (let [key, value] of userDataForm.entries()) {
        console.log(`${key}:`, value);
      }
      const response = await userService.updateUser(userDataForm.get('id'), userDataForm)

      showSuccessToast('¡El usuario ha sido actualizado exitosamente!', 'Los detalles del usuario han sido editados y guardados correctamente.')
      
      return { success: true, message: 'Actualización Exitosa' }
    } catch (err) {

      if(err.response && err.response.status == 422){
        showWarningToast('Validación fallida', 'Faltan datos por rellenar')
        
        return { success: false, message: 'Validación fallida' }
      }
      showErrorToast('Advertencia', 'Hubo un problema al actualizar el usuario.')
      
      return { success: false, message: 'Error de actualización' }
    } finally {
      loading.value = false
    }
  }

  const updateProfile = async profileDataForm => {
    loading.value = true
    error.value = null
  
    try {
      const response = await userService.updateUserProfile(profileDataForm)
  
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
  
  return {
    allSellerUsers,
    allUsers,
    updateProfile,
    getById,
    addUser,
    editUser,
    user,
    users,
    totalUsers,
    loading,
    error,
  }
}

