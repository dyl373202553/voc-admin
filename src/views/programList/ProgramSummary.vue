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
            <p><span>节目名称：</span><span>客户之声第100期</span></p>
            <p><span>节目时间：</span><span>2019年3月12日 17:11-17:30</span></p>
          </div>
        </div>
        <div class="dsummary-mian">
          <div class="dsummary-title dimportant-title"><i class="dimportant">*</i>节目小结</div>
          <div>
            <el-input
              v-model="textarea"
              type="textarea"
              :rows="3"
              placeholder="请填写督办事项"
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
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                multiple
                :limit="3"
                :on-exceed="handleExceed"
                :file-list="fileList">
                <el-button size="small" type="primary" plain>附件上传</el-button>
                <span slot="tip"  class="dgrey" style="margin-left:20px;">请上传小于10M的文件，支持格式：doc/docx/ppt/pptx/xls/pdf/txt/png/jpg/zip/rar;</span>
            </el-upload>
        </div>
        </div>
        <div class="bottom dbtn">
          <el-button round>返回</el-button>
          <el-button type="primary" round :disabled="!textarea">提交</el-button>
          <el-button v-show="$route.params.summaryName !=='发布小结'" type="danger" plain round>删除</el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class ProgramSummary extends Vue {
    private textarea = "";
    private input= "";
}
</script>
