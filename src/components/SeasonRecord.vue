<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import Button from 'primevue/button'
import { games } from '@/data/games'

const TEAM = 'Slashing Pumpkins'
const record = computed(() => {
  let wins = 0,
    losses = 0,
    ties = 0
  for (const game of games) {
    if (game.awayTeamScore === undefined || game.homeTeamScore === undefined)
      continue
    const isHome = game.homeTeam === TEAM
    const teamScore = isHome ? game.homeTeamScore : game.awayTeamScore
    const oppScore = isHome ? game.awayTeamScore : game.homeTeamScore
    if (teamScore > oppScore) wins++
    else if (teamScore < oppScore) losses++
    else ties++
  }
  return { wins, losses, ties }
})

const displayWins = ref(0)
const displayLosses = ref(0)
const displayTies = ref(0)

function countUp(
  target: number,
  setter: (v: number) => void,
  duration: number,
): Promise<void> {
  return new Promise((resolve) => {
    if (target === 0) {
      resolve()
      return
    }
    const start = performance.now()
    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      setter(Math.round(progress * target))
      if (progress < 1) requestAnimationFrame(step)
      else resolve()
    }
    requestAnimationFrame(step)
  })
}

const recordSection = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    async ([entry]: IntersectionObserverEntry[]) => {
      if (!entry?.isIntersecting) return
      observer.disconnect()
      const DURATION = 1000
      await countUp(record.value.wins, (v) => (displayWins.value = v), DURATION)
      await countUp(
        record.value.losses,
        (v) => (displayLosses.value = v),
        DURATION,
      )
      await countUp(record.value.ties, (v) => (displayTies.value = v), DURATION)
    },
    { rootMargin: '-25% 0px -25% 0px', threshold: 0 },
  )
  if (recordSection.value) observer.observe(recordSection.value)
})
</script>

<template>
  <section>
    <h2 class="mb-4 text-center text-3xl font-bold text-white">
      CURRENT SEASON RECORD
    </h2>

    <div
      ref="recordSection"
      class="flex divide-x divide-orange-400/30 rounded-md bg-gray-900"
    >
      <div
        class="flex flex-1 flex-col items-center justify-center gap-2 px-2 py-6"
      >
        <span class="text-6xl font-extrabold text-orange-400 md:text-8xl">{{
          displayWins
        }}</span>
        <span class="text-sm font-bold tracking-[0.25em] text-gray-500"
          >WINS</span
        >
      </div>
      <div
        class="flex flex-1 flex-col items-center justify-center gap-2 px-2 py-6"
      >
        <span class="text-6xl font-extrabold text-orange-400 md:text-8xl">{{
          displayLosses
        }}</span>
        <span class="text-sm font-bold tracking-[0.25em] text-gray-500"
          >LOSSES</span
        >
      </div>
      <div
        class="flex flex-1 flex-col items-center justify-center gap-2 px-2 py-6"
      >
        <span class="text-6xl font-extrabold text-orange-400 md:text-8xl">{{
          displayTies
        }}</span>
        <span class="text-sm font-bold tracking-[0.25em] text-gray-500"
          >TIES</span
        >
      </div>
    </div>
    <div class="mt-6 text-center">
      <Button as-child v-slot="slotProps" class="mt-6">
        <RouterLink to="/schedule?tab=past" :class="slotProps.class"
          ><span class="flex items-center gap-2 font-bold"
            >VIEW PAST GAMES<i class="pi pi-arrow-right" /></span
        ></RouterLink>
      </Button>
    </div>
  </section>
</template>
