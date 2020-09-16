<template>
    <div id="app">
        <el-container v-if="userCode" >
            <el-header>
                <Navbar />
            </el-header>
            <el-container>
                <el-aside>Aside</el-aside>
                <el-main>
                    <router-view />
                </el-main>
            </el-container>
            <el-footer>
                <NavFooter />
            </el-footer>
        </el-container>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
// @ts-ignore
import { UserModule } from "@/store/module/user"
// @ts-ignore
import NavFooter from "@/views/layout/NavFooter"
// @ts-ignore
import Navbar from "@/views/layout/Navbar"
@Component({
    components: { NavFooter, Navbar }
})
export default class App extends Vue {
    get userCode() {
        // @ts-ignore
        return UserModule.user.userCode
    }

    private created() {
        UserModule.initialize({ userName: "0804553E53D2E5BA", passWord: "B6D99AD4A856637B7F14042708632B26" })
    }
}
</script>
<style lang="less" scoped>
</style>
