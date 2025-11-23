<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-purple-900 text-7xl">
    <nav
      class="flex w-full items-center justify-center gap-4 border-b-2 border-orange-400 py-2"
    >
      <Button text>HOME</Button><Button text>SCHEDULE</Button
      ><Button text>ROSTER</Button><Button text>EVENTS</Button>
    </nav>
    <header class="relative max-h-120 w-full overflow-hidden">
      <video
        src="/public/video/hero-background.mp4"
        autoplay
        muted
        loop
        class="h-full w-full object-cover lg:object-[center_-10rem] xl:object-[center_-20rem]"
      />
      <img
        src="/public/logo.svg"
        class="absolute top-1/2 left-1/2 h-4/5 -translate-x-2/5 -translate-y-1/2 drop-shadow-sm drop-shadow-orange-300 filter"
      />
    </header>
  </div>
</template>
