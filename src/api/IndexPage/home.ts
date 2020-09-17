import { getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc, dict } = ConfigModule

export const getHomeProgramList = ({ pageNum, pageSize }: { pageNum: string; pageSize: string }) => {
    return getData(`${voc}/khzsProgram/validData`, { pageNum, pageSize })
}

export const getDict = ({ pageNum, pageSize, description }: { pageNum: string; pageSize: string; description: string }) => {
    return getData(`${dict}`, { pageNum, pageSize, description })
}
