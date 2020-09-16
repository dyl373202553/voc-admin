import { getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { dict } = ConfigModule

export const dictValue = (type: string) => {
    return getData(`${dict}`, { type })
}
