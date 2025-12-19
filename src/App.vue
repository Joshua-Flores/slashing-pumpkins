<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <div class="flex min-h-screen flex-col bg-purple-950">
    <nav
      class="sticky top-0 z-50 flex w-full items-center gap-6 border-b-4 border-orange-400 px-4 py-4 backdrop-blur-xl md:px-8"
    >
      <RouterLink to="/">
        <img src="/logo.svg" class="w-16" />
      </RouterLink>
      <RouterLink
        to="/schedule"
        class="text-lg font-bold text-white decoration-orange-400 underline-offset-8 hover:underline"
        >SCHEDULE</RouterLink
      >
    </nav>

    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <footer class="bg-black py-4 text-center text-sm text-white">
      <p>© {{ currentYear }} Fairfax Slashing Pumpkins.</p>
      <p>
        Site design by
        <a
          href="https://joshuaflores.rocks"
          target="_blank"
          rel="noopener noreferrer"
          class="text-orange-400 hover:underline"
        >
          Josh Flores</a
        >. Logo design by
        <a
          href="https://www.eastcityart.com/author/phil-hutinet/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-orange-400 hover:underline"
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
