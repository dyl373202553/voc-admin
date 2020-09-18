<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">特别关注{{ $route.params.statusName }}</span>
      </div>
      <el-form ref="form" :model="form">
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date1"
              type="date"
              placeholder="请选择开始时间"
              style="width: 100%;"
              :disabled="$route.params.statusName === '已下线'"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="结束时间">
          <el-col :span="11">
            <el-date-picker
              v-model="form.date2"
              type="date"
              placeholder="请选择结束时间"
              style="width: 100%;"
              :disabled="$route.params.statusName === '已下线'"
            />
          </el-col>
        </el-form-item>
        <el-form-item label="内容上传">
          内容上传
        </el-form-item>
        <el-form-item v-show="$route.params.statusName !== '已下线'" class="dbtn text-center">
          <el-button type="primary" round>发布</el-button>
          <!-- <el-button v-show="$route.params.statusName" type="primary" round>编辑</el-button> -->
          <el-button v-show="$route.params.statusName" type="danger" plain round>下线</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class SpecialFocus extends Vue {
    private dialogFormVisible = false
    private form = {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
    }

    private onSubmit() {
        this.$message("submit!")
    }

    private onCancel() {
        this.$message({
            message: "cancel!",
            type: "warning"
        })
    }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
