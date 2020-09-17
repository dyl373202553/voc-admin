export default [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/IndexPage/Home.vue"),
        meta: {
            title: "首页"
        }
    },
    {
        path: "/OverseeList",
        name: "OverseeList",
        component: () => import("@/views/oversee/OverseeList.vue"),
        meta: {
            title: "督办管理"
        }
    }
]
