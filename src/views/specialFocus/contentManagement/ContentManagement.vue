<template>
  <div class="app-container dtable-text">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">内容管理</span>
      </div>
      <div class="dtable">
        <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" stripe height="600">
          <el-table-column prop="time" label="发布时间" align="center" width="200" />
          <el-table-column prop="name" label="发布人" align="center" />
          <el-table-column prop="statusName" label="内容状态" align="center">
            <div slot-scope="scope">
              <span v-show="scope.row.statusName === '未开始'" class="dred">{{ scope.row.statusName }}</span>
              <span v-show="scope.row.statusName === '已下线'" class="dblue">{{ scope.row.statusName }}</span>
              <span v-show="scope.row.statusName === '进行中'" class="dgreen">{{ scope.row.statusName }}</span>
            </div>
          </el-table-column>
          <el-table-column label="操作" width="150px">
            <div slot-scope="scope">
              <router-link :to="{name:'SpecialFocus', params: {status:scope.row.status, statusName:scope.row.statusName} }">
                <el-button type="text" size="small">查看</el-button>
              </router-link>
              <el-button v-show="scope.row.statusName !== '已下线'" type="text" size="small">下线</el-button>
            </div>
          </el-table-column>
        </el-table>
        <div class="dpagination">
          <el-pagination background layout="prev, pager, next, jumper" :total="30" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class ContentManagement extends Vue {
    private tableData = [{ // 点赞榜
        time: "2019年2月4日 14:12",
        name: "党委办公室（党群工作部、职能管理部党委）-张三",
        status: "1",
        statusName: "未开始"
    }, {
        time: "2019年2月4日 14:12",
        name: "党委办公室（党群工作部、职能管理部党委）-张三",
        status: "1",
        statusName: "未开始"
    }, {
        time: "2019年2月4日 14:12",
        name: "党委办公室（党群工作部、职能管理部党委）-张三",
        status: "2",
        statusName: "进行中"
    }, {
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "3",
        statusName: "已下线"
    }, {
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "2",
        statusName: "进行中"
    }, {
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "3",
        statusName: "已下线"
    }, {
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "1",
        statusName: "未开始"
    }, {
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        tatus: "2",
        statusName: "进行中"
    }, {
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "3",
        statusName: "已下线"
    }, {
        time: "2019年2月4日 14:12",
        name: "综合部 信息系统部--小李",
        status: "2",
        statusName: "进行中"
    }]
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
