<template>
    <el-card class="box-card dpadding0">
      <div class="dcontent">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="精彩留言" name="first">
            <div class="bottom dliuyan">
                <div class="comment">
                    <div>
                        <el-input
                            type="textarea"
                            :rows="4"
                            placeholder="说点什么吧"
                        />
                    </div>
                    <div class="text-right margin-top10">
                        <el-button type="primary" round >评论</el-button>
                    </div>
                </div>
                <div class="bottom-main">
                    <div class="main-info">
                        <div class="info-left">
                            <el-avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2496227229,2115216729&fm=26&gp=0.jpg" />
                        </div>
                        <div class="info-right">
                            <div>
                                <span class="info-title">刘晓彤</span>
                                <span>    信息系统部</span>
                                <span class="fr time">2019年3月14日 12:12</span>
                            </div>
                            <p>雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天</p>
                            <div class="text-right margin-top10">
                                <span class="fl wonderful">精彩留言</span>
                                <span>评论</span>
                                <span>点赞</span>
                                <span>删除</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bottom-main">
                    <div class="main-info">
                    <div class="info-left">
                        <el-avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2496227229,2115216729&fm=26&gp=0.jpg" />
                    </div>
                    <div class="info-right">
                        <div>
                        <span class="info-title">刘晓彤</span>
                        <span>    信息系统部</span>
                        <span class="fr time">2019年3月14日 12:12</span>
                        </div>
                        <p>雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天</p>
                    </div>
                    </div>
                </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="全部留言(126)" name="fourth">全部留言</el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class MessageBoard extends Vue {
    private activeName = "first"
    private likeShow = 0
    private getLikeShow() {
        this.likeShow = this.likeShow + 1
    }
}
</script>
