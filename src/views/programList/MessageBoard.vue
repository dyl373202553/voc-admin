<template>
    <el-card class="box-card dpadding0">
        <div class="dcontent">
            <div class="alltitle">留言（{{this.dataTotal}}）</div>
            <div class="comment">
                <div class="comment-main">
                    <div class="comment-left">
                        <el-image :src="`/resources/bluepage/a/`+userCode+`_A.jpg`" fit="fill" class="image" style="width:60px;height:60px;border-radius: 50%;"/>
                    </div>
                    <el-input
                        v-model="message"
                        type="textarea"
                        class="comment-right"
                        :rows="4"
                        placeholder="说点什么吧"
                    />
                </div>
                <div class="text-right margin-top10 dmessage">
                    <el-button type="primary" round @click="onSubmit" :disabled="this.message === '' ">留言</el-button>
                </div>
            </div>
            <div class="comment-none" v-if="messageList.length===0">
                暂无评论哦，快来评论一下吧！
            </div>
            <el-tabs v-model="activeName" type="card" v-else class="comment-content">
                <el-tab-pane name="first">
                    <span slot="label">全部留言 /</span>
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
                                        <span class="optionBtn" @click="indexRepeat=item.id+key"><img src="@/assets/images/icon_repeat.png"/></span>
                                        <span class="optionBtn" v-if="item.ownerPraiseStatus !=='0'" @click="getLike(item.id)">
                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="item.ownerPraiseStatus ==='0'" >
                                            <img src="@/assets/images/icon_like_blue.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="userrole===0" @click="liuyanDel(item.id)"><img src="@/assets/images/icon_del.png"/></span>
                                    </div>
                                    <div class="text-right margin-top10 info" v-if="indexRepeat=== item.id+key">
                                        <template>
                                            <el-input
                                                v-model="backMessage"
                                                type="textarea"
                                                :rows="4"
                                                :placeholder="'你想对'+item.userName+'说点什么...'"
                                            />
                                        </template>
                                        <div class="text-right margin-top10 dbackBtn">
                                            <el-button type="text" round @click="onCancelSubmit()">取消</el-button>
                                            <el-button type="primary" @click="onBackSubmit(item.id, backMessage, key)">回复</el-button>
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
                                                            <img src="@/assets/images/icon_like_blue.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                                            <span>{{itemChild.praiseNum}}</span>
                                                        </span>
                                                        <span class="optionBtn" v-if="userrole===0" @click="liuyanDel(item.id)"><img src="@/assets/images/icon_del.png"/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="fl checkBack" @click="checkBackDown()">收f起</span>
                                        </div>
                                        <div class="liuyan-children" v-if="messageChild.length ===0">
                                            <div class="main-info">
                                                没有留言
                                            </div>
                                            <span class="fl checkBack" @click="checkBackDown()">收起</span>
                                        </div>
                                    </template>

                                </div>
                            </div>
                        </div>
                        <div class="comment-nomoreBtn" v-if="dataPage.pageNum === pageTotal">没有更多评论</div>
                        <div class="comment-moreBtn" v-else @click="handleCurrentChange">查看更多评论</div>
                        <!-- <div class="dpagination">
                            <el-pagination
                            background
                            @current-change="handleCurrentChange"
                            :current-page="dataPage.pageNum"
                            :total="dataTotal"
                            :page-size="dataPage.pageSize"
                            layout="prev, pager, next, jumper">
                            </el-pagination>
                        </div> -->
                    </div>

                </el-tab-pane>
                <el-tab-pane label="精彩留言" name="secound">
                    <div class="bottom dliuyan">
                        <div class="bottom-main" v-for="(item, key) in messageList" :key="key">
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
                                        <span class="fl checkBack" @click="checkBack(item.id, key)">查看回复</span>
                                        <span class="fl wonderful" v-show="item.wonderfulFlag === '0' && userrole===0"
                                            @click="setWonderful(item.id, '1')">取消精彩留言</span>
                                        <span class="optionBtn" @click="indexKey=item.id"><img src="@/assets/images/icon_repeat.png"/></span>
                                        <span class="optionBtn" v-if="item.ownerPraiseStatus !=='0'" @click="getLike(item.id)">
                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="item.ownerPraiseStatus ==='0'" >
                                            <img src="@/assets/images/icon_like_blue.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="userrole===0"><img src="@/assets/images/icon_del.png"/></span>
                                    </div>
                                    <div class="text-right margin-top10 info" v-if="indexRepeat=== item.id+key">
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
                                            <el-button type="primary" @click="onBackSubmit(item.id, backMessage, key)">回复</el-button>
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
                                                            <img src="@/assets/images/icon_like_blue.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
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
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postMessageAll, postMessageAdd, postLikeAdd, postMessageSetWonderful, getMessageDelete } from "@/api/programList/message"
import { MessageBox } from "element-ui"
import { UserModule } from "@/store/module/user"
@Component
export default class MessageBoard extends Vue {
    get userrole() {
        // @ts-ignore
        return UserModule.userrole
    }

    get userCode() {
        // @ts-ignore
        return UserModule.user.userCode
    }

    private activeName = "first"
    private likeShow = 0
    private backMessage = ""
    private message = ""
    private getLikeShow() {
        this.likeShow = this.likeShow + 1
    }

    private dataTotal = 0
    private pageTotal = 1
    private messageList = []
    private messageChildrenList: any = []
    private messageChild: any = []
    private indexKey = ""
    private indexRepeat=""
    private showIndex = false
    private dataPage = {
        pageNum: 1,
        pageSize: 5,
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
                    this.messageList = this.messageList.concat(res.data) // 追加数据
                    this.dataTotal = res.total
                    this.pageTotal = res.pages
                    for (let i = 0; i < this.messageList.length; i++) {
                        this.messageChildrenList.push(null)
                    }
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private postMessage(params: any, id: string, index: number) {
        postMessageAdd(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    if (index < 0) {
                        this.load()
                        this.message = ""
                    } else {
                        this.backMessage = ""
                        this.checkBack(id, index)
                    }
                    MessageBox.alert(`提交成功`, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private handleCurrentChange() {
        this.dataPage.pageNum += 1
        if (this.dataPage.pageNum <= this.pageTotal) {
            this.load()
        }
    }

    private onSubmit() {
        const dataMessagePage = {
            content: this.message,
            targetId: this.$route.params.promId,
            programId: this.$route.params.promId,
            wonderfulFlag: "1"
        }
        this.postMessage(dataMessagePage, "", -1)
    }

    // 回复
    private onBackSubmit(id: string, backMessage: string, index: number) {
        const dataMessagePage = {
            content: backMessage,
            targetId: id,
            programId: this.$route.params.promId,
            wonderfulFlag: "1"
        }
        this.postMessage(dataMessagePage, id, index)
    }

    // 取消
    private onCancelSubmit() {
        this.indexRepeat = ""
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
                } else {
                    MessageBox.alert(`操作失败`, "失败", { type: "error" })
                }
            } else {
                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
            }
        })
    }

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

    // 删除留言
    private liuyanDel(id: string) {
        const params = {
            id: id
        }
        getMessageDelete(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.load()
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
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
<style lang="scss" scoped>
  .alltitle {
    padding-left: 18px;
    font-size: 15px;
    margin-bottom: 20px;
    margin-top: 20px;
    font-weight: bold;
  }
</style>
