<template>
  <div class="app-container dtable-text">
    <el-card class="box-card dpadding0">
      <div class="dtodo">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="节目待办" name="first">
            <span slot="label">节目待办<el-badge :value="dataTotal" /></span>
            <div class="dtodo-dtable">
              <el-table v-loading="listLoading" :data="programToDo" element-loading-text="Loading">
                <el-table-column prop="title" label="待办名称" align="center" width="200" />
                <el-table-column prop="createTime" label="时间" align="center" />
                <el-table-column prop="content" label="内容" align="center" />
                <el-table-column label="操作" align="center">
                  <div>
                    <router-link :to="{name:'ProgramRelease', params: {statusName:'处理'} }">
                      <el-button type="text" size="small">处理</el-button>
                    </router-link>
                  </div>
                </el-table-column>
                </el-table>
                <div class="dpagination">
                    <el-pagination
                        class="fl"
                        background
                        @current-change="handleCurrentChange"
                        :current-page="dataPage.pageNum"
                        :total="dataTotal"
                        layout="prev, pager, next, jumper">
                    </el-pagination>
                    <div class="dpagination-right fr">
                    当前显示 {{this.dataPageStart}} - {{this.dataPageEnd}} 条记录，共 {{this.dataTotal}} 条记录
                    </div>
                </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="督办待办" name="fourth">
            <span slot="label">督办待办<el-badge :value="dataOverseeTotal" /></span>
            <div class="dtodo-dtable">
              <el-table v-loading="listLoading" :data="overseeToDo" element-loading-text="Loading">
                <el-table-column prop="title" label="待办名称" align="center" width="200" />
                <el-table-column prop="updateTime" label="时间" align="center" />
                <el-table-column prop="content" label="内容" align="center" />
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <router-link :to="{name:'OverseeAnswer', params: {status:scope.row.link, id:scope.row.id , businessId:scope.row.businessId} }">
                      <el-button type="text" size="small">处理</el-button>
                    </router-link>
                    <!-- <router-link :to="{name:'OverseeAnswer', params: {statusName:'举措确认'} }">
                      <el-button type="text" size="small">举措确认处理-管理员</el-button>
                    </router-link> -->
                  </template>
                </el-table-column>
              </el-table>
              <div class="dpagination">
                <el-pagination
                    class="fl"
                    background
                    @current-change="handleCurrentChange"
                    :current-page="dataOverseePage.pageNum"
                    :total="dataOverseeTotal"
                    layout="prev, pager, next, jumper">
                </el-pagination>
                <div class="dpagination-right fr">
                当前显示 {{this.dataOverseePageStart}} - {{this.dataOverseePageEnd}} 条记录，共 {{this.dataOverseeTotal}} 条记录
                </div>
                </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getToDoList } from "@/api/toDoList/toDoList"
@Component
export default class ToDoList extends Vue {
    private tableData = [{
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "发布节目",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }]

    private tableData2 =[{
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }, {
        title: "督办问题待回复",
        time: "2019年2月4日 14:12",
        content: "管理员指派您为本期主播，请尽快发布内容"
    }]

    private listLoading = false
    private activeName = "first"

    private programToDo = []
    private dataTotal = 0
    private dataPageStart = 1
    private dataPageEnd = 10

    private overseeToDo = []
    private dataOverseeTotal = 0
    private dataOverseePageStart = 1
    private dataOverseePageEnd = 10

    private dataPage ={
        type: "1", // 1：节目待办，2：督办待办
        pageNum: 1,
        pageSize: 10
    }

    private dataOverseePage ={
        type: "2", // 1：节目待办，2：督办待办
        pageNum: 1,
        pageSize: 10
    }

    protected mounted() {
        this.load()
    }

    private load() {
        const programToDo = getToDoList(this.dataPage)
        const overseeToDo = getToDoList(this.dataOverseePage)
        Promise.all([programToDo, overseeToDo]).then((res) => {
            this.programToDo = res[0].data
            this.dataTotal = res[0].total
            this.overseeToDo = res[1].data
            this.dataOverseeTotal = res[1].total
        })

        // getToDoList(this.dataPage).then((res) => {
        //     if (res) {
        //         this.programToDo = res.data
        //         this.dataTotal = res.total
        //     }
        // })
    }

    // private load2() {
    //     getToDoList(this.dataOverseePage).then((res) => {
    //         if (res) {
    //             this.overseeToDo = res.data
    //             this.dataOverseeTotal = res.total
    //         }
    //     })
    // }

    private handleCurrentChange(val: number) {
        this.dataPage.pageNum = val
        this.dataPageStart = val * 10
        this.dataPageEnd = val * 10 + 10
        this.load()
    }
}
</script>
