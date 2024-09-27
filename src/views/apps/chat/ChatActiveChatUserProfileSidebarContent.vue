<script setup>
import { useChatStore } from '@/views/apps/chat/useChatStore'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'
import { useChat } from './useChat'

const emit = defineEmits(['close'])

const store = useChatStore()
const { resolveAvatarBadgeVariant } = useChat()
</script>

<template>
  <template v-if="store.activeChat">
    <!-- Close Button -->
    <div
      class="pt-2 me-2"
      :class="$vuetify.locale.isRtl ? 'text-left' : 'text-right'"
    >
      <IconBtn @click="$emit('close')">
        <VIcon
          icon="tabler-x"
          color="disabled"
          class="text-medium-emphasis"
        />
      </IconBtn>
    </div>

    <!-- User Avatar + Name + Role -->
    <div class="text-center px-6">
      <VBadge
        location="bottom right"
        offset-x="7"
        offset-y="4"
        bordered
        :color="success"
        class="chat-user-profile-badge mb-5"
      >
        <VAvatar
          size="80"
          :variant="tonal"
          :color="success"
        >
          <span class="text-3xl">{{ avatarText(store.activeChat.name) }}</span>
        </VAvatar>
      </VBadge>
      <h5 class="text-h5">
        {{ store.activeChat.name }}
      </h5>
      <p class="text-capitalize text-medium-emphasis">
        Cliente
      </p>
    </div>

    <!-- User Data -->
    <PerfectScrollbar
      class="ps-chat-user-profile-sidebar-content text-medium-emphasis pb-5 px-5"
      :options="{ wheelPropagation: false }"
    >
      <!-- About -->
      <div class="my-8">
        <span class="text-sm text-disabled">ABOUT</span>
        <p class="mt-2">
          about: 
        </p>
      </div>

      <!-- Personal Information -->
      <div class="mb-8">
        <span class="d-block text-sm text-disabled mb-3">PERSONAL INFORMATION</span>
        <div class="d-flex align-center">
          <VIcon
            class="me-2"
            icon="tabler-mail"
            size="24"
          />
          <span>lucifer@email.com</span>
        </div>
        <div class="d-flex align-center my-3">
          <VIcon
            class="me-2"
            icon="tabler-phone-call"
            size="24"
          />
          <span>+1(123) 456 - 7890</span>
        </div>
        <div class="d-flex align-center">
          <VIcon
            class="me-2"
            icon="tabler-clock"
            size="24"
          />
          <span>Mon - Fri 10AM - 8PM</span>
        </div>
      </div>

      <!-- Options -->
      <div>
        <span class="d-block text-sm text-disabled mb-3">OPTIONS</span>
        <div class="d-flex align-center">
          <VIcon
            class="me-2"
            icon="tabler-badge"
            size="24"
          />
          <span>Add Tag</span>
        </div>
        <div class="d-flex align-center my-3">
          <VIcon
            class="me-2"
            icon="tabler-star"
            size="24"
          />
          <span>Important Contact</span>
        </div>
        <div class="d-flex align-center mb-3">
          <VIcon
            class="me-2"
            icon="tabler-photo"
            size="24"
          />
          <span>Shared Media</span>
        </div>
        <div class="d-flex align-center mb-3">
          <VIcon
            class="me-2"
            icon="tabler-trash"
            size="24"
          />
          <span>Delete Contact</span>
        </div>
        <div class="d-flex align-center">
          <VIcon
            class="me-2 ms-1"
            size="18"
            icon="tabler-ban"
          />
          <span>Block Contact</span>
        </div>
      </div>
    </PerfectScrollbar>
  </template>
</template>
