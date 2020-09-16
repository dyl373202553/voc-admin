import { postData } from "@/lib/js/request";
import { ConfigModule } from '@/store/module/config';
let { api } = ConfigModule

export const getOrgTree = (params: any = {}) => {
    return postData(`${api}/unifyuser/unifyOrg/orgTree`, params);
}