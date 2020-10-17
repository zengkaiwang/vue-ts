<template>
  <div class="home">
    <div>我是home页面</div>
    <npm-home></npm-home>
    <preview-comp></preview-comp>

    <!-- 文本编辑器\npm包\获取系统语言\新版vue-svg包的使用 -->
    <!-- <quill-edtor></quill-edtor> -->
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { Home, PreviewComp } from '@aiot/studio-render'
// import QuillEdtor from './quill-editor.vue'

@Component({
  components: {
    'preview-comp': PreviewComp,
    'npm-home': Home
    // 'quill-edtor': QuillEdtor
  }
})
export default class HomePage extends Vue {
}
</script>
