import Vue from "vue"
import Vuex from "vuex"
import { UserState } from "./module/user"
import { ConfigState } from "./module/config"
import { PageState } from "./module/page"

Vue.use(Vuex)

export interface IRootState {
    user: UserState;
    config: ConfigState;
    page: PageState;
}

export default new Vuex.Store<IRootState>({})
