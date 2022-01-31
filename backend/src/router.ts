import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import { authStore } from './store/auth-store';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
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
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('./pages/Login.vue'),
  //   meta: { anonymous: true },
  // },
  {
    path: '/error',
    name: 'error',
    component: () => import('./pages/Error.vue')
  },
  {
    path: '/notfound',
    name: 'notfound',
    component: () => import('./pages/NotFound.vue')
  },
  {
    path: '/access-denied',
    name: 'access',
    component: () => import('./pages/AccessDenied.vue'),
    meta: { anonymous: true },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const canUserAccess = async (route: RouteLocationNormalized) => {
  // Allow access to anonymous pages or when user is authenticated (no ACL yet)
  return route.meta?.anonymous || authStore.authenticated;
}

router.beforeEach(async (to, from) => {
  await authStore.init();
  if (authStore.authenticated && to.name === 'access') {
    // Redirect to Dashboard when on Access Denied page & authenticated
    return '/';
  }
  const canAccess = await canUserAccess(to);
  if (!canAccess) return '/access-denied';
})

export default router;