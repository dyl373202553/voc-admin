export default [
    {
        path: "/",
        name: "home",
        role: "all",
        meta: {
            title: "首页",
            deepth: 1,
            keepAlive: true // 需要被缓存},
        },
        component: (resolve: any) => require(["@/views/IndexPage/Home.vue"], resolve)
    },
    {
        path: "/toDolist",
        name: "ToDoList",
        role: "all",
        meta: {
            title: "待办工作",
            deepth: 1,
            keepAlive: true // 需要被缓存
        },
        component: () => import("@/views/toDoList/ToDoList.vue")
    },
    {
        path: "/OverseeAnswer",
        name: "OverseeAnswer",
        hidden: true,
        role: "all",
        component: () => import("@/views/toDoList/OverseeAnswer.vue"),
        meta: {
            title: "督办回答",
            deepth: 2,
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: "/programList",
        meta: { title: "我的节目" },
        role: "all",
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
                role: "all",
                component: () => import("@/views/programList/ProgramList.vue"),
                meta: {
                    title: "节目列表",
                    deepth: 1,
                    keepAlive: true // 需要被缓存
                }
            },
            {
                path: "/ProgramDetail",
                name: "ProgramDetail",
                hidden: true,
                component: () => import("@/views/programList/ProgramDetail.vue"),
                meta: {
                    title: "节目详情",
                    deepth: 2,
                    keepAlive: true // 需要被缓存
                }
            },
            {
                path: "/CreateStudio",
                name: "CreateStudio",
                role: 0,
                component: () => import("@/views/programList/CreateStudio.vue"),
                meta: {
                    title: "创建直播间"
                }
            },
            {
                path: "/ProgramRelease",
                name: "ProgramRelease",
                role: "all",
                component: () => import("@/views/programList/ProgramRelease.vue"),
                meta: {
                    title: "发布节目",
                    deepth: 2,
                    keepAlive: true // 需要被缓存
                }
            },
            {
                path: "/ProgramManage",
                name: "ProgramManage",
                role: "all",
                component: () => import("@/views/programList/programManage/ProgramManage.vue"),
                meta: {
                    title: "节目管理",
                    deepth: 1,
                    keepAlive: true // 需要被缓存
                }
            }
        ]
    },
    {
        path: "/SpecialFocus",
        meta: { title: "特别关注" },
        role: 0,
        component: () => import("@/components/layout/AppMain.vue"),
        children: [
            {
                path: "/SpecialFocus",
                name: "SpecialFocus",
                role: 0,
                component: () => import("@/views/specialFocus/SpecialFocus.vue"),
                meta: {
                    title: "发布特别关注",
                    deepth: 2,
                    keepAlive: true // 需要被缓存
                }
            },
            {
                path: "/ContentManagement",
                name: "ContentManagement",
                role: 0,
                component: () => import("@/views/specialFocus/ContentManagement.vue"),
                meta: {
                    title: "内容管理",
                    deepth: 1,
                    keepAlive: true // 需要被缓存
                }
            }
        ]
    },
    {
        path: "/OverseeList",
        name: "OverseeList",
        role: 0,
        component: () => import("@/views/oversee/OverseeList.vue"),
        meta: {
            title: "督办管理",
            deepth: 1,
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: "/OverseeCheck",
        name: "OverseeCheck",
        hidden: true,
        component: () => import("@/views/oversee/OverseeCheck.vue"),
        meta: {
            title: "督办查看",
            deepth: 2,
            keepAlive: true // 需要被缓存
        }
    },
    {
        path: "/dataExport",
        name: "DataExport",
        role: 0,
        component: () => import("@/views/dataExport/DataExport.vue"),
        meta: {
            title: "数据导出"
        }
    }
]
