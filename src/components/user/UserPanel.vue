<script setup>
import { useAbility } from '@casl/vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  userData: {
    type: Object,
    required: true,
  },
})

const isUserInfoEditDialogVisible = ref(false)
const isUpgradePlanDialogVisible = ref(false)

const resolveUserStatusVariant = stat => {
  if (stat === 'ACTIVE')
    return 'success'
  if (stat === 'INACTIVE')
    return 'warning' 
  
  return 'success'
}

const router = useRouter()
const ability = useAbility()
const emit = defineEmits(['profile-updated'])

function handleUpdate() {
  emit('profile-updated')
}
// TODO: Get type from backend
const data = useCookie('userData')

const logout = async () => {

  // Remove "accessToken" from cookie
  useCookie('accessToken').value = null

  // Remove "userData" from cookie
  data.value = null

  // Redirect to login page
  await router.push('/login')

  // ℹ️ We had to remove abilities in then block because if we don't nav menu items mutation is visible while redirecting user to login page

  // Remove "userAbilities" from cookie
  useCookie('userAbilityRules').value = null

  // Reset ability to initial ability
  ability.update([])
}
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard v-if="props.userData">
        <VCardText class="text-center pt-15">
          <!-- 👉 Avatar -->
          <VAvatar
            rounded
            :size="100"
            :color="!props.userData.avatar ? 'primary' : undefined"
            :variant="!props.userData.avatar ? 'tonal' : undefined"
          >
            <VImg
              v-if="props.userData.avatar"
              :src="props.userData.avatar"
            />
            <span
              v-else
              class="text-5xl font-weight-medium"
            >
              {{ avatarText(props.userData.name) }}
            </span>
          </VAvatar>

          <!-- 👉 User fullName -->
          <h6 class="text-h4 mt-4">
            {{ props.userData.name }}
          </h6>

          <!-- 👉 Role chip -->
          <div
            v-for="(item, index) in props.userData.roles "
            :key="index"
          >
            <VChip
              label
              size="small"
              class="text-capitalize mt-3"
            >
              {{ item }}
            </VChip>
          </div>
        </VCardText>

        <VDivider />

        <!-- 👉 Details -->
        <VCardText>
          <p class="text-sm text-uppercase text-disabled">
            Detalles
          </p>

          <!-- 👉 User Details list -->
          <VList class="card-list mt-2">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Nombre:
                  <span class="text-body-1">
                    {{ props.userData.name }}
                    {{ props.userData.last_name }} 
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Email:
                  <span class="text-body-1">{{ props.userData.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Tel&eacute;fono:
                  <span class="text-body-1">
                    {{props.userData.cod_phone}} {{props.userData.phone}}
                  </span>                  
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-h6">
                  Rol:
                  <span
                    v-for="(item, index) in props.userData.roles "
                    :key="index"
                  >
                    <span class="text-capitalize text-body-1">{{ item }}</span>
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>

        <!-- 👉 Edit and Suspend button -->
        <VCardText class="d-flex justify-center">
          <VBtn
            variant="elevated"
            class="me-4"
            @click="isUserInfoEditDialogVisible = true"
          >
            Editar
          </VBtn>

          <VBtn
            variant="elevated"
            class="me-4"
            color="error"
            @click="logout"
          >
            Cerrar sesi&oacute;n
          </VBtn>
        </VCardText>
      </VCard>
    </VCol>
    <!-- !SECTION -->
  </VRow>

  <!-- 👉 Edit user info dialog -->
  <UserInfoEditDialog
    v-model:is-dialog-visible="isUserInfoEditDialogVisible"
    @profile-updated="handleUpdate"
    :user-data="props.userData"
  />

  <!-- 👉 Upgrade plan dialog -->
  <UserUpgradePlanDialog v-model:is-dialog-visible="isUpgradePlanDialogVisible" />
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 0.75rem;
}

.text-capitalize {
  text-transform: capitalize !important;
}
</style>
