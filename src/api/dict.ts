import { getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { dict, dictValue } = ConfigModule

// export const getdictValue = (type: string) => {
//     return getData(`${dict}`, { type })
// }

// 字典类型
export const getDictValue = (type: string) => {
    return getData(`${dictValue}`, { type })
}
