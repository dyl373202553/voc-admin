import { postData, getData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

// 发布特别关注
export const postSpecialFocus = (
    { id, startTime, endTime, content, cover, status, type, title }: {
        id: string;
        startTime: string;
        endTime: string;
        content: string;
        cover: string;
        title: string;
        status: string; // 上线状态（0：上线，1：下线）
        type: string;
    }
) => { return postData(`${voc}/khzsSpecialAttention/save`, { id ,startTime, endTime, content, cover, status, type, title,topFlag:1 }) }

// 特别关注--内容管理
export const getSpecialFocusList = (
    { pageNum, pageSize }: {
        pageNum: number;
        pageSize: number;
    }
) => { return getData(`${voc}/khzsSpecialAttention/data`, { pageNum, pageSize }) }

// 特别关注--内容管理-查看详情
export const getSpecialFocusDetail = (
    { id }: {
    id: string;
}) => { return getData(`${voc}/khzsSpecialAttention/get`, { id }) }

// 特别关注-下线
export const postOffLine = (
    { ids }: {
        ids: string;
    }
) => { return postData(`${voc}/khzsSpecialAttention/offline`, { ids }) }

// 特别关注- 置顶
export const postSetTop = (
    { id, topFlag }: {
        id: string;
        topFlag: number;
    }
) => { return postData(`${voc}/khzsSpecialAttention/setTop`, { id, topFlag }) }
