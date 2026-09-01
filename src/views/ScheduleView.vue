<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { TableColumn, TabsItem } from '@nuxt/ui'
import SectionHead from '@/components/SectionHead.vue'
import { games, type Game } from '@/data/games'

type View = 'upcoming' | 'past'

const route = useRoute()
const selectedView = ref<View>(route.query.tab === 'past' ? 'past' : 'upcoming')

const tabs: TabsItem[] = [
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Past', value: 'past' },
]

const getDate = (game: Game) => new Date(game.time)
const formatDate = (game: Game) =>
  getDate(game)
    .toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    })
    .toUpperCase()
const formatTime = (game: Game) =>
  getDate(game).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })

type ResultInfo = { outcome: 'W' | 'L' | 'T'; label: string }

const getResult = (game: Game): ResultInfo | null => {
  if (game.awayTeamScore === undefined || game.homeTeamScore === undefined)
    return null

  const isAway = game.awayTeam === 'Slashing Pumpkins'
  const ours = isAway ? game.awayTeamScore : game.homeTeamScore
  const theirs = isAway ? game.homeTeamScore : game.awayTeamScore
  const outcome = ours > theirs ? 'W' : ours < theirs ? 'L' : 'T'

  return { outcome, label: `${outcome} ${ours}–${theirs}` }
}

const resultClass = (outcome: ResultInfo['outcome']) =>
  outcome === 'W' ? 'text-win' : outcome === 'L' ? 'text-loss' : 'text-tie'

const isUs = (team: string) => team === 'Slashing Pumpkins'

const teamClass = (team: string) => [
  'font-display text-sm font-bold uppercase md:text-base',
  isUs(team) ? 'text-flame' : 'text-fg',
]

const filteredGames = computed(() => {
  const now = Date.now()
  const isUpcoming = selectedView.value === 'upcoming'

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

/**
 * Upcoming games lead with the home side and close on the face-off time; past
 * games lead with the away side and close on the final score.
 */
const columns = computed<TableColumn<Game>[]>(() => {
  const home: TableColumn<Game> = { accessorKey: 'homeTeam', header: 'Home' }
  const away: TableColumn<Game> = { accessorKey: 'awayTeam', header: 'Away' }
  const date: TableColumn<Game> = { id: 'date', header: 'Date' }

  return selectedView.value === 'upcoming'
    ? [home, away, date, { id: 'time', header: 'Time' }]
    : [away, home, date, { id: 'result', header: 'Result' }]
})
</script>

<template>
  <main class="mx-auto max-w-4xl px-6 py-16 md:py-21">
    <SectionHead eyebrow="The full slate" title="Schedule" />

    <UTabs
      v-model="selectedView"
      :items="tabs"
      :content="false"
      :ui="{
        root: 'mb-8 w-full items-start md:w-auto',
        list: 'bg-ink-2 w-full rounded-lg border border-white/10 p-1 md:w-auto',
        indicator: 'shadow-[0_0_22px_-6px_var(--color-flame)]',
        trigger:
          'font-display flex-1 cursor-pointer rounded-md px-5 py-2.5 text-[13px] font-bold tracking-[0.14em] uppercase md:flex-none',
      }"
    />

    <!-- Schedule panel -->
    <div
      v-if="filteredGames.length > 0"
      class="from-panel to-ink-2 relative overflow-hidden rounded-[10px] border border-white/10 bg-gradient-to-b"
    >
      <span
        class="bg-flame absolute inset-x-0 top-0 h-[3px]"
        aria-hidden="true"
      />

      <UTable
        :data="filteredGames"
        :columns="columns"
        :ui="{
          root: 'overflow-x-auto',
          base: 'w-full text-left',
          tbody: 'divide-y divide-white/5',
          tr: 'transition hover:bg-white/[0.03]',
          th: 'font-display text-muted border-b border-white/10 px-3 py-4 text-sm font-bold tracking-[0.16em] whitespace-nowrap uppercase md:px-5',
          td: 'px-3 py-4 align-middle whitespace-nowrap md:px-5',
        }"
      >
        <template #homeTeam-cell="{ row }">
          <span :class="teamClass(row.original.homeTeam)">
            {{ row.original.homeTeam }}
          </span>
        </template>

        <template #awayTeam-cell="{ row }">
          <span :class="teamClass(row.original.awayTeam)">
            {{ row.original.awayTeam }}
          </span>
        </template>

        <template #date-cell="{ row }">
          <span
            class="font-display text-muted text-sm font-semibold tracking-wide md:text-base"
          >
            {{ formatDate(row.original) }}
          </span>
        </template>

        <template #time-cell="{ row }">
          <span
            class="font-display text-flame text-sm font-semibold tracking-wide md:text-base"
          >
            {{ formatTime(row.original) }}
          </span>
        </template>

        <template #result-cell="{ row }">
          <span
            v-if="getResult(row.original)"
            class="font-display text-sm font-bold tracking-wide md:text-base"
            :class="resultClass(getResult(row.original)!.outcome)"
          >
            {{ getResult(row.original)!.label }}
          </span>
          <span v-else class="text-muted">—</span>
        </template>
      </UTable>
    </div>

    <p v-else class="text-muted py-12 text-center">
      No {{ selectedView }} games.
    </p>
  </main>
</template>
