<template>
  <div class="app-container dtable-text">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">查询条件</span>
      </div>
      <div>
        <el-form ref="form" :model="form">
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="节目开始时间">
                <el-date-picker v-model="form.date1" type="date" placeholder="请选择开始时间" suffix-icon="el-icon-date" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="节目结束时间">
                <el-date-picker v-model="form.date2" type="date" placeholder="请选择结束时间" suffix-icon="el-icon-date" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级部门选择">
                <el-input v-model="form.name" suffix-icon="el-icon-s-home" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="三级部门选择">
                <el-input v-model="form.name" suffix-icon="el-icon-s-home" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="text-center dbtn">
                <el-button round>重置</el-button>
                <el-button type="primary" round>查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">列表</span>
        <span class="fr dexport">
          <i class="el-icon-s-unfold" />
          导出
        </span>
      </div>
      <div class="dtable">
        <el-table
          ref="multipleTable"
          :data="tableData"
          element-loading-text="拼命加载中"
          border
          fit
          highlight-current-row
          height="500"
        >
          <el-table-column type="selection" align="center" />
          <!-- <el-table-column align="center" label="Id" width="95">
            <template slot-scope="scope">
              {{ scope.$index }}
            </template>
          </el-table-column> -->
          <el-table-column label="节目名称" align="center">
            <div slot-scope="scope" class="dblue">
              {{ scope.row.title }}
            </div>
          </el-table-column>
          <el-table-column label="主讲人" align="center">
            <div slot-scope="scope">
              {{ scope.row.title }}
            </div>
          </el-table-column>
          <el-table-column align="center" label="节目时间">
            <div slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.title }}</span>
            </div>
          </el-table-column>
          <el-table-column label="点赞数" align="center">
            <div slot-scope="scope">
              {{ scope.row.title }}
            </div>
          </el-table-column>
          <el-table-column label="评论数" align="center">
            <div slot-scope="scope">
              {{ scope.row.title }}
            </div>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <div>
              <el-button type="text" size="small">点赞详情</el-button>
              <el-button type="text" size="small">评论详情</el-button>
            </div>
          </el-table-column>
          <!-- <el-table-column align="center" label="Actions" width="120">
            <template>
              <router-link :to="'/programList/CreateStudio'">
                <el-button type="primary" size="small" icon="el-icon-edit">
                  Editdddd
                </el-button>
              </router-link>
            </template>
          </el-table-column> -->
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
export default class OverseeCheck extends Vue {
    private form = {
        date1: "",
        date2: "",
        name: ""
    }

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
