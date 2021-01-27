import { createRouter, createWebHashHistory, RouteParams } from 'vue-router';

import HomePage from './pages/Home.vue';
import LoginPage from './pages/Login.vue';
import RegisterPage from './pages/Register.vue';
import TenantsPage from './pages/Tenants.vue';

export type AppRouteNames = 'home' | 'login' | 'tenants';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: 'home',
      path: '/',
      component: HomePage,
    },
    {
      name: 'login',
      path: '/login',
      component: LoginPage,
    },
    {
      name: 'register',
      path: '/register',
      component: RegisterPage,
    },
    { name: 'tenants', path: '/tenants', component: TenantsPage },
  ],
});

export function routerPush(name: AppRouteNames, params?: RouteParams) {
  if (params) return router.push({ name, params });
  else return router.push({ name });
}
