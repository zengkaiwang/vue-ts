<template>
  <div class="home">
    <!-- 字体图标组件 -->
    <studio-icon color="#4683DA" size="40" data="367400"></studio-icon>

    <!-- <npm-home></npm-home> -->
    <!-- <preview-comp></preview-comp> -->

    <!-- 文本编辑器\npm包\获取系统语言\新版vue-svg包的使用 -->
    <!-- <quill-edtor></quill-edtor> -->
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import { PreviewComp } from '@aiot/studio-render'
// import QuillEdtor from './quill-editor.vue'
import { Icon } from '@aiot/studio-libs'

@Component({
  components: {
    'preview-comp': PreviewComp,
    'studio-icon': Icon
    // 'quill-edtor': QuillEdtor
  }
})
export default class HomePage extends Vue {

}
</script>
