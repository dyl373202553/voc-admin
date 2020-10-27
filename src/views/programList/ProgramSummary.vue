<template>
  <div class="app-container">
    <el-card class="box-card dpadding0">
      <div slot="header" class="clearfix">
        <span class="header-title">{{ $route.params.summaryName }}</span>
      </div>
      <div class="dsummary">
        <div class="dsummary-mian">
          <div class="dsummary-title">节目信息</div>
          <div>
            <p><span>节目名称：</span><span>{{this.programTitle}}</span></p>
            <p><span>节目时间：</span><span>{{this.programTime}}</span></p>
          </div>
        </div>
        <div class="dsummary-mian">
          <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>节目小结</div>
          <div>
            <el-input
              v-model="summaryContent"
              type="textarea"
              :rows="3"
              placeholder="请填写节目小结"
            />
          </div>
        </div>
        <div class="dsummary-mian">
          <div class="dsummary-title">参与部门</div>
          <div>
            <el-input v-model="deptnamesData" placeholder="请选择参与部门"  @focus="dialogTableVisible = true" suffix-icon="el-icon-s-home" />
          </div>
        </div>
        <div class="dsummary-mian">
            <div class="dsummary-title">上传附件</div>
                <el-upload
                    class="upload-image"
                    accept=".jpg,.png,.jpeg,.doc,.docx,.ppt,.pptx,.pdf,.xls,.txt,.zip,.rar"
                    :action="' '"
                    :auto-upload="false"
                    :file-list="fileDataList"
                    :on-remove="handleRemove"
                    :on-change="handleAvatarChangeIcon"
                    ref="uploadicon"
                    >
                    <el-button size="small" type="primary" plain>选择文件</el-button>
                    <el-button size="small" slot="tip" type="danger" plain @click="upbtn" v-if="showFile" style="margin-left:15px;">附件上传</el-button>
                    <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于10M的文件，支持格式：doc/docx/ppt/pptx/xls/pdf/txt/png/jpg/zip/rar;</span>
                </el-upload>
                <el-progress v-show="progressFlag" class="dprogress" :color="customColors" :percentage="progressPercent" :status="progressStatus"></el-progress>

            <div class="downloadClick" @click="haveDownload">
                <i class="el-icon-paperclip" />
                <span class="info-title">{{this.fileIdsName}}</span>
            </div>
        </div>
        <div class="bottom dbtn">
          <el-button round @click="back">返回</el-button>
          <el-button type="primary" round :disabled="!summaryContent" @click="onSubmit">提交</el-button>
          <el-button v-show="$route.params.summaryName !=='发布小结'" type="danger" plain round @click="summaryDelete">删除</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="参与部门" :visible.sync="dialogTableVisible">
       <TreeDepartment @funcs="getMsgFormSon" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postProgramSummary, getProgramDetail, postProgramSummaryDelete, getFileId } from "@/api/programList/programList"
import TreeDepartment from "@/components/addressBook/TreeDepartment.vue"
import { MessageBox } from "element-ui"
import { UserModule } from "@/store/module/user"
import axios from "axios"
import { handleDownload } from "@/lib/js/unitls"
@Component({
    components: { TreeDepartment }
})
export default class ProgramSummary extends Vue {
    get userToken() {
        // @ts-ignore
        return UserModule.token
    }

    private summaryContent = "";
    private programTitle= "";
    private programTime= "";
    private summaryId= "";
    private deptnamesData = "";
    private dataList: any = []
    private fileIds = "";
    private dialogTableVisible = false

    // 上传附件
    private dfile: any
    private showFile = false
    private fileDataList: any = []
    private progressPercent = 0
    private progressFlag = false
    private progressStatus: any = null
    private customColors = [
        { color: "#f56c6c", percentage: 20 },
        { color: "#e6a23c", percentage: 40 },
        { color: "#5cb87a", percentage: 60 },
        { color: "#1989fa", percentage: 80 },
        { color: "#6f7ad3", percentage: 100 }
    ]

    private fileIdsArr: any = []
    private fileIdsName = ""

    private defaultProps={
        children: "children",
        label: "label",
        isLeaf: "isLeaf"
    }

    private departmentArr= []

    protected mounted() {
        this.getSummaryDetail()
    }

