<template>
    <el-card class="box-card dpadding0">
        <div class="dcontent">
            <el-tabs v-model="activeName" type="card">
                <div class="comment">
                    <template>
                        <el-input
                            v-model="message"
                            type="textarea"
                            :rows="4"
                            placeholder="说点什么吧"
                        />
                    </template>
                    <div class="text-right margin-top10">
                        <el-button type="primary" round @click="onSubmit">评论</el-button>
                    </div>
                </div>
            <el-tab-pane label="精彩留言" name="first">
                <div class="bottom dliuyan">
                    <div class="bottom-main" v-for="(item, key) in messageList" :key="key">
                        <div class="main-info">
                            <div class="info-left">
                                <el-avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2496227229,2115216729&fm=26&gp=0.jpg" />
                            </div>
                            <div class="info-right">
                                <div>
                                    <span class="info-title">{{item.userName}}</span>
                                    <span>{{item.dept2Name}}</span>
                                    <span class="fr time">{{item.updateTime}}</span>
                                </div>
                                <p>{{item.content}}</p>
                                 <div class="text-right margin-top10 info">
                                    <span class="fl wonderful" v-show="item.wonderfulFlag === '0'">精彩留言</span>
                                    <span><img src="@/assets/images/icon_repeat.png"/></span>
                                    <span><img src="@/assets/images/icon_like.png"/></span>
                                    <span>删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="全部留言" name="fourth">
                <span slot="label">全部留言（{{this.allTotal}}）</span>
                <div class="bottom dliuyan">
                    <div class="bottom-main" v-for="(item, key) in messageAllList" :key="key">
                        <div class="main-info">
                            <div class="info-left">
                                <el-avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2496227229,2115216729&fm=26&gp=0.jpg" />
                            </div>
                            <div class="info-right">
                                <div>
                                    <span class="info-title">{{item.userName}}</span>
                                    <span>{{item.dept2Name}}</span>
                                    <span class="fr time">{{item.updateTime}}</span>
                                </div>
                                <p>{{item.content}}</p>
                                <div class="text-right margin-top10 info">
                                    <span class="fl wonderful" v-show="item.wonderfulFlag === '0'">精彩留言</span>
                                    <span><img src="@/assets/images/icon_repeat.png"/></span>
                                    <span><img src="@/assets/images/icon_like.png"/></span>
                                    <span>删除</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postMessageAll, postMessageAdd } from "@/api/programList/message"
import { MessageBox } from "element-ui"
@Component
export default class MessageBoard extends Vue {
    private activeName = "first"
    private likeShow = 0
    private message = ""
    private getLikeShow() {
        this.likeShow = this.likeShow + 1
    }

    private allTotal = 0

    private messageList = []
    private messageAllList = []
    protected mounted() {
        this.load()
        this.load2()
    }

    private load() {
        const dataPage = {
            pageNum: 1,
            pageSize: 10,
            programId: this.$route.params.liveId,
            wonderfulFlag: "0" // 是否为精彩留言（0：是，1：否）
        }
        postMessageAll(dataPage).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.messageList = res.data
                    this.allTotal = res.total
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private load2() {
        const dataPage = {
            pageNum: 1,
            pageSize: 10,
            programId: this.$route.params.liveId,
            wonderfulFlag: "" // 是否为精彩留言（0：是，1：否）
        }
        postMessageAll(dataPage).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.messageAllList = res.data
                    this.allTotal = res.total
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private onSubmit() {
        const dataMessagePage = {
            content: this.message,
            targetId: this.$route.params.liveId,
            programId: this.$route.params.liveId,
            wonderfulFlag: "1"
        }
        postMessageAdd(dataMessagePage).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.load2()
                    MessageBox.alert(`提交成功`, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }
}
</script>
