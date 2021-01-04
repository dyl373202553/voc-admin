<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传视频
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :headers = headerUpload
        class="editor-slide-upload"
        action="/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsSpecialAttention&isystemName=2"
        list-type="picture-card"
      >
        <el-button size="small" type="primary">
          上传视频
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit">
        确认
      </el-button>
    </el-dialog>
  </div>
</template>

<script>
import { UserModule } from "@/store/module/user"
export default {
    name: 'EditorSlideUploadEditorVideo',
    props: {
        color: {
            type: String,
            default: '#1890ff'
        }
    },
    data() {
        return {
            dialogVisible: false,
            listObj: {},
            fileList: [],
            headerUpload: {
                Authorization: `Bearer ${UserModule.token}`
            }
        }
    },
    methods: {
        checkAllSuccess() {
            console.log(this.listObj)
            return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
        },
        handleSubmit() {
            const arr = Object.keys(this.listObj).map(v => this.listObj[v])
            console.log(arr)
            console.log(this.checkAllSuccess())
            if (!this.checkAllSuccess()) {
                this.$message('请等待所有的文件上传完毕，如果网络有问题请再次刷新!')
                return
            }
            this.$emit('successCBK', arr)
            this.listObj = {}
            this.fileList = []
            this.dialogVisible = false
        },
        handleSuccess(response, file) {
            const uid = file.uid
            console.log(this.listObj)
            const objKeyArr = Object.keys(this.listObj)
            console.log(response)
            console.log(file)
            console.log(objKeyArr)
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                console.log(objKeyArr[i])
                console.log(this.listObj[objKeyArr[i]].uid)
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].url = `/resources/` + response.data.filePath
                    this.listObj[objKeyArr[i]].hasSuccess = true
                    return
                }
                console.log(this.listObj)
            }
        },
        handleRemove(file) {
            const uid = file.uid
            const objKeyArr = Object.keys(this.listObj)
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    delete this.listObj[objKeyArr[i]]
                    return
                }
            }
        },
        beforeUpload(file) {
            const _self = this
            const _URL = window.URL || window.webkitURL
            const fileName = file.uid
            this.listObj[fileName] = {}
            return new Promise((resolve, reject) => {
                const img = new Image() 
                console.log(img)
                img.src = _URL.createObjectURL(file)
                // img.onload = function() {
                    _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
                // }
                resolve(true)
            })
          }
      }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
  }
}
</style>
