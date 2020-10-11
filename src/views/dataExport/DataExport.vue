<template>
  <div class="app-container dtable-text">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">查询条件</span>
      </div>
      <div>
        <el-form ref="form" :model="dataForm">
          <el-row :gutter="40">
            <el-col :span="12">
              <el-form-item label="节目开始时间">
                <el-date-picker v-model="dataForm.startTime" type="datetime" placeholder="请选择开始时间" suffix-icon="el-icon-date" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="节目结束时间">
                <el-date-picker v-model="dataForm.endTime" type="date" placeholder="请选择结束时间" suffix-icon="el-icon-date" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级部门选择">
                <el-input v-model="dataForm.dept2Code" suffix-icon="el-icon-s-home" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="三级部门选择">
                <el-input v-model="dataForm.dept3Code" suffix-icon="el-icon-s-home" />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item class="text-center dbtn">
                <el-button round @click="rest">重置</el-button>
                <el-button type="primary" round @click="search">查询</el-button>
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
              {{ scope.row.liveEntity.speakers }}
            </div>
          </el-table-column>
          <el-table-column align="center" label="节目时间">
            <div slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{ scope.row.liveEntity.startTime }}</span>
            </div>
          </el-table-column>
          <el-table-column label="点赞数" align="center">
            <div slot-scope="scope">
              {{ scope.row.praiseNum  }}
            </div>
          </el-table-column>
          <el-table-column label="评论数" align="center">
            <div slot-scope="scope">
              {{ scope.row.commentNum  }}
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
           <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page="dataForm.pageNum"
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
import { getDataExportList } from "@/api/dataExport/dataExport"
import { MessageBox } from "element-ui"
import { day } from "@/lib/js/unitls"
@Component
export default class OverseeCheck extends Vue {
    private dataForm = {
        pageNum: 1,
        pageSize: 10,
        startTime: "",
        endTime: "",
        dept2Code: "",
        dept3Code: ""
    }

    private tableData = []
    private dataTotal = 0
    protected mounted() {
        this.load()
    }

    private load() {
        getDataExportList(this.dataForm).then((res) => {
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

    private search() {
        if (this.dataForm.startTime) {
            this.dataForm.startTime = day(this.dataForm.startTime, "YYYY-MM-DD HH:mm:ss")
        }
        if (this.dataForm.endTime) {
            this.dataForm.endTime = day(this.dataForm.endTime, "YYYY-MM-DD HH:mm:ss")
        }
        this.load()
    }

    private rest() {
        this.dataForm = {
            pageNum: 1,
            pageSize: 10,
            startTime: "",
            endTime: "",
            dept2Code: "",
            dept3Code: ""
        }
        this.load()
    }

    private handleCurrentChange(val: number) {
        this.dataForm.pageNum = val
        this.load()
    }
}
</script>
