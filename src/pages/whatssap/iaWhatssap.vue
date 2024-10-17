<script setup>
import ChatComponent from '@/components/whatssap/chatComponent.vue'
import { useWhatssap } from '@/composables/Whatssap/useWhatssap'
import { connectSocket, getSocket } from '@/services/socketService'
import QrView from '@/views/whatssap/QrView.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'

definePage({ meta: { layoutWrapperClasses: 'layout-content-height-fixed' } })

const { isAuthenticated, errorMessage, loadingConnect, checkAuthStatus, initializeConnectToWhatsapp } = useWhatssap()

// Estado de conexión del socket
const isConnected = ref(false)

// Código QR recibido desde el servidor
const qrCode = ref(null)

// Lista de mensajes recibidos
const messages = ref([])

// Conectar al WebSocket al montar el componente
onMounted(() => {

  const socket = connectSocket()

  // Manejar la conexión
  socket.on('connect', () => {
    isConnected.value = true
    console.log('SOCKET CONECTADO')
  })

  // Manejar desconexión
  socket.on('disconnect', () => {
    isConnected.value = false
    console.log("Desconectado del WebSocket")
  })

  // Recibir código QR
  socket.on('qr', qr => {
    qrCode.value = qr
    console.log("QR Code recibido")
  })
  socket.on('ready', () => {
    isAuthenticated.value = true
    console.log('Autenticado con WhatsApp')
  })
  checkAuthStatus()
})

const requestQrCode = () => {
  console.log('solicitar QR')
  initializeConnectToWhatsapp()

}

// Desconectar el WebSocket al desmontar el componente
onBeforeUnmount(() => {
  const socket = getSocket()

  socket.disconnect()
})
</script>

<template>
  <div class="full-container">
    <h1>WhatsApp</h1>

    <!-- Mostrar el estado de conexión -->
    <VsAlert
      v-if="!isConnected"
      color="danger"
    >
      Desconectado del WebSocket
    </VsAlert>
    <VsAlert
      v-else
      color="success"
    >
      Conectado al WebSocket
    </VsAlert>

    <!-- Botón para solicitar el QR si no está autenticado -->
    <div v-if="!isAuthenticated && !qrCode">
      <VBtn
        :disabled="loadingConnect"
        :loading="loadingConnect"
        @click="requestQrCode"
      >
        Conectarme a Whatssap
      </VBtn>
    </div>

    <!-- Componentes hijos -->
    <QrView
      v-if="!isAuthenticated"

      :qr-code="qrCode"
      class="full-component"
    />
    <ChatComponent
      v-if="isAuthenticated"
      :messages="messages"
      class="full-component"
    />
  </div>
</template>

<style scoped>
.full-container {
  display: flex;
  flex-direction: column;
  block-size: 100%;
  inline-size: 100%;
}

.full-component {
  overflow: auto; /* Asegura que el contenido pueda desplazarse si es necesario */
  flex-grow: 1; /* El componente llenará el espacio restante */
  block-size: 100%;
  inline-size: 100%;
}
</style>
