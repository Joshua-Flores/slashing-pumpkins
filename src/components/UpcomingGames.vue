<script setup lang="ts">
import { computed } from 'vue'
import GameCard from './GameCard.vue'
import { games } from '@/data/games'
import type { Game } from '@/data/games'

type Props = {
  limit?: number
}

const props = defineProps<Props>()

/**
 * We use computed here to:
 * 1. Filter out any games that are more than 2 hours past their scheduled time.
 * 2. Sort the remaining "upcoming" games by date (earliest first).
 * 3. Optionally limit the number of games displayed.
 */
const upcomingGames = computed(() => {
  const twoHoursInMs = 2 * 60 * 60 * 1000
  const cutoffTime = new Date(Date.now() - twoHoursInMs)

  const filteredGames = games
    .filter((game: Game) => game.date > cutoffTime) // Only keep games within 2 hours
    .sort((a: Game, b: Game) => a.date.getTime() - b.date.getTime()) // Ascending order

  // If limit is provided, slice the array, otherwise return all
  return props.limit ? filteredGames.slice(0, props.limit) : filteredGames
})
</script>

<template>
  <div class="space-y-4">
    <GameCard
      v-for="game in upcomingGames"
      :key="game.date.toISOString() + game.opponent"
      :opponent="game.opponent"
      :game-date="game.date"
    />

    <div v-if="upcomingGames.length === 0" class="text-center text-white">
      No upcoming games scheduled.
    </div>
  </div>
</template>
