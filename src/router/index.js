// import third-party modules
import Vue from 'vue';
import VueRouter from 'vue-router';
// import local modules
import Layout from '@/layout/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/live',
    children: [{
      path: 'live',
      name: 'Live',
      component: () => import('@/views/live/index.vue'),
    }],
  },
  {
    path: '/fav',
    component: Layout,
    redirect: '/fav/manage',
    name: 'Fav',
    children: [
      {
        path: 'manage',
        component: () => import('@/pages/Fav.vue'),
        name: 'FavManage',
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes: routes,
});

export default router;
