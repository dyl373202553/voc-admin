import { Loading } from "element-ui"
import { ElLoadingComponent } from "element-ui/types/loading"

let loadingCount = 0
let loading: ElLoadingComponent

const startLoading = () => {
    loading = Loading.service({
        lock: true, // 是否锁屏
        text: "正在加载...", // 加载动画的文字
        spinner: "el-icon-loading", // 引入的loading图标
        background: "rgba(0, 0, 0, 0.3)", // 背景颜色
        target: ".sub-main", // 需要遮罩的区域
        body: true,
        customClass: "mask"
    })
}

const endLoading = () => {
    loading.close()
}

export const showLoading = () => {
    if (loadingCount === 0) {
        startLoading()
    }
    loadingCount += 1
}

export const hideLoading = () => {
    if (loadingCount <= 0) {
        return
    }
    loadingCount -= 1
    if (loadingCount === 0) {
        endLoading()
    }
}
