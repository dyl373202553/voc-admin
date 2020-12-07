import axios from "axios"
import { UserModule } from "@/store/module/user"
import { ConfigModule } from "@/store/module/config"
import { MessageBox } from "element-ui"
import { showLoading, hideLoading } from "@/lib/js/loading"
// import { day, handleDownloadFile } from "@/lib/js/unitls"

let needLoadingRequestCount = 0

// const endLoading = () => {
//     // (Spin as any).hide()
// }

const showFullScreenLoading = () => {
    if (needLoadingRequestCount === 0) {
        showLoading()
    }
    needLoadingRequestCount++
}

const tryHideFullScreenLoading = () => {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        hideLoading()
    }
}

const instance = axios.create({
    timeout: 13 * 1000,
    baseURL: ConfigModule.baseUrl,
    headers: {
        "Content-Type": "application/json;charset=utf8"
    }
})

instance.interceptors.request.use(
    async config => {
        let access_token: string | undefined = ""
        if (config.url !== "uaa/oauth/token") access_token = await UserModule.token
        return new Promise(resolve => {
            config.headers.Authorization = `Basic d2ViX2FwcDo=`
            if (config.method === "post") {
                if (config.url !== "uaa/oauth/token") {
                    config.headers.Authorization = `Bearer ${access_token}`
                }
            } else if (config.method === "get") {
                if (config.url !== "uaa/oauth/token") {
                    config.headers.Authorization = `Bearer ${access_token}`
                }
            }

            showFullScreenLoading()
            resolve(config)
        })
    },
    error => {
        Promise.reject(error)
    }
)

instance.interceptors.response.use(
    async response => {
        tryHideFullScreenLoading()
        await UserModule.monitor()
        return response
    },
    async error => {
        // if (error.response.status === 401) {
        //     MessageBox.alert("请重新登录", "会话超时", {
        //         confirmButtonText: "好的",
        //         callback: () => {
        //             window.location.href = "http://4aportal.bmcc.com.cn/"
        //         }
        //     })
        // }
        switch (error.response.status) {
            case 400:
                MessageBox.alert(error, "错误请求", { type: "error" })
                break
            case 401:
                MessageBox.alert("请重新登录", "会话超时", {
                    confirmButtonText: "好的",
                    callback: () => {
                        window.location.href = "http://4aportal.bmcc.com.cn/"
                    }
                })
                break
            case 403:
                MessageBox.alert(error, "拒接访问", { type: "error" })
                break
            case 404:
                MessageBox.alert(error, "请求错误，未找到该资源", { type: "error" })
                break
            case 405:
                MessageBox.alert(error, "请求方法未允许", { type: "error" })
                break
            case 408:
                MessageBox.alert(error, "请求超时", { type: "error" })
                break
            case 500:
                MessageBox.alert(error, "服务器端出错", { type: "error" })
                break
            case 501:
                MessageBox.alert(error, "网络未实现", { type: "error" })
                break
            case 502:
                MessageBox.alert(error, "网络错误", { type: "error" })
                break
            case 503:
                MessageBox.alert(error, "服务不可用", { type: "error" })
                break
            case 504:
                MessageBox.alert(error, "网络超时", { type: "error" })
                break
            case 505:
                MessageBox.alert(error, "http版本不支持该请求", { type: "error" })
                break
            default:
                MessageBox.alert(error, `连接错误${error.response.status}`, { type: "error" })
        }
        tryHideFullScreenLoading()
        return Promise.reject(error)
    }
)

export function formateURLOnlyGet(link: string, json: object) {
    let url = link
    const data = Object.entries(json)

    if (data.length) {
        url += url.indexOf("?") === -1 ? "?" : ""
        url += Object.entries(data)
            .map(item => {
                return item[1].join("=")
            })
            .join("&")
    }
    return url
}

const formData = {
    transformRequest: [(data: any) => {
        let ret = ""
        for (const it in data) {
            ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&"
        }
        return ret
    }],
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    }
}

const formDataFilds = {
    transformRequest: [(data: any) => {
        const ret = JSON.stringify(data)
        return ret
    }],
    headers: {
        "Content-Type": "application/json;charset=UTF-8"
    }
}

/**
 * GET请求方法
 * @param {String} url 请求地址
 * @param {json} json 请求参数
 */
export function getDataUrl(url: string) {
    return instance
        .get(url)
        .then(res => res.data)
        .catch(error => error.response)
}

export function getData(url: string, json: object) {
    return instance
        .get(formateURLOnlyGet(url, json))
        .then(res => res.data)
        .catch(error => error.response)
}

export function postData(url: string, json?: any, isformData = true) {
    return instance
        .post(url, json, isformData ? formData : {})
        .then(res => res.data)
        .catch(error => error.response)
}

export function postDataFile(url: string, json?: any, isformData = true) {
    return instance
        .post(url, json, isformData ? formDataFilds : {})
        .then(res => res.data)
        .catch(error => error.response)
}
