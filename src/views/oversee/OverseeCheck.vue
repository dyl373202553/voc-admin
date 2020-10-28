<template>
    <div class="app-container">
        <el-card class="box-card dpadding0">
        <div slot="header" class="clearfix">
            <span class="header-title">督办查看</span>
        </div>
        <div class="dsummary">
            <div class="dsummary-mian">
            <div class="dsummary-title">节目信息</div>
            <div>
                <p><span>节目名称：</span><span>{{this.programList.title}}</span></p>
                <p><span>节目时间：</span><span>{{this.programList.time}}</span></p>
                <p><span>督办状态：</span>
                <span v-if="$route.params.status === '0'" class="dblue">{{ $route.params.statusName }}</span>
                <span v-if="$route.params.status !== '0'" class="dred">{{ $route.params.statusName }}</span>
                </p>
            </div>
            </div>
            <div class="dsummary-mian">
            <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>督办事项</div>
                <template>
                        <el-input v-if="$route.params.status === '1'"
                        v-model="programOversee"
                        type="textarea"
                        :rows="3"
                        placeholder="请填写督办事项"
                        />
                        <p v-if="$route.params.status !== '1'">{{this.programOversee}}</p>
                </template>
                <template>
                    <div v-show="$route.params.status !== '1'">
                        <p><span>责任部门：</span><span>{{this.person}}</span></p>
                    </div>
                </template>
            </div>
            <div v-show="$route.params.status === '1'" class="dsummary-mian">
                <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>责任部门</div>
                <el-input v-model="deptnamesDataList" placeholder="请选择参与部门"  @focus="dialogTableVisible = true" suffix-icon="el-icon-s-home" />
            </div>
            <div v-show="$route.params.status !== '1'" class="dsummary-mian">
                <div class="dsummary-title">督办举措</div>
                <template v-show="$route.params.status !== '2'">
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
                                    <span class="info-title" v-if="item.fileIds">{{item.fileIds}}</span>
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
                </template>

                <div v-show="$route.params.status === '2' && this.superviseMeasuresList.length===0" class="main-info">
                    暂无内容！
                </div>
            </div>
            <div class="bottom dbtn">
            <el-button v-show="$route.params.status !== '3'" round @click="back">返回</el-button>
            <el-button v-show="$route.params.status === '1' || $route.params.status === '2'" type="primary" round
            :disabled="!(this.deptnamesDataList && this.programOversee)" @click="submit">提交</el-button>
            <el-button v-show="$route.params.status === '3'" type="danger" round  @click="allBack">一键退回</el-button>
            <el-button v-show="$route.params.status === '3'" type="primary" round @click="allMakesureComfire">一键确认</el-button>
            <el-button v-show="$route.params.status === '3' || $route.params.status === '2'" type="danger" plain round @click="overseeCancel">撤销督办</el-button>
            </div>
        </div>
        </el-card>
        <el-dialog title="责任部门" :visible.sync="dialogTableVisible">
            <TreeDepartment @funcs="getMsgFormSon" />
        </el-dialog>
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
import TreeDepartment from "@/components/addressBook/TreeDepartment.vue"
import { postOverseeAdd, getOverseeDetail, postOverseeCancel, postOverseeMakesure, postOverseeBack } from "@/api/oversee/oversee"
import { UserModule } from "@/store/module/user"
import { MessageBox } from "element-ui"
import { handleDownload } from "@/lib/js/unitls"
@Component({
    components: { TreeDepartment }
})
export default class OverseeCheck extends Vue {
    private programOversee = "";
    private deptnamesData = "";
    private deptnamesDataList = "";
    private dataList: any = []
    private person = ""
    private programList= {
        title: "",
        time: ""
    }

    // 举措
    private centerDialogVisible =false
    private returnOpinion ="" // 退回意见
    private returnOpinionId =""
    private superviseMeasuresList: any= [] // 督办举措
    private dialogTableVisible = false

    private defaultProps={
        children: "children",
        label: "label",
        isLeaf: "isLeaf"
    }

    private departmentArr= []
    private fileIdsName = ""

    protected mounted() {
        this.load()
    }

    private load() {
        const programList = getProgramDetail({ id: this.$route.params.programId }) // 获取节目列表--主要是为了拿取节目时间
        const programOversee = getOverseeDetail({ id: this.$route.params.id }) // 督办详情
        Promise.all([programList, programOversee]).then((res) => {
            this.programList.title = res[0].data.title
            this.programList.time = res[0].data.liveEntity.startTime + "--" + res[0].data.liveEntity.endTime
            this.superviseMeasuresList = res[1].data.superviseMeasuresList
            this.programOversee = res[1].data.content
            this.person = res[1].data.deptnames
        }).catch(() => {
            MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
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

    // 提交
    private submit() {
        const params = {
            id: this.$route.params.id, // ID
            content: this.programOversee, // 内容
            deptnamesData: this.deptnamesData // String-督办部门 格式：[{"deptCode":"201000000","deptName":"信息系统部"},{"deptCode":"202000000","deptName":"网络部"}]
        }
        postOverseeAdd(params).then((res) => {
            if (res) {
                if (res.code === 0) {
                    MessageBox.alert(res.message, "成功", { type: "success" })
                    this.$router.push({
                        name: "home"
                    })
                } else if (res.code === 1) {
                    MessageBox.alert(res.message, "失败", { type: "error" })
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

    // 获取通讯录传回的数据 -责任部门返回数据
    private getMsgFormSon(data: string|any[]) {
        this.dialogTableVisible = false
        this.dataList = data
        const arr = []
        const brr = []
        for (let i = 0; i < this.dataList.length; i++) {
            const obj: any = {}
            obj.deptCode = this.dataList[i].id.toString()
            obj.deptName = this.dataList[i].label.toString()
            arr.push(JSON.stringify(obj))
            brr.push(obj.deptName)
        }
        this.deptnamesData = "[" + arr.toString() + "]"
        this.deptnamesDataList = brr.toString()
    }

    // 举措

    // 退回弹框
    private backDialog(id: string) {
        this.centerDialogVisible = true
        this.returnOpinionId = id
    }

    // 举措确认
    private overseeMakesureComfire(id: string) {
        postOverseeMakesure({ ids: id }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.load()
                    UserModule.getTodo()
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

    // 文件下载
    private haveDownload(fileIds: any) {
        handleDownload(fileIds)
    }

    private back() {
        this.$router.back()
    }
}
</script>
