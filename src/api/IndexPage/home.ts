import { getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

// export const getHomeProgramList = ({ pageNum, pageSize }: { pageNum: string; pageSize: string }) => {
//     return getData(`${voc}/khzsProgram/validData`, { pageNum, pageSize })
// }

// export const getDict = ({ pageNum, pageSize, description }: { pageNum: string; pageSize: string; description: string }) => {
//     return getData(`${dict}`, { pageNum, pageSize, description })
// }

// 近期节目数据获取
export const getRecentProgram = (
    { pageNum, pageSize }: {
        pageNum: string;
        pageSize: string;
    }
) => { return getData(`${voc}/khzsProgram/validData`, { pageNum, pageSize }) }

// 排行榜数据获取
// export const getRankList = () => { return getData(`${voc}/khzsRankingList/all`) }
// 特别关注数据获取
