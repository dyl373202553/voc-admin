<template>
    <div class="app-container">
        <el-upload
            class="upload-image"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            list-type="picture">
            <el-button size="small" type="primary" plain>点击上传</el-button>
            <span class="dgrey" slot="tip" style="margin-left:20px;">请上传小于150M的文件，支持格式png/jpg/mp4/wma</span>
        </el-upload>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class Image extends Vue {
    private fileList = [{ name: "food2.jpeg", url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600835517648&di=66a169c2743457deb998e954546616a0&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F49%2F55%2F635acaccbda9696.jpg" }]

    private handlePreview(file: any) {
        console.log(file)
    }

    private handleRemove(file: any, fileList: any) {
        console.log(file, fileList)
    }
}
</script>
