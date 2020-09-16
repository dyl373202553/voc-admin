import {
    VuexModule,
    Module,
    Action,
    Mutation,
    getModule
} from "vuex-module-decorators";

import store from "@/store";

export interface ConfigState {
    uaa: string
    baseUrl: string
    user: any
    api: string
    dict: string
}

@Module({ dynamic: true, store, name: "config" })
class Config extends VuexModule implements ConfigState {
    public uaa = `uaa/oauth/token`
    public user = `uaa/api/getUserInfo`
    public baseUrl = `/vue-potal`
    public api = `/information-unifyuser/api`
    public dict = `/configure-system/api/dict/sysDictValue/getDictValueList`

}

export const ConfigModule = getModule(Config);