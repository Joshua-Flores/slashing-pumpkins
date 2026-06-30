<script setup lang="ts">
type Props = {
  eyebrow: string
  title: string
}

defineProps<Props>()
</script>

<template>
  <div class="mb-9 flex items-end justify-between gap-5">
    <div>
      <div
        class="font-display text-teal mb-2 flex items-center gap-2.5 font-semibold tracking-[0.16em] uppercase"
      >
        <span
          class="bg-flame inline-block h-[7px] w-[7px] rounded-full shadow-[0_0_12px_var(--color-flame)]"
        />
        {{ eyebrow }}
      </div>
      <h2
        class="font-display text-[clamp(2.125rem,5.4vw,4.125rem)] leading-[0.9] font-extrabold uppercase"
      >
        {{ title }}
      </h2>
    </div>
    <div class="shrink-0">
      <slot name="action" />
    </div>
  </div>
</template>
