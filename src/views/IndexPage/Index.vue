
<template>
    <div class="Index">
        <el-container>
            <el-header>
                <Navbar />
            </el-header>
            <el-container>
                <el-aside>Aside</el-aside>
                <el-main>Main</el-main>
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
import NavFooter from "../layout/NavFooter"
// @ts-ignore
import Navbar from "../layout/Navbar"
@Component({
    components: { NavFooter, Navbar }
})
export default class Index extends Vue {
}
</script>
<style lang="less" scoped>

</style>
