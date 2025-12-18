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
      ><Button size="large" text class="font-bold">STATS</Button>
    </nav>
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
    <main class="container mx-auto p-8">
      <section>
        <h2 class="mb-4 text-center text-2xl font-bold text-white md:text-4xl">
          UPCOMING GAMES
        </h2>

        <div class="clip-corners bg-orange-400 p-0.5">
          <div
            class="clip-corners grid grid-cols-5 bg-[url(/public/hockey-ice.png)] bg-center"
          >
            <!-- Versus -->
            <div
              class="col-span-3 flex items-center gap-3 p-3 text-white md:gap-6 md:px-6"
            >
              <img
                src="/public/logo.svg"
                alt="slashing pumpkins"
                class="h-10 md:h-12"
              />
              <img
                src="/public/lightning-bolt.svg"
                alt="lightning-bolt"
                class="mt-1 h-9 drop-shadow-lg drop-shadow-orange-300 md:mt-2 md:h-12"
              />
              <span class="leading-snug font-extrabold uppercase md:text-2xl"
                >MEGALOSAURUS</span
              >
            </div>
            <!-- Time -->
            <div
              class="col-span-2 flex flex-col items-center justify-center gap-1 p-3 md:gap-2"
            >
              <div
                class="flex items-center gap-2 text-sm leading-none font-extrabold text-white md:gap-3 md:text-xl"
              >
                <span>DEC 21</span>
                <span class="h-full w-0.5 bg-orange-300" />
                <span>10:41 PM</span>
              </div>
              <span class="text-sm leading-none text-purple-300 md:text-lg"
                >FAIRFAX ICE ARENA</span
              >
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
