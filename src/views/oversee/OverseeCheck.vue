<template>
  <div class="app-container">
    <el-card class="box-card dpadding0">
      <div slot="header" class="clearfix">
        <span class="header-title">督办查看{{ $route.params.status }}</span>
      </div>
      <div class="dsummary">
        <div class="dsummary-mian">
          <div class="dsummary-title">节目信息</div>
          <div>
            <p><span>节目名称：</span><span>客户之声第100期</span></p>
            <p><span>节目时间：</span><span>2019年3月12日 17:11-17:30</span></p>
            <p><span>督办状态：</span>
              <span v-show="$route.params.statusName === '督办已完成'" class="dblue">{{ $route.params.statusName }}</span>
              <span v-show="$route.params.statusName !== '督办已完成'" class="dred">{{ $route.params.statusName }}</span>
            </p>
          </div>
        </div>
        <div v-show="$route.params.statusName === '督办未发布'" class="dsummary-mian">
          <div class="dsummary-title">督办事项</div>
          <div>
            <el-input
              v-model="this.textarea"
              type="textarea"
              :rows="3"
              placeholder="请填写督办事项"
            />
          </div>
        </div>
        <div v-show="$route.params.statusName === '督办未发布'" class="dsummary-mian">
          <div class="dsummary-title">责任部门</div>
          <div>
            <el-input v-model="this.input" placeholder="请选择参与部门" suffix-icon="el-icon-s-home" />
          </div>
        </div>

        <div v-show="$route.params.statusName !== '督办未发布'" class="dsummary-mian">
          <div class="dsummary-title">督办问题</div>
          <div>
            <p>有大家做出奉献，我们自己才能保得平安。做好自我防护，祝大家好好学习，天天向上。有大家做出奉献，我们自己有大家做出奉献，我们自己有大家做出奉献，我们自己有大家做出奉献，我们自己有大家做出奉献，我们自己.</p>
            <p><span>责任部门：</span><span>@信息系统部 @技术规划部</span></p>
          </div>
        </div>
        <div v-show="$route.params.statusName !== '督办未发布'" class="dsummary-mian">
          <div class="dsummary-title">督办举措</div>
          <div v-show="$route.params.statusName !== '督办未回复'" class="main-info">
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
          <div v-show="$route.params.statusName === '督办未回复'" class="main-info">
            暂无内容！
          </div>
        </div>

        <div class="bottom dbtn">
          <el-button v-show="$route.params.statusName !== '督办未确认'" round>返回</el-button>
          <el-button v-show="$route.params.statusName === '督办未发布' || $route.params.statusName === '督办未回复'" type="primary" round>提交</el-button>
          <el-button v-show="$route.params.statusName === '督办未确认'" type="danger" round>退回</el-button>
          <el-button v-show="$route.params.statusName === '督办未确认'" type="primary" round>确认</el-button>
          <el-button v-show="$route.params.statusName === '督办未确认' || $route.params.statusName === '督办未回复'" type="danger" plain round>撤销督办</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class OverseeCheck extends Vue {
    private textarea = "";
    private input= "";
}
</script>
