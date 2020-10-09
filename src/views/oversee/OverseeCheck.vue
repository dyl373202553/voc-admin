<template>
  <div class="app-container">
    <el-card class="box-card dpadding0">
      <div slot="header" class="clearfix">
        <span class="header-title">督办查看{{ $route.params.status }}</span>
      </div>
      <div class="dsummary">
        <div class="dsummary-mian">
          <div class="dsummary-title">节目信息</div>
          <div>
            <p><span>节目名称：</span><span>{{this.programList.title}}</span></p>
            <p><span>节目时间：</span><span>{{this.programList.time}}</span></p>
            <p><span>督办状态：</span>
              <span v-show="$route.params.status === '0'" class="dblue">{{ $route.params.status }}</span>
              <span v-show="$route.params.status !== '0'" class="dred">{{ $route.params.status }}</span>
            </p>
          </div>
        </div>
        <div class="dsummary-mian">
          <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>督办事项</div>
          <div>
            <el-input
              v-model="programOversee"
              type="textarea"
              :rows="3"
              placeholder="请填写督办事项"
            />
          </div>
        </div>
        <div v-show="$route.params.status === '1'" class="dsummary-mian">
          <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>责任部门</div>
          <div>
            <el-input v-model="deptnamesData" placeholder="请选择参与部门"  @focus="dialogTableVisible = true" suffix-icon="el-icon-s-home" />
          </div>
        </div>
        <div v-show="$route.params.status !== '1'" class="dsummary-mian">
            <p><span>责任部门：</span><span>{{this.person}}</span></p>
        </div>
        <div v-show="$route.params.status !== '1'" class="dsummary-mian">
          <div class="dsummary-title">督办举措</div>
          <div v-show="$route.params.status !== '2'" class="main-info">
            <div class="info-left">
              <el-avatar src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2496227229,2115216729&fm=26&gp=0.jpg" />
            </div>
            <div class="info-right">
              <div>
                <span class="info-title">刘晓彤</span>
                <span>    信息系统部</span>
              </div>
              <p>雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天雪花漫天飞舞雪花瞬间从夏天</p>
              <div>
                <i class="el-icon-paperclip" />
                <span class="info-title">附件</span>
              </div>
            </div>
          </div>
          <div v-show="$route.params.status === '2'" class="main-info">
            暂无内容！
          </div>
        </div>

        <div class="bottom dbtn">
          <el-button v-show="$route.params.status !== '3'" round>返回</el-button>
          <el-button v-show="$route.params.status === '1' || $route.params.status === '2'" type="primary" round
          :disabled="!(this.deptnamesData && this.programOversee)" @click="submit">提交</el-button>
          <el-button v-show="$route.params.status === '3'" type="danger" round>退回</el-button>
          <el-button v-show="$route.params.status === '3'" type="primary" round>确认</el-button>
          <el-button v-show="$route.params.status === '3' || $route.params.status === '2'" type="danger" plain round @click="overseeCancel">撤销督办</el-button>
        </div>
      </div>
    </el-card>
    <el-dialog title="责任部门" :visible.sync="dialogTableVisible">
        <template>
            <div class="app-container" style="height:600px;overflow:auto">
                <el-tree  highlight-current show-checkbox :props="defaultProps" ref="treeDepartment" node-key="id" :default-checked-keys="departmentArr"
                    lazy :load="loadAllDepartment">
                </el-tree>
                <el-button type="primary" round @click="submitTree">确认</el-button>
            </div>
        </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getProgramDetail } from "@/api/programList/programList"
import { postOverseeAdd, getOverseeDetail, postOverseeCancel } from "@/api/oversee/oversee"
import { MessageBox } from "element-ui"
import { getOrgFirst, getOrgTree } from "@/api/addressBook"
@Component
export default class OverseeCheck extends Vue {
    private programOversee = "";
    private deptnamesData = "";
    private person = ""
    private programList= {
        title: "",
        time: ""
    }

    private dialogTableVisible = false

    private defaultProps={
        children: "children",
        label: "label",
        isLeaf: "isLeaf"
    }

    private departmentArr= []
    protected mounted() {
        this.load()
    }

