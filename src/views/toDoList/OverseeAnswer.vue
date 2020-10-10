<template>
  <div class="app-container">
        <el-card class="box-card dpadding0">
        <div slot="header" class="clearfix">
            <span class="header-title" v-if="this.status === '3'">举措确认</span>
            <span class="header-title" v-if="this.status === '2'">督办回答</span>
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
            <div v-show="this.status === '2'" class="dsummary-mian">
                <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>督办举措</div>
                <el-input
                    v-model="dsummaryContent"
                    type="textarea"
                    :rows="3"
                    placeholder="请输入举措内容"
                />
            </div>
            <div v-show="this.status === '3'" class="dsummary-mian">
                <div class="main-info" v-for="(item, key) in superviseMeasuresList" :key="key">
                    <div class="info-left">
                        <el-avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2496227229,2115216729&fm=26&gp=0.jpg" />
                        </div>
                        <div class="info-right">
                        <div>
                            <span class="info-title">{{item.userName}}</span>
                            <span>{{item.deptName}}</span>
                        </div>
                        <p>{{item.content}}</p>
                        <div>
                            <i class="el-icon-paperclip" />
                            <span class="info-title">{{item.fileIds}}</span>
                        </div>
                        <div class="text-center dbtn" v-if="item.status === '1' ">
                            <el-button type="danger" round plain @click="backDialog(item.id)">退回</el-button>
                            <el-button type="primary" round @click="overseeMakesureComfire(item.id)">确认</el-button>
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="this.status === '2'" class="dsummary-mian">
                <div class="dsummary-title">上传附件</div>
                <div>
                    <el-upload
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple
                        >
                        <el-button size="small" type="primary" plain>附件上传</el-button>
                        <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于10M的文件，支持格式：doc/docx/ppt/pptx/xls/pdf/txt/png/jpg/zip/rar;</span>
                    </el-upload>
                </div>
            </div>
            <div v-show="this.status === '2'" class="bottom dbtn">
                <el-button round>取消</el-button>
                <el-button type="primary" round :disabled="!dsummaryContent" @click="superviseMeasuresSubmit">提交</el-button>
            </div>
            <div v-show="this.status === '3'" class="bottom dbtn">
                <el-button type="danger" round plain @click="centerDialogVisible = true">一键退回</el-button>
                <el-button type="primary" round>一键确认</el-button>
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
import { getProgramDetail } from "@/api/programList/programList"
import { postOverseeMeasure, getOverseeDetail, postOverseeCancel, postOverseeMakesure, postOverseeBack } from "@/api/oversee/oversee"
import { MessageBox } from "element-ui"
@Component
export default class OverseeAnswer extends Vue {
    private status = ""
    private centerDialogVisible =false
    private dsummaryContent = ""
    private programList= {
        title: "",
        time: ""
    }

    private returnOpinion ="" // 退回意见
    private returnOpinionId =""
    private superviseMeasuresList= [] // 督办举措

    private programOversee =""
    private deptnamesData = ""
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

    private superviseMeasuresSubmit() {
        const params = {
            todoId: this.$route.params.id, // 待办ID
            content: this.dsummaryContent, // 督办举措内容
            fileIds: "附件id", // 附件
            id: "" // ID
        }
        postOverseeMeasure(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    MessageBox.alert(`提交成功`, "成功", { type: "success" })
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
                    MessageBox.alert(res.message, "成功", { type: "success" })
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
                    MessageBox.alert(res.message, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
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
                    MessageBox.alert(res.message, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }
}
</script>
