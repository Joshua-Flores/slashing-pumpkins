<script setup lang="ts">
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const route = useRoute()
const currentYear = computed(() => new Date().getFullYear())
// The homepage hero sits full-bleed under the fixed nav; other pages need
// top spacing so their content clears it.
const isHome = computed(() => route.name === 'home')
</script>

<template>
  <div class="bg-ink text-fg relative z-1 flex min-h-screen flex-col">
    <NavBar />

    <div class="flex-1" :class="{ 'pt-20': !isHome }">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </div>

    <footer class="px-6 pt-12 pb-10 text-center">
      <div class="mb-5 flex items-center justify-center gap-3.5">
        <img src="/logo.svg" alt="" class="h-13" />
        <span
          class="font-display text-2xl font-extrabold tracking-wide uppercase"
        >
          Slashing Pumpkins
        </span>
      </div>
      <p class="my-1 text-sm">
        © {{ currentYear }} Fairfax Slashing Pumpkins.
      </p>
      <p class="text-muted my-1 text-sm">
        Site design by
        <a
          href="https://joshuaflores.rocks"
          target="_blank"
          rel="noopener noreferrer"
          class="text-flame hover:underline"
        >
          Josh Flores</a
        >. Logo design by
        <a
          href="https://www.eastcityart.com/author/phil-hutinet/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-flame hover:underline"
          >Phil Hutinet</a
        >.
      </p>
    </footer>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
