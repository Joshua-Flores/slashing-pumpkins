<script setup lang="ts">
import SectionHead from './SectionHead.vue'

const photos = [
  {
    src: '/team-photos/hero.jpeg',
    alt: 'Slashing Pumpkins faceoff at center ice',
  },
  {
    src: '/team-photos/goalie-1.jpg',
    alt: 'Slashing Pumpkins goalie guarding the net',
  },
  { src: '/team-photos/team-1.jpeg', alt: 'Slashing Pumpkins team photo' },
  {
    src: '/team-photos/goalie-2.jpeg',
    alt: 'Slashing Pumpkins goalie making a save',
  },
  { src: '/team-photos/team-2.jpeg', alt: 'Slashing Pumpkins team photo' },
  { src: '/team-photos/jersey.jpeg', alt: 'Slashing Pumpkins jersey' },
  { src: '/team-photos/team-3.jpeg', alt: 'Slashing Pumpkins team photo' },
]

// Duplicated once for a seamless marquee loop.
const loop = [...photos, ...photos]
</script>

<template>
  <section>
    <SectionHead eyebrow="From the rink" title="Latest Shots" />

    <div class="shots-marquee">
      <div class="shots-marquee__track">
        <div
          v-for="(photo, index) in loop"
          :key="index"
          class="shots-marquee__item"
        >
          <img
            :src="photo.src"
            :alt="index < photos.length ? photo.alt : ''"
            :aria-hidden="index >= photos.length"
            loading="lazy"
          />
        </div>
      </div>
    </div>

    <!-- Instagram CTA -->
    <div
      class="ig-card mt-8.5 flex flex-wrap items-center justify-between gap-5.5 rounded-xl px-7.5 py-6.5"
    >
      <div class="flex flex-col gap-1">
        <span
          class="font-display text-muted flex items-center gap-2 font-semibold tracking-[0.14em]"
        >
          <i class="pi pi-instagram" /> FOLLOW THE PATCH
        </span>
        <span
          class="font-display text-2xl font-extrabold uppercase md:text-[34px]"
        >
          @fairfaxslashingpumpkins
        </span>
      </div>
      <a
        href="https://instagram.com/fairfaxslashingpumpkins"
        target="_blank"
        rel="noopener"
        class="ig-btn font-display inline-flex items-center gap-2.5 rounded px-5.5 py-3.5 text-[15px] font-bold tracking-wider text-white uppercase shadow-[0_12px_30px_-12px_#dd2a7b] transition hover:-translate-y-0.5"
      >
        <i class="pi pi-instagram" /> Follow Us
      </a>
    </div>
  </section>
</template>
