import { createRouter, createWebHistory } from 'vue-router'

const history = createWebHistory((window.__POWERED_BY_QIANKUN__ as boolean) ? `/energycarbon` : `/energycarbon`)

const routes = [
  {
    path: '/',
    redirect: { name: 'home' }
  },
  {
    path: '/feecarbonrecalculate',
    name: 'home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/about/index.vue')
  }
]

const router = createRouter({
  history,
  routes
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  next()
})

export default router
