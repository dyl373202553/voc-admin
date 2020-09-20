import { postData, getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

export const postCreateStudio = (
    { startTime, endTime, logoUrl, speakersData, guests, superviseFlag, summaryFlag }: {
        startTime: string;
        endTime: string;
        logoUrl: string;
        speakersData: string; // 节目主讲人
        guests: string; // 本期嘉宾
        superviseFlag: string; // 是否发布督办举措
        summaryFlag: string; // 是否发布节目小结
    }
) => { return postData(`${voc}/khzsLive/save`, { startTime, endTime, logoUrl, speakersData, guests, superviseFlag, summaryFlag }) }

export const getCreateStudio = (
    { pageNum, pageSize }: {
        pageNum: string;
        pageSize: string;
    }
) => { return getData(`${voc}/khzsProgram/data`, { pageNum, pageSize }) }
