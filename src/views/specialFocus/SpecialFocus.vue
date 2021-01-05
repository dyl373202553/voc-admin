<template v-if="this.userrole==='0'">
    <div class="app-container release">
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
                  >
                  <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
                  <editorVideo color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK" />
                  <span class="dgrey" style="margin-left:10px;">请上传小于150M的文件，支持格式png/jpg/mp4/wma</span>
                </el-form-item>
                <el-form-item>
                  <div style="width:75%;height:247px; overflow: hidden;">
                      <el-image v-show="coverArr.type==='img'" :src="coverArr.cover" fit="contain" class="image" style="height:auto" />
                      <video v-show="coverArr.type==='video'" :src="coverArr.url" :poster="coverArr.cover" :controls="true" style="height:247px">
                          您的浏览器不支持视频播放
                      </video>
                  </div>
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
import editorImage from './Upload/EditorImage.vue'
import editorVideo from './Upload/EditorVideo.vue'
import { UserModule } from "@/store/module/user"
import axios from "axios"
import Cookies from "js-cookie"
@Component({
    components: { editorImage, editorVideo }
})
export default class SpecialFocus extends Vue {
    get userToken() {
        // @ts-ignore
        return UserModule.token
    }
    private coverArr: any = {}
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
                if (this.$route.params.viewStatus !== "3") {
                    this.coverArr.url = this.dataForm.content
                    this.coverArr.cover = this.dataForm.cover
                    this.coverArr.type = this.dataForm.type
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
                        name: "ContentManagement",
                        query:{load: "1"}
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

    // 校验时间
    private checkDate() {
        if (this.dataForm.startTime && this.dataForm.endTime) {
            if (this.dataForm.endTime <= this.dataForm.startTime) {
                MessageBox.alert("节目结束时间不能早于开始时间", "error", { type: "error" })
                this.dataForm.endTime = ""
            }
        }
    }

    private imageSuccessCBK(arr: any) {
        Vue.set(this.coverArr, "cover", arr[0].cover)
        Vue.set(this.coverArr, "type", arr[0].type)
        Vue.set(this.coverArr, "url", arr[0].url)
        this.dataForm.content = this.coverArr.url
        this.dataForm.type  = this.coverArr.type
        this.dataForm.cover  = this.coverArr.cover
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