    private load() {
        const programList = getProgramDetail({ id: this.$route.params.programId }) // 获取节目列表--主要是为了拿取节目时间
        const programOversee = getOverseeDetail({ id: this.$route.params.id }) // 督办详情
        Promise.all([programList, programOversee]).then((res) => {
            this.programList.title = res[0].data.title
            this.programList.time = res[0].data.liveEntity.startTime
            this.programOversee = res[1].data.content
            this.person = res[1].data.deptnames
        }).catch(() => {
            MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        })

        // // 获取节目列表--主要是为了拿取节目时间
        // getProgramDetail({ id: this.$route.params.programId }).then((res) => {
        //     if (res) {
        //         if (res.code < 200) {
        //             this.programList.title = res.data.title
        //             this.programList.time = res.data.liveEntity.startTime
        //         } else {
        //             MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        //         }
        //     }
        // })

        // // 督办详情
        // getOverseeDetail({ id: this.$route.params.id }).then((res) => {
        //     if (res) {
        //         if (res.code < 200) {
        //             this.programOversee = res.data.content
        //             this.person = res.data.deptnames
        //         } else {
        //             MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        //         }
        //     }
        // })
    }

    // 提交
    private submit() {
        console.log(this.deptnamesData)
        const params = {
            id: this.$route.params.id, // ID
            content: this.programOversee, // 内容
            deptnamesData: this.deptnamesData // String-督办部门 格式：[{"deptCode":"201000000","deptName":"信息系统部"},{"deptCode":"202000000","deptName":"网络部"}]
        }
        postOverseeAdd(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    MessageBox.alert(res.message, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 撤销
    private overseeCancel() {
        postOverseeCancel({ id: this.$route.params.id }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    MessageBox.alert(res.message, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    // 部门获取
    private loadAllDepartment(node: any, resolve: (arg0: {}[]) => any) {
        if (node.level === 0) {
            const params = {
                moaFlag: "1"
            }
            getOrgFirst(params).then(res => {
                if (res.code === 0) {
                    const leaderList = res.data.childOrgList
                    const brr = [] // 组装部门数据
                    for (let i = 0; i < leaderList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false // 是否有下级
                        obj.disabled = false // 是否可以选择
                        obj.id = leaderList[i].orgCode
                        obj.label = leaderList[i].orgName
                        obj.level = leaderList[i].level
                        brr.push(obj)
                    }
                    return resolve(brr)
                }
            })
        } else if (node.level === 1) {
            if (node.data.level === 1) {
                node.data.disabled = false
                node.loading = false
                node.isLeaf = true
            } else {
                const params = {
                    orgCode: node.data.id
                }
                getOrgTree(params).then(res => {
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = false
                        obj.id = childList[i].orgCode
                        obj.label = childList[i].orgName
                        obj.extendProperty = childList[i].extendProperty
                        obj.level = childList[i].level
                        arr.push(obj)
                    }
                    return resolve(arr)
                })
            }
        } else if (node.level === 2) {
            if (node.data.extendProperty.hasChildOrg === 1) {
                const params = {
                    orgCode: node.data.id
                }
                getOrgTree(params).then(res => {
                    const childList = res.data.childList
                    const arr = []
                    for (let i = 0; i < childList.length; i++) {
                        const obj: any = {}
                        obj.isLeaf = false
                        obj.disabled = false
                        obj.id = childList[i].orgCode
                        obj.label = childList[i].orgName
                        obj.extendProperty = childList[i].extendProperty
                        obj.level = childList[i].level
                        arr.push(obj)
                    }
                    return resolve(arr)
                })
            } else {
                node.data.disabled = false
                node.loading = false
                node.isLeaf = true
            }
        } else if (node.level === 3) {
            node.data.disabled = false
            node.loading = false
            node.isLeaf = true
        }
    }

    private dataList: any = []
    private submitTree() {
        // @ts-ignore
        this.dataList = this.$refs.treeDepartment.getCheckedNodes()
        const arr = []
        for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].extendProperty) {
                const obj: any = {}
                obj.deptCode = this.dataList[i].id.toString()
                obj.deptName = this.dataList[i].label.toString()
                arr.push(JSON.stringify(obj))
            }
        }
        this.deptnamesData = "[" + arr.toString() + "]"
    }
}
</script>
