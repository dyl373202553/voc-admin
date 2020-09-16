<template>
    <div class="Architecture">
        <Card :dis-hover="true">
            <div slot="title" class="cartTitle">组织架构</div>
            <div slot="extra" class="extraRight">1</div>

            <div>
                <AutoComplete :transfer="true" @on-search="handleSearch" v-model="searchValue" icon="ios-search" placeholder="请输入">
                    <Option v-for="item in searchData" :value="item">{{ item.orgName }}</Option>
                </AutoComplete>
                <div v-for="item in childOrgList">
                    <div class="oneItemBox" :class="{'selectOrg':selectOrgCode == item.orgCode}" @click="getSubordinate(item)">
                        <div v-if="'200000000' != item.orgCode" class="iconfont iconicon_xiaojiantou_shouqi" :class="{'selected':item.isShow}"></div>
                        <div v-text="item.orgName" class="orgName"></div>
                    </div>
                    <!-- 二级 -->
                    <div v-show="item.isShow" class="twoItemBox">
                        <div class="oneItemBox" :class="{'selectOrg':selectOrgCode == ite.orgCode}" v-for="ite in item.childOrgList" @click="selectOrg(ite)">
                            <div v-text="ite.orgName" class="orgName"></div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
// @ts-ignore
import { getOrgTree } from "@a/UnifyUser"
@Component
export default class Architecture extends Vue {
    private searchValue: string = ""
    private childOrgList: any = []
    private selectOrgCode: string = ""
    private searchData: any = []

    private async getSubordinate(item: any) {
        if ("200000000" != item.orgCode) {
            item.isShow = !item.isShow
        } else {
            this.selectOrgCode = item.orgCode
            this.sendOrgItem(item)
        }
    }

    private async handleSearch(value: any) {
        // console.log(value)
        // await
    }

    private selectOrg(item: any) {
        this.selectOrgCode = item.orgCode
        this.sendOrgItem(item)
    }

    private async getOrg() {
        let { data: { childOrgList } } = await getOrgTree()
        for (let i in childOrgList) {
            childOrgList[i].isShow = false
            childOrgList[i].isSelect = false

            for (let j in childOrgList[i].childOrgList) {
                childOrgList[i].childOrgList[j].isSelect = false
                childOrgList[i].childOrgList[j].isShow = false
            }
        }
        this.childOrgList = childOrgList
    }

    private created() {
        this.getOrg()
    }

    @Emit("selectOrg") sendOrgItem(item: any) { }
}
</script>
<style lang="less" scoped>
.Architecture {
    .cartTitle {
        .fz(14px);
        .color(#6f7e95);
        .bold;
    }

    .extraRight {
        .flex;
    }

    .iconfont {
        .color(#D1D5DD);
        .fz(12px);
        transition: 0.5s;
    }

    .selected {
        .color(#666);
        transform: rotate(90deg);
    }

    .oneItemBox {
        .flex;
        .acenter;
        .h_n(35px);
        .hover_hand;
        border-bottom: 1px dashed #cccccc;

        .orgName {
            .ml(5px);
            .oneLine;
        }
    }

    .selectOrg {
        .bg(#F1F6FF);
        .color(#4484f6);
    }

    .twoItemBox {
        .pl(20px);
    }
}
</style>