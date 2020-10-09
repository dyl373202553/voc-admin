import { postData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { addressBook } = ConfigModule

// 通讯录首页一级领导和二级部门组织树
export const getOrgFirst = (
    { moaFlag }: {
        moaFlag: string;
    }
) => { return postData(`${addressBook}/bluepageMain`, { moaFlag }) }

// 通过部门code获取部门组织树-获取user
export const getUserListBySecondCode = (
    { orgCode }: {
        orgCode: number;
    }
) => { return postData(`${addressBook}/user/userList`, { orgCode }) }

// 根据名字搜索
export const bluePageSearch = (
    { pageNum, pageSize, searchValue }: {
        pageNum: number;
        pageSize: number;
        searchValue: string;
    }
) => { return postData(`${addressBook}/bluePageSearch`, { pageNum, pageSize, searchValue }) }

// 通过部门code获取部门组织树
export const getOrgTree = (
    { orgCode }: {
        orgCode: string;
    }
) => { return postData(`${addressBook}/org/bluepageOrgTree`, { orgCode }) }
