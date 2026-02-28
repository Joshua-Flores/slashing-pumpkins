<script setup lang="ts">
import { computed } from 'vue'
import GameCard from './GameCard.vue'
import { games } from '@/data/games'
import type { Game } from '@/data/games'

type Props = {
  limit?: number
}

const props = defineProps<Props>()

const getDate = (game: Game) => new Date(game.time)
const getOpponent = (game: Game) =>
  game.awayTeam === 'Slashing Pumpkins' ? game.homeTeam : game.awayTeam

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
    .filter((game: Game) => getDate(game) > cutoffTime) // Only keep games within 2 hours
    .sort((a: Game, b: Game) => getDate(a).getTime() - getDate(b).getTime()) // Ascending order

  // If limit is provided, slice the array, otherwise return all
  return props.limit ? filteredGames.slice(0, props.limit) : filteredGames
})
</script>

<template>
  <div class="space-y-4">
    <GameCard
      v-for="game in upcomingGames"
      :key="getDate(game).toISOString() + getOpponent(game)"
      :opponent="getOpponent(game)"
      :game-date="getDate(game)"
    />

    <div v-if="upcomingGames.length === 0" class="text-center text-white">
      No upcoming games scheduled.
    </div>
  </div>
</template>
