import { createRouter, createWebHashHistory, RouteParams } from 'vue-router';

import HomePage from './pages/Home.vue';
import LoginPage from './pages/Login.vue';
import RegisterPage from './pages/Register.vue';
import TenantsPage from './pages/Tenants.vue';
import JwtService from './services/jwt';

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

router.beforeEach((to, from, next) => {
  if (
    (to.path === '/login' || from.path === 'login') &&
    JwtService.getToken() !== undefined
  ) {
    routerPush('tenants');
  }

  if (
    (to.path === '/tenants' || from.path === 'tenants') &&
    JwtService.getToken() === undefined
  ) {
    routerPush('login');
  }

  if (to.path === '/') {
    routerPush('login');
  }

  next();
});
