import {
    VuexModule,
    Module,
    Action,
    Mutation,
    getModule
} from "vuex-module-decorators";
import store from "@/store";
import { login, refresh, getUser } from '@/api/user'

import Cookies from 'js-cookie'

const TOKEN_KEY = 'kmportaltoken';
const RETOKEN = 'kmportalrefreshtoken'
const EXPIRESIN = 'kmportalexpires_in'
const BUILDTIME = 'kmportalbuildTime'
const USER = "user"

export interface UserState {
    token: any;
    refreshToken: any;
    expiresIn: any;
    buildTime: any;
    user: any
}

@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements UserState {
    public refreshToken = this.getReTokenValue();
    public expiresIn = this.getExpiresinValue();
    public buildTime = this.getBuildTimeValue();
    public token = this.getTokenValue();
    public user = this.getUserValue();

    @Mutation
    private SET_TOKEN(token: any): void {
        this.token = token;
    }

    @Mutation
    private SET_REFRESHTOKEN(refreshToken: any): void {
        this.refreshToken = refreshToken;
    }

    @Mutation
    private SET_EXPIRESIN(expiresIn: any): void {
        this.expiresIn = expiresIn
    }

    @Mutation
    private SET_BUILDTIME(value: any): void {
        this.buildTime = value
    }

    @Mutation
    private SET_USER(user: any) {
        this.user = user
    }


    @Action
    public async isToken(): Promise<boolean> {
        let token: string | undefined = Cookies.get(TOKEN_KEY)
        let retoken: string | undefined = Cookies.get(RETOKEN)
        let expires: number = Cookies.get(EXPIRESIN) ? Number(Cookies.get(EXPIRESIN)) : 0
        let buildTime: number = Cookies.get(BUILDTIME) ? Number(Cookies.get(BUILDTIME)) : 0

        if (expires != 0 && (new Date().getTime() - buildTime) / 1000 > expires) {
            let isToken: boolean = await this.RefreshToken()
            return isToken;
        } else if (token && (new Date().getTime() - buildTime) / 1000 < expires) {
            return true;
        } else {
            return false;
        }
    }

    @Action
    public async Login({ userName, passWord }: { userName: string; passWord: string }) {
        let res = await login({ userName, passWord });
        let { access_token, refresh_token, expires_in } = res
        if (access_token) {
            this.setValue(res);
            this.SET_TOKEN(access_token);
            this.SET_REFRESHTOKEN(refresh_token);
            this.SET_EXPIRESIN(expires_in);
            this.SET_BUILDTIME(new Date().getTime() - 60000);
            this.getUser(access_token)
            return true;
        }
        return false
    }

    @Action
    public async getUser(access_token: string) {
        let { user } = await getUser()
        user.isDeptManage = 0
        user.isManage = 0

        this.SET_USER(user)
        Cookies.set(USER, user)
    }

    @Action
    setAllValue() {
        this.getUser(this.token.toString())
    }

    @Action
    public async RefreshToken(): Promise<boolean> {
        let res = await refresh(this.refreshToken);
        let { access_token, refresh_token, expires_in } = res;

        if (access_token) {
            this.setValue(res);
            this.SET_TOKEN(access_token);
            this.SET_REFRESHTOKEN(refresh_token);
            this.SET_EXPIRESIN(expires_in);
            this.SET_BUILDTIME(new Date().getTime() - 60000);
            return true;
        }

        return false;
    }

    @Action
    public setValue(value: any): void {
        let { access_token, refresh_token, expires_in } = value

        Cookies.set(TOKEN_KEY, access_token)
        Cookies.set(RETOKEN, refresh_token)
        Cookies.set(EXPIRESIN, String(expires_in))

        let buildTime: string = String(new Date().getTime() - 60000)
        Cookies.set(BUILDTIME, buildTime)

    }

    @Action
    public ResetToken(): void {
        this.removeLogin();
        this.SET_TOKEN("");
        this.SET_REFRESHTOKEN("");
        this.SET_EXPIRESIN(0);
        this.SET_BUILDTIME(0);
    }

    @Action
    private removeLogin(): void {
        Cookies.remove(TOKEN_KEY);
        Cookies.remove(RETOKEN);
        Cookies.remove(EXPIRESIN);
        Cookies.remove(BUILDTIME);
    }

    @Action
    public async getUserValue() {
        let isToken = await this.isToken()
        if (!isToken) {
            return {}
        }
        return JSON.parse(String(Cookies.get(USER)))
    }

    @Action
    public async monitor() {
        let expiresIn = await this.expiresIn
        let buildTime = await this.buildTime
        if (expiresIn != 0 && (new Date().getTime() - buildTime) / 1000 > 10000) {
            this.RefreshToken()
        } else if (expiresIn != 0 && (new Date().getTime() - buildTime) / 1000 > expiresIn) {
            this.Login({ userName: "0804553E53D2E5BA", passWord: "B6D99AD4A856637B7F14042708632B26" })
        }
    }

    @Action
    private async getTokenValue() {
        let isToken = await this.isToken()

        if (!isToken) {
            return ""
        }

        return Cookies.get(TOKEN_KEY)

    }

    @Mutation
    private async getReTokenValue() {
        let isToken = await this.isToken()
        if (!isToken) {
            return ""
        }

        return Cookies.get(RETOKEN)
    }

    @Mutation
    private async getExpiresinValue() {
        let isToken = await this.isToken()
        if (!isToken) {
            return 0
        }

        return Number(Cookies.get(EXPIRESIN));
    }

    @Mutation
    private async getBuildTimeValue() {
        let isToken = await this.isToken()
        if (!isToken) {
            return 0
        }

        return Number(Cookies.get(BUILDTIME));
    }
}

export const UserModule = getModule(User);