<template>
  <div>
    <editor-bar v-model="detail" :is-clear="isClear" @change="change" />
  </div>
</template>
<script>
import EditorBar from "../../components/wangEnditor/Editoritem"
export default {
    components: { EditorBar },
    data() {
        return {
            isClear: false,
            detail: ""
        }
    },
    methods: {
        change(val) {
            console.log(val)
        }
    }
}
</script>
