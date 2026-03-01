<script setup lang="ts">
import { computed } from 'vue'
import GameCard from '@/components/GameCard.vue'
import { games, type Game } from '@/data/games'
import { ref } from 'vue'
import SelectButton from 'primevue/selectbutton'

const selectedView = ref<'Upcoming' | 'Past'>('Upcoming')
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

const filteredGames = computed(() => {
  const now = Date.now()
  const isUpcoming = selectedView.value === 'Upcoming'

  return games
    .filter((game: Game) => {
      const gameTime = getDate(game).getTime()
      return isUpcoming ? gameTime >= now : gameTime < now
    })
    .sort((a: Game, b: Game) =>
      isUpcoming
        ? getDate(a).getTime() - getDate(b).getTime()
        : getDate(b).getTime() - getDate(a).getTime(),
    )
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <main class="container mx-auto max-w-4xl space-y-12 px-4 py-12 md:px-8">
      <section>
        <h1 class="mb-8 text-center text-3xl font-bold text-white">SCHEDULE</h1>
        <SelectButton
          v-model="selectedView"
          :options="options"
          fluid
          class="mb-6"
        />
        <div class="space-y-4">
          <GameCard
            v-for="game in filteredGames"
            :key="getDate(game).toISOString() + getOpponent(game)"
            :opponent="getOpponent(game)"
            :game-date="getDate(game)"
            :score="getScore(game)"
          />

          <div v-if="filteredGames.length === 0" class="text-center text-white">
            No {{ selectedView.toLowerCase() }} games.
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
