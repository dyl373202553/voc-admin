export default [
    {
        path: "/",
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
        path: "/OverseeAnswer",
        name: "OverseeAnswer",
        hidden: true,
        component: () => import("@/views/toDoList/OverseeAnswer.vue"),
        meta: {
            title: "督办回答"
        }
    },
    {
        path: "/programList",
        meta: { title: "我的节目" },
        component: () => import("@/components/layout/AppMain.vue"),
        children: [
            {
                path: "/ProgramSummary",
                name: "ProgramSummary",
                hidden: true,
                component: () => import("@/views/programList/ProgramSummary.vue"),
                meta: {
                    title: "小结"
                }
            },
            {
                path: "/ProgramList",
                name: "ProgramList",
                component: () => import("@/views/programList/ProgramList.vue"),
                meta: {
                    title: "节目列表"
                }
            },
            {
                path: "/ProgramDetail",
                name: "ProgramDetail",
                hidden: true,
                component: () => import("@/views/programList/ProgramDetail.vue"),
                meta: {
                    title: "节目详情"
                }
            },
            {
                path: "/CreateStudio",
                name: "CreateStudio",
                component: () => import("@/views/programList/CreateStudio.vue"),
                meta: {
                    title: "创建直播间"
                }
            },
            {
                path: "/ProgramManage",
                name: "ProgramManage",
                component: () => import("@/views/programList/programManage/ProgramManage.vue"),
                meta: {
                    title: "节目管理"
                }
            },
            {
                path: "/ProgramRelease",
                name: "ProgramRelease",
                component: () => import("@/views/programList/ProgramRelease.vue"),
                meta: {
                    title: "发布节目"
                }
            }
        ]
    },
    {
        path: "/SpecialFocus",
        meta: { title: "特别关注" },
        component: () => import("@/components/layout/AppMain.vue"),
        children: [
            {
                path: "/SpecialFocus",
                name: "SpecialFocus",
                component: () => import("@/views/specialFocus/SpecialFocus.vue"),
                meta: {
                    title: "发布特别关注"
                }
            },
            {
                path: "/ContentManagement",
                name: "ContentManagement",
                component: () => import("@/views/specialFocus/ContentManagement.vue"),
                meta: {
                    title: "内容管理"
                }
            }
        ]
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
        hidden: true,
        component: () => import("@/views/oversee/OverseeCheck.vue"),
        meta: {
            title: "督办查看"
        }
    },
    {
        path: "/dataExport",
        name: "DataExport",
        component: () => import("@/views/dataExport/DataExport.vue"),
        meta: {
            title: "数据导出"
        }
    }
]
