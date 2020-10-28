<template>
  <div class="app-container">
        <el-card class="box-card dpadding0">
        <div slot="header" class="clearfix">
            <span class="header-title" v-if="this.$route.params.status === '3'">举措确认</span>
            <span class="header-title" v-if="this.$route.params.status === '2' || this.$route.params.status === '5'">督办回答</span>
        </div>
        <div class="dsummary">
            <div class="dsummary-mian">
            <div class="dsummary-title">节目信息</div>
            <div>
                <p><span>节目名称：</span><span>{{this.programList.title}}</span></p>
                <p><span>节目时间：</span><span>{{this.programList.time}}</span></p>
            </div>
            </div>
            <el-form ref="form">
            <div class="dsummary-mian">
                <div class="dsummary-title">督办事项</div>
                <div>
                <p>{{this.programOversee? this.programOversee : "无内容"}}</p>
                <p><span>责任部门：</span><span>{{this.deptnamesData}}</span></p>
                </div>
            </div>
            <div v-show="this.$route.params.status === '2'|| this.$route.params.status === '5' " class="dsummary-mian">
                <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>督办举措</div>
                <el-input
                    v-model="dsummaryContent"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入举措内容"
                />
            </div>
            <div v-show="this.$route.params.status === '3'" class="dsummary-mian">
                <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>督办举措</div>
                <div class="main-info" v-for="(item, key) in superviseMeasuresList" :key="key">
                    <div class="info-left">
                        <el-avatar :src="`/resources/bluepage/a/`+item.userCode+`_A.jpg`"/>
                    </div>
                    <div class="info-right">
                        <div>
                            <span class="info-title">{{item.userName}}</span>
                            <span>{{item.deptName}}</span>
                            <span class="backStatus backStatus-sure " v-if="item.status === '0'">已确认</span>
                            <span class="backStatus" v-if="item.status === '1'">未确认</span>
                            <span class="backStatus backStatus-back" v-if="item.status === '2'">已退回</span>
                        </div>
                        <p>{{item.content}}</p>
                        <div class="downloadClick" @click="haveDownload(item.fileIds)">
                            <template v-if="item.fileIds">
                                <i class="el-icon-paperclip"/>
                                <span class="info-title" v-if="item.fileIds">{{fileName(item.fileIds)}}</span>
                            </template>
                        </div>
                        <div class="dsummary-mian delete-back" v-if="item.returnOpinion">
                            <div class="dsummary-title">退回意见</div>
                            <template>
                                <div class="main-info">
                                    {{item.returnOpinion}}
                                </div>
                            </template>
                        </div>
                        <div class="text-center dbtn" v-if="item.status === '1' ">
                            <el-button type="danger" round plain @click="backDialog(item.id)">退回</el-button>
                            <el-button type="primary" round @click="overseeMakesureComfire(item.id)">确认</el-button>
                        </div>
                    </div>
                </div>
            </div>
             <!-- <div class="dsummary-mian">
                <div class="dsummary-title">退回意见</div>
                <template>
                    <div class="main-info">
                        退回退回退回
                    </div>
                </template>
            </div> -->
            <div v-show="this.$route.params.status === '2' || this.$route.params.status === '5'" class="dsummary-mian">
                <div class="dsummary-title">上传附件</div>
                <div>
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
                        <el-button size="small" slot="tip" type="primary" plain @click="upbtn" v-if="showFile">附件上传</el-button>
                        <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于10M的文件，支持格式：doc/docx/ppt/pptx/xls/pdf/txt/png/jpg/zip/rar;</span>
                    </el-upload>
                    <el-progress v-show="progressFlag" class="dprogress" :color="customColors" :percentage="progressPercent" :status="progressStatus"></el-progress>
                </div>
            </div>
            <div v-show="this.$route.params.status === '2' || this.$route.params.status === '5'" class="bottom dbtn">
                <el-button round>取消</el-button>
                <el-button type="primary" round :disabled="!dsummaryContent" @click="onSubmit">提交</el-button>
            </div>
            <div v-show="this.$route.params.status === '3'" class="bottom dbtn">
                <el-button type="danger" round plain @click="allBack">一键退回</el-button>
                <el-button type="primary" round @click="allMakesureComfire">一键确认</el-button>
                <el-button type="danger" round @click="overseeCancel">撤销督办</el-button>
            </div>
            </el-form>
        </div>
        </el-card>
        <el-dialog
            custom-class="info-dialog"
            title="请填写退回意见(选填)"
            :visible.sync="centerDialogVisible"
            width="25%"
            center
        >
            <template>
                <el-input
                    v-model="returnOpinion"
                    type="textarea"
                    :rows="3"
                    placeholder="请填写退回意见"
                />
                <span slot="footer" class="dialog-footer dbtn">
                    <el-button type="primary" round @click="backOption">提 交</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getProgramDetail, getFileId } from "@/api/programList/programList"
