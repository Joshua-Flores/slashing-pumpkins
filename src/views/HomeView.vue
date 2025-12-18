<script setup lang="ts">
import UpcomingGames from '@/components/home/UpcomingGames.vue'
import NextGameCountdown from '@/components/home/NextGameCountdown.vue'
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <div>
      <div class="h-1 w-full bg-orange-400" />
      <div class="h-1 w-full bg-sky-500" />
      <div class="my-2 h-5 w-full bg-black" />
      <div class="h-1 w-full bg-sky-500" />
      <div class="h-2 w-full bg-orange-400" />
    </div>
    <header class="relative max-h-120 w-full overflow-hidden">
      <h1 class="sr-only">Slashing Pumpkins Home</h1>
      <video
        src="/public/video/hero-background.mp4"
        autoplay
        muted
        loop
        class="h-full w-full object-cover lg:object-[center_-10rem] xl:object-[center_-20rem]"
        aria-label="hockey players warming up on a rink"
      />
      <img
        src="/public/logo.svg"
        alt="slashing pumpkin team logo"
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
    <main class="container mx-auto max-w-4xl space-y-12 p-8 pt-12">
      <section>
        <h2 class="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
          NEXT PUCK DROP
        </h2>
        <NextGameCountdown />
      </section>
      <section>
        <h2 class="mb-4 text-center text-2xl font-bold text-white md:text-3xl">
          UPCOMING GAMES
        </h2>
        <UpcomingGames />
      </section>
    </main>
  </div>
</template>
