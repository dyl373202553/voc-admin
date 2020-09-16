<template>
  <div class="app-container dtable-text">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">督办管理</span>
      </div>
      <div class="dtable">
        <el-table :data="tableData" element-loading-text="Loading" stripe height="600">
          <el-table-column prop="title" label="直播名称" align="center" width="200" />
          <el-table-column prop="departmentCooperation" label="协办部门" align="center" />
          <el-table-column prop="statusName" label="督办状态" align="center">
            <div slot-scope="scope">
              <span v-show="scope.row.status!=='4' && scope.row.status!=='other'" class="dred"> {{ scope.row.statusName }} </span>
              <span v-show="scope.row.status==='4'" class="dblue"> {{ scope.row.statusName }} </span>
              <span v-show="scope.row.status==='other'"> {{ scope.row.statusName }} </span>
            </div>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <div slot-scope="scope">
              <router-link :to="{name:'OverseeCheck', params: {status:scope.row.status, statusName:scope.row.statusName} }">
                <el-button type="text" size="small">查看</el-button>
              </router-link>
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

export default class OverseeList extends Vue {
    private tableData = [{ // 点赞榜
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "other",
        statusName: "--"
    }, {
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "1",
        statusName: "督办未发布"
    }, {
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "4",
        statusName: "督办已完成"
    }, {
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "3",
        statusName: "督办未确认"
    }, {
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "2",
        statusName: "督办未回复"
    }, {
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "2",
        statusName: "督办未回复"
    }, {
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "4",
        statusName: "督办已完成"
    }, {
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "4",
        statusName: "督办已完成"
    }, {
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "3",
        statusName: "督办未确认"
    }, {
        title: "客户之声第100期",
        departmentCooperation: "综合部 信息系统部",
        status: "4",
        statusName: "督办已完成"
    }]
}
</script>
