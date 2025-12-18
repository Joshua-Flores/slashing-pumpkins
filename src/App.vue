<script setup lang="ts">
import Button from 'primevue/button'
import { RouterLink, RouterView } from 'vue-router'
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
