import dayjs from "dayjs"
import { UserModule } from "@/store/module/user"
// import { getFileId } from "@/api/programList/programList"
// import { MessageBox } from "element-ui"
export function deepCopy(templateData: object, type = -1, field = "") {
    const data = JSON.parse(JSON.stringify(templateData))
    switch (type) {
        case 0:
            data.shift()
            break
        case 1:
            data.pop()
            break
        case 2:
            data.pop()
            data.shift()
            break
        case 3:
            data.splice(data.indexOf(field), 1)
            break
    }
    return data
}

export function getSlotData(value: Array<any>, type = -1, ...field: Array<string>) {
    let data = value.reduce((pre: Array<string>, item: any) => {
        if (item.slot) pre.push(item.slot)
        return pre
    }, [])

    if (~type) {
        for (const i in field) {
            data = deepCopy(data, type, field[i])
        }
    }

    return data
}

export function getImg(value: string) {
    if (process.env.NODE_ENV === "development") {
        return `/headPortrait/resources/bluepage/a/${value}_A.jpg`
    } else {
        return `http://211.136.25.148:6080/resources/bluepage/a/${value}_A.jpg`
    }
}

export function day(value: any, format = "YYYY-MM-DD") {
    return dayjs(value).format(format)
}

export function getFileIcon(value: string) {
    if (process.env.NODE_ENV === "development") {
        return `/headPortrait/resources/${value}`
    } else {
        return `http://172.30.200.237/resources/${value}`
    }
}

// 导出表格
export const handleDownloadFile = (blob: Blob, fileName: string) => {
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, fileName)
    } else {
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.setAttribute("download", fileName)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    }
}

// 下载文件
export const handleDownload = (fildIds: any) => {
    const access_token: any = UserModule.token
    const link = document.createElement("a")
    link.setAttribute("download", "附件")
    link.href = `/vue-potal/portal-file/api/file/provider/download?fileId=${fildIds}&access_token=${access_token}`
    const oh = document.body
    oh.appendChild(link).click()
}

// // 获取fileids详情
// let fileIdsName = ""
// export const getFileName = (fildIds: any) => {
//     if (fildIds) {
//         const params = {
//             fileId: fildIds
//         }
//         getFileId(params).then((res) => {
//             if (res) {
//                 if (res.code === 0) {
//                     const arr = []
//                     for (let i = 0; i < res.data.length; i++) {
//                         arr.push(res.data[i].fileName)
//                     }
//                     fileIdsName = arr.toString()
//                     console.log(fileIdsName)
//                 } else {
//                     MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
//                 }
//             }
//         })
//     }
//     console.log(fileIdsName)
// }
