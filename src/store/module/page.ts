import {
    VuexModule,
    Module,
    Action,
    Mutation,
    getModule
} from "vuex-module-decorators";

import store from "@/store";

export interface PageState {
    isTop: boolean;
}

@Module({ dynamic: true, store, name: "page" })
class Config extends VuexModule implements PageState {
    public isTop = false

    @Mutation
    public setIsTop(val: boolean) {
        this.isTop = val
    }
}

export const PageModule = getModule(Config);