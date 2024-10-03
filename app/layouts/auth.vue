<template>
  <div>
    <div
      class="h-screen flex flex-col items-center justify-center"
      p="lg:10 md:5 sm:0.5"
    >
      <slot />
    </div>
    <div class="fixed bottom-0 left-1/2 mb-10 mt-auto flex transform items-center justify-center gap-2.5 pt-4.5 -translate-x-0.5/1">
      <common-select-theme />
      <!-- <common-select-langauge /> -->
    </div>
  </div>
</template>
