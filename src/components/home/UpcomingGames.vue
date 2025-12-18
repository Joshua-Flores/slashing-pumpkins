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

/**
 * We use computed here to:
 * 1. Filter out any games that already have a score object.
 * 2. Sort the remaining "upcoming" games by date (earliest first).
 */
const upcomingGames = computed(() => {
  return games
    .filter((game: Game) => !game.score) // Only keep games without a score
    .sort((a: Game, b: Game) => a.date.getTime() - b.date.getTime()) // Ascending order
})
</script>

<template>
  <div class="space-y-2">
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
