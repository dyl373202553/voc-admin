import { RouteConfig } from 'vue-router'
import User from "./User/index"


export const appRouter: Array<RouteConfig> = [
    ...User
]

export const routes: Array<RouteConfig> = [
    ...appRouter
]