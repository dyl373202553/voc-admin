
<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span v-show="!$route.params.summaryName" class="header-title">发布节目（注：仅节目主讲人进行发布）</span>
        <span v-show="$route.params.summaryName" class="header-title">编辑节目</span>
      </div>
      <el-form ref="dataForm" :model="dataForm" label-width="150px">
          <el-form-item label="节目时间"
            :rules="[
            { required: true, message: '节目时间不能为空'}
            ]">
            <el-select v-if="!this.$route.params.id" v-model="dataForm.liveId" placeholder="请选择节目时间" style="width: 65%;" :disabled="selectBoolean">
                <el-option
                v-for="(item, index) in dataOptions"
                :key="index"
                :label="item.startTime + '--' + item.endTime"
                :value="item.id"
                @click.native ="optionChange(item)"
                />
            </el-select>
            <el-input v-if="this.$route.params.id" v-model="showStart" :disabled="true" style="width: 65%;" />
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
          <el-input v-model="dataForm.title" :disabled="programType!=='3'" :maxlength="50"/>
        </el-form-item>
        <el-form-item label="节目简介">
          <el-input
            v-model="dataForm.summary"
            type="textarea"
            :rows="3"
            :maxlength="200"
            placeholder="请输入节目简介(不超过200字符)"
          />
        </el-form-item>
        <el-form-item label="节目内容"
            prop="content"
            :rules="[
            { required: true, message: '节目内容不能为空'}
        ]">
            <EditorBar v-model="dataContent" :is-clear="isClear" :value="dataContent" :logoUrl="logoUrl"/>
        </el-form-item>
        <el-form-item label="上传附件">
           <el-upload
                class="dupload"
                ref="upload"
                :auto-upload="true"
                :action="''"
                :on-remove="handleRemove"
                :http-request="uploadRequest"
                multiple
                >
                <el-button size="small" type="primary" plain>选择文件</el-button>
                <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于10M的文件，支持格式：doc/docx/ppt/pptx/xls/pdf/txt/png/jpg/zip/rar;</span>
            </el-upload>
        </el-form-item>
        <el-form-item class="text-center dbtn">
          <el-button v-show="$route.params.summaryName" plain round @click="back">返回</el-button>
          <el-button type="primary" round @click="onSubmit"
          :disabled="!(dataForm.liveId && dataForm.title && dataContent)"
          >提交</el-button>
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
import { UserModule } from "@/store/module/user"
import axios from "axios"
import EditorBar from "@/components/wangEnditor/wangItems.vue"
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
    private showStart = ""
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

    private logoUrl = ""
    private selectBoolean = false
    private dataContent = ""

    // 上传附件
    private bigSize = 0

    private fileIdsArr: any = []

    protected mounted() {
        if (this.$route.params.id) {
            this.selectBoolean = true
            this.getDetail()
            this.getKind()
        } else {
            this.load()
        }
    }

    private load() {
        const dataOptions = getStudioList()
        const dataForm = getProgramName({ type: this.programType })
        const kindList = getProgramKind({ type: "khzs_program_type" })
        Promise.all([dataOptions, dataForm, kindList]).then((res) => {
            if (res) {
                this.dataOptions = res[0].data
                this.dataForm.liveId = res[0].data[0].id
                this.dataForm.title = res[1].data
                this.kindList = res[2]
                this.programType = "1" // 默认展示1
            }
        }).catch(() => {
            // MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        })
    }

    private getKind() {
        getProgramKind({ type: "khzs_program_type" }).then((res) => {
            if (res) {
                this.kindList = res
            }
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
            this.dataForm.title = "自定义"
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
                    this.dataContent = decodeURIComponent(res.data.content)
                    this.dataForm.id = this.$route.params.id
                    this.showStart = res.data.liveEntity.startTime + "--" + res.data.liveEntity.endTime
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 提交
    private onSubmit() {
        this.dataForm.fileIds = JSON.stringify(this.fileIdsArr)
        this.dataForm.type = this.programType
        this.dataForm.content = this.dataContent
        this.dataForm.content = encodeURIComponent(this.dataForm.content)
        postProgramRelease(this.dataForm).then((res) => {
            if (res) {
                if (res.code < 200) {
                    MessageBox.alert(`发布成功`, "成功", { type: "success" })
                    this.$router.push({
                        name: "home"
                    })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 上传附件

    private handleRemove(file: any) {
        this.bigSize -= file.size
    }

    private uploadRequest(option: any) {
        this.bigSize += option.file.size
        const isLt = this.bigSize / 1024 / 1024 <= 10
        if (!isLt) {
            option.onError()
            this.$message.error("上传附件大小不能超过 10M! 请重新选择")
            return false
        } else if (isLt) {
            const formData = new FormData()
            formData.append("file", option.file) // 传参改为formData格式
            axios({
                method: "post",
                url: `/vue-potal/portal-file/api/file/provider/uploadfile?busSource=moa-customervoice`, // 请求后端的url
                headers: {
                    "Content-Type": "multipart/form-data", // 设置headers
                    Authorization: `Bearer ${this.userToken}`
                },
                data: formData,
                onUploadProgress: (progressEvent) => {
                    const num = progressEvent.loaded / progressEvent.total * 100 | 0 // 百分比
                    option.onProgress({ percent: num }) // 进度条
                }
            })
                .then((res: any) => {
                    if (res) {
                        if (res.data.code < 200) {
                            // 上传成功
                            const obj: any = {}
                            obj.fileName = res.data.data.fileName
                            obj.fileId = res.data.data.fileId
                            this.fileIdsArr.push(obj)
                            option.onSuccess() // 上传成功(打钩的小图标)
                        }
                    } else {
                        // 上传失败
                        option.onError("上传失败")
                    }
                })
                .catch(() => {
                    // 请求失败
                    option.onError("上传失败")
                })
        }
    }

    private back() {
        this.$router.back()
    }

    private optionChange(item: any) {
        this.logoUrl = item.logoUrl
    }
}
</script>

<style scoped>
    .line{
    text-align: center;
    }
    .dprogress {
        width: 50%;
    }
</style>
