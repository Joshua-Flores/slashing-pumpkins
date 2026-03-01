<script setup lang="ts">
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import UpcomingGames from '@/components/UpcomingGames.vue'
import NextGameCountdown from '@/components/NextGameCountdown.vue'

const teamPhotos = [
  {
    src: '/team-photos/doug-1.jpg',
    alt: 'Doug at the rink in team gear',
  },
  {
    src: '/team-photos/doug-2.jpg',
    alt: 'Doug smiling after hockey practice',
  },
  {
    src: '/team-photos/doug-3.jpg',
    alt: 'Doug in full hockey equipment',
  },
  {
    src: '/team-photos/jersey.jpeg',
    alt: 'Slashing Pumpkins jersey',
  },
]
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
        <div class="scoreboard-ring">
          <NextGameCountdown />
        </div>
      </section>
      <section>
        <h2 class="mb-4 text-center text-3xl font-bold text-white">
          UPCOMING GAMES
        </h2>
        <UpcomingGames :limit="3" />
        <div class="mt-6 text-center">
          <Button as-child v-slot="slotProps" class="mt-6">
            <RouterLink to="/schedule" :class="slotProps.class"
              ><span class="flex items-center gap-2 font-bold"
                >VIEW ALL<i class="pi pi-arrow-right" /></span
            ></RouterLink>
          </Button>
        </div>
      </section>
    </main>
    <section class="team-marquee-section">
      <div class="team-marquee-track">
        <div class="team-marquee-strip">
          <img
            v-for="photo in teamPhotos"
            :key="photo.src"
            :src="photo.src"
            :alt="photo.alt"
            loading="lazy"
            class="team-marquee-image"
          />
        </div>
        <div class="team-marquee-strip" aria-hidden="true">
          <img
            v-for="photo in teamPhotos"
            :key="`duplicate-${photo.src}`"
            :src="photo.src"
            :alt="photo.alt"
            loading="lazy"
            class="team-marquee-image"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.team-marquee-section {
  overflow: hidden;
  padding: 1rem 0 1.5rem;
  background: linear-gradient(
    180deg,
    rgb(0 0 0 / 10%) 0%,
    rgb(0 0 0 / 45%) 35%,
    rgb(0 0 0 / 70%) 100%
  );
}

.team-marquee-track {
  display: flex;
  width: max-content;
  animation: team-marquee-scroll 30s linear infinite;
}

.team-marquee-strip {
  display: flex;
  gap: 1rem;
  padding-right: 1rem;
}

.team-marquee-image {
  width: clamp(330px, 42vw, 480px);
  height: clamp(210px, 27vw, 315px);
  object-fit: cover;
  border-radius: 0.5rem;
  border: 2px solid var(--color-orange-400);
}

.scoreboard-ring {
  position: relative;
  margin: 0 auto;
  width: fit-content;
  padding: 3px;
  border-radius: 0.375rem;
  overflow: hidden;
}

.scoreboard-ring::before {
  content: '';
  position: absolute;
  inset: -140%;
  background: conic-gradient(
    from 0deg,
    var(--color-purple-700) 0deg,
    var(--color-purple-700) 300deg,
    var(--color-orange-500) 338deg,
    var(--color-purple-700) 360deg
  );
  animation: scoreboard-ring-spin 2.8s linear infinite;
}

.scoreboard-ring > * {
  position: relative;
  z-index: 1;
}

@keyframes team-marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-50% - 0.5rem));
  }
}

@keyframes scoreboard-ring-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
