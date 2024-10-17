import { URL_MICROSERVICIO } from '@/utils/constants'
import { io } from 'socket.io-client'

// Cambia la URL por la del servidor NestJS
const SOCKET_URL = URL_MICROSERVICIO.startsWith('https')
  ? URL_MICROSERVICIO.replace('https', 'wss')
  : URL_MICROSERVICIO.replace('http', 'ws')

let socket

export const connectSocket = () => {
  socket = io(SOCKET_URL, {
    transports: ['websocket'],
    secure: SOCKET_URL.startsWith('wss'),
    reconnection: true,
    cors: {
      origin: '*',
      credentials: true,
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
