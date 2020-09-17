
<template>
    <div class="Index">
        ddd
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { getHomeProgramList, getDict } from "@/api/IndexPage/home"
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
        const params2 = {
            pageNum: "1",
            pageSize: "10",
            description: "1"
        }
        getDict(params2).then((res) => {
            console.log(res)
        })
    }
}
</script>
<style lang="less" scoped>

</style>
