<template>
  <div class="app-container dtable-text">
    <el-card class="box-card dpadding0">
      <div class="dtodo">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="节目待办" name="first">
            <span slot="label">节目待办<el-badge value="23" /></span>
            <div class="dtodo-dtable">
              <el-table v-loading="listLoading" :data="tableData" element-loading-text="Loading" height="600">
                <el-table-column prop="title" label="待办名称" align="center" width="200" />
                <el-table-column prop="time" label="时间" align="center" />
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
                  layout="prev, pager, next, jumper"
                  :page-size="10"
                  :total="30"
                  :pager-count="7"
                />
                <div class="dpagination-right fr">
                  当前显示 1 - 15 条记录，共 178 条记录
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="督办待办" name="fourth">
            <span slot="label">督办待办<el-badge value="12" /></span>
            <div class="dtodo-dtable">
              <el-table v-loading="listLoading" :data="tableData2" element-loading-text="Loading" height="600">
                <el-table-column prop="title" label="待办名称" align="center" width="200" />
                <el-table-column prop="time" label="时间" align="center" />
                <el-table-column prop="content" label="内容" align="center" />
                <el-table-column label="操作" align="center">
                  <div>
                    <router-link :to="{name:'OverseeAnswer', params: {statusName:'督办回答'} }">
                      <el-button type="text" size="small">督办回答处理</el-button>
                    </router-link>
                    <router-link :to="{name:'OverseeAnswer', params: {statusName:'举措确认'} }">
                      <el-button type="text" size="small">举措确认处理</el-button>
                    </router-link>
                  </div>
                </el-table-column>
              </el-table>
              <div class="dpagination">
                <el-pagination
                  class="fl"
                  background
                  layout="prev, pager, next, jumper"
                  :page-size="10"
                  :total="30"
                  :pager-count="7"
                />
                <div class="dpagination-right fr">
                  当前显示 1 - 15 条记录，共 178 条记录
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
}
</script>
