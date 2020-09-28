<template>
    <div class="AppNav">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="this.activedMenu()"
                class="el-menu-vertical-demo"
                >
                <template v-for="item in indexPage">
                    <el-menu-item
                        v-if="(!item.children || item.children.length==0) && !item.hidden"
                        :key="item.path"
                        :index="item.path"
                        @click="toPage(item.path)"
                        class="my-menu-item">
                        <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;{{item.meta.title}}</span>
                    </el-menu-item>
                    <el-submenu
                        v-if="item.children && item.children.length>0"
                        :key="item.path"
                        :index="item.children[0].path">
                        <template slot="title">
                            <template @click="toPage(item.children[0].path,$event)">
                            <span slot="title">&nbsp;&nbsp;&nbsp;&nbsp;{{item.meta.title}}</span>
                            </template>
                        </template>
                        <div v-for="(child,childindex) in item.children"  :key="childindex">
                            <el-menu-item class="two-menu" v-if="!child.hidden" :index="child.path" @click="toPage(child.path)">
                            {{child.meta.title}}
                            </el-menu-item>
                        </div>
                    </el-submenu>
                </template>
            </el-menu>
        </el-scrollbar>

        <!-- <div class="navSize"></div>
        <div v-for="item in indexPage" :key="item.path"
        @click="navChange(item.name)" class="navItem"
        :class="[item.name === routerName ? 'selectNameItem' : 'noSelectNameItem']" v-text="item.meta.title"></div> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
// @ts-ignore
import indexPage from "@/router/IndexPage"
@Component
export default class AppNav extends Vue {
    $router: any;
    $route: any;

    private indexPage = indexPage

    get routerName() {
        return this.$route.name
    }

    // protected mounted() {
    // }

    private navChange(name: string) {
        this.$router.push({ name })
    }

    private activedMenu() {
        const index = this.$route.path
        return index
    }

    private toPage(path: string) {
        if (this.$route.path === path) return
        setTimeout(() => {
            this.$router.push(path)
        })
    }
}
</script>
<style lang="less" scoped>
.AppNav {
    .navSize {
        .h_n(30px);
    }
    .bg(#FFF);
    .h_n(auto);

    .navItem {
        .h_n(50px);
        .lHeight(50px);
        .pl(30px);
        .fz(14px);
        .color(#333);
        .po_re;
        .hover_hand;

        transition: 0.5s;
    }

    .selectNameItem {
        .bg(#F1F6FF);
        .color(#4484f6);
    }

    .noSelectNameItem {
        &:after {
            .po_ab;
            .h_n(1px);
            .bg(#ECEFF5);
            .w_n(140px);
            content: "";
            right: 0;
            bottom: 0;
        }
    }
}
</style>
