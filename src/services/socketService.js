import { io } from 'socket.io-client'

// Cambia la URL por la del servidor NestJS
const SOCKET_URL = 'http://verticalhomesia.nuna.tech:3000'

let socket

export const connectSocket = () => {
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    cors: {
      origin: '*', // Habilitar CORS si es necesario
    },
  })

  socket.on('connect', () => {
    console.log('Connected to WebSocket server')
  })

  socket.on('disconnect', () => {
    console.log('Disconnected from WebSocket server')
  })

  return socket
}

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not connected yet')
  }
  
  return socket
}
