<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-show="!$route.params.summaryName" class="header-title">发布节目</span>
        <span v-show="$route.params.summaryName" class="header-title">编辑节目</span>
      </div>
      <el-form ref="dataForm" :model="dataForm" label-width="150px">
          <el-form-item label="节目时间"
            :rules="[
            { required: true, message: '节目时间不能为空'}
            ]">
          <el-select v-model="dataForm.liveId" placeholder="请选择节目时间" style="width: 65%;" :disabled="selectBoolean">
            <el-option
              v-for="item in dataOptions"
              :key="item.id"
              :label="item.startTime + '--' + item.endTime"
              :value="item.id"
            />
          </el-select>
          <span class="dgrey" style="margin-left:20px;">注：默认展示时间与发布直播最近时间，如有多个可进行选择</span>
        </el-form-item>
         <el-form-item label="节目类型"
            prop="type"
            :rules="[
            { required: true, message: '请选择是否发布督办举措', trigger: 'change' }
            ]">
            <!-- <el-radio-group v-model="dataForm.type" @change="typeChange">
                <el-radio :label="1">常规类</el-radio>
                <el-radio :label="2">回顾类</el-radio>
                <el-radio :label="3">其他</el-radio>
            </el-radio-group> -->
        <el-radio-group v-model="programType" @change="typeChange">
            <el-radio v-for="item in this.kindList" :key="item.orderId" :label="item.value" :disabled="selectBoolean">{{item.label}}</el-radio>
        </el-radio-group>

        </el-form-item>
        <el-form-item label="节目名称"
            prop="title"
            :rules="[
            { required: true, message: '节目名称不能为空'}
            ]">
          <el-input v-model="dataForm.title" :disabled="programType!=='3'" />
        </el-form-item>
        <el-form-item label="节目简介"
            prop="summary"
            :rules="[
            { required: true, message: '节目简介不能为空'}
            ]">
          <el-input
            v-model="dataForm.summary"
            type="textarea"
            :rows="3"
            placeholder="请输入节目简介"
          />
        </el-form-item>
        <el-form-item label="节目内容"
            prop="content"
            :rules="[
            { required: true, message: '节目内容不能为空'}
        ]">
            <EditorBar v-model="dataForm.content" :is-clear="isClear" />
        </el-form-item>
        <el-form-item label="上传附件">
          <el-upload
                class="upload-image"
                :action="' '"
                :auto-upload="false"
                :limit="3"
                :on-change="handleAvatarChangeIcon"
                ref="uploadicon"
                >
                 <el-button size="small" type="primary" plain>附件上传</el-button>
                <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于10M的文件，支持格式：doc/docx/ppt/pptx/xls/pdf/txt/png/jpg/zip/rar;</span>
          </el-upload>
        </el-form-item>
        <el-form-item class="text-center dbtn">
          <el-button v-show="$route.params.summaryName" plain round>返回</el-button>
          <el-button type="primary" round @click="onSubmit"
          :disabled="!(dataForm.liveId && dataForm.title && dataForm.summary && dataForm.content)"
          >提交</el-button>
          <el-button plain round @click="saveFile">上传文件</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getStudioList, getProgramDetail, postProgramRelease } from "@/api/programList/programList"
import { getProgramName, getProgramKind } from "@/api/dict"
import { MessageBox } from "element-ui"
import EditorBar from "@/components/wangEnditor/Editoritem.vue"
import { UserModule } from "@/store/module/user"
import axios from "axios"
@Component({
    components: { EditorBar }
})
export default class ProgramRelease extends Vue {
    get userToken() {
        // @ts-ignore
        return UserModule.token
    }

    private isClear = false
    private dataOptions = []
    private kindList = []
    private programType = "1"
    private dataForm = {
        liveId: "", // 直播间ID
        type: "1",
        title: "", // 节目名称
        summary: "", // 节目简介
        content: "", // 节目内容
        fileIds: "", // 附件id
        id: ""
    }

    private selectBoolean = false

    protected mounted() {
        this.load()
        if (this.$route.params.id) {
            this.selectBoolean = true
            this.getDetail()
        }
    }

    private load() {
        const dataOptions = getStudioList()
        const dataForm = getProgramName({ type: this.programType })
        const kindList = getProgramKind({ type: "khzs_program_type" })
        Promise.all([dataOptions, dataForm, kindList]).then((res) => {
            this.dataOptions = res[0].data
            this.dataForm.liveId = res[0].data[0].id
            this.dataForm.title = res[1].data
            this.kindList = res[2]
            this.programType = "1"
        }).catch(() => {
            // MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        })
    }

    private getName() {
        getProgramName({ type: this.programType }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.dataForm.title = res.data
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 切换节目类型
    private typeChange() {
        if (this.programType === "3") {
            this.dataForm.title = ""
        } else {
            this.getName()
        }
    }

    private getDetail() {
        getProgramDetail({ id: this.$route.params.id }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.dataForm.liveId = res.data.liveId
                    this.dataForm.title = res.data.title
                    this.dataForm.type = res.data.type
                    this.programType = res.data.type
                    this.dataForm.summary = res.data.summary
                    this.dataForm.content = res.data.content
                    this.dataForm.id = this.$route.params.id
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 提交
    private onSubmit() {
        this.dataForm.type = this.programType
        console.log(this.dataForm)
        postProgramRelease(this.dataForm).then((res) => {
            if (res) {
                if (res.code < 200) {
                    MessageBox.alert(`发布成功`, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 上传附件
    private dfile: any
    private iconformData = {
        img: "",
        name: ""
    }

    private hideUploadIcon: any
    private handleAvatarChangeIcon(file: any, fileList: any) {
        this.dfile = file
        const isLt2M = file.raw.size / 1024 / 1024 < 0.5
        this.hideUploadIcon = fileList.length >= 1
        if (!isLt2M) {
            this.$message.error("上传图片大小不能超过 200kb!")
            return false
        } else {
            this.iconformData.img = file.raw // 图片的url
            this.iconformData.name = file.name // 图片的名字
        }
    }

    private saveFile() {
        const formData = new FormData()
        formData.append("file", this.dfile.raw) // 传参改为formData格式
        axios({
            method: "post",
            url: `/vue-potal/portal-file/api/file/provider/uploadfile?busSource=moa-customervoice`, // 请求后端的url
            headers: {
                "Content-Type": "multipart/form-data", // 设置headers
                Authorization: `Bearer ${this.userToken}`
            },
            data: formData
        })
            .then((res: any) => {
                if (res) {
                    if (res.data.code < 200) {
                        // 上传成功
                        this.dataForm.fileIds = res.data.data.fileId
                        MessageBox.alert("上传成功", "成功", { type: "success" })
                    }
                } else {
                    // 上传失败
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            })
            .catch(() => {
                // 请求失败
                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
            })
    }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
