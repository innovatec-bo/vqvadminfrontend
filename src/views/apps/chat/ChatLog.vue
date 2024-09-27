<script setup>
import { useWhatssap } from '@/composables/Whatssap/useWhatssap'
import { useChatStore } from '@/views/apps/chat/useChatStore'
import { computed, onMounted } from 'vue'

const store = useChatStore()
const { getAllMessagesForChat, messages } = useWhatssap()

// Contacto activo en el chat
const contact = computed(() => store.activeChat?.contact ? {
  id: store.activeChat.id.user,
  avatar: store.activeChat.contact.avatar,
} : { id: null, avatar: null })

// Función para resolver los iconos de feedback de mensajes
const resolveFeedbackIcon = feedback => {
  if (feedback.isSeen) {
    return {
      icon: 'tabler-checks',
      color: 'success',
    }
  } else if (feedback.isDelivered) {
    return {
      icon: 'tabler-checks',
      color: undefined,
    }
  } else {
    return {
      icon: 'tabler-check',
      color: undefined,
    }
  }
}

// Consulta los mensajes cuando el componente se monta
onMounted(async () => {
  console.log(store.activeChat.chat.id.user)
  await getAllMessagesForChat('DiegoA',  `${store.activeChat.chat.id.user}@c.us`)
})

// Función para formatear la fecha
const formatDate = date => {
  const options = { hour: 'numeric', minute: 'numeric' }
  
  return new Date(date).toLocaleTimeString([], options)
}
</script>

<template>
  <div class="chat-log pa-5">
    <!-- Renderizado de los grupos de mensajes -->
    <div
      v-for="(msgGrp, index) in messages"
      :key="msgGrp.senderId + String(index)"
      class="chat-group d-flex align-start"
      :class="[{
        'flex-row-reverse': msgGrp.senderId !== `${contact.id}@c.us`,
        'mb-4': messages.length - 1 !== index,
      }]"
    >
      <!-- Avatar del remitente -->
      <div
        class="chat-avatar"
        :class="msgGrp.senderId !== `${contact.id}@c.us` ? 'ms-4' : 'me-4'"
      >
        <VAvatar size="32">
          <VImg :src="msgGrp.senderId === `${contact.id}@c.us` ? contact.avatar : store.profileUser?.avatar" />
        </VAvatar>
      </div>

      <!-- Cuerpo del mensaje -->
      <div
        class="chat-body d-inline-flex flex-column"
        :class="msgGrp.senderId !== `${contact.id}@c.us` ? 'align-end' : 'align-start'"
      >
        <!-- Mensajes individuales -->
        <p
          v-for="(msgData, msgIndex) in msgGrp.messages"
          :key="msgData.time"
          class="chat-content py-2 px-4 elevation-1"
          :class="[msgGrp.senderId === `${contact.id}@c.us` ? 'chat-left' : 'bg-primary text-white chat-right', msgGrp.messages.length - 1 !== msgIndex ? 'mb-3' : 'mb-1']"
          style="background-color: rgb(var(--v-theme-surface));"
        >
          {{ msgData.body }}
        </p>
        
        <!-- Feedback y hora del último mensaje en el grupo -->
        <div :class="{ 'text-right': msgGrp.senderId !== `${contact.id}@c.us` }">
          <VIcon
            v-if="msgGrp.senderId !== `${contact.id}@c.us`"
            size="18"
            :color="success"
          >
            success
          </VIcon>
          <span class="text-sm ms-1 text-disabled">
            {{ formatDate(msgGrp.messages[msgGrp.messages.length - 1].time) }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.chat-log {
  .chat-content {
    border-end-end-radius: 6px;
    border-end-start-radius: 6px;

    &.chat-left {
      border-start-end-radius: 6px;
    }

    &.chat-right {
      border-start-start-radius: 6px;
    }
  }
}
</style>
