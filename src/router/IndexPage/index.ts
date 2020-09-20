export default [
    {
        path: "/home",
        name: "home",
        meta: { title: "首页" },
        component: () => import("@/views/IndexPage/Home.vue")
    },
    {
        path: "/toDolist",
        name: "ToDoList",
        meta: { title: "待办工作" },
        component: () => import("@/views/toDoList/ToDoList.vue")
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
        path: "/Oversee",
        meta: { title: "督办管理" },
        children: [
            {
                path: "/Oversee/OverseeList",
                name: "OverseeList",
                component: () => import("@/views/oversee/OverseeList.vue"),
                meta: {
                    title: "督办管理"
                }
            },
            {
                path: "/Oversee/OverseeCheck",
                name: "OverseeCheck",
                component: () => import("@/views/oversee/OverseeCheck.vue"),
                meta: {
                    title: "OverseeCheck"
                }
            }
        ]
    }

    // {
    //     path: "/OverseeAnswer",
    //     name: "OverseeAnswer",
    //     component: () => import("@/views/toDoList/OverseeAnswer.vue"),
    //     meta: {
    //         title: "OverseeAnswer"
    //     }
    // },

    // {
    //     path: "/SpecialFocus",
    //     name: "SpecialFocus",
    //     component: () => import("@/views/specialFocus/SpecialFocus.vue"),
    //     meta: {
    //         title: "SpecialFocus"
    //     }
    // },
    // {
    //     path: "/ContentManagement",
    //     name: "ContentManagement",
    //     component: () => import("@/views/specialFocus/contentManagement/ContentManagement.vue"),
    //     meta: {
    //         title: "ContentManagement"
    //     }
    // },
    // {
    //     path: "/ProgramSummary",
    //     name: "ProgramSummary",
    //     component: () => import("@/views/programList/ProgramSummary.vue"),
    //     meta: {
    //         title: "ProgramSummary"
    //     }
    // },
    // {
    //     path: "/ProgramList",
    //     name: "ProgramList",
    //     component: () => import("@/views/programList/ProgramList.vue"),
    //     meta: {
    //         title: "ProgramList"
    //     }
    // },
    // {
    //     path: "/ProgramDetail",
    //     name: "ProgramDetail",
    //     component: () => import("@/views/programList/ProgramDetail.vue"),
    //     meta: {
    //         title: "ProgramDetail"
    //     }
    // },
    // {
    //     path: "/CreateStudio",
    //     name: "CreateStudio",
    //     component: () => import("@/views/programList/CreateStudio.vue"),
    //     meta: {
    //         title: "CreateStudio"
    //     }
    // },
    // {
    //     path: "/ProgramManage",
    //     name: "ProgramManage",
    //     component: () => import("@/views/programList/programManage/ProgramManage.vue"),
    //     meta: {
    //         title: "ProgramManage"
    //     }
    // },
    // {
    //     path: "/ProgramRelease",
    //     name: "ProgramRelease",
    //     component: () => import("@/views/programList/ProgramRelease.vue"),
    //     meta: {
    //         title: "ProgramRelease"
    //     }
    // }
]
