<template>
    <div id="app">
        <AppHeader v-if="userCode" ref="header" @nav="selectNav" />
        <div class="body" v-if="userCode">
            <AppNav />
            <div class="rightContent">
                <router-view />
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// @ts-ignore
import { UserModule } from "@/store/module/user";
// @ts-ignore
import AppHeader from "@c/public/Header"
// @ts-ignore
import AppNav from "@c/public/AppNav"
@Component({
    components: { AppHeader, AppNav }
})
export default class App extends Vue {
    $route: any;
    $router: any;

    get userCode() {
        // @ts-ignore
        return UserModule.user.userCode
    }

    private selectNav(nav: number) {
        if (this.$route.path != '/') {
            this.$router.push("/")
        }
    }

    private created() {
        // @ts-ignore
        if (process.env.NODE_ENV !== 'development') {
            UserModule.setAllValue()
        } else {
            UserModule.Login({ userName: "14BA61F2FCC8C63B", passWord: "B6D99AD4A856637B7F14042708632B26" })
        }
    }
}
</script>
<style lang="less" scoped>
#app {
    .body {
        .w_n(1200px);
        .mgAll(0 auto);
        .flex;

        .rightContent {
            .pdAll(20px 0 0 20px);
            .w_n(1020px);
            min-height: calc(100vh - 60px);
        }
    }
}
</style>