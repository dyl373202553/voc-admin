<template>
    <div class="app-container programList dtable-text">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="header-title">节目列表</span>
        </div>
        <div>
            <el-form label-position="left" label-width="30px">
            <el-row>
                <el-col :span="24">
                    <div class="dinput-search">输入查询</div>
                </el-col>
                <el-col :span="20">
                    <el-input v-model="searchData" />
                </el-col>
                <el-col :span="4">
                <el-form-item class="dbtn">
                    <el-button type="primary" round>查询</el-button>
                    <el-button round>重置</el-button>
                </el-form-item>
                </el-col>
            </el-row>
            </el-form>
        </div>
        <div class="dtable">
            <el-table v-loading="listLoading" :data="tabledData" element-loading-text="Loading" stripe height="500">
            <el-table-column prop="title" label="节目名称" align="center" width="200" />
            <el-table-column prop="time" label="节目时间" align="center" />
            <el-table-column prop="name" label="主讲人" align="center" />
            <el-table-column prop="statusName" label="督办状态" align="center">
                <div slot-scope="scope">
                <span v-show="scope.row.statusName!=='督办已完成' && scope.row.statusName!=='本期无督办'" class="dred"> {{ scope.row.statusName }} </span>
                <span v-show="scope.row.statusName==='督办已完成'" class="dblue"> {{ scope.row.statusName }} </span>
                <span v-show="scope.row.statusName==='本期无督办'"> {{ scope.row.statusName }} </span>
                </div>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <div slot-scope="scope">
                <router-link :to="{name:'ProgramDetail', params: {statusName:scope.row.statusName} }">
                    <el-button type="text" size="small">进入</el-button>
                </router-link>
                <el-button type="text" size="small" @click="centerDialogVisible = true">进入-弹框</el-button>
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
        <!-- :modal="false" -->
        <el-dialog
        custom-class="info-dialog"
        title="提示"
        :visible.sync="centerDialogVisible"
        width="25%"
        center
        >
        <span>本期节目暂无开始。开始时间：2020年12月1日17:00，请稍后再试</span>
        <span slot="footer" class="dialog-footer dbtn">
            <el-button type="primary" round @click="centerDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getRecentProgram } from "@/api/programList/programList"
@Component
export default class ProgramList extends Vue {
    private centerDialogVisible=false
    private searchData = ""
    private tabledData= [{
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "党委办公室（职能管理部党委）-张三",
        status: "1",
        statusName: "督办未回复"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "党委办公室（党群工作部、职能管理部党委）-张三",
        status: "5",
        statusName: "本期无督办"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "党委办公室（党群工作部）-张三",
        status: "3",
        statusName: "督办已完成"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "1",
        statusName: "督办未回复"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "3",
        statusName: "督办已完成"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "1",
        statusName: "督办未回复"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "2",
        statusName: "督办未确认"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "1",
        statusName: "督办未回复"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "5",
        statusName: "本期无督办"
    }, {
        title: "客户之声第100期",
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "2",
        statusName: "督办未确认"
    }]

    private listLoading = false
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
        getRecentProgram(this.dataPage).then((res) => {
            if (res) {
                this.tableData = res.data
                this.dataTotal = res.total
            }
        })
    }

    private handleCurrentChange(val: number) {
        this.dataPage.pageNum = val
        this.load()
    }
}
</script>
<style lang="scss" scoped>
  .dinput-search {
    font-size: 12px;
    color: #333333;
    margin-bottom: 10px;
  }
  .programList {
    .dbtn {
      .el-button {
        padding: 10px 28px;
      }
    }
  }
</style>
