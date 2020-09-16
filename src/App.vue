<template>
    <div id="app">
        <router-view v-if="userCode" />
    </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
// @ts-ignore
import { UserModule } from "@/store/module/user"
@Component
export default class App extends Vue {
    get userCode() {
        // @ts-ignore
        return UserModule.user.userCode
    }

    private created() {
        UserModule.initialize({ userName: "0804553E53D2E5BA", passWord: "B6D99AD4A856637B7F14042708632B26" })
    }
}
</script>
<style lang="less" scoped>
</style>
