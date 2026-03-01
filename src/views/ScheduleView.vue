<script setup lang="ts">
import { computed } from 'vue'
import GameCard from '@/components/GameCard.vue'
import { games, type Game } from '@/data/games'
import { ref } from 'vue'
import SelectButton from 'primevue/selectbutton'

const value = ref('Upcoming')
const options = ref(['Upcoming', 'Past'])
const getDate = (game: Game) => new Date(game.time)
const getOpponent = (game: Game) =>
  game.awayTeam === 'Slashing Pumpkins' ? game.homeTeam : game.awayTeam
const getScore = (game: Game) => {
  if (game.awayTeamScore === undefined || game.homeTeamScore === undefined)
    return undefined
  const isAway = game.awayTeam === 'Slashing Pumpkins'
  return {
    slashingPumpkins: isAway ? game.awayTeamScore : game.homeTeamScore,
    opponent: isAway ? game.homeTeamScore : game.awayTeamScore,
  }
}

/**
 * Show all games sorted by date in ascending order
 */
const allGames = computed(() => {
  return [...games].sort(
    (a: Game, b: Game) => getDate(a).getTime() - getDate(b).getTime(),
  )
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <main class="container mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-8">
      <section>
        <h1 class="mb-8 text-center text-3xl font-bold text-white">SCHEDULE</h1>
        <SelectButton v-model="value" :options="options" fluid class="mb-4" />
        <div class="space-y-4">
          <GameCard
            v-for="game in allGames"
            :key="getDate(game).toISOString() + getOpponent(game)"
            :opponent="getOpponent(game)"
            :game-date="getDate(game)"
            :score="getScore(game)"
          />

          <div v-if="allGames.length === 0" class="text-center text-white">
            No games scheduled.
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
