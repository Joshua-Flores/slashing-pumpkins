<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  opponent: string
  gameDate: Date
  score?: {
    slashingPumpkins: number
    opponent: number
  }
}

const props = defineProps<Props>()

/**
 * Common options for Eastern Time formatting
 */
const ET_OPTIONS = { timeZone: 'America/New_York' }

// Formats the Date (e.g., "DEC 21") in Eastern Time
const formattedDate = computed(() => {
  return props.gameDate
    .toLocaleDateString('en-US', {
      ...ET_OPTIONS,
      month: 'short',
      day: 'numeric',
    })
    .toUpperCase()
})

// Formats the Time (e.g., "10:41 PM") in Eastern Time
const formattedTime = computed(() => {
  return props.gameDate.toLocaleTimeString('en-US', {
    ...ET_OPTIONS,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
})

// Formats the score with W/T/L prefix
const formattedScore = computed(() => {
  if (!props.score) return null

  const { slashingPumpkins, opponent } = props.score

  if (slashingPumpkins > opponent) {
    return `W ${slashingPumpkins}-${opponent}`
  } else if (slashingPumpkins === opponent) {
    return `T ${slashingPumpkins}-${opponent}`
  } else {
    return `L ${slashingPumpkins}-${opponent}`
  }
})
</script>

<template>
  <div class="clip-corners bg-orange-400 p-0.5">
    <div
      class="clip-corners grid grid-cols-5 bg-[url(/hockey-ice.png)] bg-cover bg-center"
    >
      <div
        class="col-span-3 flex items-center gap-3 p-3 text-white md:gap-6 md:px-6"
      >
        <img src="/logo.svg" alt="Team Logo" class="h-10 md:h-12" />
        <img
          src="/lightning-bolt.svg"
          alt="VS"
          class="mt-1 h-9 drop-shadow-lg drop-shadow-orange-300 md:mt-2 md:h-12"
        />
        <span class="text-sm leading-snug font-extrabold uppercase md:text-2xl">
          {{ opponent }}
        </span>
      </div>

      <div
        class="col-span-2 flex flex-col items-center justify-center gap-1 p-3 md:gap-2"
      >
        <template v-if="formattedScore">
          <div
            class="text-2xl leading-none font-extrabold text-white md:text-xl"
          >
            {{ formattedScore }}
          </div>
          <div class="text-sm leading-none text-purple-300 md:text-lg">
            FINAL {{ formattedDate }}
          </div>
        </template>
        <template v-else>
          <div
            class="flex items-center gap-2 text-xs leading-none font-extrabold text-white sm:text-sm md:gap-3 md:text-xl"
          >
            <span>{{ formattedDate }}</span>
            <span class="h-full w-0.5 bg-orange-400" />
            <span>{{ formattedTime }}</span>
          </div>
          <span
            class="text-xs leading-none text-purple-300 sm:text-sm md:text-lg"
          >
            FAIRFAX ICE ARENA
          </span>
        </template>
      </div>
    </div>
  </div>
</template>
