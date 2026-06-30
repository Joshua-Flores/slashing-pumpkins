<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import SectionHead from './SectionHead.vue'
import { games, getDate, isHomeGame, isPlayed, type Game } from '@/data/games'

type Outcome = 'W' | 'L' | 'T'

const teamScores = (game: Game) => {
  const home = isHomeGame(game)
  return {
    us: (home ? game.homeTeamScore : game.awayTeamScore) ?? 0,
    them: (home ? game.awayTeamScore : game.homeTeamScore) ?? 0,
  }
}

const outcome = (game: Game): Outcome => {
  const { us, them } = teamScores(game)
  return us > them ? 'W' : us < them ? 'L' : 'T'
}

const stats = computed(() => {
  const played = games
    .filter(isPlayed)
    .sort((a, b) => getDate(a).getTime() - getDate(b).getTime())

  let wins = 0,
    losses = 0,
    ties = 0,
    gf = 0,
    ga = 0
  for (const game of played) {
    const { us, them } = teamScores(game)
    gf += us
    ga += them
    const result = outcome(game)
    if (result === 'W') wins++
    else if (result === 'L') losses++
    else ties++
  }

  return {
    wins,
    losses,
    ties,
    gf,
    ga,
    points: wins * 2 + ties,
    gamesPlayed: played.length,
    totalGames: games.length,
    form: played.slice(-5).map(outcome),
  }
})

const records = computed(() => [
  { value: stats.value.wins, label: 'WINS' },
  { value: stats.value.losses, label: 'LOSSES' },
  { value: stats.value.ties, label: 'TIES' },
])

const splitStats = computed(() => [
  { value: stats.value.points, label: 'POINTS', accent: true },
  { value: stats.value.gf, label: 'GOALS FOR', accent: false },
  { value: stats.value.ga, label: 'GOALS AGAINST', accent: false },
])

const progressPercent = computed(() =>
  stats.value.totalGames === 0
    ? 0
    : (stats.value.gamesPlayed / stats.value.totalGames) * 100,
)

const formPillClass: Record<Outcome, string> = {
  W: 'bg-win',
  L: 'bg-loss',
  T: 'bg-tie',
}

const allDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const toDigits = (n: number): number[] => String(n).split('').map(Number)

const started = ref(false)
const section = ref<HTMLElement | null>(null)

onMounted(() => {
  const observer = new IntersectionObserver(
    ([entry]: IntersectionObserverEntry[]) => {
      if (!entry?.isIntersecting) return
      observer.disconnect()
      setTimeout(() => {
        started.value = true
      }, 250)
    },
    { rootMargin: '0px 0px -25% 0px', threshold: 0 },
  )
  if (section.value) observer.observe(section.value)
})
</script>

<template>
  <section ref="section">
    <SectionHead eyebrow="Current campaign" title="Summer '26 Season" />

    <div
      class="from-panel to-ink-2 relative overflow-hidden rounded-xl border border-white/15 bg-gradient-to-b p-1"
    >
      <div class="board-ring" aria-hidden="true" />

      <div class="relative">
        <!-- Record reels -->
        <div class="grid grid-cols-3 border-b border-white/10">
          <div
            v-for="(record, idx) in records"
            :key="record.label"
            class="flex flex-col items-center px-3 pt-8.5 pb-6.5"
            :class="{ 'border-l border-white/10': idx > 0 }"
          >
            <div class="flex">
              <div
                v-for="(digit, i) in toDigits(record.value)"
                :key="record.label + i"
                class="digit-window h-16 md:h-21"
              >
                <div
                  class="digit-reel"
                  :style="{
                    transform: started
                      ? `translateY(-${digit * 10}%)`
                      : 'translateY(0)',
                    transitionDelay: `${idx * 220 + i * 80}ms`,
                  }"
                >
                  <span
                    v-for="d in allDigits"
                    :key="d"
                    class="digit-cell font-display text-flame h-16 text-[54px] font-extrabold md:h-21 md:text-[78px]"
                    >{{ d }}</span
                  >
                </div>
              </div>
            </div>
            <span
              class="font-display text-muted mt-2 text-sm font-bold tracking-[0.18em]"
              >{{ record.label }}</span
            >
          </div>
        </div>

        <!-- Split stats + form -->
        <div
          class="grid grid-cols-3 gap-y-4 px-2 py-5.5 md:grid-cols-[repeat(3,1fr)_1.4fr]"
        >
          <div
            v-for="stat in splitStats"
            :key="stat.label"
            class="flex flex-col items-center gap-1.5 px-2.5 py-1"
          >
            <span
              class="font-display text-[46px] leading-[0.9] font-extrabold"
              :class="{ 'text-flame': stat.accent }"
              >{{ stat.value }}</span
            >
            <span
              class="font-display text-muted text-xs font-semibold tracking-[0.12em] uppercase"
              >{{ stat.label }}</span
            >
          </div>
          <div
            class="col-span-3 flex flex-col items-center justify-center gap-2.5 border-t border-white/10 px-2.5 pt-4 md:col-span-1 md:border-t-0 md:border-l md:pt-1"
          >
            <span
              class="font-display text-muted text-xs font-semibold tracking-[0.12em]"
              >LAST 5</span
            >
            <div v-if="stats.form.length" class="flex gap-1.5">
              <span
                v-for="(result, i) in stats.form"
                :key="i"
                class="font-display text-ink flex h-7.5 w-7.5 items-center justify-center rounded-[5px] text-base font-extrabold"
                :class="formPillClass[result]"
                >{{ result }}</span
              >
            </div>
            <span v-else class="text-muted text-sm">No games played yet</span>
          </div>
        </div>

        <!-- Season progress -->
        <div class="border-t border-white/10 px-5.5 pt-4.5 pb-5.5">
          <div
            class="font-display mb-3 flex justify-between text-sm font-bold tracking-wider uppercase"
          >
            <span>Season Progress</span>
            <span class="text-muted"
              >{{ stats.gamesPlayed }} / {{ stats.totalGames }} Games</span
            >
          </div>
          <div class="h-2.5 overflow-hidden rounded-full bg-white/8">
            <div
              class="from-flame h-full rounded-full bg-gradient-to-r to-orange-200 shadow-[0_0_18px_color-mix(in_srgb,var(--color-flame)_55%,transparent)] transition-all duration-1000 ease-out"
              :style="{ width: started ? `${progressPercent}%` : '0%' }"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="mt-7.5 text-center">
      <RouterLink
        to="/schedule?tab=past"
        class="font-display hover:border-flame hover:text-flame inline-flex items-center gap-2.5 rounded border-[1.5px] border-white/15 px-5.5 py-3 text-[15px] font-bold tracking-wider uppercase transition hover:shadow-[0_0_0_1px_var(--color-flame),0_0_24px_-8px_var(--color-flame)]"
      >
        View Past Games <i class="pi pi-arrow-right text-[13px]" />
      </RouterLink>
    </div>
  </section>
</template>
