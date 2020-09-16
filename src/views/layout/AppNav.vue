<template>
    <div class="AppNav">
        <div class="navSize"></div>
        <div v-for="item in indexPage" :key="item"
        @click="navChange(item.name)" class="navItem"
        :class="[item.name === routerName ? 'selectNameItem' : 'noSelectNameItem']" v-text="item.name"></div>
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

    protected mounted() {
        console.log(this.indexPage)
    }

    private navChange(name: string) {
        this.$router.push({ name })
    }
}
</script>
<style lang="less" scoped>
.AppNav {
    .navSize {
        .h_n(30px);
    }
    .w_n(160px);
    border-right: 1px solid #eceff5;
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
