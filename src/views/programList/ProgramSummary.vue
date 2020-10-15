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
                :action="' '"
                :auto-upload="false"
                :limit="3"
                :on-change="handleAvatarChangeIcon"
                ref="uploadicon"
                >
                 <el-button size="small" type="primary" plain>附件上传</el-button>
                <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于10M的文件，支持格式：doc/docx/ppt/pptx/xls/pdf/txt/png/jpg/zip/rar;</span>
          </el-upload>
        </div>
        <div class="bottom dbtn">
          <el-button round>返回</el-button>
          <el-button type="primary" round :disabled="!summaryContent" @click="onSubmit">提交</el-button>
          <el-button v-show="$route.params.summaryName !=='发布小结'" type="danger" plain round @click="summaryDelete">删除</el-button>
          <el-button plain round @click="saveFile">上传文件</el-button>
        </div>
      </div>
    </el-card>
     <el-dialog title="参与部门" :visible.sync="dialogTableVisible">
        <template>
            <div class="app-container" style="height:600px;overflow:auto">
                <el-tree  highlight-current show-checkbox :props="defaultProps" ref="treeDepartment" node-key="id" :default-checked-keys="departmentArr"
                    lazy :load="loadAllDepartment">
                </el-tree>
                <el-button type="primary" round @click="submitTree">确认</el-button>
            </div>
        </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postProgramSummary, getProgramDetail, postProgramSummaryDelete } from "@/api/programList/programList"
import { MessageBox } from "element-ui"
import { getOrgFirst, getOrgTree } from "@/api/addressBook"
import { UserModule } from "@/store/module/user"
import axios from "axios"
@Component
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
    private fileIds = "";
    private dialogTableVisible = false

    private defaultProps={
        children: "children",
        label: "label",
        isLeaf: "isLeaf"
    }

    private departmentArr= []

    protected mounted() {
        this.getSummaryDetail()
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
                    }
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

    // 部门获取
    private loadAllDepartment(node: any, resolve: (arg0: {}[]) => any) {
        if (node.level === 0) {
            const params = {
                moaFlag: "1"
            }
            getOrgFirst(params).then(res => {
                if (res.code === 0) {
                    const leaderList = res.data.childOrgList
                    const brr = [] // 组装部门数据
                    for (let i = 0; i < leaderList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false // 是否有下级
                        obj.disabled = false // 是否可以选择
                        obj.id = leaderList[i].orgCode
                        obj.label = leaderList[i].orgName
                        obj.level = leaderList[i].level
                        brr.push(obj)
                    }
                    return resolve(brr)
                }
            })
        } else if (node.level === 1) {
            if (node.data.level === 1) {
                node.data.disabled = false
                node.loading = false
                node.isLeaf = true
            } else {
                const params = {
                    orgCode: node.data.id
                }
                getOrgTree(params).then(res => {
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = false
                        obj.id = childList[i].orgCode
                        obj.label = childList[i].orgName
                        obj.extendProperty = childList[i].extendProperty
                        obj.level = childList[i].level
                        arr.push(obj)
                    }
                    return resolve(arr)
                })
            }
        } else if (node.level === 2) {
            if (node.data.extendProperty.hasChildOrg === 1) {
                const params = {
                    orgCode: node.data.id
                }
                getOrgTree(params).then(res => {
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = false
                        obj.id = childList[i].orgCode
                        obj.label = childList[i].orgName
                        obj.extendProperty = childList[i].extendProperty
                        obj.level = childList[i].level
                        arr.push(obj)
                    }
                    return resolve(arr)
                })
            } else {
                node.data.disabled = false
                node.loading = false
                node.isLeaf = true
            }
        } else if (node.level === 3) {
            node.data.disabled = false
            node.loading = false
            node.isLeaf = true
        }
    }

    private dataList: any = []
    private submitTree() {
        // @ts-ignore
        this.dataList = this.$refs.treeDepartment.getCheckedNodes()
        const arr = []
        for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].extendProperty) {
                const obj: any = {}
                obj.deptCode = this.dataList[i].id.toString()
                obj.deptName = this.dataList[i].label.toString()
                arr.push(JSON.stringify(obj))
            }
        }
        this.deptnamesData = "[" + arr.toString() + "]"
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
                        this.fileIds = res.data.data.fileId
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
