<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const route = useRoute()
const typeQuery = route.query.type
const selectedTab = ref(typeQuery || 'login')

const tabOptions = [
  {
    label: 'Login',
    value: 'login',
  },
  {
    label: 'Register',
    value: 'register',
  },
  {
    label: 'Reset Password',
    value: 'reset',
  },
]

const isCodeWaiting = ref(false)

const formData = reactive({
  email: '',
  password: '',
  verificationCode: '',
  confirmPassword: '',
  agree: true,
  remember: false,
})

function handleTabChange() {
  navigateTo({ query: { type: selectedTab.value } })
}
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
        @change="handleTabChange"
      />
      <lew-input
        v-model="formData.email"
        placeholder="Email"
        type="email"
        prefixes="icon"
        prefixes-value="mail"
      />
      <lew-input
        v-model="formData.password"
        placeholder="Password"
        type="password"
        show-password
        max-length="30"
        prefixes="icon"
        prefixes-value="key"
      />
      <lew-checkbox
        v-if="selectedTab === 'login'"
        v-model="formData.remember"
        label="Remember me"
      />
      <lew-button
        class="full"
        :text="selectedTab === 'login' ? 'Login' : selectedTab === 'register' ? 'Register' : 'Reset Password'"
        :loading="isCodeWaiting"
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
          />
          <lew-button
            type="light"
            text="Github"
            class="flex-1"
          />
        </div>
      </div>
      <span v-if="selectedTab === 'register'" class="ml-1 break-words text-left text-xs text-gray-500 dark:text-gray-400">
        By creating an account,
        you agree to the
        <nuxt-link to="/terms-of-service" target="_blank" class="link">Terms <br> of Service</nuxt-link>
        and
        <nuxt-link to="/privacy-policy" target="_blank" class="link">Privacy Policy</nuxt-link>
        . and to receive <br> periodic emails, you can opt-out anytime.
      </span>
    </div>
  </auth-card>
</template>

<style scoped>
.full {
  width: 100%;
}
</style>
