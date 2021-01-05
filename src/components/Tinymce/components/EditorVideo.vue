<template>
  <div class="upload-container">
    <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary" @click=" dialogVisible=true">
      上传视频
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
       <el-upload
        :limit="1"
        :file-list="fileListCover"
        :show-file-list="true"
        :on-success="handleSuccessCover"
        :on-remove="handleRemoveCover"
        :headers = headerUpload
        accept=".jpg,.png,.jpeg"
        class="editor-slide-upload video-upload"
        action="/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsSpecialAttention&isystemName=2"
        list-type="picture-card"
      >
        <div class="cover-border" v-show="coverShow">
            <el-button size="small" type="primary">
              上传封面
            </el-button>
        </div>
      </el-upload>

      <el-upload
        v-show="!coverShow"
        :limit="1"
        accept=".mp4,.wma"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :headers = headerUpload
        class="editor-slide-upload video-upload"
        action="/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsSpecialAttention&isystemName=2"
        list-type="text"
      >
        <el-button size="small" type="primary" v-show="!coverShow && videShow">
          上传视频
        </el-button>
      </el-upload>
      <el-button @click="dialogVisible = false">
        取消
      </el-button>
      <el-button type="primary" @click="handleSubmit" v-show="!videShow">
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
            coverShow: true,
            videShow: true,
            coverUrl:"/resources/moa-customervoice/khzsSpecialAttention/default.png",
            fileList: [],
            fileListCover: [],
            headerUpload: {
                Authorization: `Bearer ${UserModule.token}`
            }
        }
    },
    methods: {
        checkAllSuccess() {
            return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
        },
        handleSubmit() {
            const arr = Object.keys(this.listObj).map(v => this.listObj[v])
            if (!this.checkAllSuccess()) {
                this.$message('请等待所有的文件上传完毕，如果网络有问题请再次刷新!')
                return
            }
            this.$emit('successCBK', arr)
            this.listObj = {}
            this.fileList = []
            this.fileListCover = []
            this.dialogVisible = false
            this.coverShow = true
            this.videShow = true
        },
        // 上传视频
        handleSuccess(response, file) {
            const uid = file.uid
            const objKeyArr = Object.keys(this.listObj)
            this.videShow = false
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].url = `/resources/` + response.data.filePath
                    this.listObj[objKeyArr[i]].cover = `/resources/` + this.coverUrl
                    this.listObj[objKeyArr[i]].hasSuccess = true
                    return
                }
            }
        },
        handleRemove(file) {
            this.videShow = true
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
            console.log(this.coverUrl)
            return new Promise((resolve, reject) => {
                // const img = new Image() 
                // img.src = _URL.createObjectURL(file)
                // img.onload = function() {
                    _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, cover: this.coverUrl }
                // }
                resolve(true)
            })
          },
          // 上传封面
          handleSuccessCover(response, file) {
              this.coverUrl = response.data.filePath
              this.coverShow = false
              console.log(this.coverUrl)
          },
          handleRemoveCover(file) {
              this.coverShow = true
              this.coverUrl = "/resources/moa-customervoice/khzsSpecialAttention/default.png"
              this.listObj = {}
              this.fileList = []
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
