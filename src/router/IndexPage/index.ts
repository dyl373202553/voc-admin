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
    },
    {
        path: "/ProgramSummary",
        name: "ProgramSummary",
        component: () => import("@/views/programList/ProgramSummary.vue"),
        meta: {
            title: "ProgramSummary"
        }
    },
    {
        path: "/ProgramList",
        name: "ProgramList",
        component: () => import("@/views/programList/ProgramList.vue"),
        meta: {
            title: "ProgramList"
        }
    },
    {
        path: "/ProgramDetail",
        name: "ProgramDetail",
        component: () => import("@/views/programList/ProgramDetail.vue"),
        meta: {
            title: "ProgramDetail"
        }
    },
    {
        path: "/CreateStudio",
        name: "CreateStudio",
        component: () => import("@/views/programList/CreateStudio.vue"),
        meta: {
            title: "CreateStudio"
        }
    }

]
