import { postData, getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

/* 留言管理 */
// 新增、修改
export const postMessageAdd = (
    { programId, targetId, content, wonderfulFlag}: {
        programId: string;
        targetId: string;
        content: string;
        wonderfulFlag: string; // 0：精彩留言，1：取消
    }
) => { return postData(`${voc}/khzsComment/save`, { programId, targetId, content, wonderfulFlag }) }

// 设置精彩留言
export const postMessageSetWonderful = (
    { id, wonderfulFlag}: {
        id: string;
        wonderfulFlag: string;  // 0：精彩留言，1：取消
    }
) => { return postData(`${voc}/khzsComment/save`, { id, wonderfulFlag }) }

// 全部留言

export const postMessageAll = (
    { programId, pageNum, pageSize }: {
        programId: string;
        pageNum: string;
        pageSize: string;
    }
) => { return getData(`${voc}/khzsComment/findList`, { programId, pageNum, pageSize }) }

// 点赞管理
// 点赞新增、修改
export const postLikeAdd = (
    { programId, targetId}: {
        programId: string;
        targetId: string;
    }
) => { return postData(`${voc}/khzsPraise/save`, { programId, targetId }) }
