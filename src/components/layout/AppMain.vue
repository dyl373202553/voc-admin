<template>
  <section class="app-main">
       <keep-alive :include="getInclude">
            <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { ConfigModule } from "@/store/module/config"
@Component
export default class AppMain extends Vue {
    get getInclude() {
        // @ts-ignore
        return ConfigModule.include
    }

    // @Watch("$route")
    // protected routechange(to: any, from: any) {
    //     console.log(to)
    //     console.log(from)
    //     // 如果要to(进入)的页面是需要keepAlive缓存的，把name push进include数组中
    //     if (to.meta.keepAlive) {
    //         !this.include.includes(to.name) && this.include.push(to.name)
    //     }
    //     // 如果 要 form(离开) 的页面是 keepAlive缓存的，
    //     // 再根据 deepth 来判断是前进还是后退
    //     // 如果是后退：
    //     if (from.meta.keepAlive && to.meta.deepth < from.meta.deepth) {
    //         const index = this.include.indexOf(from.name)
    //         index !== -1 && this.include.splice(index, 1)
    //     }
    // }

    private include: any = []
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100% - 90px);
  width: 100%;
  position: relative;
  overflow: hidden;
}
.fixed-header+.app-main {
  padding-top: 50px;
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
