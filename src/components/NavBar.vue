<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router'
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import type { MenuItem } from 'primevue/menuitem'

const router = useRouter()

const handleNavigation = (route: string) => {
  router.push(route)
  window.scrollTo(0, 0)
}

const menuItems = ref<MenuItem[]>([
  {
    label: 'SCHEDULE',
    route: '/schedule',
  },
  {
    label: 'ROSTER',
    route: '/roster',
  },
  {
    label: 'LATEST STATS',
    url: 'http://www.stiltweb.com/eLeague/fhl/standings.php?div=328',
    target: '_blank',
  },
  {
    label: 'YOUTUBE REPLAYS',
    url: 'https://youtube.com/playlist?list=PLjYNU_fJDirJumOS8EHFEZ1OExdFrsti-&si=su26ivhJd3Y3zLhM',
    target: '_blank',
  },
  {
    label: 'LOCAL DROP-IN TIMES',
    url: 'https://www.ice-finder.com/events?zipcode=22030&miles=30&eventType=Stick%20And%20Puck&eventType=Pickup%20Hockey',
    target: '_blank',
  },
])
</script>

<template>
  <Menubar
    :model="menuItems"
    breakpoint="768px"
    :pt="{
      root: {
        class: `
          sticky! top-0! z-50! h-18!
          bg-purple-500/10! backdrop-blur-xl!
          border-none! rounded-none! px-4!
          flex justify-between!
          md:justify-start!
        `,
      },
      rootList: {
        class: `
          border-0! rounded-none! font-bold
          text-xl! md:text-base!
          px-4! py-6! md:p-0! gap-2!
          max-md:bg-linear-to-br! max-md:from-purple-950! max-md:to-purple-600!
          md:bg-transparent!
          h-screen! md:h-auto!
        `,
      },
      item: {
        class: 'bg-transparent! ',
      },
      itemContent: {
        class: 'bg-transparent! hover:bg-orange-500! transition! duration-150!',
      },
      menu: {
        class: 'gap-8! font-semibold! max-md:hidden!',
      },
      button: { class: 'hover:bg-transparent!' },
      buttonIcon: {
        class: 'md:hidden! w-6! h-6! text-xl! text-orange-400',
      },
    }"
  >
    <template #start>
      <RouterLink to="/">
        <img src="/logo.svg" class="mr-2 w-16" />
      </RouterLink>
    </template>
    <template #item="{ item }">
      <a
        v-if="item.route"
        @click.prevent="handleNavigation(item.route)"
        class="flex cursor-pointer items-center p-2 py-1 text-white"
      >
        {{ item.label }}
      </a>
      <a
        v-else
        :href="item.url"
        :target="item.target"
        class="flex items-center gap-2 p-2 py-1 text-white"
      >
        {{ item.label }}
        <i class="pi pi-arrow-up-right text-sm"></i>
      </a>
    </template>
  </Menubar>
</template>
