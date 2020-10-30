<template>
    <div id="app" v-if="userCode">
        <el-container >
            <el-header>
                <Navbar />
            </el-header>
            <el-container>
                <el-aside>
                    <AppNav />
                </el-aside>
                <el-main class="dmain"  :style="{height: this.clientHeight}">
                    <AppMain />
                </el-main>
            </el-container>
            <el-footer>
                <NavFooter />
            </el-footer>
            <template>
                <el-backtop target=".dmain" :bottom="150"></el-backtop>
            </template>
        </el-container>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { UserModule } from "@/store/module/user"
import NavFooter from "@/components/layout/NavFooter.vue"
import Navbar from "@/components/layout/Navbar.vue"
import AppNav from "@/components/layout/AppNav.vue"
import AppMain from "@/components/layout/AppMain.vue"
@Component({
    components: { NavFooter, Navbar, AppNav, AppMain }
})
export default class App extends Vue {
    get userCode() {
        // @ts-ignore
        return UserModule.user.userCode
    }

    private clientHeight = "auto"
    protected mounted() {
        this.clientHeight = (document.documentElement.clientHeight - 69).toString() + "px"
    }

    private created() {
        UserModule.initialize({ userName: "512005DB8B513C626C7FBB1940F2B8A2", passWord: "D928596B9DB10AA6EBF55A9F5B339667" })
    }
}
</script>
<style lang="less" scoped>
</style>
