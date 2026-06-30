<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'

type Props = {
  target: Date
}

const props = defineProps<Props>()

const now = ref(new Date())
let timer: ReturnType<typeof setInterval>

const segments = computed(() => {
  const diff = Math.max(0, props.target.getTime() - now.value.getTime())
  return [
    { value: Math.floor(diff / (1000 * 60 * 60 * 24)), label: 'DAYS' },
    { value: Math.floor((diff / (1000 * 60 * 60)) % 24), label: 'HRS' },
    { value: Math.floor((diff / (1000 * 60)) % 60), label: 'MIN' },
    { value: Math.floor((diff / 1000) % 60), label: 'SEC' },
  ]
})

const pad = (num: number) => num.toString().padStart(2, '0')

onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div
    class="flex w-auto w-full items-start justify-around gap-2 md:justify-start md:gap-8"
  >
    <div
      v-for="segment in segments"
      :key="segment.label"
      class="flex flex-col items-center md:min-w-9"
    >
      <div
        class="font-digital relative text-[34px] leading-none md:text-[38px]"
      >
        <span class="text-flame font-digital opacity-[0.13]" aria-hidden="true"
          >88</span
        >
        <span
          class="text-flame font-digital absolute inset-0 [text-shadow:0_0_18px_color-mix(in_srgb,var(--color-flame)_60%,transparent)]"
        >
          {{ pad(segment.value) }}
        </span>
      </div>
      <span
        class="font-display text-muted mt-[5px] text-[10px] font-semibold tracking-[0.14em]"
      >
        {{ segment.label }}
      </span>
    </div>
  </div>
</template>
