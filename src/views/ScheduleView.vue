<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import SelectButton from 'primevue/selectbutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import SectionHead from '@/components/SectionHead.vue'
import { games, type Game } from '@/data/games'

const route = useRoute()
const selectedView = ref<'Upcoming' | 'Past'>(
  route.query.tab === 'past' ? 'Past' : 'Upcoming',
)
const options = ref(['Upcoming', 'Past'])

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
  <main class="mx-auto max-w-4xl px-6 py-16 md:py-21">
    <SectionHead eyebrow="The full slate" title="Schedule" />

    <SelectButton
      v-model="selectedView"
      :options="options"
      :allow-empty="false"
      unstyled
      :pt="{
        root: {
          class:
            'mb-8 flex w-full rounded-lg border border-white/10 bg-ink-2 p-1 md:inline-flex md:w-auto',
        },
        pcToggleButton: {
          root: ({ context }: { context: { active: boolean } }) => ({
            class: [
              'font-display flex-1 cursor-pointer rounded-md px-5 py-2.5 text-center text-[13px] font-bold tracking-[0.14em] uppercase transition md:flex-none',
              context.active
                ? 'bg-flame text-ink shadow-[0_0_22px_-6px_var(--color-flame)]'
                : 'text-muted hover:text-white',
            ],
          }),
        },
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

      <DataTable
        :value="filteredGames"
        unstyled
        :pt="{
          tableContainer: { class: 'overflow-x-auto' },
          table: { class: 'w-full text-left' },
          headerRow: { class: 'border-b border-white/10' },
          bodyRow: {
            class: 'border-b border-white/5 transition hover:bg-white/[0.03]',
          },
          column: {
            headerCell: {
              class:
                'font-display text-muted px-3 py-4 text-sm font-bold tracking-[0.16em] whitespace-nowrap uppercase md:px-5',
            },
            bodyCell: {
              class: 'px-3 py-4 align-middle whitespace-nowrap md:px-5',
            },
          },
        }"
      >
        <Column v-if="selectedView === 'Upcoming'" header="Home">
          <template #body="{ data }">
            <span
              class="font-display text-sm font-bold uppercase md:text-base"
              :class="isUs(data.homeTeam) ? 'text-flame' : 'text-fg'"
              >{{ data.homeTeam }}</span
            >
          </template>
        </Column>
        <Column header="Away">
          <template #body="{ data }">
            <span
              class="font-display text-sm font-bold uppercase md:text-base"
              :class="isUs(data.awayTeam) ? 'text-flame' : 'text-fg'"
              >{{ data.awayTeam }}</span
            >
          </template>
        </Column>
        <Column v-if="selectedView === 'Past'" header="Home">
          <template #body="{ data }">
            <span
              class="font-display text-sm font-bold uppercase md:text-base"
              :class="isUs(data.homeTeam) ? 'text-flame' : 'text-fg'"
              >{{ data.homeTeam }}</span
            >
          </template>
        </Column>
        <Column header="Date">
          <template #body="{ data }">
            <span
              class="font-display text-muted text-sm font-semibold tracking-wide md:text-base"
            >
              {{ formatDate(data) }}
            </span>
          </template>
        </Column>
        <Column v-if="selectedView === 'Upcoming'" header="Time">
          <template #body="{ data }">
            <span
              class="font-display text-flame text-sm font-semibold tracking-wide md:text-base"
            >
              {{ formatTime(data) }}
            </span>
          </template>
        </Column>
        <Column v-else header="Result">
          <template #body="{ data }">
            <span
              v-if="getResult(data)"
              class="font-display text-sm font-bold tracking-wide md:text-base"
              :class="resultClass(getResult(data)!.outcome)"
            >
              {{ getResult(data)!.label }}
            </span>
            <span v-else class="text-muted">—</span>
          </template>
        </Column>
      </DataTable>
    </div>

    <p v-else class="text-muted py-12 text-center">
      No {{ selectedView.toLowerCase() }} games.
    </p>
  </main>
</template>
