<template lang="html">
    <div class="wang">
        <div class="editor">
            <div ref="toolbar" class="toolbar" />
            <div ref="editor" class="text" />
            <div class="editor-upload">
                <el-upload
                    class="dupload"
                    ref="upload"
                    accept=".mp4,.wma"
                    :auto-upload="true"
                    :show-file-list ="false"
                    :on-exceed="handleExceed"
                    :action="''"
                    :limit="1"
                    :http-request="uploadRequest"
                    >
                    <el-button size="small" type="primary" plain>上传视频</el-button>
                </el-upload>
            </div>
        </div>
        <el-dialog
            custom-class="info-dialog"
            title="提示"
            :visible.sync="centerDialogVisible"
            width="25%"
            :center="true"
            >
            <div style="text-align:center;">
                <el-progress :stroke-width="9" type="circle"  :color="customColors" :percentage="progressPercent" :status="progressStatus"></el-progress>
            </div>
            <span slot="footer" class="dialog-footer">
                <span v-if="progressStatus=== null">视频上传中，请稍等......</span>
                <span v-if="progressStatus==='exception' || progressStatus==='warning'">上传视频失败，请联系管理员</span>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import E from "./wangEditor.js"
import Cookies from "js-cookie"
import axios from "axios"
export default {
    name: "Editoritem",
    model: {
        prop: "value",
        event: "change"
    },
    props: {
        value: {
            type: String,
            default: ""
        },
        isClear: {
            type: Boolean,
            default: false
        },
        logoUrl: {
            type: String,
            default: ""
        }
    },
    data() {
        return {
        // uploadPath,
            editor: null,
            info_: null,
            centerDialogVisible: false,
            progressPercent: 0,
            progressStatus: null,
            customColors: [
                { color: "#f56c6c", percentage: 20 },
                { color: "#e6a23c", percentage: 40 },
                { color: "#5cb87a", percentage: 60 },
                { color: "#1989fa", percentage: 80 },
                { color: "#6f7ad3", percentage: 100 }
            ]
        }
    },
    watch: {
        isClear(val) {
        // 触发清除文本域内容
            if (val) {
                this.editor.txt.clear()
                this.info_ = null
            }
        },
        value: function (value) {
            if (value !== this.editor.txt.html()) {
                this.editor.txt.html(this.value)
            } else {
                this.editor.txt.html(this.value)
            }
            // console.log(value)
        }
        // value为编辑框输入的内容，这里我监听了一下值，当父组件调用得时候，如果给value赋值了，子组件将会显示父组件赋给的值
    },
    mounted() {
        this.seteditor()
        this.editor.txt.html(this.value)
    },
    methods: {
        seteditor() {
            this.editor = new E(this.$refs.toolbar, this.$refs.editor)
            // 上传图片-配置
            // this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
            // this.editor.customConfig.uploadFileName = "file" // 后端接受上传文件的参数名
            // this.editor.customConfig.uploadImgMaxSize = 2 * 1024 * 1024 // 将图片大小限制为 2M
            // this.editor.customConfig.uploadImgMaxLength = 6 // 限制一次最多上传 3 张图片
            // this.editor.customConfig.uploadImgTimeout = 3 * 60 * 1000 // 设置超时时间
            this.editor.customConfig.customUploadImg = function (resultFiles, insertImgFn) {
                // resultFiles 是 input 中选中的文件列表
                // insertImgFn 是获取图片 url 后，插入到编辑器的方法

                // 上传图片，返回结果，将图片插入到编辑器中
                // insertImgFn(imgUrl)

                // 上传图片
                const formData = new FormData()
                formData.append("file", resultFiles[0]) // 传参改为formData格式
                axios({
                    method: "post",
                    url: `/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsProgram&isystemName=1`, // 请求后端的url
                    headers: {
                        // "Content-Type": "multipart/form-data", // 设置headers
                        Authorization: `Bearer ${Cookies.get("kmportaltoken")}`
                    },
                    data: formData
                })
                    .then((res) => {
                        if (res) {
                            if (res.data.code < 200) {
                                // 上传成功
                                const imgUrl = res.data.data.filePath
                                insertImgFn(`/resources/` + imgUrl)
                            }
                        } else {
                            // 上传失败
                        }
                    })
                    .catch(() => {
                        // 请求失败
                    })
            }

            // 上传视频-配置
            this.editor.customConfig.customUploadVideo = function (resultFiles, insertImgFn) {
                // resultFiles 是 input 中选中的文件列表
                // insertImgFn 是获取图片 url 后，插入到编辑器的方法

                // 上传图片，返回结果，将图片插入到编辑器中
                // insertImgFn(imgUrl)

                // 上传图片
                const formData = new FormData()
                formData.append("file", resultFiles[0]) // 传参改为formData格式
                axios({
                    method: "post",
                    url: `/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsProgram&isystemName=1`, // 请求后端的url
                    headers: {
                        // "Content-Type": "multipart/form-data", // 设置headers
                        Authorization: `Bearer ${Cookies.get("kmportaltoken")}`
                    },
                    data: formData
                })
                    .then((res) => {
                        if (res) {
                            if (res.data.code < 200) {
                                // 上传成功
                                const imgUrl = res.data.data.filePath
                                insertImgFn(`/resources/` + imgUrl)
                            }
                        } else {
                            // 上传失败
                        }
                    })
                    .catch(() => {
                        // 请求失败
                    })
            }
            // 配置菜单
            this.editor.customConfig.menus = [
                "head", // 标题
                "bold", // 粗体
                "fontSize", // 字号
                "fontName", // 字体
                "italic", // 斜体
                "underline", // 下划线
                "strikeThrough", // 删除线
                "foreColor", // 文字颜色
                "backColor", // 背景颜色
                "link", // 插入链接
                "list", // 列表
                "justify", // 对齐方式
                "quote", // 引用
                "emoticon", // 表情
                "image", // 插入图片
                "table", // 表格
                "code", // 插入代码
                "undo", // 撤销
                "redo", // 重复
                "fullscreen" // 全屏
            ]
            this.editor.customConfig.onchange = (html) => {
                this.info_ = html // 绑定当前逐渐地值
                this.$emit("change", this.info_) // 将内容同步到父组件中
            }
            // 创建富文本编辑器
            this.editor.create()
        },
        // 文件超出限制控制
        handleExceed() {
            this.$message.warning("只能上传一个文件")
        },
        uploadRequest(option) {
            const isLt = option.file.size / 1024 / 1024 <= 150
            if (!isLt) {
                option.onError()
                this.$message.error("上传附件大小不能超过 150M! 请重新选择")
                return false
            } else if (isLt) {
                this.centerDialogVisible = true
                const formData = new FormData()
                formData.append("file", option.file) // 传参改为formData格式
                axios({
                    method: "post",
                    url: `/vue-potal/portal-file/api/file/provider/resourcesUploadfile?busSource=moa-customervoice&filePath=khzsProgram&isystemName=1`, // 请求后端的url
                    headers: {
                        "Content-Type": "multipart/form-data", // 设置headers
                        Authorization: `Bearer ${Cookies.get("kmportaltoken")}`
                    },
                    data: formData,
                    onUploadProgress: (progressEvent) => {
                        this.progressPercent = parseInt((progressEvent.loaded / progressEvent.total * 100))
                    }
                })
                    .then((res) => {
                        if (res) {
                            if (res.data.code < 200) {
                                // 上传成功
                                this.centerDialogVisible = false
                                const paramd = "<video src='/resources/" + res.data.data.filePath + "'controls='true' poster='/resources/moa-customervoice/khzsSpecialAttention/20201207200030685-46F5D4D1.20201102145742059-EF4BF50B.封面.png'  style='max-width:100%' ></video>"
                                this.editor.txt.append(paramd)
                                this.progressStatus = "success"
                            }
                        } else {
                            // 上传失败
                            this.progressStatus = "exception"
                        }
                    })
                    .catch(() => {
                        // 请求失败
                        this.progressStatus = "warning"
                    })
            }
        }
    }
}
</script>

<style lang="css">
    .editor-upload {
        position: absolute;
        right: 10px;
        top: 5px;
    }
  .editor {
    width: 100%;
    margin: 0 auto;
    position: relative;
    z-index: 0;
  }
  .toolbar {
    border: 1px solid #ccc;
  }
  .text {
    border: 1px solid #ccc;
    min-height: 500px;
  }
</style>
