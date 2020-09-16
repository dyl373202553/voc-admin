
<template>
    <div class="Index">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside>Aside</el-aside>
                <el-main>Main</el-main>
            </el-container>
            <el-footer>
                footer
            </el-footer>
        </el-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class Index extends Vue {
}
</script>
<style lang="less" scoped>

</style>
