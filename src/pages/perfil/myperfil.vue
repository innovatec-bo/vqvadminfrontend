<script setup>
import UserPanel from '@/components/user/UserPanel.vue'

const userTab = ref(null)

const tabs = [
  {
    icon: 'tabler-user-check',
    title: 'Cuenta',
  },
  {
    icon: 'tabler-lock',
    title: 'Seguridad',
  },
]

const userData = useCookie('userData').value
</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserPanel :user-data="userData" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="userTab"
        class="v-tabs-pill"
      >
        <VTab
          v-for="tab in tabs"
          :key="tab.icon"
        >
          <VIcon
            :size="18"
            :icon="tab.icon"
            class="me-1"
          />
          <span>{{ tab.title }}</span>
        </VTab>
      </VTabs>
      <!-- 
        <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
        >
        <VWindowItem>
        <UserTabAccount />
        </VWindowItem>

        <VWindowItem>
        <UserTabSecurity />
        </VWindowItem>
        </VWindow> 
      -->
    </VCol>
  </VRow>
  <VCard v-else>
    <VCardTitle class="text-center">
      No User Found
    </VCardTitle>
  </VCard>
</template>
