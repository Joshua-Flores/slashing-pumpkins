<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  opponent: string
  gameDate: Date
  isHome: boolean
  featured?: boolean
}

const props = defineProps<Props>()

const ET_OPTIONS = { timeZone: 'America/New_York' }

const formattedDate = computed(() =>
  props.gameDate
    .toLocaleDateString('en-US', {
      ...ET_OPTIONS,
      month: 'short',
      day: 'numeric',
    })
    .toUpperCase(),
)

const formattedTime = computed(() =>
  props.gameDate.toLocaleTimeString('en-US', {
    ...ET_OPTIONS,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }),
)
</script>

<template>
  <div
    class="from-panel to-ink-2 relative flex flex-col overflow-hidden rounded-[10px] border border-white/10 bg-gradient-to-b px-5.5 pt-6"
  >
    <!-- Top accent bar -->
    <span
      class="absolute inset-x-0 top-0 h-[3px]"
      :class="
        featured
          ? 'bg-flame shadow-[0_0_18px_var(--color-flame)]'
          : 'bg-white/15'
      "
    />

    <span
      class="font-display text-teal self-start rounded border border-white/15 px-2.5 py-1 text-[11px] font-bold tracking-[0.16em]"
    >
      {{ isHome ? 'HOME' : 'AWAY' }}
    </span>

    <div class="flex items-center gap-4 py-5.5">
      <img src="/logo.svg" alt="" class="h-13 shrink-0" />
      <span class="font-display text-muted shrink-0 text-[22px] font-bold">
        {{ isHome ? 'VS' : '@' }}
      </span>
      <span
        class="font-display min-w-0 text-[clamp(1.25rem,2.4vw,1.75rem)] leading-[0.95] font-extrabold [overflow-wrap:anywhere] uppercase"
      >
        {{ opponent }}
      </span>
    </div>

    <div
      class="font-display flex items-center gap-3 border-t border-white/10 py-4 text-[13px] font-semibold tracking-wide uppercase"
    >
      <span>{{ formattedDate }}</span>
      <span class="text-flame">{{ formattedTime }}</span>
    </div>
  </div>
</template>
