<script setup lang="ts">
import { computed } from 'vue'
import Button from 'primevue/button'
import { RouterLink, RouterView } from 'vue-router'

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
  <div class="flex min-h-screen flex-col bg-[#330656]">
    <nav
      class="flex w-full items-center gap-4 border-b-4 border-orange-400 px-8 py-4"
    >
      <RouterLink to="/">
        <img src="./../public/logo.svg" class="w-20" />
      </RouterLink>
      <RouterLink to="/">
        <Button size="large" text class="font-bold">HOME</Button>
      </RouterLink>
      <RouterLink to="/schedule">
        <Button size="large" text class="font-bold">SCHEDULE</Button>
      </RouterLink>
    </nav>

    <RouterView v-slot="{ Component }">
      <Transition name="fade" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>

    <footer class="bg-black py-4 text-center text-sm text-white">
      <p>
        © {{ currentYear }} Fairfax Slashing Pumpkins. Site Design by
        <a
          href="https://joshuaflores.rocks"
          target="_blank"
          rel="noopener noreferrer"
          class="text-orange-400 hover:underline"
        >
          Josh Flores
        </a>
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
