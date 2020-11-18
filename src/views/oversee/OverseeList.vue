<template v-if="this.userrole==='0'">
    <div class="app-container dtable-text">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="header-title">督办管理</span>
            </div>
            <div class="dtable">
                <el-table :data="tableData" element-loading-text="Loading" stripe>
                <el-table-column prop="programTitle" label="直播名称" align="center"/>
                <el-table-column prop="deptnames" label="责任部门" align="center"  />
                <el-table-column prop="status" label="督办状态" align="center">
                    <template slot-scope="scope">
                        <span :class="(scope.row.status !== '0' && scope.row.status !== '4')? 'dred':'dblue'">
                        {{$getNameByCode(status, scope.row.status)}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <div slot-scope="scope">
                        <!-- <router-link v-if=" scope.row.status!=='4'" :to="{name:'OverseeCheck',
                            params: {status:scope.row.status, statusName:$getNameByCode(status, scope.row.status), programId:scope.row.programId, id:scope.row.id},
                            query: { id: scope.row.id } }">
                            <el-button type="text" size="small">查看</el-button>
                        </router-link> -->
                        <el-button type="text" size="small" @click="checkValid( scope.row.status, $getNameByCode(status, scope.row.status), scope.row.programId, scope.row.id)">查看</el-button>
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
        <el-dialog
            custom-class="info-dialog"
            title="提示"
            :visible.sync="centerDialogVisible"
            width="25%"
            center
            >
            <span>本期节目暂未开始，请稍后再试</span>
            <span slot="footer" class="dialog-footer dbtn">
                <el-button type="primary" round @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getOverseeList } from "@/api/oversee/oversee"
import { getEffectiveness } from "@/api/programList/programList"
import { getViewStatus } from "@/api/dict"
import { MessageBox } from "element-ui"
import Cookies from "js-cookie"
@Component

export default class OverseeList extends Vue {
    private centerDialogVisible=false
    private tableData = []
    private dataTotal = 0
    private dataPage = {
        pageNum: 1,
        pageSize: 10
    }

    private status: any = []
    private userrole: any= ""

    protected mounted() {
        this.userrole = Cookies.get("userrole")
        if (this.userrole === "0") {
            this.load()
        } else {
            this.$router.push({
                name: "home"
            })
        }
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
    }

    private handleCurrentChange(val: number) {
        this.dataPage.pageNum = val
        this.load()
    }

    // 检查节目有效性 1：未开始，2：进行中，3：已结束
    private checkValid(status: string, statusName: string, programId: string, id: string) {
        getEffectiveness({ id: programId }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    if (res.data !== "1") {
                        this.$router.push({
                            name: "OverseeCheck",
                            params: { status: status, statusName: statusName, programId: programId, id: id },
                            query: { id: id }
                        })
                    } else {
                        this.centerDialogVisible = true
                    }
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }
}
</script>
