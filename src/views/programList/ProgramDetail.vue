<template>
    <div class="app-container">
        <el-card class="box-card dpadding0">
        <div slot="header" class="clearfix">
            <span class="header-title">节目查看</span>
        </div>
        <div class="dcontent">
            <div class="top">
                <h2 class="top-title">
                    {{this.programForm.title}}
                </h2>
                <div class="top-info">
                    <span>{{this.programForm.startTime}} -- {{this.programForm.endTime}}</span>
                    <span>{{this.programForm.speakers}}</span>
                    <span><img src="@/assets/images/icon_look.png"/>{{this.programForm.browerNum}}</span>
                    <!-- 点赞数 -->
                    <span><img src="@/assets/images/icon_like.png" style="vertical-align: bottom;"/>{{this.programForm.praiseNum}}</span>
                </div>
            </div>
            <div class="main">
                <div v-if="this.programForm.guests">
                    <div class="main-title">—— 本期嘉宾 ——</div>
                    <p>{{this.programForm.guests}}</p>
                </div>
                <div v-if="this.programForm.summary">
                    <div class="main-title">—— 本期简介 ——</div>
                    <p>{{this.programForm.summary}}</p>
                </div>
                <div>
                    <div class="main-title">—— 节目内容 ——</div>
                    <div v-html="this.programForm.content" style="font-size:14px;letter-spacing: 1px;line-height: 24px;"></div>
                </div>
                <div v-if="this.programFormFileId.length!==0">
                    <div class="main-title">—— 附件 ——</div>
                    <div class="downloadClick" v-for="(item, key) in programFormFileId" :key="key">
                        <a @click="$handleDownload(item.fileId)" >
                            <i class="el-icon-paperclip" />
                            <span class="info-title">{{item.fileName}}</span>
                        </a>
                    </div>
                </div>
                <div class="main-btn">
                    <!-- ownerPraiseStatus个人点赞状态（0：是，1：否） , -->
                    <el-button v-if="this.programForm.likeShow === '1'" type="primary" round @click="getLikeShow">
                        <img src="@/assets/images/icon_like_white.png"/>点赞支持一下</el-button>
                    <el-button v-if="this.programForm.likeShow === '0'" type="info" round>
                        <img src="@/assets/images/icon_like_done.png"/>您已点过赞啦</el-button>
                </div>
            </div>
            <div class="bottom">
                <template v-if="this.supervise.status === '0'">
                    <div class="bottom-main" v-if="this.allList.superviseItemEntity">
                        <div class="main-title">督办事项</div>
                        <div class="main-info">
                        <div class="info-left">
                            <el-avatar :src="`/resources/bluepage/a/`+this.allList.superviseItemEntity.userCode+`_A.jpg`"/>
                        </div>
                        <div class="info-right">
                            <div>
                            <span class="info-title">{{this.supervise.userName}}</span>
                            <span>{{this.supervise.deptName}}</span>
                            </div>
                            <p>{{this.supervise.content}}</p>
                            <div>
                            <span class="info-title">责任部门：</span>
                            <span>{{this.supervise.deptnames}}</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div class="bottom-main">
                        <div class="main-title">督办举措</div>
                        <div class="main-info" v-for="(item, key) in superviseMeasuresList" :key="key">
                        <div class="info-left">
                            <el-avatar :src="`/resources/bluepage/a/`+item.userCode+`_A.jpg`"/>
                        </div>
                        <div class="info-right">
                            <div>
                                <span class="info-title">{{item.userName}}</span>
                                <span>{{item.deptName}}</span>
                            </div>
                            <p>{{item.content}}</p>

                            <template v-if="item.fileIds">
                                <div class="downloadClick" v-for="(itemChild, key) in JSON.parse(item.fileIds)" :key="key">
                                    <a @click="$handleDownload(itemChild.fileId)" >
                                        <i class="el-icon-paperclip" />
                                        <span class="info-title">{{itemChild.fileName}}</span>
                                    </a>
                                </div>
                            </template>
                        </div>
                        </div>
                    </div>
                </template>
                <div class="bottom-main" v-if="this.allList.summaryEntity">
                    <div class="main-title">直播小结</div>
                    <p>{{this.summary.content}}</p>

                    <div class="downloadClick" v-for="(item, key) in summaryFileId" :key="key">
                        <a @click="$handleDownload(item.fileId)" >
                            <i class="el-icon-paperclip" />
                            <span class="info-title">{{item.fileName}}</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </el-card>
        <MessageBoard />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getProgramDetail } from "@/api/programList/programList"
