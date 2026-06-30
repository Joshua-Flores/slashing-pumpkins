<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter, useRoute } from 'vue-router'

type NavLink = {
  label: string
  route?: string
  url?: string
}

const links: NavLink[] = [
  { label: 'SCHEDULE', route: '/schedule' },
  {
    label: 'STATS',
    url: 'https://www.stiltweb.com/eLeague/fhl/standings.php?div=333',
  },
  {
    label: 'REPLAYS',
    url: 'https://youtube.com/playlist?list=PLjYNU_fJDirJumOS8EHFEZ1OExdFrsti-&si=su26ivhJd3Y3zLhM',
  },
  {
    label: 'DROP-IN',
    url: 'https://www.ice-finder.com/events?zipcode=22030&miles=30&eventType=Stick%20And%20Puck&eventType=Pickup%20Hockey',
  },
]

const router = useRouter()
const route = useRoute()
const scrolled = ref(false)
const open = ref(false)

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

const goTo = (target: string) => {
  open.value = false
  router.push(target)
  window.scrollTo(0, 0)
}

// Always dismiss the mobile menu when the route changes.
watch(
  () => route.fullPath,
  () => (open.value = false),
)

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-60 border-b transition-colors duration-300"
    :class="
      scrolled
        ? 'bg-ink/80 border-white/10 backdrop-blur-xl'
        : 'border-transparent bg-transparent'
    "
  >
    <div
      class="mx-auto flex max-w-310 items-center justify-between gap-6 px-6 py-3"
    >
      <RouterLink to="/" class="flex items-center gap-3" @click="open = false">
        <img
          src="/logo.svg"
          alt="Slashing Pumpkins"
          class="h-11 drop-shadow-md"
        />
        <span
          class="font-display text-fg text-[17px] leading-[0.84] font-extrabold tracking-wide uppercase"
        >
          SLASHING<br />PUMPKINS
        </span>
      </RouterLink>

      <!-- Desktop links -->
      <nav class="hidden items-center gap-8 min-[900px]:flex">
        <template v-for="link in links" :key="link.label">
          <RouterLink
            v-if="link.route"
            :to="link.route"
            class="font-display group text-fg relative flex items-center gap-1.5 py-1.5 text-base font-semibold tracking-wider uppercase opacity-85 transition-opacity hover:opacity-100"
          >
            {{ link.label }}
            <span
              class="bg-flame absolute -bottom-0.5 left-0 h-0.5 w-0 shadow-[0_0_10px_var(--color-flame)] transition-all duration-200 group-hover:w-full"
            />
          </RouterLink>
          <a
            v-else
            :href="link.url"
            target="_blank"
            rel="noopener"
            class="font-display group text-fg relative flex items-center gap-1.5 py-1.5 text-base font-semibold tracking-wider uppercase opacity-85 transition-opacity hover:opacity-100"
          >
            {{ link.label }}
            <i class="pi pi-arrow-up-right text-[10px] opacity-60" />
            <span
              class="bg-flame absolute -bottom-0.5 left-0 h-0.5 w-0 shadow-[0_0_10px_var(--color-flame)] transition-all duration-200 group-hover:w-full"
            />
          </a>
        </template>
      </nav>

      <!-- Mobile burger -->
      <button
        type="button"
        class="text-flame text-2xl min-[900px]:hidden"
        aria-label="Open menu"
        @click="open = true"
      >
        <i class="pi pi-bars" />
      </button>
    </div>

    <!-- Mobile fullscreen menu -->
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="open"
        class="bg-ink-2 fixed inset-0 z-70 flex flex-col justify-center gap-2 p-8"
      >
        <button
          type="button"
          class="text-flame absolute top-6 right-6 text-3xl"
          aria-label="Close menu"
          @click="open = false"
        >
          <i class="pi pi-times" />
        </button>
        <template v-for="link in links" :key="link.label">
          <a
            v-if="link.route"
            class="font-display border-b border-white/10 py-3 text-3xl font-extrabold tracking-wide uppercase"
            @click="goTo(link.route)"
          >
            {{ link.label }}
          </a>
          <a
            v-else
            :href="link.url"
            target="_blank"
            rel="noopener"
            class="font-display flex items-center gap-2 border-b border-white/10 py-3 text-3xl font-extrabold tracking-wide uppercase"
            @click="open = false"
          >
            {{ link.label }}
            <i class="pi pi-arrow-up-right text-base opacity-60" />
          </a>
        </template>
      </div>
    </Transition>
  </header>
</template>
