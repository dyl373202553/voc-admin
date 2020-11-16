<template>
    <div class="dashboard-container">
         <div class="pic-404">
            <img class="pic-404__parent" src="@/assets/images/404.png" alt="404">
            <img class="pic-404__child left" src="@/assets/images/404_cloud.png" alt="404">
            <img class="pic-404__child mid" src="@/assets/images/404_cloud.png" alt="404">
            <img class="pic-404__child right" src="@/assets/images/404_cloud.png" alt="404">
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
@Component
export default class Home extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
