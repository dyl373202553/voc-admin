<template>
  <div class="upload-container">
    <svg t="1609833437859" @click=" dialogVisible=true" class="icon" viewBox="0 0 1056 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11552" width="20" height="20"><path d="M880.226263 1015.065859H176.019394C78.855758 1014.949495 0.116364 936.210101 0 839.046465V185.134545C0.064646 87.945051 78.829899 9.166869 176.019394 9.050505H880.226263c97.176566 0.116364 175.91596 78.855758 176.019394 176.019394v653.89899c-0.064646 97.202424-78.81697 175.980606-176.019394 176.09697zM176.019394 59.358384c-69.404444 0.116364-125.633939 56.371717-125.711515 125.776161v653.89899c0.077576 69.391515 56.32 125.608081 125.711515 125.646869H880.226263c69.378586-0.077576 125.595152-56.268283 125.711515-125.646869V185.134545c-0.116364-69.378586-56.332929-125.595152-125.711515-125.711515H176.019394v-0.064646z m0 0" fill="#4D4D4D" p-id="11553"></path><path d="M1005.937778 310.846061h-100.615758c-8.985859 0-17.286465-4.796768-21.785858-12.580202a25.112566 25.112566 0 0 1 0-25.147475c4.486465-7.783434 12.8-12.580202 21.785858-12.580202h100.615758c8.985859 0 17.299394 4.796768 21.785858 12.580202a25.112566 25.112566 0 0 1 0 25.147475c-4.486465 7.783434-12.8 12.580202-21.785858 12.580202z m0 301.795555h-100.615758c-9.283232 0.478384-18.075152-4.20202-22.85899-12.166464a25.160404 25.160404 0 0 1 22.85899-38.076768h100.615758c13.89899 0 25.225051 11.248485 25.22505 25.160404a25.225051 25.225051 0 0 1-7.408485 17.764848 25.116444 25.116444 0 0 1-17.816565 7.31798z m0-150.85899h-100.615758c-9.283232 0.478384-18.075152-4.20202-22.85899-12.166464a25.160404 25.160404 0 0 1 0-25.897374c4.783838-7.977374 13.575758-12.657778 22.85899-12.166465h100.615758c13.89899 0 25.225051 11.248485 25.22505 25.082829 0 6.684444-2.663434 13.097374-7.395555 17.816565a25.213414 25.213414 0 0 1-17.829495 7.330909z m0 301.795556h-100.615758c-13.911919 0-25.186263-11.274343-25.186262-25.186263s11.274343-25.186263 25.186262-25.186262h100.615758a25.18497 25.18497 0 1 1 0 50.372525z m-592.006465-25.160404c-34.624646 0-61.827879-30.913939-61.827879-70.503435v-311.725252c0-39.524848 26.88-70.438788 61.297778-70.438788 11.326061 0 22.703838 3.503838 33.09899 10.201212l238.506667 155.966061c19.393939 12.515556 30.978586 34.624646 30.978586 59.177373 0 25.354343-12.050101 48.265051-32.297374 61.362425L447.301818 728.229495a62.267475 62.267475 0 0 1-33.370505 10.188283z m-0.530101-402.411313c-5.223434 0-11.054545 8.274747-11.054545 20.130909V667.79798c0 12.114747 5.960404 20.260202 11.52 20.260202 2.094545-0.142222 4.111515-0.853333 5.831111-2.055758L656.08404 530.230303a23.027071 23.027071 0 0 0 9.541819-19.264646c0-7.343838-2.973737-13.705051-8.080808-17.01495L419.038384 338.049293a10.982141 10.982141 0 0 0-5.637172-2.042828z m0 0" fill="#4D4D4D" p-id="11554"></path></svg>
    <el-dialog :visible.sync="dialogVisible">
       <el-upload
        :limit="1"
        :file-list="fileListCover"
        :show-file-list="true"
        :on-success="handleSuccessCover"
        :on-remove="handleRemoveCover"
        :headers = headerUpload
        :on-change="changeImg"
        accept=".jpg,.png,.jpeg"
        class="editor-slide-upload video-upload"
        action="/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsSpecialAttention&isystemName=2"
        list-type="picture-card"
      >
        <div class="cover-border" v-show="coverShow">
            <img src="/resources/moa-customervoice/khzsSpecialAttention/default.png"/>
            <el-button size="small" type="primary" class="cover-btn">
              上传封面
            </el-button>
        </div>
      </el-upload>

      <el-upload
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
        <el-button size="small" type="primary" v-show="videShow">
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
            coverUrl:"moa-customervoice/khzsSpecialAttention/default.png",
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
              console.log(this.coverUrl)
          },
          handleRemoveCover(file) {
              this.coverShow = true
              this.coverUrl = "moa-customervoice/khzsSpecialAttention/default.png"
              this.listObj = {}
              this.fileList = []
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
</style>
