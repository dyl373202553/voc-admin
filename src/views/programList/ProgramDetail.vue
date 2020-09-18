<template>
  <div class="app-container">
    <el-card class="box-card dpadding0">
      <div slot="header" class="clearfix">
        <span class="header-title">节目查看</span>
      </div>
      <div class="dcontent">
        <div class="top">
          <h2 class="top-title">
            客户之声第100期
          </h2>
          <div class="top-info">
            <span>2019年12月24日</span>
            <span>信息系统部-张三</span>
            <span>10000</span>
            <span><i class="el-icon-thumb" />447</span>
          </div>
        </div>
        <div class="main">
          <div>
            <div class="main-title">本期嘉宾</div>
            <p>张三、王五、孙儿娘</p>
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

    <el-card class="box-card dpadding0">
      <div class="dcontent">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="精彩留言" name="first">
            <div class="bottom">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class ProgramDetail extends Vue {
    private activeName = "first"
    private likeShow = 0
    private getLikeShow() {
        this.likeShow = this.likeShow + 1
    }
}
</script>
