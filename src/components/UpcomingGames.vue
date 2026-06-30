<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import GameCard from './GameCard.vue'
import SectionHead from './SectionHead.vue'
import {
  games,
  getDate,
  getOpponent,
  isHomeGame,
  type Game,
} from '@/data/games'

type Props = {
  limit?: number
}

const props = defineProps<Props>()

/**
 * Upcoming games = anything within 2 hours of now or later, sorted soonest
 * first, optionally capped at `limit`.
 */
const upcomingGames = computed(() => {
  const cutoffTime = new Date(Date.now() - 2 * 60 * 60 * 1000)
  const filtered = games
    .filter((game: Game) => getDate(game) > cutoffTime)
    .sort((a: Game, b: Game) => getDate(a).getTime() - getDate(b).getTime())

  return props.limit ? filtered.slice(0, props.limit) : filtered
})
</script>

<template>
  <section>
    <SectionHead v-reveal eyebrow="Mark your calendar" title="Upcoming Games">
      <template #action>
        <RouterLink
          to="/schedule"
          class="font-display hover:border-flame hover:text-flame inline-flex items-center gap-2.5 rounded border-[1.5px] border-white/15 px-5.5 py-3 text-[15px] font-bold tracking-wider uppercase transition hover:shadow-[0_0_0_1px_var(--color-flame),0_0_24px_-8px_var(--color-flame)] max-md:hidden"
        >
          Full Schedule <i class="pi pi-arrow-right text-[13px]" />
        </RouterLink>
      </template>
    </SectionHead>

    <div
      v-if="upcomingGames.length"
      class="grid grid-cols-1 gap-4 md:grid-cols-3"
    >
      <GameCard
        v-for="(game, index) in upcomingGames"
        :key="getDate(game).toISOString() + getOpponent(game)"
        v-reveal="index * 120"
        :opponent="getOpponent(game)"
        :game-date="getDate(game)"
        :is-home="isHomeGame(game)"
        :featured="index === 0"
      />
    </div>

    <p v-else class="text-muted">No upcoming games scheduled.</p>

    <!-- Full schedule button drops below the cards on mobile -->
    <div class="mt-6 text-center md:hidden">
      <RouterLink
        to="/schedule"
        class="font-display hover:border-flame hover:text-flame inline-flex items-center gap-2.5 rounded border-[1.5px] border-white/15 px-5.5 py-3 text-[15px] font-bold tracking-wider uppercase transition hover:shadow-[0_0_0_1px_var(--color-flame),0_0_24px_-8px_var(--color-flame)]"
      >
        Full Schedule <i class="pi pi-arrow-right text-[13px]" />
      </RouterLink>
    </div>
  </section>
</template>
