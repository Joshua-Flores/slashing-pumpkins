<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { games, type Game } from '@/data/games'

const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

// Explicitly typing the return as Game | undefined
const nextGame = computed((): Game | undefined => {
  return games
    .filter((game: Game) => new Date(game.time) > now.value)
    .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())[0]
})

// Defining a specific type for the countdown object
type TimeRemaining = {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const timeLeft = computed((): TimeRemaining | null => {
  if (!nextGame.value) return null

  const diff = new Date(nextGame.value.time).getTime() - now.value.getTime()

  if (diff <= 0) return null

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
})

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
// Helper to ensure 2 digits (e.g., 05 instead of 5)
const pad = (num: number) => num.toString().padStart(2, '0')
</script>

<template>
  <div v-if="nextGame && timeLeft" class="flex flex-col items-center">
    <div
      class="flex gap-4 border border-gray-700 bg-gray-900 p-6 shadow-2xl md:gap-8"
    >
      <div
        v-for="(value, label) in timeLeft"
        :key="label"
        class="flex flex-col items-center"
      >
        <div class="relative text-3xl leading-none md:text-5xl">
          <span class="font-digital text-gray-700 opacity-30">88</span>
          <span class="font-digital absolute inset-0 text-orange-400">
            {{ pad(value) }}
          </span>
        </div>
        <span
          class="mt-2 text-sm font-bold tracking-widest text-gray-100 uppercase"
          >{{ label }}</span
        >
      </div>
    </div>
  </div>

  <div v-else class="text-center italic">No upcoming games scheduled.</div>
</template>

<style scoped>
.font-digital {
  font-family: 'Scoreboard', monospace;
}
</style>
