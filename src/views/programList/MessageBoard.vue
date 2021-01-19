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
                                        <span class="fl checkBack" @click="checkBack(item.id, key)" >查看全部回复<i class="el-icon-arrow-right"></i></span>
                                        <span class="fl wonderful" v-show="!showWonderful[key] && userrole===0"
                                            @click="setWonderful(item, '0', key)">设置精彩留言</span>
                                        <span class="fl wonderful" v-show="showWonderful[key] && userrole===0"
                                            @click="setWonderful(item, '1', key)">取消精彩留言</span>
                                        <span class="optionBtn" @click="indexRepeat=item.id+key"><img src="@/assets/images/icon_repeat.png"/></span>
                                        <span class="optionBtn" v-if="!showLike[key]" @click="getLike(item, key, 'all')">
                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="showLike[key]" >
                                            <img src="@/assets/images/icon_like_blue.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                            <span>{{item.praiseNum + 1}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="userrole===0" @click="liuyanDel(item.id, key, 'all')"><img src="@/assets/images/icon_del.png"/></span>
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
                                                        <!-- <span class="optionBtn" v-if="itemChild.ownerPraiseStatus !=='0'" @click="getLike(itemChild.id)">
                                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;"/>
                                                            <span>{{itemChild.praiseNum}}</span>
                                                        </span>
                                                        <span class="optionBtn" v-if="itemChild.ownerPraiseStatus ==='0'" >
                                                            <img src="@/assets/images/icon_like_blue.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                                            <span>{{itemChild.praiseNum}}</span>
                                                        </span> -->
                                                        <span class="optionBtn" v-if="userrole===0" @click="liuyanDel(itemChild.id, key, 'child')"><img src="@/assets/images/icon_del.png"/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="fl hide-comment" @click="checkBackDown()">收起回复</span>
                                        </div>
                                        <div class="liuyan-children" v-else>
                                            <div class="main-info">
                                                <div class="info-right">
                                                    <div class="text-center margin-top10 info">
                                                        没有评论，赶紧来回复他吧...
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="fl hide-comment" @click="checkBackDown()">收起回复</span>
                                        </div>
                                    </template>

                                </div>
                            </div>
                        </div>
                        <div class="comment-nomoreBtn" v-if="dataPage.pageNum === pageTotal || dataTotal===0">没有更多评论</div>
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
                        <div class="bottom-main" v-for="(item, key) in messageListWonderful" :key="key">
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
                                        <span class="fl checkBack" @click="checkBack(item.id, key)" v-if="item.subCount !==0 ">查看全部回复<i class="el-icon-arrow-right"></i></span>
                                        <!-- <span class="fl wonderful" v-show="item.wonderfulFlag === '1' && userrole===0"
                                            @click="setWonderful(item.id, '0')">设置精彩留言</span>
                                        <span class="fl wonderful" v-show="item.wonderfulFlag === '0' && userrole===0"
                                            @click="setWonderful(item.id, '1')">取消精彩留言</span> -->
                                        <span class="optionBtn" @click="indexRepeat=item.id+key"><img src="@/assets/images/icon_repeat.png"/></span>
                                        <span class="optionBtn" v-if="!showLikeWonderful[key]" @click="getLike(item, key, 'wonderful')">
                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;"/>
                                            <span>{{item.praiseNum}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="showLikeWonderful[key]" >
                                            <img src="@/assets/images/icon_like_blue.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                            <span>{{item.praiseNum+1}}</span>
                                        </span>
                                        <span class="optionBtn" v-if="userrole===0" @click="liuyanDel(item.id, key, 'Wonderful')"><img src="@/assets/images/icon_del.png"/></span>
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
                                                        <!-- <span class="optionBtn" v-if="itemChild.ownerPraiseStatus !=='0'" @click="getLike(itemChild.id)">
                                                            <img src="@/assets/images/icon_like.png" style="vertical-align: text-bottom;"/>
                                                            <span>{{itemChild.praiseNum}}</span>
                                                        </span>
                                                        <span class="optionBtn" v-if="itemChild.ownerPraiseStatus ==='0'" >
                                                            <img src="@/assets/images/icon_like_blue.png" style="vertical-align: text-bottom;cursor: not-allowed;"/>
                                                            <span>{{itemChild.praiseNum}}</span>
                                                        </span> -->
                                                        <span class="optionBtn" v-if="userrole===0" @click="liuyanDel(itemChild.id, key, 'child')"><img src="@/assets/images/icon_del.png"/></span>
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="fl hide-comment" @click="checkBackDown()">收起回复</span>
                                        </div>
                                    </template>

                                </div>
                            </div>
                        </div>
                        <div class="comment-nomoreBtn" v-if="dataPageWonderful.pageNum === pageTotalWonderful || dataTotalWonderful===0">没有更多精彩评论</div>
                        <div class="comment-moreBtn" v-else @click="handleCurrentChangeWonderful">查看更多精彩评论评论</div>
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
    private messageList: any = []
    private messageChild: any = []
    private indexKey = ""
    private indexRepeat=""
    private showIndex = false
    private dataPage = {
        pageNum: 1,
        pageSize: 5,
        programId: this.$route.query.promId as string,
        wonderfulFlag: "", // 是否为精彩留言（0：是，1：否）
        targetId: this.$route.query.promId as string
    }

    private dataTotalWonderful = 0
    private pageTotalWonderful = 1
    private messageListWonderful: any = []
    private showWonderful: any = []

    private showLike: any = []
    private showLikeWonderful: any = []

    private dataPageWonderful = {
        pageNum: 1,
        pageSize: 5,
        programId: this.$route.query.promId as string,
        wonderfulFlag: "0", // 是否为精彩留言（0：是，1：否）
        targetId: this.$route.query.promId as string
    }

    protected mounted() {
        this.load()
        this.loadWonderful()
    }

    private load() {
        postMessageAll(this.dataPage).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.messageList = this.messageList.concat(res.data) // 追加数据
                    this.dataTotal = res.total
                    this.pageTotal = res.pages
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].wonderfulFlag === "0") {
                            this.showWonderful.push(true)
                        } else {
                            this.showWonderful.push(false)
                        }
                        if (res.data[i].ownerPraiseStatus === "0") {
                            this.showLike.push(true)
                        } else {
                            this.showLike.push(false)
                        }
                    }
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private loadWonderful() {
        postMessageAll(this.dataPageWonderful).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.messageListWonderful = this.messageListWonderful.concat(res.data) // 追加数据
                    this.dataTotalWonderful = res.total
                    this.pageTotalWonderful = res.pages
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].ownerPraiseStatus === "0") {
                            this.showLikeWonderful.push(true)
                        } else {
                            this.showLikeWonderful.push(false)
                        }
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
                        this.messageList.unshift(res.data)
                        this.message = ""
                    } else {
                        this.backMessage = ""
                        this.checkBack(id, index)
                    }
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

    private handleCurrentChangeWonderful() {
        this.dataPageWonderful.pageNum += 1
        if (this.dataPageWonderful.pageNum <= this.pageTotalWonderful) {
            this.loadWonderful()
        }
    }

    private onSubmit() {
        this.dataTotal += 1
        const dataMessagePage = {
            content: this.message,
            targetId: this.$route.query.promId as string,
            programId: this.$route.query.promId as string,
            wonderfulFlag: "1"
        }
        this.postMessage(dataMessagePage, "", -1)
    }

    // 回复
    private onBackSubmit(id: string, backMessage: string, index: number) {
        const dataMessagePage = {
            content: backMessage,
            targetId: id,
            programId: this.$route.query.promId,
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
    private getLike(item: any, index: number, name: string) {
        const params = {
            programId: this.$route.query.promId as string,
            targetId: item.id
        }
        postLikeAdd(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    if (name === "all") {
                        this.showLike[index] = !this.showLike[index]
                        Vue.set(this.showLike, index, this.showLike[index])
                    } else if (name === "wonderful") {
                        this.showLikeWonderful[index] = !this.showLikeWonderful[index]
                        Vue.set(this.showLikeWonderful, index, this.showLikeWonderful[index])
                    }
                } else {
                    MessageBox.alert(`操作失败`, "失败", { type: "error" })
                }
            } else {
                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
            }
        })
    }

    // 设置精彩留言
    private setWonderful(item: any, type: string, index: number) {
        const params = {
            id: item.id,
            wonderfulFlag: type
        }
        postMessageSetWonderful(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.showWonderful[index] = !this.showWonderful[index]
                    this.messageListWonderful = []
                    this.loadWonderful()
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
    private liuyanDel(id: string, index: number, name: string) {
        const params = {
            id: id
        }
        getMessageDelete(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    if (name === "all") {
                        this.messageList.splice(index, 1)
                    } else if (name === "Wonderful") {
                        this.messageListWonderful.splice(index, 1)
                    } else {
                        this.messageChild.splice(index, 1)
                    }
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
            programId: this.$route.query.promId as string,
            wonderfulFlag: "", // 是否为精彩留言（0：是，1：否）
            targetId: id
        }
        postMessageAll(dataPage).then((res) => {
            if (res) {
                if (res.code < 200) {
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
