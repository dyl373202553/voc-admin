<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">特别关注{{ $route.params.statusName }}</span>
      </div>
      <el-form ref="dataForm" :model="dataForm">
        <el-form-item label="开始时间">
          <el-col :span="11">
            <el-date-picker
              v-model="dataForm.startTime"
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
              v-model="dataForm.endTime"
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
          <el-button type="primary" round @click="onSubmit">发布</el-button>
          <!-- <el-button v-show="$route.params.statusName" type="primary" round>编辑</el-button> -->
          <el-button v-show="$route.params.statusName" type="danger" plain round>下线</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postSpecialFocus } from "@/api/specialFocus/SpecialFocus"
import { MessageBox } from "element-ui"
@Component
export default class SpecialFocus extends Vue {
    private dialogFormVisible = false
    private dataForm = {
        startTime: "2020/7/24 11:10:00",
        endTime: "2020/7/24 12:10:00",
        content: "http://www.managershare.com/uploads/2015/01/14210532585795.jpg",
        status: "" // 上线状态（0：上线，1：下线）
    }

    private onSubmit() {
        postSpecialFocus(this.dataForm).then((res) => {
            if (res) {
                MessageBox.alert(`操作成功`, "成功", { type: "success" })
            }
        })
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
