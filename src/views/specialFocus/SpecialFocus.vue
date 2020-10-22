<template>
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
                        :disabled="$route.params.viewStatus === '3' || this.over"
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
                        :disabled="$route.params.viewStatus === '3' || this.over"
                        />
                    </el-col>
                </el-form-item>
                <el-form-item label="内容上传"  prop="logoUrl"
                    :rules="[
                    { required: true, message: '内容上传不能为空'}
                    ]">
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
                        :file-list="fileDataList"
                        :on-change="handleAvatarChangeIcon"
                        ref="uploadicon"
                        >
                        <el-button size="small" type="primary" plain v-if="!showFile">选择文件</el-button>
                        <el-button size="small" slot="tip" type="primary" plain @click="upbtn" v-if="showFile">上传封面</el-button>
                        <span class="dgrey" slot="tip" style="margin-left:20px;">请上传小于150M的文件，支持格式png/jpg/mp4/wma</span>
                    </el-upload>

                    <el-col :span="24" v-show="$route.params.id && $route.params.viewStatus === '3'">
                        <div class="dimg-div">
                            <el-image :src="`/resources/`+ dataForm.content" fit="cover" class="image" />
                            <!-- <video :src="`/resources/`+ dataForm.content" :controls="true">
                                您的浏览器不支持视频播放
                            </video> -->
                        </div>
                    </el-col>
                </el-form-item>
                <el-form-item v-show="$route.params.viewStatus !== '3'" class="dbtn text-center">
                    <el-button type="primary" round @click="onSubmit"
                     :disabled="!(dataForm.startTime && dataForm.endTime && this.dataForm.content)"
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
import { showLoading, hideLoading } from "@/lib/js/loading"
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
        status: "0", // 上线状态（0：上线，1：下线）
        id: "",
        type: "video"
    }

    // 图片
    private dfile: any
    private showFile = false
    private fileDataList: any = []

    protected mounted() {
        if (this.$route.params.id) {
            this.load()
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
                    MessageBox.alert(res.message, "成功", { type: "success" })
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
        const isJPG = file.raw.type === "image/jpeg"
        const isPNG = file.raw.type === "image/png"
        const isMP4 = file.raw.type === "video/mp4"
        const isWMA = file.raw.type === "video/wma"
        const isLt150M = file.raw.size / 1024 / 1024 <= 150
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
            if (fileList.length > 0) {
                this.showFile = !this.showFile
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
                this.showFile = !this.showFile
            }
        }
    }

    private upbtn() {
        showLoading()
        const formData = new FormData()
        formData.append("file", this.dfile.raw) // 传参改为formData格式
        axios({
            method: "post",
            url: `/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsSpecialAttention&isystemName=1`, // 请求后端的url
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
                        hideLoading()
                        this.dataForm.content = res.data.data.filePath
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
.dimg-div{
    width:100%;
    height:400px;
    overflow: hidden;
}
</style>
