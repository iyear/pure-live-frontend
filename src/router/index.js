import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout/Layout";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: Layout,
        redirect: "/live",
        children: [
            {
                path: "live",
                name: "Live",
                component: () => import("@/pages/live")
            }
        ]
    },
    {
        path: "/favourite",
        component: Layout,
        redirect: "/favourite/manage",
        name: "Favourite",
        children: [
            {
                path: "manage",
                component: () => import("@/pages/favourite"),
                name: "FavManage",
            }
        ]
    }
]

const router = new VueRouter({
    mode: "history",
    routes: routes,
})

export default router
