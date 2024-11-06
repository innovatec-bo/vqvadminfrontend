<!-- ❗Errors in the form are set on line 60 -->
<script setup>
import postPora from '@/assets/canzza/postPora.png'
import { useAuth } from '@/composables/Auth/useAuth'
import { useGenerateImageVariant } from '@core/composable/useGenerateImageVariant'
import authV2LoginIllustrationBorderedDark from '@images/pages/auth-v2-login-illustration-bordered-dark.png'
import authV2LoginIllustrationBorderedLight from '@images/pages/auth-v2-login-illustration-bordered-light.png'
import authV2LoginIllustrationDark from '@images/pages/auth-v2-login-illustration-dark.png'
import authV2LoginIllustrationLight from '@images/pages/auth-v2-login-illustration-light.png'
import authV2MaskDark from '@images/pages/misc-mask-dark.png'
import authV2MaskLight from '@images/pages/misc-mask-light.png'
import { VNodeRenderer } from '@layouts/components/VNodeRenderer'
import { themeConfig } from '@themeConfig'
import { VForm } from 'vuetify/components/VForm'

const isSubmitting = ref(false)

const authThemeImg = useGenerateImageVariant(authV2LoginIllustrationLight, authV2LoginIllustrationDark, authV2LoginIllustrationBorderedLight, authV2LoginIllustrationBorderedDark, true)
const authThemeMask = useGenerateImageVariant(authV2MaskLight, authV2MaskDark)

definePage({
  meta: {
    layout: 'blank',
    unauthenticatedOnly: true,
  },
})

const passwordLengthValidator = value => value.length >= 8 || 'La contraseña debe tener al menos 8 caracteres'
const { loginUser, loading } = useAuth()
const isPasswordVisible = ref(false)
const refVForm = ref()
const errors = ref({ email: undefined, password: undefined })

const credentials = ref({
  email: 'admin@canzza.com',
  password: 'admin',
})

const rememberMe = ref(false)

const handleLogin = async () => {
  isSubmitting.value= true
  await loginUser(credentials.value)
  isSubmitting.value = false
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) handleLogin()
  })
}
</script>

<template>
  <VRow
    no-gutters
    class="auth-wrapper bg-surface"
  >
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div
        class="position-relative bg-background rounded-lg w-100 ma-8 me-0"
        :style="{
          backgroundImage: `url(${postPora})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          height: '100%',
          width: '100%',
        }"
      >
        <div
          class="d-flex align-center justify-center"
          style="position: absolute; z-index: 1; inset-block: 0 0; inset-inline: 0 0;"
        >
        <!-- Aquí puedes colocar el contenido superpuesto si es necesario -->
        </div>

        <VImg
          :src="authThemeMask"
          class="auth-footer-mask"
        />
      </div>
    </VCol>

    <VCol
      cols="12"
      lg="4"
      class="auth-card-v2 d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <VNodeRenderer
            :nodes="themeConfig.app.logo"
            class="mb-6"
          />

          <h4 class="text-h4 mb-1">
            Bienvenido a  <br> <span class="text-capitalize"> {{ themeConfig.app.title }} </span>
          </h4>
        </VCardText>
        
        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent="onSubmit"
          >
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <AppTextField
                  v-model="credentials.email"
                  label="Email"
                  placeholder="johndoe@email.com"
                  type="email"
                  autofocus
                  :rules="[requiredValidator, emailValidator]"
                  :error-messages="errors.email"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <AppTextField
                  v-model="credentials.password"
                  label="Password"
                  placeholder="············"
                  :rules="[requiredValidator,passwordLengthValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />

                <div class="d-flex align-center flex-wrap justify-space-between mt-1 mb-4">
                  <!--
                    <VCheckbox
                    v-model="rememberMe"
                    label="Recordar"
                    /> 
                  -->
                </div>
                <br>
                <VBtn
                  block
                  type="submit"
                  :disabled="loading"
                  :loading="loading"
                >
                  Login
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";


.responsive-img {
  block-size: auto; /* Mantener la proporción de la imagen */
  max-inline-size: 100%;
}
</style>
