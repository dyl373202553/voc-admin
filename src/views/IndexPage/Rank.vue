<template>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">排行榜</span>
      </div>
      <div class="home-tabs">
        <!-- <el-tabs v-model="rankList" type="card" @tab-click="handleClick"> -->
        <el-tabs v-model="rankList" type="card">
          <el-tab-pane label="点赞数" name="first">
            <div class="home-table-tabs">
              <el-tabs v-model="likenum">
                <el-tab-pane label="按二级部门数据排行" name="first">
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
                <el-tab-pane label="按个人数据排行" name="second">
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
              <span class="fr dspan-info"># 所有统计数据截止2019年12月31日23:23，每周更新一次 #</span>
            </div>
          </el-tab-pane>
          <el-tab-pane>
            <span slot="label">
              留言榜
            </span>
            <div class="home-table-tabs">
              <el-tabs v-model="activeNametabs">
                <el-tab-pane label="按二级部门数据排行" name="first">
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
                    <el-table-column prop="commentDept2Num" label="点赞数" align="center">
                      <div slot-scope="scope">
                        共<span class="dred total">{{ scope.row.commentDept2Num }}</span>次
                      </div>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="按个人数据排行" name="second">
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
                    <el-table-column prop="commentUserNum" label="点赞数" align="center">
                      <div slot-scope="scope">
                        共<span class="dred total">{{ scope.row.commentUserNum }}</span>次
                      </div>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
              <span class="fr dspan-info"># 所有统计数据截止2019年12月31日23:23，每周更新一次 #</span>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getRankList } from "@/api/IndexPage/home"
@Component
export default class Home extends Vue {
    private rankList = "first"
    private likenum = "first"
    private activeName = "first"
    private activeNametabs = "first"
    private tableData = [{ // 点赞榜
        rank: "1",
        name: "王小虎",
        department: "信息系统部",
        likenum: "113345"
    }, {
        rank: "2",
        name: "张三",
        department: "技术规划部",
        likenum: "113345"
    }, {
        rank: "3",
        name: "李四",
        department: "党委办公室(党群工作部、职能管理部党委)",
        likenum: "113345"
    }, {
        rank: "4",
        name: "天天",
        department: "法律事务部",
        likenum: "11345"
    }, {
        rank: "5",
        name: "小敏",
        department: "全业务交付运营中心",
        likenum: "11345"
    }]

    private dataPage = {
        pageNum: "1",
        pageSize: "10"
    }

    private rankListData = []

    protected mounted() {
        this.load()
    }

    private load() {
        getRankList().then((res) => {
            if (res) {
                this.rankListData = res.data
            }
        })
    }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}

</style>
