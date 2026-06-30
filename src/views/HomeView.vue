<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import UpcomingGames from '@/components/UpcomingGames.vue'
import NextGameCountdown from '@/components/NextGameCountdown.vue'
import SeasonRecord from '@/components/SeasonRecord.vue'
import LatestShots from '@/components/LatestShots.vue'
import {
  games,
  getDate,
  getOpponent,
  isHomeGame,
  type Game,
} from '@/data/games'

const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

const nextGame = computed(
  (): Game | undefined =>
    games
      .filter((game: Game) => getDate(game) > now.value)
      .sort((a, b) => getDate(a).getTime() - getDate(b).getTime())[0],
)

const ET_OPTIONS = { timeZone: 'America/New_York' }

const formatDate = (game: Game) =>
  getDate(game)
    .toLocaleDateString('en-US', {
      ...ET_OPTIONS,
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    .toUpperCase()

const formatTime = (game: Game) =>
  getDate(game).toLocaleTimeString('en-US', {
    ...ET_OPTIONS,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })

onMounted(() => {
  // Refresh occasionally so the hero advances once a game has passed.
  timer = setInterval(() => {
    now.value = new Date()
  }, 30000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section
      class="relative flex min-h-screen flex-col justify-end overflow-hidden"
    >
      <div
        class="absolute inset-0 scale-105 bg-[url(/team-photos/hero.jpeg)] bg-cover bg-[position:center_28%]"
        aria-hidden="true"
      />
      <div class="hero-scrim absolute inset-0" aria-hidden="true" />

      <div class="relative z-2 mx-auto w-full max-w-310 px-6 pb-9.5">
        <h1
          class="font-display flex flex-col text-[clamp(3.625rem,12vw,10.5rem)] leading-[0.82] font-extrabold tracking-tight uppercase [text-shadow:0_16px_50px_rgba(0,0,0,0.55)]"
        >
          <span>Slashing</span>
          <span
            class="text-flame [text-shadow:0_0_38px_color-mix(in_srgb,var(--color-flame)_55%,transparent)]"
            >Pumpkins</span
          >
        </h1>
        <p
          class="mt-4 ml-0.5 text-base font-bold text-white uppercase md:text-xl lg:text-3xl"
        >
          Burying pucks since 2025. Welcome to the patch.
        </p>
      </div>

      <!-- Next puck drop broadcast banner -->
      <div
        v-if="nextGame"
        class="from-panel to-ink-2 border-flame relative z-2 mt-8.5 w-full border-t-2 border-b-2 bg-gradient-to-r"
      >
        <div
          class="mx-auto flex max-w-310 flex-wrap items-stretch md:flex-nowrap"
        >
          <!-- Flag -->
          <div
            class="bg-flame text-ink flex items-center justify-center px-5.5 py-2.5 max-md:w-full md:py-0"
          >
            <span
              class="font-display text-[15px] font-extrabold tracking-[0.14em] whitespace-nowrap uppercase max-md:tracking-[0.22em]"
              >Next Puck Drop</span
            >
          </div>

          <!-- Match -->
          <div
            class="flex items-center justify-center gap-3.5 border-white/10 p-4.5 max-md:w-full max-md:border-b md:justify-start md:border-r md:px-5.5"
          >
            <img src="/logo.svg" alt="" class="h-[46px]" />
            <span class="font-display text-muted text-lg font-bold">{{
              isHomeGame(nextGame) ? 'VS' : '@'
            }}</span>
            <span
              class="font-display text-[clamp(1.375rem,2.6vw,2rem)] leading-[0.95] font-extrabold uppercase"
              >{{ getOpponent(nextGame) }}</span
            >
          </div>

          <!-- Date -->
          <div
            class="flex flex-col justify-center gap-1 border-white/10 px-4.5 max-md:flex-1 max-md:items-center max-md:border-r max-md:border-b max-md:py-3.5 md:border-r"
          >
            <span
              class="font-display text-muted text-[11px] font-semibold tracking-[0.12em] uppercase"
              >Date</span
            >
            <span class="font-display text-base font-bold whitespace-nowrap">{{
              formatDate(nextGame)
            }}</span>
          </div>

          <!-- Face-off -->
          <div
            class="flex flex-col justify-center gap-1 border-white/10 px-4.5 max-md:flex-1 max-md:items-center max-md:border-b max-md:py-3.5 md:border-r"
          >
            <span
              class="font-display text-muted text-[11px] font-semibold tracking-[0.12em] uppercase"
              >Face-off</span
            >
            <span
              class="font-display text-flame text-base font-bold whitespace-nowrap"
              >{{ formatTime(nextGame) }}</span
            >
          </div>

          <!-- Countdown -->
          <div
            class="flex items-center px-5 max-md:w-full max-md:py-4 md:ml-auto"
          >
            <NextGameCountdown :target="getDate(nextGame)" />
          </div>
        </div>
      </div>
    </section>

    <!-- Sections -->
    <main class="mx-auto max-w-310 space-y-21 px-6 pt-21">
      <SeasonRecord />
      <UpcomingGames :limit="3" />
      <LatestShots />
    </main>
  </div>
</template>
