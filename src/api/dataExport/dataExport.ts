import { getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

// 数据导出

// 数据导出--列表
export const getDataExportList = (
    { pageNum, pageSize, startTime, endTime, dept2Code, dept3Code }: {
        pageNum: number;
        pageSize: number;
        startTime?: string; // 非必填
        endTime?: string; // 非必填
        dept2Code?: string; // 节目发布二级部门 非必填
        dept3Code?: string; // 节目发布三级部门 非必填
    }
) => { return getData(`${voc}/khzsProgram/dataExportData`, { pageNum, pageSize, startTime, endTime, dept2Code, dept3Code }) }

// 回复、点赞数据导出
export const postLikeReplyExport = (
    { id, type }: {
        id: string;
        type: string; // 1：评论数据，2：点赞数据
    }
) => { return getData(`${voc}/khzsProgram/exportProgramData`, { id, type }) }

// 全量数据导出
export const postExportAll = (
    { ids }: {
        ids: string; // 节目ID，多个以','相隔 非必填
    }
) => { return getData(`${voc}/khzsProgram/exportAll`, { ids }) }
