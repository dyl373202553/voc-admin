<template>
  <div class="components-container">
      <Tinymce v-model="content" :height="300" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Tinymce from '@/components/Tinymce/index.vue'
@Component({
    components: {Tinymce }
})
export default class TinymceDemo extends Vue {
  private content = ""
}
</script>

<style scoped>
.editor-content{
  margin-top: 20px;
}
</style>

