<template>
  <div class="upload-container">
    <svg t="1609833136005" @click=" dialogVisible=true" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2361" width="20" height="20"><path d="M973.609745 750.236863 853.432379 750.236863 853.432379 630.039569c0-26.709513-20.033381-46.743891-46.743891-46.743891s-46.743891 20.034377-46.743891 46.743891l0 126.87542L626.391052 756.914989c-26.709513 0-46.743891 20.033381-46.743891 46.743891s20.033381 46.743891 46.743891 46.743891l126.87542 0 0 126.855492c0 26.709513 20.033381 46.743891 46.743891 46.743891 26.709513 0 46.743891-20.034377 46.743891-46.743891L846.754254 850.40277 973.609745 850.40277c26.711506 0 46.743891-20.032384 46.743891-46.743891C1027.031761 776.949366 1000.322248 750.236863 973.609745 750.236863L973.609745 750.236863 973.609745 750.236863zM505.222231 871.609954 505.222231 871.609954 87.137882 871.609954c-15.500585 0-27.135989-11.634407-27.135989-27.175846l0-759.112174c0-15.511546 11.635403-27.145953 27.135989-27.145953l740.858431 0c15.47966 0 27.11606 11.635403 27.11606 27.145953l0 410.313131 0 0 0 0c0 15.500585 11.656329 27.136985 27.176843 27.136985 15.499589 0 27.135989-11.6364 27.135989-27.136985l0 0 0 0L909.425205 58.176977c0-31.031064-27.135989-58.178014-58.177017-58.178014L60.000897-0.001036C28.979797-0.001036 1.82388 27.145913 1.82388 58.176977l0 813.432977c0 31.001171 27.155918 58.157088 58.177017 58.157088l445.221334 0 0 0c15.499589 0 27.135989-11.656329 27.135989-27.155918C532.356226 883.224433 520.720823 871.609954 505.222231 871.609954L505.222231 871.609954 505.222231 871.609954zM499.513639 736.881608c20.033381-40.065765 66.777271-66.777271 113.521162-66.777271l53.42102 0 0-60.098149c0-53.422016 33.389632-100.165907 80.132526-120.198291l0 0 0 0-66.776275-200.319857-233.718457 300.485763-66.777271-106.843036L132.261565 736.881608 499.513639 736.881608 499.513639 736.881608 499.513639 736.881608zM379.316344 309.51046c0-40.054804-33.388636-73.444436-73.453404-73.444436s-73.454401 33.389632-73.454401 73.444436c0 40.066761 33.388636 73.454401 73.454401 73.454401S379.316344 349.577221 379.316344 309.51046L379.316344 309.51046 379.316344 309.51046z" p-id="2362" fill="#707070"></path></svg>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :limit="1"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :on-change="changeImg"
        :headers = headerUpload
        accept=".jpg,.png,.jpeg"
        class="editor-slide-upload video-upload"
        action="/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsSpecialAttention&isystemName=2"
        list-type="picture-card"
      >
        <div class="cover-border" v-show="coverShow">
            <el-button size="small" type="primary">
              上传图片
            </el-button>
        </div>
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
// import { getToken } from 'api/qiniu'
import { UserModule } from "@/store/module/user"
export default {
    name: 'EditorSlideUpload',
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
            fileList: [],
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
            this.dialogVisible = false
            this.coverShow = true
        },
        handleSuccess(response, file) {
            const uid = file.uid
            const objKeyArr = Object.keys(this.listObj)
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    this.listObj[objKeyArr[i]].cover = `/resources/` + response.data.filePath
                    this.listObj[objKeyArr[i]].hasSuccess = true
                    return
                }
            }
        },
        handleRemove(file) {
            this.coverShow = true
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
                const isLt150M = file.size / 1024 / 1024 <= 150;
                if (!isLt150M) {
                    this.$message.error('上传附件大小不能超过 150M!');
                    reject()
                }
                const img = new Image() 
                img.src = _URL.createObjectURL(file)
                img.onload = function() {
                    _self.listObj[fileName] = { hasSuccess: false, uid: file.uid, type:"img" }
                }
                resolve(true)
            })
          },
          changeImg(file) {
            this.coverShow = false
          }
      }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  ::v-deep .el-upload--picture-card {
    width: 100%;
    height: auto;
  }
}
.el-dialog {
  height: 100%;
}
</style>
