<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">创建直播间</span>
      </div>
      <el-form ref="dataForm" :model="dataForm" label-width="150px">
        <el-form-item label="节目时间"
            prop="startTime"
            :rules="[
            { required: true, message: '节目时间不能为空'}
            ]">
          <el-col :span="11">
            <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="请选择开始时间" style="width: 100%;" />
          </el-col>
          <el-col :span="2" class="line">至</el-col>
          <el-col :span="11">
            <el-date-picker v-model="dataForm.endTime" type="datetime" placeholder="请选择结束时间" style="width: 100%;" />
          </el-col>
        </el-form-item>
        <el-form-item label="节目封面"
            prop="logoUrl"
            :rules="[
            { required: true, message: '节目封面不能为空'}
            ]">
          <el-upload
            class="upload-image"
            action="https://jsonplaceholder.typicode.com/posts/"
            :file-list="fileList"
            list-type="picture"
            :limit="1"
            accept=".png, .jpg, .jpeg"
          >
            <el-button size="small" type="primary" plain>上传封面</el-button>
            <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于2M的文件，支持格式jpg/png/jpeg;</span>
          </el-upload>
        </el-form-item>
        <el-form-item label="节目主讲人"
            prop="speakersData"
            :rules="[
            { required: true, message: '节目主讲人不能为空'}
            ]">
          <el-input v-model="dataForm.speakersData" placeholder="请选择主讲人"  @focus="dialogTableVisible = true" suffix-icon="el-icon-s-home" />
        </el-form-item>
        <el-form-item label="本期嘉宾"
            prop="guests"
            :rules="[
            { required: true, message: '本期嘉宾不能为空'}
            ]">
          <el-input v-model="dataForm.guests"  placeholder="请填写内容" />
        </el-form-item>
        <el-form-item label="是否发布督办举措"
            prop="superviseFlag"
            :rules="[
            { required: true, message: '请选择是否发布督办举措', trigger: 'change' }
            ]">
          <el-radio-group v-model="dataForm.superviseFlag">
            <el-radio v-model="dataForm.superviseFlag" label="0">是</el-radio>
            <el-radio v-model="dataForm.superviseFlag" label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否发布节目小结"
             prop="summaryFlag"
            :rules="[
            { required: true, message: '请选择是否发布节目小结', trigger: 'change' }
            ]">
          <el-radio-group v-model="dataForm.summaryFlag">
            <el-radio v-model="dataForm.summaryFlag" label="0">是</el-radio>
            <el-radio v-model="dataForm.summaryFlag" label="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item class="text-center dbtn">
          <el-button type="primary" round @click="onSubmit"
            :disabled="!(dataForm.speakersData && dataForm.guests && dataForm.startTime && dataForm.endTime)"
          >提交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="通讯录" :visible.sync="dialogTableVisible">
        <template>
            <div class="app-container" style="height:600px;overflow:auto">
                <el-tree  highlight-current show-checkbox :props="defaultProps" ref="treeDepartment" node-key="id" :default-checked-keys="departmentArr"
                    lazy :load="loadAll">
                </el-tree>
                <el-button type="primary" round @click="submitTree">确认</el-button>
            </div>
        </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postCreateStudio } from "@/api/programList/programList"
// import { day } from "@/lib/js/unitls"
import { MessageBox } from "element-ui"
import { day } from "@/lib/js/unitls"
import { getOrgFirst, getUserListBySecondCode, getOrgTree } from "@/api/addressBook"

