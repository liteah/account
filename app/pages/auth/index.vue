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

const greetingText = computed(() => {
  switch (selectedTab.value) {
    case 'login':
      return 'Welcome back'
    case 'register':
      return 'Create your account'
    case 'reset':
      return 'Find your account'
    default:
      return ''
  }
})

const isCodeWaiting = ref(false)

const formData = reactive({
  email: '',
  password: '',
  verificationCode: '',
  confirmPassword: '',
  agree: true,
})

function handleTabChange() {
  navigateTo({ query: { type: selectedTab.value } })
}
</script>

<template>
  <auth-card>
    <h1 class="mb-5 text-left text-xl font-bold">
      {{ greetingText }}
    </h1>
    <div class="flex flex-col items-center justify-center gap-4">
      <lew-tabs
        v-model="selectedTab"
        :options="tabOptions"
        :item-width="120"
        style="width: 100%"
        @change="handleTabChange"
      />
      <lew-input
        v-model="formData.email"
        placeholder="Email"
        type="email"
      />
      <lew-input
        v-if="selectedTab === 'register' || selectedTab === 'reset'"
        v-model="formData.verificationCode"
        placeholder="Verification Code"
        max-length="6"
      />
      <lew-input
        v-model="formData.password"
        placeholder="Password"
        type="password"
        show-password
        max-length="30"
      />

      <lew-input
        v-if="selectedTab === 'reset' "
        v-model="formData.confirmPassword"
        placeholder="Confirm Password"
        type="password"
        show-password
        max-length="30"
      />
      <div v-if="selectedTab === 'register'">
        <lew-checkbox
          v-if="selectedTab === 'register'"
          v-model="formData.agree"
        />
        <span class="text-sm">
          I agree to the
          <nuxt-link to="/terms-of-service" target="_blank" class="text-blue-600 font-bold">Terms of Service</nuxt-link>
          and
          <nuxt-link to="/privacy-policy" target="_blank" class="text-blue-600 font-bold">Privacy Policy</nuxt-link>
        </span>
      </div>

      <lew-button
        :text="selectedTab === 'login' ? 'Login' : selectedTab === 'register' ? 'Register' : 'Reset Password'"
        :loading="isCodeWaiting"
      />
    </div>
  </auth-card>
</template>

<style scoped>
.lew-button {
  width: 100%;
}

.lew-tabs {
  width: 100%;
}
</style>
