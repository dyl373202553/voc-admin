import dayjs from "dayjs"
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
