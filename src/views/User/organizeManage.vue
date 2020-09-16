<template>
    <div class="organizeManage">
        <Architecture class="orgSelectBox" @selectOrg="selectOrg" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";
// @ts-ignore
import Architecture from "@c/public/Architecture"
@Component({
    components: { Architecture }
})
export default class organizeManage extends Vue {
    private selectOrg(item: any) {
        console.log(item)
    }
}
</script>
<style lang="less" scoped>
.organizeManage {
    .orgSelectBox {
        .w_n(240px);
    }
}
</style>