<template>
  <div class="app-container dtable-text">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">督办管理</span>
      </div>
      <div class="dtable">
        <el-table :data="tableData" element-loading-text="Loading" stripe>
          <el-table-column prop="programTitle" label="直播名称" align="center"/>
          <el-table-column prop="deptnames" label="协办部门" align="center"  />
          <el-table-column prop="status" label="督办状态" align="center">
            <template slot-scope="scope">
              <span class="dblue" v-if="scope.row.status==='0'">{{getStatusName(scope.row.status)}}</span>
              <span class="dred" v-if="scope.row.status!=='0'">{{getStatusName(scope.row.status)}}</span>
            </template>
            <!-- <div slot-scope="scope">
                <span v-show="scope.row.status==='0'"> {{ scope.row.status }}已完成 </span>
                <span v-show="scope.row.status==='1'"> {{ scope.row.status }}督办未发布 </span>
                <span v-show="scope.row.status==='2'"> {{ scope.row.status }}督办未回复 </span>
                <span v-show="scope.row.status==='3'"> {{ scope.row.status }}督办未确认 </span>
                <span v-show="scope.row.status==='4'"> {{ scope.row.status }}本期无督办 </span>
            </div> -->
          </el-table-column>

          <el-table-column label="操作" align="center">
            <div slot-scope="scope">
              <router-link v-if=" scope.row.status!=='4'" :to="{name:'OverseeCheck', params: {status:scope.row.status, programId:scope.row.programId, id:scope.row.id} }">
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
import { getViewStatus } from "@/api/dict"
import { MessageBox } from "element-ui"
@Component

export default class OverseeList extends Vue {
    private tabledData = [{ // 点赞榜
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "4",
        statusName: "本期无督办"
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
        status: "0",
        statusName: "督办已完成"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "0",
        statusName: "督办已完成"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "3",
        statusName: "督办未确认"
    }, {
        programTitle: "客户之声第100期",
        deptnames: "综合部 信息系统部",
        status: "0",
        statusName: "督办已完成"
    }]

    private tableData = []
    private dataTotal = 0
    private dataPage = {
        pageNum: 1,
        pageSize: 10
    }

    private status: any = []

    protected mounted() {
        this.load()
    }

    private load() {
        // 督办状态： 督办未发布、督办未回复、督办未确认、本期无督办
        const params = {
            type: "khzs_supervise_item_status"
        }
        const status = getViewStatus(params)
        const tableData = getOverseeList(this.dataPage)
        Promise.all([status, tableData]).then((res) => {
            this.status = res[0]
            this.tableData = res[1].data
            this.dataTotal = res[1].total
        }).catch(() => {
            MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        })

        // getOverseeList(this.dataPage).then((res) => {
        //     if (res) {
        //         if (res.code < 200) {
        //             this.tableData = res.data
        //             this.dataTotal = res.total
        //         } else {
        //             MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        //         }
        //     }
        // })
    }

    private handleCurrentChange(val: number) {
        this.dataPage.pageNum = val
        this.load()
    }

    // 获取督办状态name
    private getStatusName(cellValue: any) {
        if (cellValue) {
            return this.status.find((item: { value: any }) => {
                return item.value === cellValue
            })?.label
        }
        return "--"
    }
}
</script>