    private fileName() {
        // 测试附件详情
        const params = {
            fileId: this.fileIds
        }
        getFileId(params).then((res) => {
            if (res) {
                if (res.code === 0) {
                    const arr = []
                    for (let i = 0; i < res.data.length; i++) {
                        arr.push(res.data[i].fileName)
                    }
                    this.fileIdsName = arr.toString()
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            } else {
                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
            }
        })
    }

    private getSummaryDetail() {
        getProgramDetail({ id: this.$route.params.id }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.programTitle = res.data.title
                    this.programTime = res.data.liveEntity.startTime + " -- " + res.data.liveEntity.endTime
                    if (res.data.summaryEntity) {
                        this.summaryContent = res.data.summaryEntity.content
                        this.summaryId = res.data.summaryEntity.id
                        this.deptnamesData = res.data.summaryEntity.deptnames
                        this.fileIds = res.data.summaryEntity.fileIds
                    }
                    this.fileName()
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private onSubmit() {
        const params = {
            programId: this.$route.params.id, // 节目ID
            content: this.summaryContent, // 小结内容
            deptnames: this.deptnamesData, // 参与部门，多个以‘;’想个，只做显示
            fileIds: this.fileIds, // 附件id
            id: this.summaryId // 修改时传递ID，新增不传
        }

        postProgramSummary(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    MessageBox.alert(res.message, "成功", { type: "success" })
                    this.$router.push({
                        name: "ProgramManage"
                    })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 删除小结
    private summaryDelete() {
        const params = {
            id: this.summaryId
        }
        postProgramSummaryDelete(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    MessageBox.alert(res.message, "成功", { type: "success" })
                    this.$router.push({
                        name: "ProgramManage"
                    })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 获取通讯录传回的数据 -责任部门返回数据
    private getMsgFormSon(data: string|any[]) {
        this.dialogTableVisible = false
        this.dataList = data
        // const arr = []
        const brr = []
        for (let i = 0; i < this.dataList.length; i++) {
            const obj: any = {}
            // obj.deptCode = this.dataList[i].id.toString()
            obj.deptName = this.dataList[i].label.toString()
            // arr.push(JSON.stringify(obj))
            brr.push(obj.deptName)
        }
        this.deptnamesData = brr.toString()
    }

    // 文件下载
    private haveDownload() {
        handleDownload(this.fileIds)
    }

    // 上传附件
    private handleAvatarChangeIcon(file: any, fileList: any) {
        let isLt10M = 0
        if (fileList.length > 0) {
            this.showFile = true
        }
        for (let i = 0; i < fileList.length; i++) {
            isLt10M += fileList[i].size
        }
        const isLt = isLt10M / 1024 / 1024 <= 10
        if (!isLt) {
            if (fileList.length > 1) {
                this.fileDataList = []
                for (let i = 0; i < fileList.length - 1; i++) {
                    this.fileDataList.push(fileList[i])
                }
            }
            this.$message.error("上传附件大小不能超过 10M! 请重新选择")
            return false
        } else if (isLt) {
            this.fileDataList.push(file)
            this.dfile = file
            this.progressFlag = true
        }
    }

    private handleRemove(file: any, fileList: any) {
        this.fileDataList.splice(this.fileDataList.findIndex((item: any) => item.uid === file.uid), 1)
        if (fileList.length === 0) {
            this.showFile = false
            this.progressFlag = false
        }
    }

    private upbtn() {
        for (let i = 0; i < this.fileDataList.length; i++) {
            const formData = new FormData()
            formData.append("file", this.fileDataList[i].raw) // 传参改为formData格式
            this.postFile(formData)
        }
    }

    private postFile(params: any) {
        axios({
            method: "post",
            url: `/vue-potal/portal-file/api/file/provider/uploadfile?busSource=moa-customervoice`, // 请求后端的url
            headers: {
                "Content-Type": "multipart/form-data", // 设置headers
                Authorization: `Bearer ${this.userToken}`
            },
            data: params,
            onUploadProgress: progressEvent => {
                // progressEvent.loaded:已上传文件大小
                // progressEvent.total:被上传文件的总大小
                this.progressPercent = (progressEvent.loaded / progressEvent.total * 100)
            }
        })
            .then((res: any) => {
                if (res) {
                    if (res.data.code < 200) {
                        // 上传成功
                        this.fileIdsArr.push(res.data.data.fileId)
                        this.fileIds = this.fileIdsArr.toString()
                        if (this.progressPercent === 100) {
                            // this.progressFlag = false
                            // this.progressPercent = 0
                            this.progressStatus = "success"
                            this.showFile = true
                        }
                    }
                } else {
                    // 上传失败
                    this.progressStatus = "exception"
                }
            })
            .catch(() => {
                // 请求失败
                this.progressStatus = "warning"
            })
    }

    private back() {
        this.$router.back()
    }
}
</script>
<style lang="scss" scoped>
    .downloadClick .info-title:hover {
     color: #4484F6;
    }
    .dprogress {
        width: 50%;
    }
</style>
