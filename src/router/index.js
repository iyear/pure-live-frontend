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
        ]
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
    }
]

const router = new VueRouter({
    mode: "history",
    routes: routes,
})

router.beforeEach((_to, _from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

export default router
