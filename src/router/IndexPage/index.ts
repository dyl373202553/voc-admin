export default [
    {
        path: "/home",
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
    },
    {
        path: "/OverseeCheck",
        name: "OverseeCheck",
        component: () => import("@/views/oversee/OverseeCheck.vue"),
        meta: {
            title: "OverseeCheck"
        }
    },
    {
        path: "/OverseeAnswer",
        name: "OverseeAnswer",
        component: () => import("@/views/toDoList/OverseeAnswer.vue"),
        meta: {
            title: "OverseeAnswer"
        }
    },
    {
        path: "/ToDoList",
        name: "ToDoList",
        component: () => import("@/views/toDoList/ToDoList.vue"),
        meta: {
            title: "ToDoList"
        }
    },
    {
        path: "/SpecialFocus",
        name: "SpecialFocus",
        component: () => import("@/views/specialFocus/SpecialFocus.vue"),
        meta: {
            title: "SpecialFocus"
        }
    },
    {
        path: "/ContentManagement",
        name: "ContentManagement",
        component: () => import("@/views/specialFocus/contentManagement/ContentManagement.vue"),
        meta: {
            title: "ContentManagement"
        }
    }

]
