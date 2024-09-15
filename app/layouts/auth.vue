<template>
  <div>
    <div class="h-screen flex flex-col items-center justify-center p-10">
      <slot />
    </div>
    <div class="absolute bottom-0 left-1/2 mb-10 mt-auto flex flex-col items-center gap-2.5 pt-3.5 -translate-x-1/2">
      <common-select-theme />
      <common-select-langauge />
    </div>
  </div>
</template>
