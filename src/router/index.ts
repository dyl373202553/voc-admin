import Vue from "vue"
import VueRouter from "vue-router"
import { routes } from "./router"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    base: process.env.NODE_ENV === "development" ? process.env.BASE_URL : process.env.BASE_URL + "/unifyuser/",
    routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
    // @ts-ignore
    return originalPush.call(this, location).catch((err: any) => err)
}
export default router
