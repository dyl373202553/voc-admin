import { postData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

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
