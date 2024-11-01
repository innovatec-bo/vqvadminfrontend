// src/utils/currencyFormatter.js

export function formatCurrency(value) {
  if (typeof value !== 'number') {
    return ''
  }
  
  // Convierte el valor a string con separador de miles y dos decimales
  const formattedValue = value
    .toFixed(2) // Asegura dos decimales
    .replace('.', ',') // Primero cambia el punto decimal a coma
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Luego añade puntos como separadores de miles
  
  return `$${formattedValue}`
}
  