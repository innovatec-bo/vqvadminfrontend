const userData= useCookie('userData').value
const clientId = userData.cod_phone+userData.phone

export const useChatStore = defineStore('chat', {
  state: () => ({
    contacts: [],
    chatsContacts: [],
    profileUser: undefined,
    activeChat: null,
    isAuthenticated: false,
  }),
  actions: {
    async fetchChats() {
      // Actualiza las URLs para que se ajusten a tu API
      const { data } = await useApi(createUrl(`/whatssap/chats/${clientId}`))
      
      const chatsContacts = data.value

      // Asigna los datos obtenidos a los estados
      this.chatsContacts = chatsContacts.chats
      this.profileUser = { id: clientId } // Asigna el perfil según sea necesario
      console.log('Chats:', this.chatsContacts)
    },

    async getChat(chat) {
      console.log(chat)

      const { data } = await useApi(createUrl(`/whatssap/chat/${clientId}/${chat.user}@c.us`)) // Cambia la URL según sea necesario
      const activeChat = data.value // Asegúrate de que este contenga todos los mensajes y detalles
    
      this.activeChat = activeChat || null
    },

    async sendMsg(message) {
      const senderId = this.profileUser?.id
      const contactId = this.activeChat?.contact?.id

      // Ajusta la URL y el cuerpo de la solicitud para que se ajusten a tu API
      const response = await $api(`/whatssap/send-message`, {
        method: 'POST',
        body: { message, to: contactId, clientId: senderId },
      })

      const { msg, chat } = response

      // Actualiza chats y mensajes
      if (chat !== undefined) {
        const activeChat = this.activeChat

        this.chatsContacts.push({
          ...activeChat.contact,
          chat: {
            id: chat.id,
            lastMessage: [],
            unseenMsgs: 0,
            messages: [msg],
          },
        })
        if (this.activeChat) {
          this.activeChat.chat = {
            id: chat.id,
            messages: [msg],
            unseenMsgs: 0,
            userId: contactId,
          }
        }
      } else {
        this.activeChat?.chat?.messages.push(msg)
      }

      // Establece el último mensaje para el contacto activo
      const contact = this.chatsContacts.find(c => {
        if (this.activeChat)
          return c.id === this.activeChat.contact.id

        return false
      })

      contact.chat.lastMessage = msg
    },
    async verifyAuthentication(clientId){

    },
  },
})
