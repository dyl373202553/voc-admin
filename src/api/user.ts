import { postData } from "@/lib/js/request"
import { ConfigModule } from "@/store/module/config"
const { uaa, user, voc } = ConfigModule

export const login = ({ userName, passWord }: { userName: string; passWord: string }) => {
    return postData(`${uaa}`, {
        username: userName,
        password: passWord,
        grant_type: "password",
        sysId: "9704c1d8279846ed8d3ca9f42090c60d",
        mode: "dev"
    })
}

export const getUser: any = async () => {
    return postData(`${user}`)
}

export const refresh: any = async (refresh_token: string): Promise<void> => {
    return postData(`${uaa}`, {
        refresh_token: refresh_token,
        grant_type: "refresh_token"
    })
}

// 角色管理
export const getRoleInfo: any = async () => {
    return postData(`${voc}/khzsRoleConf/getRoleInfo`)
}
