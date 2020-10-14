<template>
    <div class="app-container">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="header-title">特别关注{{ $route.params.viewStatus }}_{{ $route.params.id }}</span>
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
                <el-form-item label="内容上传">
                    <el-upload
                        v-show="$route.params.viewStatus !== '3'"
                        class="upload-image"
                        :action="' '"
                        list-type="picture"
                        :auto-upload="false"
                        :limit="1"
                        :on-progress="progress"
                        :on-change="handleAvatarChangeIcon"
                        ref="uploadicon"
                        >
                        <el-button size="small" type="primary" plain>上传封面</el-button>
                        <span class="dgrey" slot="tip" style="margin-left:20px;">请上传小于150M的文件，支持格式png/jpg/mp4/wma</span>
                    </el-upload>
                    <el-button size="small" type="primary" plain @click="saveFile">上传到服务器</el-button>
                    <el-col :span="24" v-show="$route.params.id && $route.params.viewStatus === '3'">
                        <img :src="dataForm.content"/>
                    </el-col>
                </el-form-item>
                <el-form-item v-show="$route.params.viewStatus !== '3'" class="dbtn text-center">
                    <el-button type="primary" round @click="onSubmit"
                     :disabled="!(dataForm.startTime && dataForm.endTime)"
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
        content: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600835578753&di=c6374cd3314e12b884534d0b43aa4ed2&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F82%2F99%2F355c4aaa264ccc7.jpg",
        status: "0", // 上线状态（0：上线，1：下线）
        id: ""
    }
    // 上传图片

    private fileList = [{ name: "food2.jpeg", url: this.dataForm.content }]

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
                    this.dataForm.endTime = ""
                    this.dataForm.startTime = ""
                    this.dataForm.content = ""
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
    private dfile: any
    private iconformData = {
        img: "",
        name: ""
    }

    private hideUploadIcon: any

    private handleAvatarChangeIcon(file: any, fileList: any) {
        const isJPG = file.raw.type === "image/jpeg"
        const isPNG = file.raw.type === "image/png"
        this.dfile = file
        const isLt2M = file.raw.size / 1024 / 1024 < 0.5
        this.hideUploadIcon = fileList.length >= 1
        if (!isPNG && !isJPG) {
            this.$message.error("上传图片只能是 JPG/PNG 格式!")
            return false
        } else if (!isLt2M) {
            this.$message.error("上传图片大小不能超过 200kb!")
            return false
        } else if (isLt2M && (isPNG || isJPG)) {
            this.iconformData.img = file.raw // 图片的url
            this.iconformData.name = file.name // 图片的名字
        }
    }

    private saveFile() {
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
.line{
  text-align: center;
}
</style>
