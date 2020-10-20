import axios from "axios"
import { UserModule } from "@/store/module/user"
import { ConfigModule } from "@/store/module/config"
import { MessageBox } from "element-ui"
// import { day, handleDownloadFile } from "@/lib/js/unitls"

let needLoadingRequestCount = 0
const startLoading = () => {
    // (Spin as any).show()
}

const endLoading = () => {
    // (Spin as any).hide()
}

const showFullScreenLoading = () => {
    if (needLoadingRequestCount === 0) {
        startLoading()
    }
    needLoadingRequestCount++
}

const tryHideFullScreenLoading = () => {
    if (needLoadingRequestCount <= 0) return
    needLoadingRequestCount--
    if (needLoadingRequestCount === 0) {
        endLoading()
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
        if (error.response.status === 401) {
            MessageBox.alert("请重新登录", "会话超时", {
                confirmButtonText: "好的",
                callback: () => {
                    window.location.href = "http://4aportal.bmcc.com.cn/"
                }
            })
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

// 导出数据
// export async function postExportLikeDetail(id: string, type: string, name: string) {
//     const access_token = await UserModule.token
//     axios({
//         method: "get",
//         url: `/vue-potal/moa-customervoice/api/modules/khzsProgram/exportProgramData?id=${id}&type=${type}`,
//         responseType: "blob", // arraybuffer
//         headers: {
//             // "Content-Type": "application/json;charset=UTF-8",
//             Authorization: `Bearer ${access_token}`
//         }
//     })
//         .then((res: any) => {
//             const dateName = day(new Date(), "YYYY-MM-DD")
//             const fileName = name + dateName + ".xls"
//             const blob = new Blob([res.data], { type: "application/vnd.ms-excel" })
//             handleDownloadFile(blob, fileName)
//         })
//         .catch(function (error) { // 请求失败处理
//             MessageBox.alert(error, "失败", { type: "error" })
//         })
// }

// export async function postExportAllData(ids: string) {
//     const access_token = await UserModule.token
//     axios({
//         method: "get",
//         url: `/vue-potal/moa-customervoice/api/modules/khzsProgram/exportAll?ids=${ids}`,
//         responseType: "blob", // arraybuffer
//         headers: {
//             // "Content-Type": "application/json;charset=UTF-8",
//             Authorization: `Bearer ${access_token}`
//         }
//     })
//         .then((res: any) => {
//             const dateName = day(new Date(), "YYYY-MM-DD")
//             const fileName = name + dateName + ".xls"
//             const blob = new Blob([res.data], { type: "application/vnd.ms-excel" })
//             handleDownloadFile(blob, fileName)
//         })
//         .catch(function (error) { // 请求失败处理
//             MessageBox.alert(error, "失败", { type: "error" })
//         })
// }
