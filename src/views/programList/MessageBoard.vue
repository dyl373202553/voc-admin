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
                        <el-button type="primary" round @click="onSubmit" :disabled="this.message === '' ">评论</el-button>
                    </div>
                </div>
            <el-tab-pane label="精彩留言" name="first">
                <div class="bottom dliuyan">
                    <div class="bottom-main" v-for="(item, key) in messageList" :key="key">
                        <div class="main-info" v-if="item.wonderfulFlag === '0'">
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
                                    <span @click="getLike(item.id)"><img src="@/assets/images/icon_like.png" style="vertical-align: bottom;"/>{{item.praiseNum}}</span>
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
                                    <span @click="getLike(item.id)"><img src="@/assets/images/icon_like.png" style="vertical-align: bottom;"/>{{item.praiseNum}}</span>
                                    <span>删除</span>
                                </div>
                                <div class="text-right margin-top10 info">
                                    <template>
                                        <el-input
                                            v-model="backMessage"
                                            type="textarea"
                                            :rows="4"
                                            placeholder="说点什么吧"
                                        />
                                    </template>
                                    <div class="text-right margin-top10">
                                        <el-button type="primary" round @click="onBackSubmit(item.id)">回复</el-button>
                                    </div>
                                    <span><img src="@/assets/images/icon_like.png"/></span>
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
import { postMessageAll, postMessageAdd, postLikeAdd } from "@/api/programList/message"
import { MessageBox } from "element-ui"
@Component
export default class MessageBoard extends Vue {
    private activeName = "first"
    private likeShow = 0
    private backMessage = ""
    private message = ""
    private getLikeShow() {
        this.likeShow = this.likeShow + 1
    }

    private allTotal = 0

    private messageList = []
    private messageAllList = []
    protected mounted() {
        this.load()
    }

    private load() {
        const dataPage = {
            pageNum: 1,
            pageSize: 10,
            programId: this.$route.params.promId,
            wonderfulFlag: "" // 是否为精彩留言（0：是，1：否）
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

    private postMessage(params: any) {
        postMessageAdd(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.load()
                    MessageBox.alert(`提交成功`, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private onSubmit() {
        const dataMessagePage = {
            content: this.message,
            targetId: this.$route.params.promId,
            programId: this.$route.params.promId,
            wonderfulFlag: "1"
        }
        this.postMessage(dataMessagePage)
    }

    private onBackSubmit(id: string) {
        const dataMessagePage = {
            content: "回复",
            targetId: id,
            programId: this.$route.params.promId,
            wonderfulFlag: "1"
        }
        this.postMessage(dataMessagePage)
    }

    // 点赞
    private getLike(id: string) {
        console.log(id)
        const params = {
            programId: this.$route.params.promId,
            targetId: id
        }
        postLikeAdd(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    MessageBox.alert("操作成功", "成功", { type: "success" })
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
