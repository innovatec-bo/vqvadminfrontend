import Swal from 'sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

export const showSuccessNotification = (title, message) => {
  Swal.fire({
    icon: 'success',
    title: title,
    text: message,
    showConfirmButton: false,
    timer: 3000,
  })
}
  
export const showErrorNotification = (title, message) => {
  Swal.fire({
    icon: 'error',
    title: title,
    text: message,
    showConfirmButton: true,
  })
}
  
export const showInfoNotification = (title, message) => {
  Swal.fire({
    icon: 'info',
    title: title,
    text: message,
    showConfirmButton: true,
  })
}
  
export const showWarningNotification = (title, message) => {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: message,
    showConfirmButton: true,
  })
}
  
export const showQuestionNotification = (title, message) => {
  Swal.fire({
    icon: 'question',
    title: title,
    text: message,
    showConfirmButton: true,
  })
}
