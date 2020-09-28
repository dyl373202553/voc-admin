<template>
  <div class="app-container">
    <el-card class="box-card dpadding0">
      <div slot="header" class="clearfix">
        <span class="header-title">节目查看 {{this.$route.params.promId}}</span>
      </div>
      <div class="dcontent">
        <div class="top">
          <h2 class="top-title">
            {{this.title}}
          </h2>
          <div class="top-info">
            <span>{{this.time}}</span>
            <span>{{this.speakers}}</span>
            <span><img src="@/assets/images/icon_look.png"/>{{this.browerNum}}</span>
            <span><img src="@/assets/images/icon_like.png" style="vertical-align: bottom;"/>{{this.praiseNum}}</span>
          </div>
        </div>
        <div class="main">
          <div>
            <div class="main-title">本期嘉宾</div>
            <p>{{this.guests}}</p>
          </div>
          <div>
            <div class="main-title">本期简介</div>
            <p>从昨晚到今天全省不少地方都飘起雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到秦岭分水岭进行采访直上山过程中雪花漫天飞舞雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！</p>
          </div>
          <div>
            <div class="main-title">节目内容</div>
            <p>从昨晚到今天全省不少地方都飘起雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到秦岭分水岭进行采访直上山过程中雪花漫天飞舞雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到。      从昨晚到今天全省不少地方都飘起雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到秦岭分水岭进行采访直上山过程中雪花漫天飞舞雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！今天（5月9日）早上陕视新闻记者到雪花瞬间从夏天穿越到冬季！</p>
          </div>
          <div class="main-btn">
            <el-button v-show="likeShow===0" type="primary" round @click="getLikeShow">点赞支持一下</el-button>
            <el-button v-show="likeShow===1" type="info" round>您已点过赞啦</el-button>
          </div>
        </div>
        <div class="bottom">
          <div class="bottom-main">
            <div class="main-title">督办事项</div>
            <div class="main-info">
              <div class="info-left">
                <el-avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2496227229,2115216729&fm=26&gp=0.jpg" />
              </div>
              <div class="info-right">
                <div>
                  <span class="info-title">刘晓彤</span>
                  <span>    信息系统部</span>
                </div>
                <p>雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天</p>
                <div>
                  <span class="info-title">责任部门：</span>
                  <span>@技术部 @规划部</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-main">
            <div class="main-title">督办举措</div>
            <div class="main-info">
              <div class="info-left">
                <el-avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2496227229,2115216729&fm=26&gp=0.jpg" />
              </div>
              <div class="info-right">
                <div>
                  <span class="info-title">刘晓彤</span>
                  <span>    信息系统部</span>
                </div>
                <p>雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天</p>
                <div>
                  <i class="el-icon-paperclip" />
                  <span class="info-title">附件</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bottom-main">
            <div class="main-title">直播小结</div>
            <p>雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天</p>
            <div>
              <i class="el-icon-paperclip" />
              <span class="info-title">附件</span>
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
import { MessageBox } from "element-ui"
import MessageBoard from "./MessageBoard.vue"
@Component({
    components: { MessageBoard }
})
export default class ProgramDetail extends Vue {
    private likeShow = "0"
    private title = ""
    private time = ""
    private speakers = ""
    private praiseNum = "" // 点赞数
    private browerNum = "" // 预览人数
    private guests = "" // 本期嘉宾

    protected mounted() {
        this.load()
    }

    private load() {
        getProgramDetail({ id: this.$route.params.promId }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.title = res.data.title
                    this.time = res.data.liveEntity.startTime
                    this.speakers = res.data.liveEntity.speakers
                    this.praiseNum = res.data.praiseNum
                    this.browerNum = res.data.browerNum
                    this.guests = res.data.liveEntity.guests
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private getLikeShow() {
        this.likeShow = "1"
    }
}
</script>
