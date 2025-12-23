import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ScheduleView from '@/views/ScheduleView.vue'
import RosterView from '@/views/RosterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView,
    },
    {
      path: '/roster',
      name: 'roster',
      component: RosterView,
    },
  ],
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
