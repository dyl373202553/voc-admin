<template>
  <div class="navbar">
    <div class="navbar-top">
      <div class="navbar-info">上午好，客户体验管理部
      </div>
    </div>
    <div class="navbar-bottom">
      <el-row>
        <el-col :span="12">
            <div class="sidebar-logo-container collapse">
                <div class="sidebar-logo-link">
                <img src="@/assets/images/logo.png" title="logo" class="sidebar-logo">
                <span class="sidebar-title">客户之声</span>
                </div>
            </div>
        </el-col>
        <el-col :span="12">
          <div class="right-menu">
            <el-dropdown class="avatar-container" trigger="click">
              <div class="avatar-wrapper">
                <i class="el-icon-switch-button dlogOut" />
              </div>
              <el-dropdown-menu slot="dropdown" class="user-dropdown">
                <el-dropdown-item divided>
                  <span style="display:block;">退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class Navbar extends Vue {
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 90px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 0 10px 1px rgba(0,0,0,0.10);
  .navbar-top{
    width: 100%;
    height: 30px;
    background: #4484F6;
    line-height: 30px;
    text-align: right;
    .navbar-info{
      font-size: 12px;
      color: #FFFFFF;
      letter-spacing: 0;
    padding-right: 2%;
    }
  }
  .navbar-bottom {
    position: relative;
    width: 100%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    overflow: hidden;
  }

  .right-menu {
    float: right;
    height: calc(100% - 30px);
    line-height: calc(100% - 30px);

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
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
