<template>
  <div class="app-container dtable-text">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">节目管理</span>
      </div>
      <div class="dtable">
        <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" stripe height="580">
          <el-table-column prop="title" label="节目名称" align="center" width="200" />
          <el-table-column prop="time" label="节目时间" align="center" />
          <el-table-column prop="name" label="主讲人" align="center" />
          <el-table-column label="操作" align="center">
            <div>
              <router-link :to="{name:'ProgramSummary', params: { summaryName:'发布小结'} }">
                <el-button type="text" size="small">发布小结</el-button>
              </router-link>
              <router-link :to="{name:'ProgramSummary', params: { summaryName:'管理小结'} }">
                <el-button type="text" size="small">管理小结</el-button>
              </router-link>
              <router-link :to="{name:'ProgramRelease', params: { summaryName:'编辑'} }">
                <el-button type="text" size="small">编辑</el-button>
              </router-link>
              <el-button icon="el-icon-delete" class="dbtn-del" />
            </div>
          </el-table-column>
        </el-table>
        <div class="dpagination">
          <el-pagination background layout="prev, pager, next, jumper" :total="30" />
        </div>
      </div>
    </el-card>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class ProgramManage extends Vue {
    private tableData = [{
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "党委办公室（党群工作部、职能管理部党委）-张三",
        status: "1",
        statusName: "未开始"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "党委办公室（党群工作部、职能管理部党委）-张三",
        status: "1",
        statusName: "未开始"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "党委办公室（党群工作部、职能管理部党委）-张三",
        status: "2",
        statusName: "进行中"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "3",
        statusName: "已下线"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "2",
        statusName: "进行中"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "3",
        statusName: "已下线"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "1",
        statusName: "未开始"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        tatus: "2",
        statusName: "进行中"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "3",
        statusName: "已下线"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "2",
        statusName: "进行中"
    }]

    private listLoading = false
}
</script>