@Component
export default class CreateStudio extends Vue {
    private fileList = [{ name: "food2.jpeg", url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600835517648&di=66a169c2743457deb998e954546616a0&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F49%2F55%2F635acaccbda9696.jpg" }]

    private dialogTableVisible = false
    private dataForm = {
        startTime: "",
        endTime: "",
        logoUrl: "http://www.managershare.com/uploads/2015/01/14210532585795.jpg",
        speakersData: "[{'userCode':'fuhao','userName':'傅浩','deptName':'信息系统部'}]", // 节目主讲人
        guests: "", // 本期嘉宾
        superviseFlag: "1", // 是否发布督办举措 0:是 1：否
        summaryFlag: "1" // 是否发布节目小结 0:是 1：否
    }

    private defaultProps={
        children: "children",
        label: "label",
        isLeaf: "isLeaf"
    }

    private departmentArr= []

    private onSubmit() {
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
                    MessageBox.alert(res.message, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // private handleRemove(file: any, fileList: any) {
    //     console.log(file, fileList)
    // }

    // private handlePreview(file: any) {
    //     console.log(file)
    // }

    // private handleExceed(file: any) {
    //     alert("超出数量")
    //     console.log(file)
    // }

    // private handleOut(file: any) {
    //     console.log(file)
    //     // var testmsg = file.name.substring(file.name.lastIndexOf('.') + 1)
    //     // const extension = testmsg === 'png'
    //     // const extension2 = testmsg === 'jpg'
    //     // const isLt2M = file.size / 1024 / 1024 < 1 // 这里做文件大小限制
    //     // if (!extension && !extension2) {
    //     //   this.$message({
    //     //     message: '上传文件只能是 png、jpg格式!',
    //     //     type: 'warning'
    //     //   })
    //     // }
    //     // if (!isLt2M) {
    //     //   this.$message({
    //     //     message: '上传文件大小不能超过 1MB!',
    //     //     type: 'warning'
    //     //   })
    //     // }
    //     // return extension || extension2 && isLt2M
    // }

    // 通讯录获取
    private loadAll(node: any, resolve: (arg0: {}[]) => any) {
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
                        obj.disabled = true // 是否可以选择
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
                const params = {
                    orgCode: node.data.id
                }
                getUserListBySecondCode(params).then(res => {
                    if (res.code === 0) {
                        const userList = res.data
                        const arr = []
                        for (let i = 0; i < userList.length; i++) {
                            const obj: any = {}
                            obj.isLeaf = true
                            obj.id = userList[i].userCode
                            obj.label = userList[i].userName
                            obj.res = userList[i]
                            arr.push(obj)
                        }
                        return resolve(arr)
                    }
                })
            } else {
                const params = {
                    orgCode: node.data.id
                }
                getOrgTree(params).then(res => {
                    const leaderList = res.data.leaderList
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < leaderList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = true
                        obj.id = leaderList[i].userCode
                        obj.label = leaderList[i].userName
                        obj.res = leaderList[i]
                        // obj.icon = LOGIN_URL + leaderList[i].imgB
                        arr.push(obj)
                    }
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = true
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
                    const leaderList = res.data.leaderList
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < leaderList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = true
                        obj.id = leaderList[i].userCode
                        obj.label = leaderList[i].userName
                        obj.res = leaderList[i]
                        // obj.icon = LOGIN_URL + leaderList[i].imgB
                        arr.push(obj)
                    }
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = true
                        obj.id = childList[i].orgCode
                        obj.label = childList[i].orgName
                        obj.extendProperty = childList[i].extendProperty
                        obj.level = childList[i].level
                        arr.push(obj)
                    }
                    return resolve(arr)
                })
            } else {
                const params = {
                    orgCode: node.data.id
                }
                getUserListBySecondCode(params).then((res) => {
                    if (res.code === 0) {
                        const userList = res.data
                        const arr = []
                        for (let i = 0; i < userList.length; i++) {
                            const obj: any = {}
                            obj.isLeaf = true
                            obj.id = userList[i].userCode
                            obj.label = userList[i].userName
                            obj.res = userList[i]
                            arr.push(obj)
                        }
                        return resolve(arr)
                    }
                })
            }
        } else if (node.level === 3) {
            const params = {
                orgCode: node.data.id
            }
            getUserListBySecondCode(params).then(res => {
                if (res.code === 0) {
                    const userList = res.data
                    const arr = []
                    for (let i = 0; i < userList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = true
                        obj.id = userList[i].userCode
                        obj.label = userList[i].userName
                        obj.res = userList[i]
                        arr.push(obj)
                    }
                    return resolve(arr)
                }
            })
        }
    }

    private dataList: any = []
    private submitTree() {
        // @ts-ignore
        this.dataList = this.$refs.treeDepartment.getCheckedNodes()
        const arr = []
        for (let i = 0; i < this.dataList.length; i++) {
            const obj: any = {}
            obj.userCode = this.dataList[i].res.userCode.toString()
            obj.userName = this.dataList[i].res.userName.toString()
            obj.deptName = this.dataList[i].res.orgName.toString()
            arr.push(JSON.stringify(obj))
        }
        this.dataForm.speakersData = "[" + arr.toString() + "]"
    }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>
