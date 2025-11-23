<script setup lang="ts">
import Button from 'primevue/button'
</script>

<template>
  <div class="flex min-h-screen flex-col bg-purple-900">
    <nav
      class="flex w-full items-center justify-center gap-4 border-b-4 border-orange-400 py-2"
    >
      <Button size="large" text class="font-bold">HOME</Button
      ><Button size="large" text class="font-bold">SCHEDULE</Button
      ><Button size="large" text class="font-bold">ROSTER</Button
      ><Button size="large" text class="font-bold">EVENTS</Button>
    </nav>
    <div class="space-y-8">
      <header
        class="relative max-h-120 w-full overflow-hidden border-b-4 border-orange-400"
      >
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
      <main class="container mx-auto grid px-6 xl:grid-cols-3">
        <section>
          <h2 class="mb-4 text-center text-4xl font-bold text-white">
            UPCOMING GAMES
          </h2>
          <div
            class="flex gap-4 rounded-md bg-linear-to-r from-purple-600 to-purple-700 px-4 py-2 text-white"
          >
            <img
              src="/public/hockey-puck.svg"
              alt="hockey puck"
              class="w-10 fill-amber-400 filter"
            />
            <div>
              <p class="text-xl font-extrabold">
                DEC 12
                <span class="text-orange-400">vs</span> Mezazoic Puck
              </p>
              <p>9:40PM - Fairfax Ice Arena</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
