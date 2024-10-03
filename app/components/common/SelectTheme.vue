<script lang="ts" setup>
const color = useColorMode()

function changeTheme() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}

function handleToggle(event: MouseEvent) {
  const x = event.clientX
  const y = event.clientY
  const endRadius = Math.hypot(
    Math.max(x, innerWidth - x),
    Math.max(y, innerHeight - y),
  )
  if (!document.startViewTransition) {
    changeTheme()
    return
  }
  const transition = document.startViewTransition(async () => {
    changeTheme()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    document.documentElement.animate(
      {
        clipPath: color.value === 'dark' ? [...clipPath].reverse() : clipPath,
      },
      {
        duration: 350,
        easing: 'ease-in',
        pseudoElement: color.value === 'dark'
          ? '::view-transition-old(root)'
          : '::view-transition-new(root)',
      },
    )
  })
}

useHead({
  meta: [{
    id: 'theme-color',
    name: 'theme-color',
    content: () => color.value === 'dark' ? '#222222' : '#ffffff',
  }],
  htmlAttrs: {
    class: () => color.value === 'dark' ? 'lew-dark' : 'lew-light',
  },
})
</script>

<template>
  <lew-button
    type="light"
    color="gray"
    @click="handleToggle"
  >
    <div v-if="color.value === 'dark'" i-ri-sun-line />
    <div v-else i-ri-moon-line />
  </lew-button>
</template>
