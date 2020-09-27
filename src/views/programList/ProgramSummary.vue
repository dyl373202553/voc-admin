<template>
  <div class="app-container">
    <el-card class="box-card dpadding0">
      <div slot="header" class="clearfix">
        <span class="header-title">{{ $route.params.summaryName }}</span>
      </div>
      <div class="dsummary">
        <div class="dsummary-mian">
          <div class="dsummary-title">节目信息</div>
          <div>
            <p><span>节目名称：</span><span>{{this.programTitle}}</span></p>
            <p><span>节目时间：</span><span>{{this.programTime}}</span></p>
          </div>
        </div>
        <div class="dsummary-mian">
          <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>节目小结</div>
          <div>
            <el-input
              v-model="summaryContent"
              type="textarea"
              :rows="3"
              placeholder="请填写节目小结"
            />
          </div>
        </div>
        <div class="dsummary-mian">
          <div class="dsummary-title">参与部门</div>
          <div>
            <el-input v-model="input" placeholder="请选择参与部门" suffix-icon="el-icon-s-home" />
          </div>
        </div>
        <div class="dsummary-mian">
          <div class="dsummary-title">上传附件</div>
          <div>
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="3"
                >
                <el-button size="small" type="primary" plain>附件上传</el-button>
                <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于10M的文件，支持格式：doc/docx/ppt/pptx/xls/pdf/txt/png/jpg/zip/rar;</span>
            </el-upload>
        </div>
        </div>
        <div class="bottom dbtn">
          <el-button round>返回</el-button>
          <el-button type="primary" round :disabled="!summaryContent" @click="onSubmit">提交</el-button>
          <el-button v-show="$route.params.summaryName !=='发布小结'" type="danger" plain round>删除</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { postProgramSummary, getProgramDetail } from "@/api/programList/programList"
import { MessageBox } from "element-ui"
@Component
export default class ProgramSummary extends Vue {
    private summaryContent = "";
    private input= "";
    private programTitle= "";
    private programTime= "";
    private summaryId= "";

    protected mounted() {
        this.getSummaryDetail()
    }

    private getSummaryDetail() {
        getProgramDetail({ id: this.$route.params.id }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    this.programTitle = res.data.title
                    this.programTime = res.data.liveEntity.startTime + " -- " + res.data.liveEntity.endTime
                    if (res.data.summaryEntity) {
                        this.summaryContent = res.data.summaryEntity.content
                        this.summaryId = res.data.summaryEntity.id
                    }
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }

    private onSubmit() {
        const params = {
            programId: this.$route.params.id, // 节目ID
            content: this.summaryContent, // 小结内容
            deptnames: "信息;网络", // 参与部门，多个以‘;’想个，只做显示
            fileIds: "附件id12", // 附件id
            id: this.summaryId // 修改时传递ID，新增不传
        }
        postProgramSummary(params).then((res) => {
            if (res) {
                if (res.code < 200) {
                    MessageBox.alert(res.message, "成功", { type: "success" })
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }
}
</script>
