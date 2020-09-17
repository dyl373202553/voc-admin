<template>
  <div class="app-container">
    <el-card class="box-card dpadding0">
      <div slot="header" class="clearfix">
        <span class="header-title">{{ $route.params.statusName }}</span>
      </div>
      <div class="dsummary">
        <div class="dsummary-mian">
          <div class="dsummary-title">节目信息</div>
          <div>
            <p><span>节目名称：</span><span>客户之声第100期</span></p>
            <p><span>节目时间：</span><span>2019年3月12日 17:11-17:30</span></p>
          </div>
        </div>
        <el-form ref="form">
          <div class="dsummary-mian">
            <div class="dsummary-title">督办问题</div>
            <div>
              <p>节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结节目小结</p>
              <p><span>责任部门：</span><span>@信息系统部 @技术规划部</span></p>
            </div>
          </div>
          <div v-show="$route.params.statusName === '督办回答'" class="dsummary-mian">
            <div class="dsummary-title">督办举措</div>
            <el-input
              type="textarea"
              :rows="3"
              placeholder="请输入督办措施"
            />
          </div>
          <div v-show="$route.params.statusName === '举措确认'" class="dsummary-mian">
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
                <div class="text-center dbtn">
                  <el-button type="danger" round plain @click="centerDialogVisible = true">退回</el-button>
                  <el-button type="primary" round>确认</el-button>
                </div>
              </div>
            </div>
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
                <div class="text-center dbtn">
                  <el-button type="danger" round plain @click="centerDialogVisible = true">退回</el-button>
                  <el-button type="primary" round>确认</el-button>
                </div>
              </div>
            </div>
          </div>
          <div v-show="$route.params.statusName === '督办回答'" class="dsummary-mian">
            <div class="dsummary-title">上传附件</div>
            <div>
              <p>上传附件</p>
            </div>
          </div>
          <div v-show="$route.params.statusName === '督办回答'" class="bottom dbtn">
            <el-button round>取消</el-button>
            <el-button type="primary" round>提交</el-button>
          </div>
          <div v-show="$route.params.statusName === '举措确认'" class="bottom dbtn">
            <el-button type="danger" round plain @click="centerDialogVisible = true">一键退回</el-button>
            <el-button type="primary" round>一键确认</el-button>
            <el-button type="danger" round>撤销督办</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-dialog
      custom-class="info-dialog"
      title="请填写退回意见(选填)"
      :visible.sync="centerDialogVisible"
      width="25%"
      center
    >
      <el-form :model="form">
        <el-input
          v-model="this.name"
          type="textarea"
          :rows="3"
          :maxlength="50"
          placeholder="请填写退回意见"
        />
      </el-form>
      <span slot="footer" class="dialog-footer dbtn">
        <el-button type="primary" round @click="centerDialogVisible = false">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class OverseeAnswer extends Vue {
    private centerDialogVisible =false
    private name =""
}
</script>
