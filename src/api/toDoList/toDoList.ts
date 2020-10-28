import { getData, getDataUrl } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { voc } = ConfigModule

// 待办工作
export const getToDoList = (
    { type, pageNum, pageSize }: {
        type: string; // 1：节目待办，2：督办待办
        pageNum: number;
        pageSize: number;
    }
) => { return getData(`${voc}/khzsTodo/data`, { type, pageNum, pageSize }) }

// 获取待办总数
export const getToDoAll = () => { return getDataUrl(`${voc}/khzsTodo/getTodoCount`) }
