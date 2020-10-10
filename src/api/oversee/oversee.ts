import { getData, postData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

// 督办管理
// 督办管理列表
export const getOverseeList = (
    { pageNum, pageSize }: {
        pageNum: number;
        pageSize: number;
    }
) => { return getData(`${voc}/khzsSuperviseItem/data`, { pageNum, pageSize }) }

// 督办管理-详情
export const getOverseeDetail = (
    { id }: {
        id: string;
    }
) => { return getData(`${voc}/khzsSuperviseItem/get`, { id }) }

// 督办管理-督办事项-新增
export const postOverseeAdd = (
    { id, content, deptnamesData }: {
        id: string; // ID
        content: string; // 内容
        deptnamesData: string; // String-督办部门 格式：[{"deptCode":"201000000","deptName":"信息系统部"},{"deptCode":"202000000","deptName":"网络部"}]
    }
) => { return postData(`${voc}/khzsSuperviseItem/save`, { id, content, deptnamesData }) }

// 督办管理-督办事项-撤销
export const postOverseeCancel = (
    { id }: {
        id: string; // ID
    }
) => { return postData(`${voc}/khzsSuperviseItem/revokeSuperviseItem`, { id }) }

// 督办管理-督办举措
// 督办管理-督办举措-新增（非管理员-督办处理）
export const postOverseeMeasure = (
    { todoId, content, fileIds, id }: {
        todoId: string; // 待办ID
        content: string; // 督办举措内容
        fileIds: string; // 附件
        id: string; // ID
    }
) => { return postData(`${voc}/khzsSuperviseMeasures/save`, { todoId, content, fileIds, id }) }

// 督办管理-督办举措-确认（批量） 督办举措状态（0：已确认，1：未确认，2：被退回） ,
export const postOverseeMakesure = (
    { ids }: {
        ids: string; // ID
    }
) => { return postData(`${voc}/khzsSuperviseMeasures/confirmMeasures`, { ids }) }

// 督办管理-督办举措-退回（批量）
export const postOverseeBack = (
    { ids, content }: {
        ids: string; // ID
        content: string;
    }
) => { return postData(`${voc}/khzsSuperviseMeasures/returnMeasures`, { ids, content }) }
