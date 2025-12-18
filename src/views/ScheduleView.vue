<script setup lang="ts">
import { computed } from 'vue'
import GameCard from '@/components/GameCard.vue'
import { games, type Game } from '@/data/games'

/**
 * Show all games sorted by date in ascending order
 */
const allGames = computed(() => {
  return [...games].sort(
    (a: Game, b: Game) => a.date.getTime() - b.date.getTime(),
  )
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-purple-950">
    <main class="container mx-auto max-w-4xl space-y-12 p-8">
      <section>
        <h1 class="mb-8 text-center text-2xl font-bold text-white">SCHEDULE</h1>
        <div class="space-y-4">
          <GameCard
            v-for="game in allGames"
            :key="game.date.toISOString() + game.opponent"
            :opponent="game.opponent"
            :game-date="game.date"
            :score="game.score"
          />

          <div v-if="allGames.length === 0" class="text-center text-white">
            No games scheduled.
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
