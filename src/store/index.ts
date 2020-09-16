import Vue from 'vue'
import Vuex from 'vuex'
import { UserState } from './module/user'
import { ConfigState } from './module/config'

Vue.use(Vuex)

export interface IRootState {
    user: UserState
    config: ConfigState
}

export default new Vuex.Store<IRootState>({})