export default [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/IndexPage/Home.vue")
    },
    {
        path: "/OverseeList",
        name: "OverseeList",
        component: () => import("@/views/oversee/OverseeList.vue"),
        meta: {
            title: "OverseeList"
        }
    }
]
