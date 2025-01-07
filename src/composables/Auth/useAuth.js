import { changePassword, forgotPassword, login, verifyToken } from "@/services/Auth/authServices"
import { showWarningNotification } from "@/utils/notifications"
import { useAbility } from "@casl/vue"
import { useRouter } from "vue-router"

export function useAuth() {
  const user = ref(null)
  const isAuthenticated = ref(false)
  const loading = ref(false)
  const error = ref(null)
  const router = useRouter()
  const accessToken = useCookie('accessToken')
  let ability = useAbility()
  
  const loginUser = async credentials => {
    loading.value=true
    try {
      const response = await login(credentials)

      console.log('Login successful:', response)

      if(response.status == 403 ){
        showWarningNotification('', response._data.message)
        
        return
      }
      if(response.status == 401 ){
        showWarningNotification('', response._data.message)

        return 
      }

      const userOutData = Object.fromEntries(Object.entries(response.data))
      let userAbilityRules = [
        {
          action: "manage",
          subject: "all",
        },
      ]
      const rolesFromBackend = response.data.roles

      rolesFromBackend.forEach(role => {
        userAbilityRules.push({
          action: "manage",
          subject: role,  
        })
      })
      useCookie('userAbilityRules').value = userAbilityRules
      ability.update(userAbilityRules)
      useCookie('userData').value = userOutData
      useCookie('accessToken').value = response.meta.accessToken

      const userRoles = userOutData.roles || []
      if (userRoles.includes('ADMINISTRADOR')) {
        router.push('/dashboards/crm')
        
        return
      }
      router.push('/activity/list')
    } catch (err) {
      console.log(err)
      if (err.response && err.response._data) {    
        console.log(err.response._data.message)
        showWarningNotification('Advertencia', err.response._data.message)
      } else {
        showWarningNotification('Advertencia', 'An error occurred while logging in')
      }
    } finally{
      loading.value = false
    }
  }
  
  const logoutUser = async () => {
    loading.value = true
    error.value = null
    try {
      await logout()
      user.value = null
      isAuthenticated.value = false
      accessToken.value = null
      router.push('/login')
    } catch (err) {
      error.value = 'Logout failed: ' + err.message
    } finally {
      loading.value = false
    }
  }
  
  const changeUserPassword = async email => {
    loading.value = true
    error.value = null
    try {
      await changePassword(email)
    } catch (err) {
      error.value = 'Password reset failed: ' + err.message
    } finally {
      loading.value = false
    }
  }
  
  const checkAuthenticationStatus = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await checkAuthStatus()

      user.value = response.data.user
      isAuthenticated.value = true
    } catch (err) {
      error.value = 'Auth status check failed: ' + err.message
      isAuthenticated.value = false
    } finally {
      loading.value = false
    }
  }

  const forgotUserPassword = async email => {
    loading.value = true
    error.value = null
    try {
      const data = {
        email: email,
      }

      await forgotPassword(data)
      router.push({ name: 'auth-two-steps', params: { mail: email } })
    } catch (err) {
      error.value = 'Password reset failed: ' + err.message
    } finally {
      loading.value = false
    }
  }

  const verifyCodResetPassword = async (token, email) => {
    loading.value = true
    error.value = null
    try {
      const response = await verifyToken(token, email)

      const user = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        token: token,
      }
  
      // Convertir el objeto a JSON
      const userJson = JSON.stringify(user)
  
      // Codificar el JSON para que sea seguro para la URL
      const userParam = encodeURIComponent(userJson)
  
      // Redirigir con el parámetro codificado en la URL
      router.push({ name: 'auth-reset-password', params: { user: userParam } })
    } catch (err) {
      error.value = 'Password reset failed: ' + err.message
      console.log(err)
    } finally {
      loading.value = false
    }
  }

  const resetUserPassword = async userData => {
    console.log(userData)
    loading.value = true
    error.value = null
    try {
      const response = await changePassword(userData)

      console.log(response)
      showSuccessNotification('contraseña actualizada exitosamente', '')

    } catch (err) {
      if (err.response && err.response._data) {
        showWarningNotification('ERROR', err.response._data.message)
      } else {
        error.value = err.message
        alert(err.message)
      }
    } finally {
      loading.value = false
    }
  }
  
  return {
    user,
    isAuthenticated,
    loading,
    error,
    loginUser,
    logoutUser,
    resetUserPassword,
    changeUserPassword,
    forgotUserPassword,
    verifyCodResetPassword,
    checkAuthenticationStatus,
  }
}
