<template>
    <div class="dashboard-container">
        <el-card class="box-card" v-show="slideshowList.length !==0">
            <div slot="header" class="clearfix">
                <span class="header-title">特别关注</span>
            </div>
            <div>
                <el-carousel height="450px" :arrow="(this.slideshowList.length>1)? 'hover':'never'">
                    <el-carousel-item v-for="(item, key) in slideshowList" :key="key">
                        <template>
                            <el-image v-if="item.type ==='img'" :src="`/resources/`+ item.content" class="image" style="width:100%;height:450px;"/>
                            <video :src="`/resources/`+ item.content" :controls="true" v-if="item.type === 'video'" style="width:100%;height:450px;">
                                您的浏览器不支持视频播放
                            </video>
                        </template>
                    </el-carousel-item>
                </el-carousel>
            </div>
            </el-card>
            <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span class="header-title">近期节目</span>
                <router-link :to="{name:'ProgramList'}">
                    <el-button class="box-card-dbtn" type="text">更多节目内容 <i class="el-icon-arrow-right" /></el-button>
                </router-link>
            </div>
            <el-row>
                <el-col v-for="(value, key) in recentList" :key="key" :span="8">
                    <div @click="checkValid(value.id, value.liveEntity.startTime, value.liveId)">
                        <el-card class="card-img">
                            <div class="box-card-img">
                                <!-- <img :src="value.img" class="image"> -->
                                <el-image :src="`/resources/`+ value.liveEntity.logoUrl" fit="cover" class="image" />
                            </div>
                            <div class="box-card-info">
                                <div class="title">{{ value.title }}</div>
                                <div class="time">{{ value.liveEntity.startTime }}</div>
                                <div class="bottom clearfix">
                                    <div><span class="title-left">本期主播：</span><span>{{ value.liveEntity.speakers }}</span></div>
                                    <div>
                                        <span class="title-left">督办状态：</span>
                                        <span
                                        :class="value.superviseItemEntity.status !== '0'? 'dred':'dblue'">
                                            {{getStatusName(value.superviseItemEntity.status)}}
                                        </span>
                                    </div>
                                    <div>
                                        <!-- 节目状态（1：未开始，2：进行中，3：已结束） -->
                                        <span class="title-left">节目状态：</span>
                                        <el-button type="primary" size="small "
                                            :class="'border-none dbtn statusBtn'+value.status" round
                                        >{{getStatusProName(value.status)}}</el-button>
                                    </div>
                                </div>
                            </div>
                        </el-card>
                    </div>
                </el-col>
            </el-row>
        </el-card>
        <Rank />
        <el-dialog
            custom-class="info-dialog"
            title="提示"
            :visible.sync="centerDialogVisible"
            width="25%"
            center
            >
            <span>本期节目暂无开始。开始时间：{{this.programTime}}，请稍后再试</span>
            <span slot="footer" class="dialog-footer dbtn">
                <el-button type="primary" round @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getFocusList } from "@/api/IndexPage/home"
import { getRecentProgram, getEffectiveness } from "@/api/programList/programList"
import { getViewStatus } from "@/api/dict"
import { MessageBox } from "element-ui"
import { UserModule } from "@/store/module/user"
import Rank from "./Rank.vue"
@Component({
    components: { Rank }
})
export default class Home extends Vue {
    // 督办状态overseeState：1.督办未发布 2.本期无督办 3.督办未回复 4.督办未确认 5.督办已完成
    private status: any = [] // 督办状态
    // 节目状态programStatus： 1：未开始,2：已结束,3：进行中
    private programStatus: any = [] // 节目状态
    private dataPage = {
        pageNum: 1,
        pageSize: 3,
        queryParam: ""
    }

    private recentList = []
    private slideshowList= []
    private centerDialogVisible=false
    private programTime = ""
    protected mounted() {
        this.load()
        UserModule.getTodo()
    }

    private load() {
        // 督办状态： 督办未发布、督办未回复、督办未确认、本期无督办
        const params = {
            type: "khzs_supervise_item_status"
        }
        const programParams = {
            type: "khzs_program_status"
        }
        const status = getViewStatus(params)
        const programStatus = getViewStatus(programParams)
        const slideshowList = getFocusList() // 特别关注数据获取
        const recentList = getRecentProgram(this.dataPage) // 节目数据获取
        Promise.all([status, programStatus, slideshowList, recentList]).then((res) => {
            this.status = res[0]
            this.programStatus = res[1]
            this.slideshowList = res[2].data
            this.recentList = res[3].data
        }).catch(() => {
            MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        })
        // // 特别关注数据获取
        // getFocusList().then((res) => {
        //     if (res) {
        //         if (res.code < 200) {
        //             this.slideshowList = res.data
        //         } else {
        //             MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        //         }
        //     }
        // })
        // // 节目数据获取
        // getProgramList(this.dataPage).then((res) => {
        //     if (res) {
        //         if (res.code < 200) {
        //             this.recentList = res.data
        //         } else {
        //             MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
        //         }
        //     }
        // })
    }

    // 获取督办状态name
    private getStatusName(cellValue: any) {
        if (cellValue) {
            return this.status.find((item: { value: any }) => {
                return item.value === cellValue
            })?.label
        }
        return "--"
    }

    // 获取节目状态name
    private getStatusProName(cellValue: any) {
        if (cellValue) {
            return this.programStatus.find((item: { value: any }) => {
                return item.value === cellValue
            })?.label
        }
        return "--"
    }

    // 检查节目有效性 1：未开始，2：进行中，3：已结束
    private checkValid(promId: string, time: string, liveId: string) {
        getEffectiveness({ id: promId }).then((res) => {
            if (res) {
                if (res.code < 200) {
                    if (res.data !== "1") {
                        this.$router.push({
                            name: "ProgramDetail",
                            params: { promId: promId, liveId: liveId },
                            query: { id: promId }
                        })
                    } else {
                        this.centerDialogVisible = true
                        this.programTime = time
                    }
                } else {
                    MessageBox.alert(`请联系管理员`, "失败", { type: "error" })
                }
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .statusBtn1{
        background-image: linear-gradient(96deg, #D8D9DA 11%, #AEB7BE 100%) !important;
    }
    .statusBtn2{
        background-image: linear-gradient(-54deg, #4ECBBC 1%, #7FE3D7 99%) !important;
    }
    .statusBtn3{
        background-image: linear-gradient(169deg, #FF8B8B 8%, #F37575 100%) !important;
    }
    .card-img {
        cursor: pointer;
    }
</style>
