import { postData, getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

// 创建直播间
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

// 发布节目
export const postProgramRelease = (
    { liveId, type, title, summary, content, fileIds }: {
        liveId: string; // 直播间ID
        type: string; // 1？固定的？
        title: string; // 节目名称
        summary: string; // 节目简介
        content: string; // 节目内容
        fileIds: string; // 附件id
    }
) => { return postData(`${voc}/khzsProgram/save`, { liveId, type, title, summary, content, fileIds }) }

// 节目列表
export const getProgramList = (
    { pageNum, pageSize }: {
        pageNum: number;
        pageSize: number;
    }
) => { return getData(`${voc}/khzsProgram/data`, { pageNum, pageSize }) }
