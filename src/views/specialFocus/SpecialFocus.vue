<template v-if="this.userrole==='0'">
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="header-title">特别关注</span>
            </div>
            <el-form ref="dataForm" :model="dataForm">
                <el-form-item label="开始时间"
                    prop="startTime"
                    :rules="[
                    { required: true, message: '请选择开始时间', trigger: 'change' }
                    ]">
                    <el-col :span="11">
                        <el-date-picker
                            v-model="dataForm.startTime"
                            type="datetime"
                            placeholder="请选择开始时间"
                            style="width: 100%;"
                            :picker-options="expireTimeOption"
                            :disabled="$route.params.viewStatus === '2' || $route.params.viewStatus === '3'|| this.over"
                            @change="checkDate"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item label="结束时间"
                    prop="endTime"
                    :rules="[
                    { required: true, message: '请选择开始时间', trigger: 'change' }
                    ]">
                    <el-col :span="11">
                        <el-date-picker
                            v-model="dataForm.endTime"
                            type="datetime"
                            placeholder="请选择结束时间"
                            style="width: 100%;"
                            :picker-options="expireTimeOption"
                            :disabled="$route.params.viewStatus === '3' || this.over"
                            @change="checkDate"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item label="标题内容"
                    prop="title"
                    :rules="[
                    { required: true, message: '请输入标题内容', trigger: 'blur' }
                    ]">
                    <el-col :span="11">
                        <el-input v-model="dataForm.title" placeholder="请输入标题内容"></el-input>
                    </el-col>
                </el-form-item>
                <el-form-item label="内容上传"  prop="logoUrl"
                    :rules="[
                    { required: true, message: '内容上传不能为空'}
                    ]"
                    :class="(showFile === 1)? 'imgList': ''">
                    <el-upload
                        v-show="$route.params.viewStatus !== '3'"
                        class="upload-image"
                        :action="' '"
                        list-type="picture"
                        accept=".jpg,.png,.jpeg,.mp4,.wma"
                        :auto-upload="false"
                        :on-exceed="handleExceed"
                        :on-remove="handleRemove"
                        :limit="1"
                        :show-file-list="false"
                        :file-list="fileDataList"
                        :on-change="handleAvatarChangeIcon"
                        ref="uploadicon"
                        >
                        <el-button size="small" class="dprogress-btn" slot="tip" type="danger" plain @click="upbtn" v-show="showFile === 1">上传</el-button>
                        <el-button size="small" type="primary" plain v-show="showFile === 0">选择文件</el-button>
                        <span class="dgrey" slot="tip" style="margin-left:20px;">请上传小于150M的文件，支持格式png/jpg/mp4/wma</span>
                    </el-upload>
                    <!-- 编辑 -->
                    <template v-if="dataListFile.length!==0">
                        <div :class="progressPercent===100? 'dataListFile opacity1':'dataListFile opacity4'">
                            <i class="el-icon-close del" @click="updel"></i>
                            <template>
                              <el-image :src="dataListFile[0].content" v-if="this.dataForm.type === 'img'" fit="contain" class="image"/>
                              <video :src="dataListFile[0].content" v-if="this.dataForm.type === 'video'" :controls="true">
                                  您的浏览器不支持视频播放
                              </video>
                            </template>
                        </div>
                    </template>

                    <el-progress v-show="progressFlag" :stroke-width="9" type="line" :color="customColors" :percentage="progressPercent" :status="progressStatus"></el-progress>
                    <!-- 详情 -->
                    <el-col :span="24" v-if="$route.params.id && $route.params.viewStatus === '3'">
                        <div class="dimg-div">
                            <el-image :src="`/resources/`+ dataForm.content" fit="contain" class="image" v-if="this.dataForm.type === 'img'" />
                            <video :src="`/resources/`+ dataForm.content" :controls="true" v-if="this.dataForm.type === 'video'">
                                您的浏览器不支持视频播放
                            </video>
                        </div>
                    </el-col>
                </el-form-item>
                <el-form-item label="封面上传"  prop="logoUrl"
                    v-show="this.dataForm.type === 'video'"
                    :rules="[
                    { required: true, message: '内容上传不能为空'}
                    ]"
                  >
                    <el-upload
                        class="upload-cover"
                        :action="' '"
                        list-type="picture"
                        ref="upload"
                        accept=".jpg,.png,.jpeg"
                        :auto-upload="true"
                        :http-request="uploadRequest"
                        :limit="1"
                        >
                        <el-button size="small" type="primary" plain>选择文件</el-button>
                        <span class="dgrey" slot="tip" style="margin-left:20px;">请上传小于150M的文件，支持格式png/jpg</span>
                    </el-upload>
                </el-form-item>
                <el-form-item v-show="$route.params.viewStatus !== '3'" class="dbtn text-center">
                    <el-button type="primary" round @click="onSubmit" v-show="!this.over"
                     :disabled="!(dataForm.startTime && dataForm.endTime && dataForm.title && (this.dataForm.content || this.dataForm.cover))"
                     >发布</el-button>
                    <!-- <el-button v-show="$route.params.statusName" type="primary" round>编辑</el-button> -->
                    <el-button v-show="$route.params.viewStatus && !this.over" type="danger" plain round @click="onOffLine($route.params.id)">结束</el-button>
                    <el-button v-show="$route.params.viewStatus && this.over" type="danger"  plain round :disabled="this.over">已结束</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postSpecialFocus, getSpecialFocusDetail, postOffLine } from "@/api/specialFocus/SpecialFocus"
