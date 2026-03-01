<script setup lang="ts">
import { computed } from 'vue'
import { games, type Game } from '@/data/games'
import { ref } from 'vue'
import SelectButton from 'primevue/selectbutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const selectedView = ref<'Upcoming' | 'Past'>('Upcoming')
const options = ref(['Upcoming', 'Past'])
const getDate = (game: Game) => new Date(game.time)
const formatDate = (game: Game) =>
  getDate(game).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
const formatTime = (game: Game) =>
  getDate(game).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
const getResult = (game: Game) =>
  game.awayTeamScore !== undefined && game.homeTeamScore !== undefined
    ? (() => {
        const isAway = game.awayTeam === 'Slashing Pumpkins'
        const slashingPumpkinsScore = isAway
          ? game.awayTeamScore
          : game.homeTeamScore
        const opponentScore = isAway ? game.homeTeamScore : game.awayTeamScore
        const result =
          slashingPumpkinsScore > opponentScore
            ? 'W'
            : slashingPumpkinsScore < opponentScore
              ? 'L'
              : 'T'

        return `${result} ${slashingPumpkinsScore} - ${opponentScore}`
      })()
    : '-'

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
        <div>
          <DataTable
            v-if="filteredGames.length > 0"
            :value="filteredGames"
            unstyled
            :pt="{
              table: {
                class: 'w-full text-left text-sm text-white md:text-base',
              },
              headerRow: { class: 'border-b border-white/30' },
              bodyRow: { class: 'border-b border-white/10' },
              column: {
                headerCell: { class: 'py-4' },
                bodyCell: { class: 'py-4' },
              },
            }"
          >
            <Column
              v-if="selectedView === 'Upcoming'"
              field="homeTeam"
              header="HOME"
            />
            <Column field="awayTeam" header="AWAY" />
            <Column
              v-if="selectedView === 'Past'"
              field="homeTeam"
              header="HOME"
            />
            <Column header="DATE">
              <template #body="{ data }">
                {{ formatDate(data) }}
              </template>
            </Column>
            <Column v-if="selectedView === 'Upcoming'" header="TIME">
              <template #body="{ data }">
                {{ formatTime(data) }}
              </template>
            </Column>
            <Column v-else header="RESULT">
              <template #body="{ data }">
                {{ getResult(data) }}
              </template>
            </Column>
          </DataTable>

          <div v-else class="text-center text-white">
            No {{ selectedView.toLowerCase() }} games.
          </div>
        </div>
      </section>
    </main>
  </div>
</template>
