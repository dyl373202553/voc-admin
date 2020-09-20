<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">创建直播间</span>
      </div>
      <el-form ref="studioForm" :model="studioForm" label-width="150px">
        <el-form-item label="节目时间">
          <el-col :span="11">
            <el-date-picker v-model="studioForm.date1" type="datetime" placeholder="请选择开始时间" style="width: 100%;" />
          </el-col>
          <el-col :span="2" class="line">至</el-col>
          <el-col :span="11">
            <el-date-picker v-model="studioForm.date2" type="datetime" placeholder="请选择结束时间" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="节目封面">
          <el-upload
            class="dupload"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-exceed="handleExceed"
            :file-list="fileList"
            :before-upload="handleOut"
            list-type="picture"
            :limit="1"
            accept=".png, .jpg, .jpeg"
          >
            <el-button size="small" type="primary" plain>上传封面</el-button>
            <span slot="tip" class="el-upload__tip">请上传小于2M的文件，支持格式jpg/png/jpeg;</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="节目主讲人">
          <el-input v-model="studioForm.name" />
        </el-form-item>
        <el-form-item label="本期嘉宾">
          <el-input v-model="studioForm.name" />
        </el-form-item>
        <el-form-item label="是否发布督办举措">
          <el-radio-group v-model="studioForm.resource">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否发布节目小结">
          <el-radio-group v-model="studioForm.resource">
            <el-radio label="是" />
            <el-radio label="否" />
          </el-radio-group>
        </el-form-item>
        <el-form-item class="text-center dbtn">
          <el-button type="primary" round @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postCreateStudio } from "@/api/programList/createStudio"
// import { day } from "@/lib/js/unitls"

@Component
export default class CreateStudio extends Vue {
    private fileList = [{
        name: "food2.jpeg",
        url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
    }]

    private studioForm = {
        startTime: "2020/7/24 11:10:00",
        endTime: "2020/7/24 12:10:00",
        logoUrl: "",
        speakersData: "ddd", // 节目主讲人
        guests: "yyy", // 本期嘉宾
        superviseFlag: "0", // 是否发布督办举措
        summaryFlag: "0" // 是否发布节目小结
    }

    protected mounted() {
        postCreateStudio(this.studioForm)
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
