<template v-if="this.userrole==='0'">
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
                <el-date-picker v-model="startTime"
                    type="datetime" placeholder="请选择开始时间"
                    @change="checkDate" suffix-icon="el-icon-date" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="节目结束时间">
                <el-date-picker v-model="endTime" type="datetime"
                    placeholder="请选择结束时间" @change="checkDate" suffix-icon="el-icon-date" style="width:100%" />
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="二级部门选择">
                <el-input v-model="dept2Name" suffix-icon="el-icon-s-home" @focus="dialogTableVisible = true"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="三级部门选择">
                <el-input v-model="dept3Name" suffix-icon="el-icon-s-home" @focus="dialogTreeVisible = true"/>
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
        <span class="fr dexport" @click="exportAll">
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
          @selection-change="changeSelect"
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
          <el-table-column align="center" label="节目时间" min-width="150">
            <div slot-scope="scope">
              <i class="el-icon-time" />
              <span>{{$day(scope.row.liveEntity.startTime, "YYYY-MM-DD")}} -- {{$day(scope.row.liveEntity.endTime, "YYYY-MM-DD")}}</span>
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
            <div slot-scope="scope">
              <el-button type="text" size="small" @click="likeDetail('2', scope.row.id, '点赞详情')">点赞详情</el-button>
              <el-button type="text" size="small" @click="likeDetail('1', scope.row.id, '评论详情')">评论详情</el-button>
            </div>
          </el-table-column>
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
    <el-dialog title="二级部门" :visible.sync="dialogTableVisible">
       <TreeDepartment @funcs="getMsgFormSon" :restFloat="restDept2Code"/>
    </el-dialog>
    <el-dialog title="三级部门" :visible.sync="dialogTreeVisible">
       <TreeDepartmentAll @funcs="getMsgFormSonThird"  :restFloat="restDept3Code"/>
    </el-dialog>
    <el-dialog
          custom-class="info-dialog"
          title="提示"
          :visible.sync="centerDialogVisible"
          width="25%"
          top="15%"
          :center="true"
          >
          <div slot="footer" class="dialog-footer" style="padding:50px 20px;">
              <span>导出中，请稍等......</span>
          </div>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator"
import { getDataExportList } from "@/api/dataExport/dataExport"
import { MessageBox } from "element-ui"
import { day, handleDownloadFile } from "@/lib/js/unitls"
import axios from "axios"
import { UserModule } from "@/store/module/user"
import TreeDepartment from "@/components/addressBook/TreeDepartment.vue"
import TreeDepartmentAll from "@/components/addressBook/TreeDepartmentAll.vue"
import Cookies from "js-cookie"

@Component({
    components: { TreeDepartment, TreeDepartmentAll }
})
export default class OverseeCheck extends Vue {
    @Watch("dataForm.dept3Code")
    protected Dept3CodeChange(val: string) {
        if (val) {
            this.restDept3Code = false
        } else {
            this.restDept3Code = true
        }
    }

    @Watch("dataForm.dept2Code")
    protected Dept2CodeChange(val: string) {
        if (val) {
            this.restDept2Code = false
        } else {
            this.restDept2Code = true
        }
    }

    private restDept3Code = true
    private restDept2Code = true
    private dept2Name = ""
    private dept3Name = ""
    private startTime = ""
    private endTime = ""

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
    private selectList = ""
    private dialogTableVisible = false
    private dialogTreeVisible = false
    private centerDialogVisible = false

    get userToken() {
        // @ts-ignore
        return UserModule.token
    }

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
        if (this.startTime) {
            this.dataForm.startTime = day(this.startTime, "YYYY-MM-DD HH:mm:ss")
        }
        if (this.endTime) {
            this.dataForm.endTime = day(this.endTime, "YYYY-MM-DD HH:mm:ss")
        }
        this.load()
    }

    private rest() {
        this.startTime = ""
        this.endTime = ""
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

    //  导出详情或点赞
    private likeDetail(type: string, id: string, name: string) {
        axios({
            method: "get",
            url: `/vue-potal/moa-customervoice/api/modules/khzsProgram/exportProgramData?id=${id}&type=${type}`,
            responseType: "blob", // arraybuffer
            headers: {
                // "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${this.userToken}`
            }
        })
            .then((res: any) => {
                const dateName = day(new Date(), "YYYY-MM-DD")
                const fileName = name + dateName + ".xls"
                const blob = new Blob([res.data], { type: "application/vnd.ms-excel" })
                handleDownloadFile(blob, fileName)
            })
            .catch(function (error) { // 请求失败处理
                MessageBox.alert(error, "失败", { type: "error" })
            })
    }

    // 导出数据--选择-多选择
    private changeSelect(selection: any) {
        const arr = []
        for (let i = 0; i < selection.length; i++) {
            arr.push(selection[i].id)
        }
        this.selectList = arr.join(",")
    }

    private exportAll() {
        this.centerDialogVisible = true
        axios({
            method: "get",
            url: `customervoice-downexecl/exportAll?ids=${this.selectList}`,
            responseType: "blob", // arraybuffer
            headers: {
                // "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${this.userToken}`
            }
        })
            .then((res) => {
                this.centerDialogVisible = false
                const dateName = day(new Date(), "YYYY-MM-DD")
                const fileName = "列表导出" + dateName + ".xls"
                const blob = new Blob([res.data], { type: "application/vnd.ms-excel" })
                handleDownloadFile(blob, fileName)
            })
            .catch((error) => { // 请求失败处理
                MessageBox.alert(error, "失败", { type: "error" })
                this.centerDialogVisible = false
            })
    }

    // 获取通讯录传回的数据 -责任部门返回数据
    private getMsgFormSon(data: string|any[]) {
        console.log(data)
        this.dialogTableVisible = false
        if (data.length !== 0) {
            this.dataForm.dept2Code = data[0].id
            this.dept2Name = data[0].label
        } else {
            this.dataForm.dept2Code = ""
            this.dept2Name = ""
        }
    }

    // 获取通讯录传回的数据 -责任部门返回数据
    private getMsgFormSonThird(data: string|any[]) {
        this.dialogTreeVisible = false
        if (data.length !== 0) {
            this.dataForm.dept3Code = data[0].id
            this.dept3Name = data[0].label
        } else {
            this.dataForm.dept3Code = ""
            this.dept3Name = ""
        }
    }

    // 校验时间
    private checkDate() {
        if (this.dataForm.startTime && this.dataForm.endTime) {
            if (this.dataForm.endTime <= this.dataForm.startTime) {
                MessageBox.alert("节目结束时间不能早于开始时间", "error", { type: "error" })
                this.dataForm.endTime = ""
            }
        }
    }
}
</script>
