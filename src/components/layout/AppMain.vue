<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class AppMain extends Vue {
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
