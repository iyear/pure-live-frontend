// import third-party modules
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import Vue from 'vue';
import VueRouter from 'vue-router';
// import local modules
import Layout from '@/layout/default-layout.vue';

Vue.use(VueRouter);
NProgress.configure({ showSpinner: false }); // NProgress Configuration

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/live',
    children: [{
      path: 'live',
      name: 'Live',
      component: () => import('@/pages/Player.vue'),
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

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
