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
            <el-table-column prop="liveEntity.startTime" label="节目时间" align="center">
                 <template slot-scope="scope">
                    {{scope.row.liveEntity.startTime}} -- {{scope.row.liveEntity.endTime}}
                </template>
            </el-table-column>
            <el-table-column prop="liveEntity.speakers" label="主讲人" align="center" />
            <el-table-column prop="superviseItemEntity.status" label="督办状态" align="center">
                <!-- 督办状态： 0:督办已完成， 1：督办未发布，2：督办未回复，3：督办未确认，4：本期无督办 -->
                <template slot-scope="scope">
                    <span :class="(scope.row.superviseItemEntity.status !== '0' && scope.row.superviseItemEntity.status !== '4')? 'dred':'dblue'">
                        {{$getNameByCode(status, scope.row.superviseItemEntity.status)}}
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
        </el-card>
        <!-- :modal="false" -->
        <el-dialog
            custom-class="info-dialog"
            title="提示"
            :visible.sync="centerDialogVisible"
            width="25%"
            center
            >
            <span>本期节目暂未开始。开始时间：{{this.programTime}}，请稍后再试</span>
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
