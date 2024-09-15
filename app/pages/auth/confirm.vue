<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const user = useSupabaseUser()

const countdown = ref(3)

const countdownMessage = computed(() => {
  return `Redirecting (${countdown.value}s)`
})

const interval = setInterval(() => {
  if (countdown.value > 1) {
    countdown.value--
  }
  else {
    clearInterval(interval)
    navigateTo('/dashboard')
  }
}, 1000)

watch(user, () => {
  if (user.value) {
    return navigateTo('/')
  }
}, { immediate: true })
</script>

<template>
  <auth-card>
    <div class="flex flex-col items-center justify-center gap-2.5">
      <h1 class="text-5xl font-bold">
        🎉
      </h1>
      <h1 class="text-2xl font-black">
        Hooray!
      </h1>
      <p class="text-left text-base">
        You are logged in.
      </p>
      <div class="flex flex-col items-center justify-center gap-2.5">
        <lew-button
          class="full"
          :text="countdownMessage"
          @click="navigateTo('/dashboard')"
        />
      </div>
    </div>
  </auth-card>
</template>

<style>
.lew-button.full {
  width: 100%;
}
</style>
