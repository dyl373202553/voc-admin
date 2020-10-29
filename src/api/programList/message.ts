import { postData, getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

/* 留言管理 */
// 新增、修改
export const postMessageAdd = (
    { programId, targetId, content, wonderfulFlag }: {
        programId: string;
        targetId: string;
        content: string;
        wonderfulFlag: string; // 是否为精彩留言（0：是，1：否）
    }
) => { return postData(`${voc}/khzsComment/save`, { programId, targetId, content, wonderfulFlag }) }

// 设置精彩留言
export const postMessageSetWonderful = (
    { id, wonderfulFlag }: {
        id: string;
        wonderfulFlag: string; // 0：精彩留言，1：取消
    }
) => { return postData(`${voc}/khzsComment/saveWonderful`, { id, wonderfulFlag }) }

// 全部留言

export const postMessageAll = (
    { programId, pageNum, pageSize, wonderfulFlag, targetId }: {
        programId: string;
        targetId: string;
        pageNum: number;
        pageSize: number;
        wonderfulFlag: string; // 0：精彩留言，1：取消
    }
) => { return getData(`${voc}/khzsComment/data`, { programId, pageNum, pageSize, wonderfulFlag, targetId }) }

// 获取下级留言
export const postMessageBack = (
    { pageNum, targetId }: {
        pageNum: number;
        targetId: string;
    }
) => { return getData(`${voc}/khzsComment/data`, { pageNum, targetId }) }

// 点赞管理
// 点赞新增、修改
export const postLikeAdd = (
    { programId, targetId }: {
        programId: string;
        targetId: string;
    }
) => { return postData(`${voc}/khzsPraise/save`, { programId, targetId }) }
