import { RouteConfig } from "vue-router"
import IndexPage from "./IndexPage"

export const appRouter: Array<RouteConfig> = [
    ...IndexPage
]

export const routes: Array<RouteConfig> = [
    ...appRouter
]
