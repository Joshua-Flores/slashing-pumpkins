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

const totalGames = computed(() => games.length)
const gamesPlayed = computed(
  () =>
    games.filter(
      (g) => g.awayTeamScore !== undefined && g.homeTeamScore !== undefined,
    ).length,
)
const progressPercent = computed(
  () => (gamesPlayed.value / totalGames.value) * 100,
)

const started = ref(false)
const recordSection = ref<HTMLElement | null>(null)
const allDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

function toDigitArray(n: number): number[] {
  return String(n).split('').map(Number)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!entry?.isIntersecting) return
      observer.disconnect()
      setTimeout(() => {
        started.value = true
      }, 300)
    },
    { rootMargin: '0px 0px -30% 0px', threshold: 0 },
  )
  if (recordSection.value) observer.observe(recordSection.value)
})
</script>

<template>
  <section>
    <h2 class="mb-4 text-center text-3xl font-bold text-white">
      CURRENT SEASON
    </h2>

    <div class="rounded-md border border-orange-400 bg-gray-900">
      <div
        ref="recordSection"
        class="flex divide-x divide-orange-400/40 border-b border-orange-400/40"
      >
        <div
          v-for="(stat, idx) in [
            { value: record.wins, label: 'WINS' },
            { value: record.losses, label: 'LOSSES' },
            { value: record.ties, label: 'TIES' },
          ]"
          :key="stat.label"
          class="flex flex-1 flex-col items-center justify-center px-2 py-6"
        >
          <div class="flex">
            <div
              v-for="(digit, i) in toDigitArray(stat.value)"
              :key="stat.label + i"
              class="digit-container"
            >
              <div
                class="digit-wheel"
                :style="{
                  transform: started
                    ? `translateY(-${digit * 10}%)`
                    : 'translateY(0)',
                  transitionDelay: `${idx * 200 + i * 80}ms`,
                }"
              >
                <span
                  v-for="d in allDigits"
                  :key="d"
                  class="digit-cell text-6xl font-extrabold text-orange-400"
                  >{{ d }}</span
                >
              </div>
            </div>
          </div>
          <span
            class="mt-2 text-sm font-bold tracking-widest text-gray-100 uppercase"
            >{{ stat.label }}</span
          >
        </div>
      </div>
      <div class="px-4 py-4">
        <div class="mb-3 flex justify-between">
          <span class="font-bold italic">SEASON PROGRESS</span>
          <span class="text-gray-400"
            >{{ gamesPlayed }} / {{ totalGames }} Games Played</span
          >
        </div>
        <div class="h-3 w-full overflow-hidden rounded-full bg-gray-700">
          <div
            class="h-full rounded-full bg-linear-to-r from-orange-500 to-orange-300 transition-all duration-1000 ease-out"
            :style="{ width: started ? `${progressPercent}%` : '0%' }"
          />
        </div>
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

<style scoped>
.digit-container {
  overflow: hidden;
  height: 3.75rem;
}

.digit-wheel {
  display: flex;
  flex-direction: column;
  transition: transform 1.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.digit-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.75rem;
  line-height: 1;
}
</style>
