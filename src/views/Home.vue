<template>
  <div class="home">
    <div>我是home页面</div>
    <quill-editor v-model="content"
                ref="myQuillEditor"
                :options="editorOption"
                @change="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
    </quill-editor>
    <el-button type="primary">主要按钮</el-button>
    <div :style="{ color: 'orange' }">
      <icon
        data="@icon/icon-dashboard.svg"
        width="40"
        height="40"
        color="blue"
        dir="right"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

 import * as Quill from 'quill' // 引入编辑器
 import ImageResize from 'quill-image-resize-module'
 Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'Home',
  data: function() {
    return {
      editorOption: {
                    placeholder: 'Hello World',
                    modules: {
                         toolbar: {
                            container: [
                                [{ size: ['small', false, 'large'] }],
                                [{ color: [] }, { background: [] }], 
                                [{ font: [] }],
                                [{ align: [] }],
                                ['bold', 'italic'],
                                [{ list: 'ordered' }, { list: 'bullet' }],
                                ['link', 'image'],
                                [{ direction: 'rtl' }]
                            ]
                        },
                       imageResize: {
                            displayStyles: {
                                backgroundColor: 'black',
                                border: 'none',
                                color: 'white'
                            },
                            modules: ['Resize', 'DisplaySize', 'Toolbar']
                        }
                    }
                }
    }
  },
  components: {
    // HelloWorld
  },
  methods: {
    onEditorBlur(e) {
      console.log(e)
    }
  }

}
</script>
