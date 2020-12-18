<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span :class="['header-title',{'header-title-active' : rankList=== 'dianzan'}]" @click="tabChange('dianzan')">点赞数</span>
            <span :class="['header-title',{'header-title-active' : rankList=== 'liuyan'}]" @click="tabChange('liuyan')">留言榜</span>
        </div>
        <el-collapse class="dcolloapse">
          <el-collapse-item name="1">
              <div class="home-tabs">
                  <!-- <el-tabs v-model="rankList" type="card" @tab-click="handleClick"> -->
                  <el-tabs v-model="rankList" type="card">
                      <el-tab-pane label="点赞数" name="dianzan">
                          <div class="home-table-tabs">
                            <el-tabs v-model="likenum">
                              <el-tab-pane label="按二级部门" name="first">
                                <el-table :data="rankListData">
                                  <el-table-column prop="rankingNum" label="排名" align="center" width="200">
                                    <div slot-scope="scope">
                                      <img v-show="scope.row.rankingNum === 1" src="@/assets/images/no1.png" class="image">
                                      <img v-show="scope.row.rankingNum === 2" src="@/assets/images/no2.png" class="image">
                                      <img v-show="scope.row.rankingNum === 3" src="@/assets/images/no3.png" class="image">
                                      <span v-show="scope.row.rankingNum === 4" class="drank">4</span>
                                      <span v-show="scope.row.rankingNum === 5" class="drank">5</span>
                                    </div>
                                  </el-table-column>
                                  <el-table-column prop="praiseDept2Name" label="部门" align="center" />
                                  <el-table-column prop="praiseDept2Num" label="点赞数" align="center">
                                    <div slot-scope="scope">
                                      共<span class="dred total">{{ scope.row.praiseDept2Num }}</span>次
                                    </div>
                                  </el-table-column>
                                </el-table>
                              </el-tab-pane>
                              <el-tab-pane label="按个人" name="second">
                                <el-table :data="rankListData">
                                  <el-table-column prop="rankingNum" label="排名" align="center" width="200">
                                    <div slot-scope="scope">
                                      <img v-show="scope.row.rankingNum === 1" src="@/assets/images/no1.png" class="image">
                                      <img v-show="scope.row.rankingNum === 2" src="@/assets/images/no2.png" class="image">
                                      <img v-show="scope.row.rankingNum === 3" src="@/assets/images/no3.png" class="image">
                                      <span v-show="scope.row.rankingNum === 4" class="drank">4</span>
                                      <span v-show="scope.row.rankingNum === 5" class="drank">5</span>
                                    </div>
                                  </el-table-column>
                                  <el-table-column prop="praiseUserName" label="姓名" align="center" />
                                  <el-table-column prop="praiseUserDeptName" label="部门" align="center" />
                                  <el-table-column prop="praiseUserNum" label="点赞数" align="center">
                                    <div slot-scope="scope">
                                      共<span class="dred total">{{ scope.row.praiseUserNum }}</span>次
                                    </div>
                                  </el-table-column>
                                </el-table>
                              </el-tab-pane>
                            </el-tabs>
                            <span class="fr dspan-info"># 所有统计数据截止  {{this.rankListTime? this.rankListTime : "--"}}，每周更新一次 #</span>
                          </div>
                      </el-tab-pane>
                      <el-tab-pane name="liuyan">
                          <span slot="label" >
                            留言榜
                          </span>
                          <div class="home-table-tabs">
                            <el-tabs v-model="activeNametabs">
                              <el-tab-pane label="按二级部门" name="first">
                                <el-table :data="rankListData">
                                  <el-table-column prop="rankingNum" label="排名" align="center" width="200">
                                    <div slot-scope="scope">
                                      <img v-show="scope.row.rankingNum === 1" src="@/assets/images/no1.png" class="image">
                                      <img v-show="scope.row.rankingNum === 2" src="@/assets/images/no2.png" class="image">
                                      <img v-show="scope.row.rankingNum === 3" src="@/assets/images/no3.png" class="image">
                                      <span v-show="scope.row.rankingNum === 4" class="drank">4</span>
                                      <span v-show="scope.row.rankingNum === 5" class="drank">5</span>
                                    </div>
                                  </el-table-column>
                                  <el-table-column prop="commentDept2Name" label="部门" align="center" />
                                  <el-table-column prop="commentDept2Num" label="留言数" align="center">
                                    <div slot-scope="scope">
                                      共<span class="dred total">{{ scope.row.commentDept2Num }}</span>次
                                    </div>
                                  </el-table-column>
                                </el-table>
                              </el-tab-pane>
                              <el-tab-pane label="按个人" name="second">
                                <el-table :data="rankListData">
                                  <el-table-column prop="rankingNum" label="排名" align="center" width="200">
                                    <div slot-scope="scope">
                                      <img v-show="scope.row.rankingNum === 1" src="@/assets/images/no1.png" class="image">
                                      <img v-show="scope.row.rankingNum === 2" src="@/assets/images/no2.png" class="image">
                                      <img v-show="scope.row.rankingNum === 3" src="@/assets/images/no3.png" class="image">
                                      <span v-show="scope.row.rankingNum === 4" class="drank">4</span>
                                      <span v-show="scope.row.rankingNum === 5" class="drank">5</span>
                                    </div>
                                  </el-table-column>
                                  <el-table-column prop="commentUserName" label="姓名" align="center" />
                                  <el-table-column prop="commentUserDeptName" label="部门" align="center" />
                                  <el-table-column prop="commentUserNum" label="留言数" align="center">
                                    <div slot-scope="scope">
                                      共<span class="dred total">{{ scope.row.commentUserNum }}</span>次
                                    </div>
                                  </el-table-column>
                                </el-table>
                              </el-tab-pane>
                            </el-tabs>
                            <span class="fr dspan-info"># 所有统计数据截止  {{this.rankListTime? this.rankListTime : "--"}}，每周更新一次 #</span>
                          </div>
                      </el-tab-pane>
                  </el-tabs>
                </div>
          </el-collapse-item>
        </el-collapse>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getRankList } from "@/api/IndexPage/home"
import { day } from "@/lib/js/unitls"
@Component
export default class Home extends Vue {
    private rankList = "dianzan"
    private likenum = "first"
    private activeName = "first"
    private activeNametabs = "first"
    private dataPage = {
        pageNum: "1",
        pageSize: "10"
    }

    private rankListData = []
    private rankListTime=""

    protected mounted() {
        this.load()
    }

    private load() {
        getRankList().then((res) => {
            if (res) {
                this.rankListData = res.data
                this.rankListTime = day(res.data[0].updateTime, "YYYY年MM月DD日")
            }
        })
    }

    private tabChange(name: string) {
        console.log(name)
        this.rankList = name
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}
.header-title {
    margin-right: 30px;
    cursor: pointer;
}
.header-title-active {
  color: #b0afaf;
}

</style>
