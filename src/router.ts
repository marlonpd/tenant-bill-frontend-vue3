import { createRouter, createWebHashHistory, RouteParams } from 'vue-router'
import Login from './pages/Login.vue'

export type AppRouteNames = 'home' | 'my-feed'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login,
    },
  ],
})

export function routerPush(name: AppRouteNames, params?: RouteParams) {
  if (params) return router.push({ name, params })
  else return router.push({ name })
}
