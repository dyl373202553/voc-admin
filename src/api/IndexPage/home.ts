import { getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

export const getHomeProgramList = ({ pageNum, pageSize }: { pageNum: string; pageSize: string }) => {
    return getData(`${voc}/khzsProgram/validData`, { pageNum, pageSize })
}
