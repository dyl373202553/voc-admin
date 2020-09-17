
<template>
    <div class="Index">
        ddd
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getHomeProgramList } from "@/api/IndexPage/home"
@Component
export default class Index extends Vue {
    protected mounted() {
        const params = {
            pageNum: "1",
            pageSize: "3"
        }
        getHomeProgramList(params).then((res) => {
            console.log(res)
        })
    }
}
</script>
<style lang="less" scoped>

</style>
