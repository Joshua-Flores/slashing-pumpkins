<script setup lang="ts">
import { computed } from 'vue'
import GameCard from '../GameCard.vue'
import { games } from '@/data/games'

// Define the type for clarity
type Game = {
  date: Date
  opponent: string
  score?: {
    slashingPumpkins: number
    opponent: number
  }
}

type Props = {
  limit?: number
}

const props = defineProps<Props>()

/**
 * We use computed here to:
 * 1. Filter out any games that already have a score object.
 * 2. Sort the remaining "upcoming" games by date (earliest first).
 * 3. Optionally limit the number of games displayed.
 */
const upcomingGames = computed(() => {
  const filteredGames = games
    .filter((game: Game) => !game.score) // Only keep games without a score
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
