<template>
    <div class="Header">
        <div class="body">
            <div class="left">
                <img src="@/assets/public/logo.png" class="logo" />
                <div class="dividing"></div>
                <div class="title">用户管理平台</div>

                <nav class="nav">
                    <div :class="{'selectNav':selectNav == 1}" @click="nav('index')">用户管理</div>
                </nav>
            </div>
            <div class="right">
                <i class="iconfont iconicon_signout"></i>
                <i class="iconfont iconicon_home"></i>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch, Vue, Emit } from "vue-property-decorator";
// @ts-ignore
import { UserModule } from "@/store/module/user";

@Component
export default class Header extends Vue {
    $router: any;
    $route: any;
    private selectNav: number = 1

    // @Watch('$route')
    // onRouterChanged(val: any) {
    //     this.changUrl(val)
    // }

    changUrl(val: any) {

    }

    private nav(name: string) {
        // if (this.$route.name === name) return;
        // this.$router.push({ name })
        this.sendNav(this.selectNav)
    }

    private created() {
        // this.changUrl(this.$route)
    }

    @Emit("nav") sendNav(nav: number) { }
}
</script>
<style lang="less" scoped>
@import "~@/lib/style/components/public/Header";
</style>
