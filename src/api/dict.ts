import { getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { dictValue, voc } = ConfigModule

// export const getdictValue = (type: string) => {
//     return getData(`${dict}`, { type })
// }

// 字典类型
export const getDictValue = (type: string) => {
    return getData(`${dictValue}`, { type })
}

// 发布节目-获取类型
export const getProgramKind = (
    { type }: {
        type: string; // 常规类:1、回顾类:2
    }
) => { return getData(`${dictValue}`, { type }) }

// 发布节目-类型-获取节目名称
export const getProgramName = (
    { type }: {
        type: string; // 常规类:1、回顾类:2
    }
) => { return getData(`${voc}/khzsProgram/getProgramNameByType`, { type }) }
