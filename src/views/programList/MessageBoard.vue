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
                    <div class="text-right margin-top10 dmessage">
                        <el-button type="primary" round @click="onSubmit" :disabled="this.message === '' ">评论</el-button>
                    </div>
                </div>
                <el-tab-pane label="全部留言" name="first">
                    <span slot="label">全部留言（{{this.dataTotal}}）</span>
                    <div class="bottom dliuyan">
                        <div class="bottom-main" v-for="(item, key) in messageList" :key="key">
                            <div class="main-info">
                                <div class="info-left">
                                    <el-avatar :src="`/resources/bluepage/a/`+item.userCode+`_A.jpg`"/>
                                </div>
                                <div class="info-right">
                                    <div>
                                        <span class="info-title">{{item.userName}}</span>
                                        <span>{{item.dept2Name}}</span>
                                        <span class="fr time">{{item.updateTime}}</span>
                                    </div>
                                    <p>{{item.content}}</p>
                                    <div class="text-right margin-top10 info">
                                        <span class="fl checkBack" @click="checkBack(item.id, key)">查看回复</span>
                                        <span class="fl wonderful" v-show="item.wonderfulFlag === '1' && userrole===0"
                                            @click="setWonderful(item.id, '0')">设置精彩留言</span>
                                        <span class="fl wonderful" v-show="item.wonderfulFlag === '0' && userrole===0"
                                            @click="setWonderful(item.id, '1')">取消精彩留言</span>
                                        <span class="optionBtn" @click="indexKey=item.id"><img src="@/assets/images/icon_repeat.png"/></span>
                                        <span class="optionBtn" v-if="item.ownerPraiseStatus !=='0'" @click="getLike(item.id)">
                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="item.ownerPraiseStatus ==='0'" >
                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="userrole===0"><img src="@/assets/images/icon_del.png"/></span>
                                    </div>
                                    <div class="text-right margin-top10 info" v-if="indexKey=== item.id">
                                        <template>
                                            <el-input
                                                v-model="backMessage"
                                                type="textarea"
                                                :rows="4"
                                                placeholder="说点什么吧"
                                            />
                                        </template>
                                        <div class="text-right margin-top10 dbackBtn">
                                            <el-button type="text" round @click="onCancelSubmit()">取消</el-button>
                                            <el-button type="primary" @click="onBackSubmit(item.id, backMessage)">回复</el-button>
                                        </div>
                                    </div>
                                    <!-- 子级留言 -->
                                    <template v-if="indexKey === item.id+key">
                                        <div class="liuyan-children" v-if="messageChild.length !==0">
                                            <div class="main-info" v-for="(itemChild, indexChild) in messageChild" :key="indexChild" >
                                                <div class="info-left">
                                                    <el-avatar :src="`/resources/bluepage/a/`+itemChild.userCode+`_A.jpg`"/>
                                                </div>
                                                <div class="info-right">
                                                    <div>
                                                        <span class="info-title">{{itemChild.userName}}</span>
                                                        <span>{{itemChild.dept2Name}}</span>
                                                        <span class="fr time">{{itemChild.updateTime}}</span>
                                                    </div>
                                                    <p>{{itemChild.content}}</p>
                                                    <div class="text-right margin-top10 info">
                                                        <span class="optionBtn" v-if="itemChild.ownerPraiseStatus !=='0'" @click="getLike(itemChild.id)">
                                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;"/>
                                                            <span>{{itemChild.praiseNum}}</span>
                                                        </span>
                                                        <span class="optionBtn" v-if="itemChild.ownerPraiseStatus ==='0'" >
                                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                                            <span>{{itemChild.praiseNum}}</span>
                                                        </span>
                                                        <span class="optionBtn"><img src="@/assets/images/icon_del.png"/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="fl checkBack" @click="checkBackDown()">收起</span>
                                        </div>
                                        <div class="liuyan-children" v-if="messageChild.length ===0">
                                            <div class="main-info">
                                                没有数据
                                            </div>
                                            <span class="fl checkBack" @click="checkBackDown()">收起</span>
                                        </div>
                                    </template>

                                </div>
                            </div>
                        </div>

                        <div class="dpagination">
                            <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page="dataPage.pageNum"
                            :total="dataTotal"
                            :page-size="dataPage.pageSize"
                            layout="prev, pager, next, jumper">
                            </el-pagination>
                        </div>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="精彩留言" name="secound">
                    <div class="bottom dliuyan">
                        <div v-for="(item, key) in messageList" :key="key">
                            <div class="main-info" v-if="item.wonderfulFlag === '0'">
                                <div class="info-left">
                                    <el-avatar :src="`/resources/bluepage/a/`+item.userCode+`_A.jpg`"/>
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
                                        <span class="optionBtn"><img src="@/assets/images/icon_repeat.png"/></span>
                                        <span class="optionBtn" v-if="item.ownerPraiseStatus !=='0'" @click="getLike(item.id)">
                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="item.ownerPraiseStatus ==='0'" >
                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn"><img src="@/assets/images/icon_del.png"/></span>
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
import { postMessageAll, postMessageAdd, postLikeAdd, postMessageSetWonderful } from "@/api/programList/message"
import { MessageBox } from "element-ui"
import { UserModule } from "@/store/module/user"
@Component
export default class MessageBoard extends Vue {
    get userrole() {
        // @ts-ignore
        return UserModule.userrole
    }

