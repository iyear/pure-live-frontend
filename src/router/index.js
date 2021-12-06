import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from "@/layout/Layout";

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        component: Layout,
        redirect: "/live",
        children: [{
            path: "live",
            name: "Live",
            component: () => import("@/views/live/index")
        }]
    },
    {
        path: "/fav",
        component: Layout,
        redirect: "/fav/manage",
        name: "Fav",
        children: [
            {
                path: "manage",
                component: () => import("@/views/fav/index"),
                name: "FavManage",
            }
        ]
    }
]

const router = new VueRouter({
    mode: "history",
    routes
})

export default router
