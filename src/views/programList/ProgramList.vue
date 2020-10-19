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
                    <el-input v-model="dataPage.queryParam" placeholder="请输入直播关键字" />
                </el-col>
                <el-col :span="4">
                <el-form-item class="dbtn">
                    <el-button type="primary" round @click="load">查询</el-button>
                    <el-button round @click="rest">重置</el-button>
                </el-form-item>
                </el-col>
            </el-row>
            </el-form>
        </div>
        <div class="dtable">
            <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" stripe>
            <el-table-column prop="title" label="节目名称" align="center" width="200" />
            <el-table-column prop="liveEntity.startTime" label="节目时间" align="center" />
            <el-table-column prop="liveEntity.speakers" label="主讲人" align="center" />
            <el-table-column prop="superviseItemEntity.status" label="督办状态" align="center">
                <!-- 督办状态： 0:督办已完成， 1：督办未发布，2：督办未回复，3：督办未确认，4：本期无督办 -->
                <template slot-scope="scope">
                    <span :class="{'dred':scope.row.superviseItemEntity.status !== '0' ,'dblue':scope.row.superviseItemEntity.status === '0'}">
                        {{getStatusName(scope.row.superviseItemEntity.status)}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <div slot-scope="scope">
                <el-button type="text" size="small" @click="checkValid(scope.row.id, scope.row.liveEntity.startTime, scope.row.liveId)">进入</el-button>
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
        <!-- <div class="dtable">
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
        </div> -->
        </el-card>
        <!-- :modal="false" -->
        <el-dialog
        custom-class="info-dialog"
        title="提示"
        :visible.sync="centerDialogVisible"
        width="25%"
        center
        >
        <span>本期节目暂无开始。开始时间：{{this.programTime}}，请稍后再试</span>
        <span slot="footer" class="dialog-footer dbtn">
            <el-button type="primary" round @click="centerDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getRecentProgram, getEffectiveness } from "@/api/programList/programList"
import { getViewStatus } from "@/api/dict"
import { MessageBox } from "element-ui"
@Component
export default class ProgramList extends Vue {
    private centerDialogVisible=false
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

    private programTime = ""
    private tableData = []
    private dataTotal = 0
    private dataPage = {
        pageNum: 1,
        pageSize: 10,
        queryParam: ""
    }

    private status: any = []

    protected mounted() {
        // 督办状态： 督办未发布、督办未回复、督办未确认、本期无督办
        const params = {
            type: "khzs_supervise_item_status"
        }
        const status = getViewStatus(params)
        const tableData = getRecentProgram(this.dataPage)
        Promise.all([status, tableData]).then((res) => {
            this.status = res[0]
            this.tableData = res[1].data
            this.dataTotal = res[1].total
        }).catch(() => {
            MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        })
    }

    private load() {
        getRecentProgram(this.dataPage).then((res) => {
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

    private rest() {
        this.dataPage.queryParam = ""
        this.load()
    }

    private handleCurrentChange(val: number) {
        this.dataPage.pageNum = val
        this.load()
    }

    // 检查节目有效性 1：未开始，2：进行中，3：已结束
    private checkValid(promId: string, time: string, liveId: string) {
        getEffectiveness({ id: promId }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    if (res.data !== "1") {
                        this.$router.push({
                            name: "ProgramDetail",
                            params: { promId: promId, liveId: liveId },
                            query: { id: promId }
                        })
                    } else {
                        this.centerDialogVisible = true
                        this.programTime = time
                    }
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
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
