import { createRouter, createWebHashHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { authStore } from './store/auth-store';

import AccessDeniedComponent from './pages/AccessDenied.vue';
import DashboardComponent from './components/Dashboard.vue';
import ErrorComponent from './pages/Error.vue';
import LoggedOutComponent from './pages/LoggedOut.vue';
import NotFoundComponent from './pages/NotFound.vue';

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: '/hello-world',
    name: 'helloworld',
    component: () => import('./components/HelloWorld.vue'),
    props: {
      msg: 'Hi there!',
    }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('./pages/Products.vue'),
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorComponent,
    meta: { anonymous: true, },
  },
  {
    path: '/not-found',
    name: 'notfound',
    component: NotFoundComponent,
    meta: { anonymous: true, layout: 'NoMenuLayout' },
  },
  {
    path: '/access-denied',
    name: 'access',
    component: AccessDeniedComponent,
    meta: { anonymous: true },
  },
  {
    path: '/logout',
    name: 'logout',
    component: LoggedOutComponent,
    meta: { anonymous: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach(async (to, from) => {
  await authStore.init();

  // Redirect to Dashboard when user is authenticated & on AccessDenied page
  if (authStore.authenticated && to.name === 'access') {
    return '/';
  }

  // Redirect to AccessDenied page when user has insufficient permissions
  const canAccess = await canUserAccess(to);
  if (!canAccess) {
    return {
      name: 'access',
      query: { redirect: to.path },
    };
  }
});

const canUserAccess = async (route: RouteLocationNormalized) => {
  // Allow access to anonymous pages or when user is authenticated
  // @TODO: Implement ACL checks here
  return route.meta?.anonymous || authStore.authenticated;
};

export default router;
