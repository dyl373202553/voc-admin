<template>
    <div class="app-container dtable-text">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="header-title">节目管理</span>
            </div>
            <div class="dtable">
                <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" stripe>
                <el-table-column prop="title" label="节目名称" align="center" width="200" />
                <el-table-column prop="liveEntity.startTime" label="节目时间" align="center" />
                <el-table-column prop="liveEntity.speakers" label="主讲人" align="center" />
                <el-table-column label="操作" align="center">
                    <div slot-scope="scope">
                    <router-link v-if="scope.row.liveEntity.summaryFlag === '0' && !scope.row.summaryEntity && userrole===0"
                        :to="{name:'ProgramSummary', params: { summaryName:'发布小结', id:scope.row.id },query: { id: scope.row.id } }">
                        <el-button type="text" size="small">发布小结</el-button>
                    </router-link>
                    <router-link v-if="scope.row.liveEntity.summaryFlag === '0' && scope.row.summaryEntity && userrole===0"
                        :to="{name:'ProgramSummary', params: { summaryName:'管理小结', id:scope.row.id },query: { id: scope.row.id } }">
                        <el-button type="text" size="small">管理小结</el-button>
                    </router-link>
                    <router-link
                        :to="{name:'ProgramRelease', params: { summaryName:'detail', id:scope.row.id},query: { id: scope.row.id } }">
                        <el-button type="text" size="small">编辑</el-button>
                    </router-link>
                    <el-button  v-if="userrole===0" icon="el-icon-delete" class="dbtn-del" @click="programDelete(scope.row.id)"/>
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
import { getProgramList, getProgramDelete } from "@/api/programList/programList"
import { MessageBox } from "element-ui"
import { UserModule } from "@/store/module/user"
@Component
export default class ProgramManage extends Vue {
    private listLoading = false

    get userrole() {
        // @ts-ignore
        return UserModule.userrole
    }

    get userCode() {
        // @ts-ignore
        return UserModule.user.userCode
    }

    private tableData = []
    private dataTotal = 0
    private dataPage = {
        pageNum: 1,
        pageSize: 10,
        queryParam: ""
    }

    protected mounted() {
        this.load()
    }

    private load() {
        getProgramList(this.dataPage).then((res) => {
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

    private programDelete(id: string) {
        getProgramDelete({ id: id }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.load()
                    MessageBox.alert(res.message, "成功", { type: "success" })
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
