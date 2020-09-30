<template>
  <div class="app-container">
    <el-card class="box-card dpadding0">
      <div slot="header" class="clearfix">
        <span class="header-title">节目查看 {{this.$route.params.promId}}</span>
      </div>
      <div class="dcontent">
        <div class="top">
          <h2 class="top-title">
            {{this.programForm.title}}
          </h2>
          <div class="top-info">
            <span>{{this.programForm.time}}</span>
            <span>{{this.programForm.speakers}}</span>
            <span><img src="@/assets/images/icon_look.png"/>{{this.programForm.browerNum}}</span>
            <span><img src="@/assets/images/icon_like.png" style="vertical-align: bottom;"/>{{this.programForm.praiseNum}}</span>
          </div>
        </div>
        <div class="main">
          <div>
            <div class="main-title">本期嘉宾</div>
            <p>{{this.programForm.guests}}</p>
          </div>
          <div>
            <div class="main-title">本期简介</div>
            <p>{{this.programForm.summary}}</p>
          </div>
          <div>
            <div class="main-title">节目内容</div>
            <pre v-html="this.programForm.content"></pre>
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
                  <span>信息系统部</span>
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
              </div>
            </div>
          </div>
          <div class="bottom-main">
            <div class="main-title">直播小结</div>
            <p>{{this.summary.content}}</p>
            <div>
              <i class="el-icon-paperclip" />
              <span class="info-title">{{this.summary.fileIds}}</span>
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
    private programForm = {
        title: "",
        time: "",
        speakers: "",
        praiseNum: "", // 点赞数
        browerNum: "", // 预览人数
        guests: "", // 本期嘉宾
        summary: "", // 本期简介
        content: "" // 节目内容
    }

    private supervise = { // 督办事项
        content: "",
        deptnames: ""
    }

    private summary = { // 直播小结
        content: "",
        fileIds: ""
    }

    private superviseMeasuresList= []

    protected mounted() {
        this.load()
    }

    private load() {
        getProgramDetail({ id: this.$route.params.promId }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.programForm = {
                        title: res.data.title,
                        time: res.data.liveEntity.startTime,
                        speakers: res.data.liveEntity.speakers,
                        praiseNum: res.data.praiseNum, // 点赞数
                        browerNum: res.data.browerNum, // 预览人数
                        guests: res.data.liveEntity.guests, // 本期嘉宾
                        summary: res.data.summary, // 本期简介
                        content: res.data.content // 节目内容
                    }
                    this.supervise = {
                        content: res.data.superviseItemEntity.content,
                        deptnames: res.data.superviseItemEntity.deptnames
                    }
                    this.summary = {
                        content: res.data.summaryEntity.content,
                        fileIds: res.data.summaryEntity.fileIds
                    }
                    this.superviseMeasuresList = res.data.superviseItemEntity.superviseMeasuresList

                    console.log(res.data.superviseItemEntity.superviseMeasuresList)
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