import { MessageBox } from "element-ui"
import { day } from "@/lib/js/unitls"
import { UserModule } from "@/store/module/user"
import axios from "axios"
import Cookies from "js-cookie"
@Component
export default class SpecialFocus extends Vue {
    get userToken() {
        // @ts-ignore
        return UserModule.token
    }

    private dialogFormVisible = false
    private over = false
    private dataForm = {
        startTime: "",
        endTime: "",
        content: "",
        cover: "moa-customervoice/khzsSpecialAttention/default.png",
        title: "",
        status: "0", // 上线状态（0：上线，1：下线）
        id: "",
        type: ""
    }

    // 图片
    private dfile: any
    private showFile = 0
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

    private dataListFile: any = []

    // 上传封面

    // 时间-不得选早于之前的
    private expireTimeOption = {
        disabledDate(date: { getTime: () => number }) {
            // disabledDate 文档上：设置禁用状态，参数为当前日期，要求返回 Boolean
            return date.getTime() < Date.now() - 24 * 60 * 60 * 1000
        }
    }

    private userrole: any= ""

    protected mounted() {
        this.userrole = Cookies.get("userrole")
        if (this.userrole === "0") {
            if (this.$route.params.id) {
                this.load()
            }
        } else {
            this.$router.push({
                name: "home"
            })
        }
    }

    private load() {
        const params = {
            id: this.$route.params.id
        }
        getSpecialFocusDetail(params).then((res) => {
            if (res) {
                this.dataForm = res.data
                this.fileDataList = [{ name: this.dataForm.content, url: `/resources/` + this.dataForm.content }]
                const arr = {
                    content: ""
                }
                if (this.$route.params.viewStatus !== "3") {
                    arr.content = `/resources/` + this.dataForm.content
                    this.dataListFile.push(arr)
                }
            }
        })
    }

    // 发布
    private onSubmit() {
        this.dataForm.startTime = day(this.dataForm.startTime, "YYYY-MM-DD HH:mm:ss")
        this.dataForm.endTime = day(this.dataForm.endTime, "YYYY-MM-DD HH:mm:ss")
        if (this.$route.params.id) {
            this.dataForm.id = this.$route.params.id
        }
        postSpecialFocus(this.dataForm).then((res) => {
            if (res) {
                if (res.code === 0) {
                    MessageBox.alert("发布成功", "成功", { type: "success" })
                    this.$router.push({
                        name: "ContentManagement"
                    })
                } else {
                    MessageBox.alert(`操作失败`, "失败", { type: "error" })
                }
            } else {
                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
            }
        })
        console.log(this.dataForm)
    }

    // 结束-下线
    private onOffLine(id: string) {
        postOffLine({ ids: id }).then((res) => {
            if (res) {
                if (res.code === 0) {
                    this.load()
                    MessageBox.alert(res.message, "成功", { type: "success" })
                    this.over = !this.over
                } else {
                    MessageBox.alert(`操作失败`, "失败", { type: "error" })
                }
            }
        })
    }

