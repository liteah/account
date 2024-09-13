import { defineNuxtPlugin } from 'nuxt/app'
import Lew from 'lew-ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Lew)
})