    private activeName = "first"
    private likeShow = 0
    private backMessage = ""
    private message = ""
    private getLikeShow() {
        this.likeShow = this.likeShow + 1
    }

    private dataTotal = 0
    private messageList = []
    private messageChildrenList: any = []
    private messageChild: any = []
    private indexKey = ""
    private showIndex = false
    private dataPage = {
        pageNum: 1,
        pageSize: 10,
        programId: this.$route.params.promId,
        wonderfulFlag: "", // 是否为精彩留言（0：是，1：否）
        targetId: this.$route.params.promId
    }

    protected mounted() {
        this.load()
    }

    private load() {
        postMessageAll(this.dataPage).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.messageList = res.data
                    this.dataTotal = res.total
                    for (let i = 0; i < this.messageList.length; i++) {
                        this.messageChildrenList.push(null)
                    }
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
                    this.backMessage = ""
                    this.message = ""
                    MessageBox.alert(`提交成功`, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private handleCurrentChange(val: number) {
        this.dataPage.pageNum = val
        this.load()
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

    // 回复
    private onBackSubmit(id: string, backMessage: string) {
        const dataMessagePage = {
            content: backMessage,
            targetId: id,
            programId: this.$route.params.promId,
            wonderfulFlag: "1"
        }
        this.postMessage(dataMessagePage)
    }

    // 取消
    private onCancelSubmit() {
        this.indexKey = ""
        this.backMessage = ""
    }

    // 点赞
    private getLike(id: string) {
        const params = {
            programId: this.$route.params.promId,
            targetId: id
        }
        postLikeAdd(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.load()
                    MessageBox.alert("点赞成功", "成功", { type: "success" })
                } else {
                    MessageBox.alert(`操作失败`, "失败", { type: "error" })
                }
            } else {
                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
            }
        })
    }

    // // 留言回复
    // private getIndexBack(key: number) {
    //     this.indexKey = key
    // }

    // 设置精彩留言
    private setWonderful(id: string, type: string) {
        const params = {
            id: id,
            wonderfulFlag: type
        }
        postMessageSetWonderful(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.load()
                    MessageBox.alert("设置成功", "成功", { type: "success" })
                } else {
                    MessageBox.alert(`操作失败`, "失败", { type: "error" })
                }
            } else {
                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
            }
        })
    }

    // 查看回复
    private checkBack(id: string, index: number) {
        this.showIndex = !this.showIndex
        this.indexKey = id + index
        const dataPage = {
            pageNum: 1,
            pageSize: 10,
            programId: this.$route.params.promId,
            wonderfulFlag: "", // 是否为精彩留言（0：是，1：否）
            targetId: id
        }
        postMessageAll(dataPage).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.messageChildrenList[index] = res.data
                    this.messageChild = res.data
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 收起
    private checkBackDown() {
        this.indexKey = ""
    }
}
</script>
