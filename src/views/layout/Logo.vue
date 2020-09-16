<template>
  <div class="sidebar-logo-container collapse">
    <div class="sidebar-logo-link">
      <img src="@/assets/images/logo.png" title="logo" class="sidebar-logo">
      <span class="sidebar-title">客户之声</span>
    </div>
  </div>
</template>

<script>
import { Vue } from "vue-property-decorator"
export default class Logo extends Vue {
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
    position: relative;
    // width: 100%;
    // height: 60px;
    line-height: 60px;
    text-align: left;
    overflow: hidden;
    margin-left: 1.7%;

  & .sidebar-logo-link {
    height: 100%;

    & .sidebar-logo {
      max-width: 114px;
      vertical-align: middle;
      margin-right: 12px;
    }
  }

  & .sidebar-title {
      display: inline-block;
      font-weight: 500;
      vertical-align: middle;
      font-size: 18px;
      color: #333333;
      letter-spacing: 0;
      position: relative;
    }
  .sidebar-title:before {
      content: "|";
      color: #E7E7E7;
      padding-right: 8px;
      font-size: 22px;
    }
}
</style>
