// import third-party modules
import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// import local modules
import Layout from "@/layouts/PageLayout";
import FavouritePage from '@/pages/FavouritePage'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: Layout,
    children: [
      {
        path: "",
        component: FavouritePage,
      }
    ],
    meta: {
      keepAlive: true,
    }
  },
  {
    path: "/live",
    component: Layout,
    children: [
      {
        path: "",
        component: () => import("@/pages/LivePage")
      }
    ]
  },
  {
    path: '*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue')
  }
]

const router = new VueRouter({
  mode: "history",
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((_to, _from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