    // 上传图片
    private handleAvatarChangeIcon(file: any, fileList: any) {
        const arr = {
            content: ""
        }
        arr.content = file.url
        this.dataListFile.push(arr)
        const isJPG = file.raw.type === "image/jpeg"
        const isPNG = file.raw.type === "image/png"
        const isMP4 = file.raw.type === "video/mp4"
        const isWMA = file.raw.type === "video/wma"
        const isLt150M = file.raw.size / 1024 / 1024 <= 150
        if (file.raw.type.indexOf("image") !== -1) {
            this.dataForm.type = "img"
        } else if (file.raw.type.indexOf("video") !== -1) {
            this.dataForm.type = "video"
        }

        if (!isPNG && !isJPG && !isMP4 && !isWMA) {
            this.fileDataList = []
            this.$message.error("上传图片只能是 JPG/PNG 格式! 请重新选择")
            return false
        } else if (!isLt150M) {
            this.fileDataList = []
            this.$message.error("上传图片大小不能超过 150M! 请重新选择")
            return false
        } else if (isLt150M && (isPNG || isJPG || isMP4 || isWMA)) {
            this.dfile = file
            this.progressFlag = true
            if (fileList.length > 0) {
                this.showFile = 1
            }
        }
    }

    // 文件超出限制控制
    private handleExceed() {
        this.$message.warning("只能上传一个文件")
    }

    private handleRemove(file: any, fileList: any) {
        const isJPG = file.raw.type === "image/jpeg"
        const isPNG = file.raw.type === "image/png"
        const isMP4 = file.raw.type === "video/mp4"
        const isWMA = file.raw.type === "video/wma"
        const isLt150M = file.raw.size / 1024 / 1024 <= 150
        if (isLt150M && (isPNG || isJPG || isMP4 || isWMA)) {
            if (fileList.length === 0) {
                this.progressFlag = false
                this.progressPercent = 0
                this.showFile = 0
            }
        }
    }

    // 上传封面

    private uploadRequest(option: any) {
        const isLt = option.file.size / 1024 / 1024 <= 150
        if (!isLt) {
            option.onError()
            this.$message.error("上传附件大小不能超过 150M! 请重新选择")
            return false
        } else if (isLt) {
            const formData = new FormData()
            formData.append("file", option.file) // 传参改为formData格式
            axios({
                method: "post",
                url: `/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsSpecialAttention&isystemName=2`, // 请求后端的url
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
                            this.dataForm.cover = res.data.data.filePath
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

    private upbtn() {
        const formData = new FormData()
        formData.append("file", this.dfile.raw) // 传参改为formData格式
        axios({
            method: "post",
            url: `/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsSpecialAttention&isystemName=2`, // 请求后端的url
            headers: {
                "Content-Type": "multipart/form-data", // 设置headers
                Authorization: `Bearer ${this.userToken}`
            },
            data: formData,
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
                        console.log(res.data.data)
                        // 测试
                        if (this.dataForm.type === "img") {
                            console.log("img")
                            this.dataForm.cover = res.data.data.filePath
                        } else { // 视频
                            console.log("video")
                            console.log(this.dataForm.content)
                            this.dataForm.content = res.data.data.filePath
                        }
                        
                        if (this.progressPercent === 100) {
                            // this.progressFlag = false
                            this.showFile = 3
                            this.progressStatus = "success"
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

    private updel() {
        this.dataListFile = []
        this.fileDataList = []
        this.dataForm.content = ""
        this.dataForm.cover = ""
        this.progressFlag = false
        this.progressPercent = 0
        this.showFile = 0
        this.progressStatus = null
    }

    // 校验时间
    private checkDate() {
        if (this.dataForm.startTime && this.dataForm.endTime) {
            if (this.dataForm.endTime <= this.dataForm.startTime) {
                MessageBox.alert("节目结束时间不能早于开始时间", "error", { type: "error" })
                this.dataForm.endTime = ""
            }
        }
    }
}
</script>

<style scoped>
    .dimg-div{
        width:100%;
        height:400px;
        overflow: hidden;
    }
    .dprogress {
        position: absolute;
        top: 134px;
        z-index: 1000;
        left: 45%;
    }
</style>
