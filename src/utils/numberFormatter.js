// src/utils/numberFormatter.js

export function formatNumber(value) {
  if (typeof value !== 'number') {
    return value
  }
    
  // Convierte el valor a string con separador de miles y dos decimales
  const formattedValue = value
    .toFixed(2) 
    .replace('.', ',') // Primero cambia el punto decimal a coma
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.') // Luego añade puntos como separadores de miles
    
  return `${formattedValue}`
}
    