import { postOverseeMeasure, getOverseeDetail, postOverseeCancel, postOverseeBack, postOverseeMakesure } from "@/api/oversee/oversee"
import { MessageBox } from "element-ui"
import { UserModule } from "@/store/module/user"
import axios from "axios"
import { handleDownload } from "@/lib/js/unitls"
@Component
export default class OverseeAnswer extends Vue {
    get userToken() {
        // @ts-ignore
        return UserModule.token
    }

    private status = ""
    private centerDialogVisible =false
    private dsummaryContent = ""
    private programList= {
        title: "",
        time: ""
    }

    private fileIds = ""

    private returnOpinion ="" // 退回意见
    private returnOpinionId =""
    private superviseMeasuresList: any= [] // 督办举措

    private programOversee =""
    private deptnamesData = ""

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

    protected mounted() {
        this.load()
    }

    private load() {
        getOverseeDetail({ id: this.$route.params.businessId }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.status = res.data.status
                    this.programList.title = res.data.programTitle
                    this.superviseMeasuresList = res.data.superviseMeasuresList
                    const programId = res.data.programId
                    getProgramDetail({ id: programId }).then((res) => {
                        if (res) {
                            if (res.code < 200) {
                                this.programList.time = res.data.liveEntity.startTime
                                this.programOversee = res.data.superviseItemEntity.content
                                this.deptnamesData = res.data.superviseItemEntity.deptnames
                            } else {
                                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                            }
                        }
                    })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private fileName(fileId: string) {
        if (fileId) {
            // 测试附件详情
            const params = {
                fileId: fileId
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
            return this.fileIdsName
        } else {
            MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        }
    }

    private onSubmit() {
        const params = {
            todoId: this.$route.params.id, // 待办ID
            content: this.dsummaryContent, // 督办举措内容
            fileIds: this.fileIds, // 附件
            id: "" // ID
        }
        postOverseeMeasure(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    UserModule.getTodo(UserModule.todo - 1)
                    MessageBox.alert(`提交成功`, "成功", { type: "success" })
                    this.$router.push({
                        name: "home"
                    })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 撤销
    private overseeCancel() {
        postOverseeCancel({ id: this.$route.params.id }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.$router.push({
                        name: "OverseeList"
                    })
                    MessageBox.alert("撤销成功", "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 举措确认
    private overseeMakesureComfire(id: string) {
        postOverseeMakesure({ ids: id }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.load()
                    const arr = []
                    for (let i = 0; i < this.superviseMeasuresList.length; i++) {
                        arr.push(this.superviseMeasuresList[i].status)
                    }
                    if (!(/[^0]/gi.test(arr.toString()))) {
                        UserModule.getTodo(UserModule.todo - 1)
                    }
                    MessageBox.alert(res.message, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 一键确认
    private allMakesureComfire() {
        const arr = []
        for (let i = 0; i < this.superviseMeasuresList.length; i++) {
            arr.push(this.superviseMeasuresList[i].id)
        }
        this.overseeMakesureComfire(arr.toString())
    }

    // 退回弹框
    private backDialog(id: string) {
        this.centerDialogVisible = true
        this.returnOpinionId = id
    }

    // 举措退回
    private backOption() {
        this.centerDialogVisible = false
        const params = {
            ids: this.returnOpinionId,
            rerurnOpinion: this.returnOpinion
        }
        postOverseeBack(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.load()
                    MessageBox.alert(res.message, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 一键退回
    private allBack() {
        this.centerDialogVisible = true
        const arr = []
        for (let i = 0; i < this.superviseMeasuresList.length; i++) {
            arr.push(this.superviseMeasuresList[i].id)
        }
        this.returnOpinionId = arr.toString()
    }

    // 上传附件
    private handleAvatarChangeIcon(file: any, fileList: any) {
        let isLt10M = 0
        if (fileList.length > 0) {
            this.showFile = !this.showFile
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

    // 文件下载
    private haveDownload(fileIds: any) {
        handleDownload(fileIds)
    }
}
</script>

<style scoped>
    .dprogress {
        width: 50%;
    }
</style>
