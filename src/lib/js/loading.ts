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
    setTimeout(function () { // 设定定时器，超时5S后自动关闭遮罩层，避免请求失败时，遮罩层一直存在的问题
        loading.close() // 关闭遮罩层
    }, 50000)
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
