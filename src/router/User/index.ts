export default [
    {
        path: "/",
        name: "organizeManage",
        component: () => import("@/views/User/organizeManage.vue"),
        meta: {
            title: "组织管理"
        }
    },
    {
        path: "/userManage",
        name: "userManage",
        component: () => import("@/views/User/userManage.vue"),
        meta: {
            title: "用户管理"
        }
    },
    {
        path: "/",
        name: "addUser",
        component: () => import("@/views/User/addUser.vue"),
        meta: {
            title: "添加用户"
        }
    }
]