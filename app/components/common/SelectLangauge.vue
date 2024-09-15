<script lang="ts" setup>
// TODO: use nuxt i18n
const selectedLanguage = ref('en-US')

const languageOptions = ref([
  { label: 'English', value: 'en-US' },
  { label: '中文(简体)', value: 'zh-CN' },
  { label: '中文(繁体)', value: 'zh-TW' },
  { label: '日本语', value: 'ja-JP' },
])
</script>

<template>
  <div class="w-28 leading-8">
    <lew-select
      v-model="selectedLanguage"
      size="small"
      :item-height="36"
      :show-check-icon="false"
      :options="languageOptions"
    />
  </div>
</template>

<style>

</style>
