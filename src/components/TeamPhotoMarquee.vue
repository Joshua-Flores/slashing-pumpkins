<script setup lang="ts">
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
</template>
