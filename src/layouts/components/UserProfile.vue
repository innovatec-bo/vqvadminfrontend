<script setup>
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

const router = useRouter()
const ability = useAbility()

// TODO: Get type from backend
const userData = useCookie('userData')

const logout = async () => {

  // Remove "accessToken" from cookie
  useCookie('accessToken').value = null

  // Remove "userData" from cookie
  userData.value = null

  // Redirect to login page
  await router.push('/login')

  // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

  // Remove "userAbilities" from cookie
  useCookie('userAbilityRules').value = null

  // Reset ability to initial ability
  ability.update([])
}

const userProfileList = [
  { type: 'divider' },
  {
    type: 'navItem',
    icon: 'tabler-user',
    title: 'Perfil',
    to: {
      name: 'activity-list',
    },
  },

  // {
  //   type: 'navItem',
  //   icon: 'tabler-settings',
  //   title: 'Settings',
  //   to: {
  //     name: 'pages-account-settings-tab',
  //     params: { tab: 'account' },
  //   },
  // },
  // {
  //   type: 'navItem',
  //   icon: 'tabler-credit-card',
  //   title: 'Billing',
  //   to: {
  //     name: 'pages-account-settings-tab',
  //     params: { tab: 'billing-plans' },
  //   },
  //   badgeProps: {
  //     color: 'error',
  //     content: '3',
  //   },
  // },
  // { type: 'divider' },
  // {
  //   type: 'navItem',
  //   icon: 'tabler-currency-dollar',
  //   title: 'Pricing',
  //   to: { name: 'pages-pricing' },
  // },
  // {
  //   type: 'navItem',
  //   icon: 'tabler-help-circle',
  //   title: 'FAQ',
  //   to: { name: 'pages-faq' },
  // },
  { type: 'divider' },
  {
    type: 'navItem',
    icon: 'tabler-logout',
    title: 'Cerrar Sesion',
    onClick: logout,
  },
]
</script>

<template>
  <VBadge
    v-if="userData"
    dot
    bordered
    location="bottom right"
    offset-x="3"
    offset-y="3"
    color="success"
  >
    <VAvatar
      class="cursor-pointer"
      :color="!(userData && userData.avatar) ? 'primary' : undefined"
      :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
    >
      <VImg
        v-if="userData && userData.avatar"
        :src="userData.avatar"
      />
      <VIcon
        v-else
        icon="tabler-user"
      />

      <!-- SECTION Menu -->
      <VMenu
        activator="parent"
        width="230"
        location="bottom end"
        offset="14px"
      >
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge
                  dot
                  location="bottom right"
                  offset-x="3"
                  offset-y="3"
                  color="success"
                  bordered
                >
                  <VAvatar
                    :color="!(userData && userData.avatar) ? 'primary' : undefined"
                    :variant="!(userData && userData.avatar) ? 'tonal' : undefined"
                  >
                    <VImg
                      v-if="userData && userData.avatar"
                      :src="userData.avatar"
                    />
                    <VIcon
                      v-else
                      icon="tabler-user"
                    />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-medium">
              {{ userData.name }} 
            </VListItemTitle>
            <VListItemSubtitle>{{ userData.roles[0] }}</VListItemSubtitle>
          </VListItem>

          <PerfectScrollbar :options="{ wheelPropagation: false }">
            <template
              v-for="item in userProfileList"
              :key="item.title"
            >
              <VListItem
                v-if="item.type === 'navItem'"
                :to="item.to"
                @click="item.onClick && item.onClick()"
              >
                <template #prepend>
                  <VIcon
                    class="me-2"
                    :icon="item.icon"
                    size="22"
                  />
                </template>

                <VListItemTitle>{{ item.title }}</VListItemTitle>

                <template
                  v-if="item.badgeProps"
                  #append
                >
                  <VBadge v-bind="item.badgeProps" />
                </template>
              </VListItem>

              <VDivider
                v-else
                class="my-2"
              />
            </template>
          </PerfectScrollbar>
        </VList>
      </VMenu>
      <!-- !SECTION -->
    </VAvatar>
  </VBadge>
</template>
