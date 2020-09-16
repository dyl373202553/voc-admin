import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from "./router"

Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: process.env.NODE_ENV === 'development' ? process.env.BASE_URL : process.env.BASE_URL + '/unifyuser/',
    routes
})

// router.beforeEach(async (to, from, next) => {
//     next()
// })

export default router