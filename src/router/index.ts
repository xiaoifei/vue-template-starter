import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),
      meta: { title: '工作台' },
    },
  ],
})

router.beforeEach((to) => {
  if (to.meta.title) document.title = `${String(to.meta.title)} · SI Comic Studio`
})

export default router
