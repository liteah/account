<!-- eslint-disable ts/ban-ts-comment -->
<script lang="ts" setup>
import { LewMessage, LewNotification } from 'lew-ui'
import geetestConfig from '@/config/geetest'

definePageMeta({
  layout: 'auth',
})

const supabase = useSupabaseClient()
const route = useRoute()
const captchaObj = ref(null)
const typeQuery = route.query.type
const selectedTab = ref(typeQuery || 'login')

const isLoading = ref(false)
const isEmailError = ref(false)
const isPasswordError = ref(false)
const emailError = ref('')
const passwordError = ref('')
const formData = ref({
  email: '',
  password: '',
})

const tabOptions = [
  {
    label: 'Login',
    value: 'login',
  },
  {
    label: 'Register',
    value: 'register',
  },
]

function validateEmail() {
  const emailValidationRules = [
    {
      condition: !formData.value.email,
      message: 'Email is required',
    },
    {
      condition: !/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(formData.value.email),
      message: 'Invalid email format',
    },
  ]

  const failedRule = emailValidationRules.find(rule => rule.condition)
  if (failedRule) {
    emailError.value = failedRule.message
    isEmailError.value = true
  }
  else {
    isEmailError.value = false
  }
}

function validatePassword() {
  const passwordValidationRules = [
    {
      condition: !formData.value.password,
      message: 'Password is required',
    },
    {
      condition: formData.value.password.length < 6,
      message: 'Password must be at least 6 characters',
    },
  ]

  const failedRule = passwordValidationRules.find(rule => rule.condition)
  if (failedRule) {
    passwordError.value = failedRule.message
    isPasswordError.value = true
  }
  else {
    isPasswordError.value = false
  }
}

function validateForm() {
  validateEmail()
  validatePassword()
  return !isEmailError.value && !isPasswordError.value
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  if ((selectedTab.value === 'register' || selectedTab.value === 'reset') && import.meta.client) {
    // @ts-expect-error
    if (captchaObj.value && captchaObj.value.getValidate()) {
      await handleAuth()
    }
    else {
      // @ts-expect-error
      captchaObj.value.showCaptcha()
    }
  }
  else {
    await handleAuth()
  }
}

async function handleAuth() {
  isLoading.value = true

  try {
    if (selectedTab.value === 'login') {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.value.email,
        password: formData.value.password,
      })
      if (error)
        throw error
      navigateTo('/dashboard')
    }
    else if (selectedTab.value === 'register') {
      const { error } = await supabase.auth.signUp({
        email: formData.value.email,
        password: formData.value.password,
      })
      if (error)
        throw error
      LewNotification.success({
        title: 'Registration successful',
        content: 'Please check your email for the verification link.',
      })
    }
    else if (selectedTab.value === 'reset') {
      const { error } = await supabase.auth.resetPasswordForEmail(formData.value.email)
      if (error)
        throw error
      LewNotification.success({
        title: 'Password reset email sent',
        content: 'Please check your email for the password reset link.',
      })
    }
  }
  catch (error) {
    LewNotification.error({
      title: 'Unable to complete the operation',
      content: `An unexpected error occurred. Please try again later or contact the support team. Error message: ${error}`,
    })
  }
  finally {
    isLoading.value = false
  }
}

async function handleGithub() {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    })
    if (error)
      throw error
  }
  catch (error) {
    LewNotification.error({
      title: 'Unable to complete the operation',
      content: `An unexpected error occurred. Please try again later or contact the support team. Error message: ${error}`,
    })
  }
}

function handleTabChange() {
  navigateTo({ query: { type: selectedTab.value } })
}

onMounted(() => {
  if (import.meta.client) {
    // @ts-expect-error
    initGeetest4(geetestConfig, (obj: any) => {
      captchaObj.value = obj
      obj.onSuccess(() => {
        handleSubmit()
      }).onError(() => {
        LewNotification.error({
          title: 'Captcha Authentication Error',
          content: 'Please try again',
        })
      })
    })
  }
})
</script>

<template>
  <auth-card>
    <div class="mb-5 flex flex-col space-y-4">
      <icon-graphic-logo class="h-10 w-10" />
      <h1 class="text-left text-xl font-bold">
        {{ selectedTab === 'login' ? 'Login to Conova' : selectedTab === 'register' ? 'Create Conova Account' : selectedTab === 'reset' ? 'Forgot Password?' : '' }}
      </h1>
    </div>
    <div class="flex flex-col gap-4">
      <lew-tabs
        v-model="selectedTab"
        :options="tabOptions"
        item-width="49%"
        @change="handleTabChange"
      />
      <div class="flex flex-col gap-1">
        <lew-input
          v-model="formData.email"
          placeholder="Email"
          type="email"
          @input="validateEmail"
          @blur="validateEmail"
        />
        <span v-if="isEmailError" class="text-xs text-red-500 dark:text-red-400">
          {{ emailError }}
        </span>
      </div>
      <div class="flex flex-col gap-1">
        <lew-input
          v-model="formData.password"
          placeholder="Password"
          type="password"
          show-password
          max-length="30"
          @input="validatePassword"
          @blur="validatePassword"
        />
        <span v-if="isPasswordError" class="text-xs text-red-500 dark:text-red-400">
          {{ passwordError }}
        </span>
      </div>
      <lew-button
        class="full"
        :text="selectedTab === 'login' ? 'Login' : selectedTab === 'register' ? 'Register' : 'Reset Password'"
        :loading="isLoading"
        @click="handleSubmit"
      />
      <div v-if="selectedTab === 'login' || selectedTab === 'register'">
        <div class="flex items-center">
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600" />
          <span class="mx-2 text-xs text-gray-500 dark:text-gray-400">or continue with</span>
          <div class="flex-1 border-t border-gray-300 dark:border-gray-600" />
        </div>
        <div class="mt-2 w-full flex items-center gap-2">
          <lew-button
            type="light"
            text="Google"
            class="flex-1"
          >
            <div i-ri-google-line />
            Google
          </lew-button>
          <lew-button
            type="light"
            class="flex-1"
            @click="handleGithub"
          >
            <div i-ri-github-line />
            GitHub
          </lew-button>
        </div>
      </div>
      <span class="ml-1 break-words text-left text-xs text-gray-500 dark:text-gray-400">
        By continuing, you agree to the
        <nuxt-link to="/terms-of-service" target="_blank" class="link">Terms of Service</nuxt-link>
        <br> and
        <nuxt-link to="/privacy-policy" target="_blank" class="link">Privacy Policy</nuxt-link>
        and to receive periodic emails, <br> you can opt-out anytime.
      </span>
    </div>
  </auth-card>
</template>

<style scoped>
.full {
  width: 100%;
}
</style>
