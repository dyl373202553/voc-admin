<template>
  <div class="app-container dtable-text">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">督办管理</span>
      </div>
      <div class="dtable">
        <el-table :data="tableData" element-loading-text="Loading" stripe>
          <el-table-column prop="programTitle" label="直播名称" align="center"/>
          <el-table-column prop="deptnames" label="协办部门" align="center" />
          <el-table-column prop="status" label="督办状态" align="center">
            <div slot-scope="scope">
              <span v-show="scope.row.status!=='4' && scope.row.status!=='other'" class="dred"> {{ scope.row.status }} </span>
              <span v-show="scope.row.status==='4'" class="dblue"> {{ scope.row.status }} </span>
              <span v-show="scope.row.status==='other'"> {{ scope.row.status }} </span>
            </div>
          </el-table-column>

          <el-table-column label="操作" align="center">
            <div slot-scope="scope">
              <router-link :to="{name:'OverseeCheck', params: {status:scope.row.status, status:scope.row.status} }">
                <el-button type="text" size="small">查看</el-button>
              </router-link>
            </div>
          </el-table-column>
        </el-table>
        <div class="dpagination">
            <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="dataPage.pageNum"
            :total="dataTotal"
            layout="prev, pager, next, jumper">
            </el-pagination>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getOverseeList } from "@/api/oversee/oversee"
import { MessageBox } from "element-ui"
@Component

export default class OverseeList extends Vue {
    private tabledData = [{ // 点赞榜
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "other",
        statusName: "--"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "1",
        statusName: "督办未发布"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "4",
        statusName: "督办已完成"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "3",
        statusName: "督办未确认"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "2",
        statusName: "督办未回复"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "2",
        statusName: "督办未回复"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "4",
        statusName: "督办已完成"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "4",
        statusName: "督办已完成"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "3",
        statusName: "督办未确认"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "4",
        statusName: "督办已完成"
    }]

    private tableData = []
    private dataTotal = 0
    private dataPage = {
        pageNum: 1,
        pageSize: 10
    }

    protected mounted() {
        this.load()
    }

    private load() {
        getOverseeList(this.dataPage).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.tableData = res.data
                    this.dataTotal = res.total
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private handleCurrentChange(val: number) {
        this.dataPage.pageNum = val
        this.load()
    }
}
</script>
