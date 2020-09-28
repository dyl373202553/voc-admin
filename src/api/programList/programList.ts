import { postData, getData, getDataUrl } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

/* 节目列表 */
// 节目列表 - 近期节目数据获取（同首页）
export const getRecentProgram = (
    { pageNum, pageSize }: {
        pageNum: number;
        pageSize: number;
    }
) => { return getData(`${voc}/khzsProgram/validData`, { pageNum, pageSize }) }

// 节目列表 - 详情前(验证节目有效性)
export const getEffectiveness = (
    { id }: {
        id: string;
    }
) => { return getData(`${voc}/khzsProgram/checkProgramValid`, { id }) }

/* 创建直播间 */
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

/* 发布节目 */
// 获取所属直播间数据--节目时间
export const getStudioList = () => { return getDataUrl(`${voc}/khzsProgram/getOwnerLiveList`) }
// 节目类型

// 发布节目--编辑之后(提交)
export const postProgramRelease = (
    { liveId, type, title, summary, content, fileIds, id }: {
        liveId: string; // 直播间ID
        type: string;
        title: string; // 节目名称
        summary: string; // 节目简介
        content: string; // 节目内容
        fileIds: string; // 附件id
        id: string; // 修改时传递ID，新增不传
    }
) => { return postData(`${voc}/khzsProgram/save`, { liveId, type, title, summary, content, fileIds, id }) }

/* 节目管理 */
// 节目管理
export const getProgramList = (
    { pageNum, pageSize, queryParam }: {
        pageNum: number;
        pageSize: number;
        queryParam: string;
    }
) => { return getData(`${voc}/khzsProgram/data`, { pageNum, pageSize, queryParam }) }

// 节目详情--编辑（进入详情）--（节目管理+节目列表）
export const getProgramDetail = (
    { id }: {
        id: string;
    }
) => { return getData(`${voc}/khzsProgram/get`, { id }) }

// 节目管理-删除
export const getProgramDelete = (
    { id }: {
        id: string;
    }
) => { return postData(`${voc}/khzsProgram/delete`, { id }) }

// 节目管理-发布小结+管理小结
export const postProgramSummary = (
    { programId, content, deptnames, fileIds, id }: {
        programId: string; // 节目ID
        content: string; // 小结内容
        deptnames: string; // 参与部门，多个以‘;’想个，只做显示
        fileIds: string; // 附件id
        id: string; // 修改时传递ID，新增不传
    }
) => { return postData(`${voc}/khzsSummary/save`, { programId, content, deptnames, fileIds, id }) }
