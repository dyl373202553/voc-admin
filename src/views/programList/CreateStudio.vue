<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">创建直播间</span>
      </div>
      <el-form ref="dataForm" :model="dataForm" label-width="150px">
        <el-form-item label="节目时间"
            prop="startTime"
            :rules="[
            { required: true, message: '节目时间不能为空'}
            ]">
          <el-col :span="11">
            <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="请选择开始时间" style="width: 100%;" />
          </el-col>
          <el-col :span="2" class="line">至</el-col>
          <el-col :span="11">
            <el-date-picker v-model="dataForm.endTime" type="datetime" placeholder="请选择结束时间" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="节目封面"
            prop="logoUrl"
            :rules="[
            { required: true, message: '节目封面不能为空'}
            ]">
          <el-upload
            class="upload-image"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture"
            :limit="1"
            accept=".png, .jpg, .jpeg"
          >
            <el-button size="small" type="primary" plain>上传封面</el-button>
            <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于2M的文件，支持格式jpg/png/jpeg;</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="节目主讲人"
            prop="speakersData"
            :rules="[
            { required: true, message: '节目主讲人不能为空'}
            ]">
          <el-input v-model="dataForm.speakersData" />
        </el-form-item>
        <el-form-item label="本期嘉宾"
            prop="guests"
            :rules="[
            { required: true, message: '本期嘉宾不能为空'}
            ]">
          <el-input v-model="dataForm.guests" />
        </el-form-item>
        <el-form-item label="是否发布督办举措"
            prop="superviseFlag"
            :rules="[
            { required: true, message: '请选择是否发布督办举措', trigger: 'change' }
            ]">
          <el-radio-group v-model="dataForm.superviseFlag">
            <el-radio v-model="dataForm.superviseFlag" label="0">是</el-radio>
            <el-radio v-model="dataForm.superviseFlag" label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否发布节目小结"
             prop="summaryFlag"
            :rules="[
            { required: true, message: '请选择是否发布节目小结', trigger: 'change' }
            ]">
          <el-radio-group v-model="dataForm.summaryFlag">
            <el-radio v-model="dataForm.summaryFlag" label="0">是</el-radio>
            <el-radio v-model="dataForm.summaryFlag" label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="text-center dbtn">
          <el-button type="primary" round @click="onSubmit"
            :disabled="!(dataForm.speakersData && dataForm.guests && dataForm.startTime && dataForm.endTime)"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postCreateStudio } from "@/api/programList/programList"
// import { day } from "@/lib/js/unitls"
import { MessageBox } from "element-ui"
import { day } from "@/lib/js/unitls"

@Component
export default class CreateStudio extends Vue {
    private fileList = [{ name: "food2.jpeg", url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600835517648&di=66a169c2743457deb998e954546616a0&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F49%2F55%2F635acaccbda9696.jpg" }]

    private dataForm = {
        startTime: "",
        endTime: "",
        logoUrl: "",
        speakersData: "", // 节目主讲人
        guests: "", // 本期嘉宾
        superviseFlag: "0", // 是否发布督办举措 0:是 1：否
        summaryFlag: "0" // 是否发布节目小结 0:是 1：否
    }

    private onSubmit() {
        this.dataForm.startTime = day(this.dataForm.startTime, "YYYY-MM-DD HH:mm:ss")
        this.dataForm.endTime = day(this.dataForm.endTime, "YYYY-MM-DD HH:mm:ss")
        postCreateStudio(this.dataForm).then((res) => {
            if (res) {
                MessageBox.alert(`操作成功`, "成功", { type: "success" })
            }
        })
    }

    private handleRemove(file: any, fileList: any) {
        console.log(file, fileList)
    }

    private handlePreview(file: any) {
        console.log(file)
    }

    private handleExceed(file: any) {
        alert("超出数量")
        console.log(file)
    }

    private handleOut(file: any) {
        console.log(file)
        // var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
        // const extension = testmsg === 'png'
        // const extension2 = testmsg === 'jpg'
        // const isLt2M = file.size / 1024 / 1024 < 1 // 这里做文件大小限制
        // if (!extension && !extension2) {
        //   this.$message({
        //     message: '上传文件只能是 png、jpg格式!',
        //     type: 'warning'
        //   })
        // }
        // if (!isLt2M) {
        //   this.$message({
        //     message: '上传文件大小不能超过 1MB!',
        //     type: 'warning'
        //   })
        // }
        // return extension || extension2 && isLt2M
    }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
