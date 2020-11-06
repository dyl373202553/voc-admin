<template v-if="this.userrole==='0'">
    <div class="app-container dtable-text">
        <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span class="header-title">内容管理</span>
        </div>
        <div class="dtable">
            <el-table :data="tableData" element-loading-text="Loading" stripe >
            <el-table-column prop="createTime" label="发布时间" align="center" width="200" />
            <el-table-column prop="pushUserInfo" label="发布人" align="center" />
            <el-table-column prop="viewStatus" label="内容状态" align="center">
                <div slot-scope="scope">
                    <!-- 1:未开始， 2：进行中， 3：已下线 -->
                    <!-- <span v-show="scope.row.viewStatus === '1'" class="dred">{{ scope.row.viewStatus }} 未开始</span>
                    <span v-show="scope.row.viewStatus === '3'" class="dblue">{{ scope.row.viewStatus }} 已下线</span>
                    <span v-show="scope.row.viewStatus === '2'" class="dgreen">{{ scope.row.viewStatus }} 进行中</span> -->
                   <span :class="{'dred':scope.row.viewStatus === '1' ,'dblue':scope.row.viewStatus === '3','dgreen':scope.row.viewStatus === '2'}">
                        {{$getNameByCode(status, scope.row.viewStatus)}}
                    </span>
                </div>
            </el-table-column>
            <el-table-column label="操作" width="150px">
                <div slot-scope="scope">
                <router-link :to="{name:'SpecialFocus', params: {viewStatus:scope.row.viewStatus, id:scope.row.id} }">
                    <el-button type="text" size="small">查看</el-button>
                </router-link>
                <el-button v-show="scope.row.viewStatus !== '3'" type="text" size="small"  @click="onOffLine(scope.row.id)">结束</el-button>
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
import { getSpecialFocusList, postOffLine } from "@/api/specialFocus/SpecialFocus"
import { getViewStatus } from "@/api/dict"
import { MessageBox } from "element-ui"
import Cookies from "js-cookie"
@Component
export default class ContentManagement extends Vue {
    private centerDialogVisible = false
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
            const params = {
                type: "khzs_special_attention_status"
            }
            const status = getViewStatus(params)
            const tableData = getSpecialFocusList(this.dataPage)
            Promise.all([status, tableData]).then((res) => {
                this.status = res[0]
                this.tableData = res[1].data
                this.dataTotal = res[1].total
            }).catch(() => {
                MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
            })
        } else {
            this.$router.push({
                name: "home"
            })
        }
    }

    private load() {
        getSpecialFocusList(this.dataPage).then((res) => {
            if (res) {
                if (res.code === 0) {
                    this.tableData = res.data
                    this.dataTotal = res.total
                } else {
                    MessageBox.alert(`数据数据失败，请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private onOffLine(id: string) {
        postOffLine({ ids: id }).then((res) => {
            if (res) {
                if (res.code === 0) {
                    this.load()
                    MessageBox.alert(res.message, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`操作失败`, "失败", { type: "error" })
                }
            }
        })
    }

    private userViewStatus() {
        const params = {
            type: "khzs_special_attention_status"
        }
        getViewStatus(params).then((res) => {
            return res.data
        })
    }

    private handleCurrentChange(val: number) {
        this.dataPage.pageNum = val
        this.load()
    }

    // private checkDetail(id: string) {
    //     alert(id)
    //     postSpecialFocusDetail(id).then((res) => {
    //         if (res) {
    //             MessageBox.alert(`操作成功`, "成功", { type: "success" })
    //         }
    //     })
    // }
}
</script>
<style lang="scss" scoped>
  .programManage {
    .dbtn-del {
      background: transparent;
      padding: 0;
      border: none;
      color: #D0D0D0;
      font-size: 16px;
    }
    .box-card .el-button span {
      border-bottom: 1px solid #4484F6;
    }
  }
</style>
