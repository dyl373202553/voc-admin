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
            <!-- <el-footer>
                <NavFooter />
            </el-footer> -->
            <template>
                <el-backtop target=".dmain" :bottom="150"></el-backtop>
            </template>
        </el-container>
    </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import { UserModule } from "@/store/module/user"
import NavFooter from "@/components/layout/NavFooter.vue"
import Navbar from "@/components/layout/Navbar.vue"
import AppNav from "@/components/layout/AppNav.vue"
import AppMain from "@/components/layout/AppMain.vue"
import { ConfigModule } from "@/store/module/config"
@Component({
    components: { NavFooter, Navbar, AppNav, AppMain }
})
export default class App extends Vue {
    private include: any =[]
    @Watch("$route")
    protected routechange(to: any, from: any) {
        // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
        if (to.meta.keepAlive) {
            !this.include.includes(to.name) && this.include.push(to.name)
            ConfigModule.setInclude(this.include)
        }
        // 如果 要 form(离开) 的页面是 keepAlive缓存的，
        // 再根据 deepth 来判断是前进还是后退
        // 如果是后退：
        if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
            const index = this.include.indexOf(from.name)
            index !== -1 && this.include.splice(index, 1)
            ConfigModule.setInclude(this.include)
        }
    }

    get userCode() {
        // @ts-ignore
        return UserModule.user.userCode
    }

    get getInclude() {
        // @ts-ignore
        return ConfigModule.include
    }

    private clientHeight: any = (document.documentElement.clientHeight - 19).toString() + "px"

    protected mounted() {
        window.onresize = () => {
            return (() => {
                this.clientHeight = (document.documentElement.clientHeight - 19).toString() + "px"
            })()
        }

        // this.clientHeight = (document.documentElement.clientHeight - 69).toString() + "px"
    }

    private created() {
        UserModule.initialize({ userName: "512005DB8B513C626C7FBB1940F2B8A2", passWord: "01EA97683EA65D95C4801D492F03088E" })
    }
}
</script>
<style lang="less" scoped>
</style>
