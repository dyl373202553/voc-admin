import {
    VuexModule,
    Module,
    getModule
} from "vuex-module-decorators"

import store from "@/store"

export interface ConfigState {
    uaa: string;
    baseUrl: string;
    user: any;
    api: string;
    dict: string;
    voc: string;
}

@Module({ dynamic: true, store, name: "config" })
class Config extends VuexModule implements ConfigState {
    public uaa = `uaa/oauth/token`
    public user = `uaa/api/getUserInfo`
    public baseUrl = `/vue-potal`
    public api = `/information-unifyuser/api`
    // public dict = `/configure-system/api/dict/sysDictValue/getDictValueList`
    public voc = `moa-customervoice/api/modules` // 客户之声
    public dict = `configure-system/api/dict/sysDictType/data`
    public dictValue = `configure-system/api/server/dict/getDictValueList`
    public addressBook = `app-address/api/bluepage` // 通讯录
}

export const ConfigModule = getModule(Config)
