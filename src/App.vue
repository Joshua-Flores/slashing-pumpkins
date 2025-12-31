<script setup lang="ts">
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import NavBar from '@/components/NavBar.vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <div
    class="bg-center-top bg-top-center flex min-h-screen flex-col bg-purple-950"
  >
    <NavBar />

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
