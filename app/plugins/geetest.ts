export default defineNuxtPlugin(() => {
  const script = document.createElement('script')
  script.src = 'https://static.geetest.com/v4/gt4.js'
  document.head.appendChild(script)
})
