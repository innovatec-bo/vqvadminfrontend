<script setup>
import ChangePassword from '@/components/perfil/changePassword.vue'
import UserPanel from '@/components/user/UserPanel.vue'
import { useUser } from '@/composables/User/useUser'

const userTab = ref(null)
const { getById, user } = useUser()
const tabs = [
  // {
  //   icon: 'tabler-user-check',
  //   title: 'Cuenta',
  // },
  {
    icon: 'tabler-lock',
    title: 'Seguridad',
  },
]

const fetchUser = async () => {
  const userId = useCookie('userData').value.id
  await getById(userId)  
}

const handleProfileUpdated = async () => {
  await fetchUser()
}

await fetchUser()
const userData = computed(() => user.value)
// const userData = user.value
// console.log(userData)
// const userId = useCookie('userData').value.id
// await getById(userId)

</script>

<template>
  <VRow v-if="userData">
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <UserPanel :user-data="userData" @profile-updated="handleProfileUpdated"/>
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
      
      <VWindow
        v-model="userTab"
        class="mt-6 disable-tab-transition"
        :touch="false"
      >
        <!-- <VWindowItem>
          <UserTabAccount />
        </VWindowItem> -->

        <VWindowItem>
          <ChangePassword />
        </VWindowItem>
      </VWindow>
    </VCol>
  </VRow>
  <VCard v-else>
    <VCardTitle class="text-center">
      No User Found
    </VCardTitle>
  </VCard>
</template>
