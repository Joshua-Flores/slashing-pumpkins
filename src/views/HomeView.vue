<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import UpcomingGames from '@/components/UpcomingGames.vue'
import NextGameCountdown from '@/components/NextGameCountdown.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <header class="relative max-h-120 w-full overflow-hidden">
      <h1 class="sr-only">Slashing Pumpkins Home</h1>
      <video
        src="/video/hero-background.mp4"
        autoplay
        muted
        loop
        playsinline
        preload="auto"
        class="h-full w-full object-cover lg:object-[center_-10rem] xl:object-[center_-20rem]"
        aria-label="hockey players warming up on a rink"
      />
      <img
        src="/logo.svg"
        alt="slashing pumpkin team logo"
        loading="eager"
        class="absolute top-1/2 left-1/2 h-4/5 -translate-x-2/5 -translate-y-1/2 drop-shadow-sm drop-shadow-orange-300 filter"
      />
    </header>
    <!-- Stripes -->
    <div>
      <div class="h-2 w-full bg-orange-400" />
      <div class="h-1 w-full bg-sky-500" />
      <div class="my-2 h-5 w-full bg-black" />
      <div class="h-1 w-full bg-sky-500" />
      <div class="h-2 w-full bg-orange-400" />
    </div>
    <main class="container mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-8">
      <section>
        <h2 class="mb-4 text-center text-3xl font-bold text-white">
          NEXT PUCK DROP
        </h2>
        <NextGameCountdown />
      </section>
      <section>
        <h2 class="mb-4 text-center text-3xl font-bold text-white">
          UPCOMING GAMES
        </h2>
        <UpcomingGames :limit="3" />
        <div class="mt-6 text-center">
          <Button asChild v-slot="slotProps" class="mt-6">
            <RouterLink to="/schedule" :class="slotProps.class"
              ><span class="flex items-center gap-2 font-semibold"
                >VIEW ALL<i class="pi pi-arrow-right" /></span
            ></RouterLink>
          </Button>
        </div>
      </section>
    </main>
  </div>
</template>
