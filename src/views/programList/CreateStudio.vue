<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">创建直播间</span>
      </div>
      <el-form ref="dataForm" :model="dataForm" label-width="150px"  v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.5)">
        <el-form-item label="节目时间" class="dimportant-before">
            <el-col :span="11">
                <el-form-item
                    prop="startTime"
                    :rules="[
                    { required: true, message: '节目时间开始时间不能为空'}
                    ]">
                    <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="请选择开始时间" style="width: 100%;" />
                </el-form-item>
            </el-col>
            <el-col :span="2" class="line">至</el-col>
            <el-col :span="11">
                <el-form-item prop="endTime"
                    :rules="[
                    { required: true, message: '节目时间结束时间不能为空'}
                    ]">
                    <el-date-picker v-model="dataForm.endTime" type="datetime" placeholder="请选择结束时间" style="width: 100%;" />
                </el-form-item>
            </el-col>
        </el-form-item>

        <el-form-item label="节目封面"
            prop="logoUrl"
            :rules="[
            { required: true, message: '节目封面不能为空'}
            ]" style="positon:relative;"
            :class="progressFlag? 'imgList': ''">
           <el-upload
                class="upload-image"
                :action="' '"
                list-type="picture"
                accept=".jpg,.png,.jpeg"
                :auto-upload="false"
                :on-exceed="handleExceed"
                :on-remove="handleRemove"
                :limit="1"
                :file-list="fileDataList"
                :on-change="handleAvatarChangeIcon"
                ref="uploadicon"
                >
                <el-button size="small" type="primary" plain v-show="showFile === 0">选择文件</el-button>
                <el-button size="small" slot="tip" type="danger" plain @click="upbtn" v-show="showFile === 1">上传封面</el-button>
                <span class="dgrey" slot="tip" style="margin-left:20px;">请上传小于2M的文件，支持格式jpg/png/jpeg;</span>
            </el-upload>
            <el-progress v-show="progressFlag" :stroke-width="9" class="dprogress" type="circle" :color="customColors" :percentage="progressPercent" :status="progressStatus"></el-progress>
        </el-form-item>
        <el-form-item label="节目主讲人"
            prop="speakersData"
            :rules="[
            { required: true, message: '节目主讲人不能为空'}
            ]">
          <el-input v-model="speakersData" placeholder="请选择主讲人"  @focus="dialogTableVisible = true" suffix-icon="el-icon-s-home" />
        </el-form-item>
        <el-form-item label="本期嘉宾">
          <el-input v-model="dataForm.guests"  placeholder="请填写内容" />
        </el-form-item>
        <el-form-item label="是否发布督办举措">
          <el-radio-group v-model="dataForm.superviseFlag">
            <el-radio v-model="dataForm.superviseFlag" label="0">是</el-radio>
            <el-radio v-model="dataForm.superviseFlag" label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否发布节目小结">
          <el-radio-group v-model="dataForm.summaryFlag">
            <el-radio v-model="dataForm.summaryFlag" label="0">是</el-radio>
            <el-radio v-model="dataForm.summaryFlag" label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="text-center dbtn">
          <el-button type="primary" round @click="onSubmit"
            :disabled="!(dataForm.speakersData && dataForm.startTime && dataForm.endTime && this.dataForm.logoUrl)"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="通讯录" :visible.sync="dialogTableVisible" >
        <TreePerson @func="getMsgFormSon" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postCreateStudio } from "@/api/programList/programList"
import TreePerson from "@/components/addressBook/TreePerson.vue"
import { MessageBox } from "element-ui"
import { day } from "@/lib/js/unitls"
import { UserModule } from "@/store/module/user"
import axios from "axios"
// import Cookies from "js-cookie"

@Component({
    components: { TreePerson }
})
export default class CreateStudio extends Vue {
    get userToken() {
        // @ts-ignore
        return UserModule.token
    }

    private dialogTableVisible = false
    private loading = false
    private dataList: any = [] // 保存通讯录传过来的数据
    private dataForm = {
        startTime: "",
        endTime: "",
        logoUrl: "",
        speakersData: "", // 节目主讲人
        guests: "", // 本期嘉宾
        superviseFlag: "1", // 是否发布督办举措 0:是 1：否
        summaryFlag: "1" // 是否发布节目小结 0:是 1：否
    }

    private speakersData ="" // 保存主讲人

    private defaultProps={
        children: "children",
        label: "label",
        isLeaf: "isLeaf"
    }

    private departmentArr= []

    // 图片
    private dfile: any
    private showFile = 0
    private fileDataList = []
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

    private onSubmit() {
        this.loading = true
        this.dataForm.startTime = day(this.dataForm.startTime, "YYYY-MM-DD HH:mm:ss")
        this.dataForm.endTime = day(this.dataForm.endTime, "YYYY-MM-DD HH:mm:ss")
        postCreateStudio(this.dataForm).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.dataForm = {
                        startTime: "",
                        endTime: "",
                        logoUrl: "",
                        speakersData: "",
                        guests: "",
                        superviseFlag: "1",
                        summaryFlag: "1"
                    }
                    MessageBox.alert("发布成功", "成功", { type: "success" })
                    this.$router.push({
                        name: "home"
                    })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 获取通讯录传回的数据
    private getMsgFormSon(data: string|any[]) {
        this.dialogTableVisible = false
        this.dataList = data
        const arr = []
        const brr = []
        for (let i = 0; i < this.dataList.length; i++) {
            const obj: any = {}
            obj.userCode = this.dataList[i].userCode.toString()
            obj.userName = this.dataList[i].userName.toString()
            obj.deptName = this.dataList[i].orgName.toString()
            arr.push(JSON.stringify(obj))
            brr.push(obj.userName)
        }
        this.dataForm.speakersData = "[" + arr.toString() + "]"
        this.speakersData = brr.toString()
    }

    // 上传图片
    private handleAvatarChangeIcon(file: any, fileList: any) {
        const isJPG = file.raw.type === "image/jpeg"
        const isPNG = file.raw.type === "image/png"
        const isLt2M = file.raw.size / 1024 / 1024 <= 2
        if (!isPNG && !isJPG) {
            this.fileDataList = []
            this.$message.error("上传图片只能是 JPG/PNG 格式! 请重新选择")
            return false
        } else if (!isLt2M) {
            this.fileDataList = []
            this.$message.error("上传图片大小不能超过 2M! 请重新选择")
            return false
        } else if (isLt2M && (isPNG || isJPG)) {
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
        const isLt2M = file.raw.size / 1024 / 1024 <= 2
        if (isLt2M && (isPNG || isJPG)) {
            if (fileList.length === 0) {
                this.progressFlag = false
                this.showFile = 0
                this.progressPercent = 0
            }
        }
    }

    private upbtn() {
        // 上传图片
        const formData = new FormData()
        formData.append("file", this.dfile.raw) // 传参改为formData格式
        // console.log(Cookies.get("kmportaltoken"))
        axios({
            method: "post",
            url: `/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsSpecialAttention&isystemName=1`, // 请求后端的url
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
                        this.dataForm.logoUrl = res.data.data.filePath
                        if (this.progressPercent === 100) {
                            this.progressFlag = false
                            this.showFile = 3
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
}
</script>

<style scoped>
    .line {
        text-align: center;
    }
    .dprogress {
      position: absolute;
      top: 134px;
      z-index: 1000;
      left: 45%;
    }
</style>
