<!-- eslint-disable ts/ban-ts-comment -->
<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {
  // @ts-expect-error
  initGeetest4({
    captchaId: '58e2b5894925afcca1fd7679c0102f24',
    language: 'eng',
    nativeButton: {
      width: '100%',
    },
  }, (captcha: any) => {
    captcha.appendTo('#conova-andhoo')
  })
})
</script>

<template>
  <div id="conova-andhoo" />
</template>

<style scoped>
#conova-andhoo {
  width: 100%;
}
</style>
