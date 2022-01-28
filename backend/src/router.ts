import { createRouter, createWebHashHistory, RouteLocationNormalized } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import { auth } from './service/Firebase';

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
  {
    path: '/login',
    name: 'login',
    component: () => import('./pages/Login.vue'),
    meta: { anonymous: true },
  },
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
  // {
  //   path: '/access',
  //   name: 'access',
  //   component: () => import('./pages/Access.vue')
  // },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const canUserAccess = async (route: RouteLocationNormalized) => {
  return true;
  if (auth.currentUser?.uid) {
    return true;
  }
  if (Math.random() > 0.5) return true;
  return false;
}

router.beforeEach(async (to, from) => {
  const canAccess = await canUserAccess(to);
  if (!canAccess) return '/login';
})

export default router;