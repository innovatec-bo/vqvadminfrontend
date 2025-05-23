<script setup>
import { useChat } from '@/views/apps/chat/useChat'
import { useChatStore } from '@/views/apps/chat/useChatStore'

const props = defineProps({
  isChatContact: {
    type: Boolean,
    required: false,
    default: false,
  },
  user: {
    type: null,
    required: true,
  },
})

const store = useChatStore()
const { resolveAvatarBadgeVariant } = useChat()

const chat = computed(() => props.user !== null ? props.user : null)

const isChatContactActive = computed(() => {
  const isActive = store.activeChat?.user === props.user.id
  if (!props.isChatContact)
    return !store.activeChat?.chat && isActive
  
  return isActive
})
</script>

<template>
  <li
    :key="store.chatsContacts.length"
    class="chat-contact cursor-pointer d-flex align-center"
    :class="{ 'chat-contact-active': isChatContactActive }"
  >
    <VBadge
      dot
      location="bottom right"
      offset-x="3"
      offset-y="0"
      :color="resolveAvatarBadgeVariant(props.user.status)"
      bordered
      :model-value="props.isChatContact"
    >
      <VAvatar
        size="38"
        :variant="!props.user.avatar ? 'tonal' : undefined"
        :color="!props.user.avatar ? resolveAvatarBadgeVariant(props.user.status) : undefined"
      >
        <VImg
          v-if="props.user.avatar"
          :src="props.user.avatar"
          alt="John Doe"
        />
        <span v-else>{{ avatarText(user.fullName) }}</span>
      </VAvatar>
    </VBadge>
    <div class="flex-grow-1 ms-4 overflow-hidden">
      <p class="text-h6 mb-0">
        {{ chat.name }}
      </p>
      <p class="mb-0 text-truncate text-disabled">
        {{ chat.lastMessage.body }}
      </p>
    </div>
    <div
      v-if="props.isChatContact && 'chat' in props.user"
      class="d-flex flex-column align-self-start"
    >
      <span class="d-block text-sm text-disabled whitespace-no-wrap">{{ formatDateToMonthShort(props.user.chat.lastMessage.time) }}</span>
      <VBadge
        v-if="props.user.chat.unseenMsgs"
        color="error"
        inline
        :content="props.user.chat.unseenMsgs"
        class="ms-auto"
      />
    </div>
  </li>
</template>

<style lang="scss">
@use "@styles/variables/_vuetify.scss";
@use "@core/scss/base/mixins";
@use "vuetify/lib/styles/tools/states" as vuetifyStates;

.chat-contact {
  border-radius: vuetify.$border-radius-root;
  padding-block: 8px;
  padding-inline: 12px;

  @include mixins.before-pseudo;
  @include vuetifyStates.states($active: false);

  &.chat-contact-active {
    background: linear-gradient(72.47deg, rgb(var(--v-theme-primary)) 0%, #fff 300%);
    color: #fff;

    --v-theme-on-background: #fff;

    .v-avatar {
      border: 2px solid #fff;
      background: #fff;
    }
  }

  .v-badge--bordered .v-badge__badge::after {
    color: #fff;
  }
}
</style>