import { postLikeAdd } from "@/api/programList/message"
import { MessageBox } from "element-ui"
import MessageBoard from "./MessageBoard.vue"
@Component({
    components: { MessageBoard }
})
export default class ProgramDetail extends Vue {
    $handleDownload: Function|undefined
    // ownerPraiseStatus个人点赞状态（0：是，1：否） ,-->
    private allList = []
    private programForm = {
        title: "",
        startTime: "",
        endTime: "",
        speakers: "",
        praiseNum: "", // 点赞数
        browerNum: "", // 预览人数
        guests: "", // 本期嘉宾
        summary: "", // 本期简介
        content: "", // 节目内容
        likeShow: "1", // 个人点赞
        fileIds: ""
    }

    private fileIdsName = ""

    private supervise = { // 督办事项
        content: "",
        deptnames: "",
        userCode: "",
        status: "",
        deptName: "",
        userName: ""

    }

    private summary = { // 直播小结
        content: " ",
        fileIds: " "
    }

    private summaryFileId = []
    private programFormFileId= []

    private superviseMeasuresList= []

    protected mounted() {
        this.load()
    }

    private load() {
        getProgramDetail({ id: this.$route.query.promId as string }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.allList = res.data
                    this.programForm = {
                        title: res.data.title,
                        startTime: res.data.liveEntity.startTime,
                        endTime: res.data.liveEntity.endTime,
                        speakers: res.data.liveEntity.speakers,
                        praiseNum: res.data.praiseNum, // 点赞数
                        browerNum: res.data.browerNum, // 预览人数
                        guests: res.data.liveEntity.guests, // 本期嘉宾
                        summary: res.data.summary, // 本期简介
                        content: decodeURIComponent(res.data.content), // 节目内容
                        likeShow: res.data.ownerPraiseStatus,
                        fileIds: res.data.fileIds
                    }
                    if (res.data.fileIds) {
                        this.programFormFileId = JSON.parse(res.data.fileIds)
                    }
                    if (res.data.superviseItemEntity) {
                        this.supervise = {
                            content: res.data.superviseItemEntity.content,
                            deptnames: res.data.superviseItemEntity.deptnames,
                            userCode: res.data.superviseItemEntity.userCode,
                            userName: res.data.superviseItemEntity.userName,
                            deptName: res.data.superviseItemEntity.deptName,
                            status: res.data.superviseItemEntity.status
                        }
                    }
                    if (res.data.summaryEntity) {
                        this.summary = {
                            content: res.data.summaryEntity.content,
                            fileIds: res.data.summaryEntity.fileIds
                        }
                        if (res.data.summaryEntity.fileIds) {
                            this.summaryFileId = JSON.parse(res.data.summaryEntity.fileIds)
                        }
                    }
                    if (res.data.superviseItemEntity.superviseMeasuresList) {
                        this.superviseMeasuresList = res.data.superviseItemEntity.superviseMeasuresList
                    }
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private getLikeShow() {
        const params = {
            programId: this.$route.query.promId as string,
            targetId: this.$route.query.promId as string
        }
        postLikeAdd(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.programForm.likeShow = "0"
                    this.programForm.praiseNum = this.programForm.praiseNum + 1
                } else {
                    MessageBox.alert(`操作失败`, "失败", { type: "error" })
                }
            } else {
                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
            }
        })
    }
}
</script>
