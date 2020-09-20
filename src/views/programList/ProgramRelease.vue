<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-show="!$route.params.summaryName" class="header-title">发布节目</span>
        <span v-show="$route.params.summaryName" class="header-title">编辑节目</span>
      </div>
      <el-form ref="dataForm" :model="dataForm" label-width="150px">

        <el-form-item label="节目时间">
          <el-select v-model="value" placeholder="请选择节目时间" style="width: 65%;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <span class="dgrey" style="margin-left:20px;">注：默认展示时间与发布直播最近时间，如有多个可进行选择</span>
        </el-form-item>
        <el-form-item label="节目类型">
          <el-radio-group v-model="dataForm.type">
            <el-radio label="常规类" />
            <el-radio label="回顾类" />
            <el-radio label="其他" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="节目名称">
          <el-input v-model="dataForm.title" />
        </el-form-item>
        <el-form-item label="节目简介">
          <el-input
            v-model="dataForm.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入节目简介"
          />
        </el-form-item>
        <el-form-item label="节目内容">
           <el-input
            v-model="dataForm.content"
            type="textarea"
            :rows="3"
            placeholder="请输入节目简介"
          />
        </el-form-item>
        <el-form-item label="上传附件">
          上传附件
        </el-form-item>
        <el-form-item class="text-center dbtn">
          <el-button v-show="$route.params.summaryName" plain round>返回</el-button>
          <el-button type="primary" round @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postProgramRelease } from "@/api/programList/programRelease"
import { MessageBox } from "element-ui"
@Component
export default class ProgramRelease extends Vue {
    private options = [{
        value: "1",
        label: "2020年08月15日 17:00--17:30"
    }, {
        value: "2",
        label: "2020年09月15日 17:00--17:30"
    }, {
        value: "3",
        label: "2020年10月15日 17:00--17:30"
    }]

    private value = "1"
    private dataForm = {
        liveId: "f6eda5dc51744c028b96b55e5d0e500c", // 直播间ID
        type: "1", // 1？固定的？
        title: "客户之声第203期", // 节目名称
        summary: "节目简介12", // 节目简介
        content: "节目简介12", // 节目内容
        fileIds: "附件id12" // 附件id
    }

    private onSubmit() {
        postProgramRelease(this.dataForm).then((res) => {
            if (res) {
                MessageBox.alert(`操作成功`, "成功", { type: "success" })
            }
        })
    }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
