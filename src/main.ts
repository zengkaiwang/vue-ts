import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import { VueSvgIcon } from '@yzfe/vue-svgicon'
import '@yzfe/svgicon/lib/svgicon.css'

import VueQuillEditor from 'vue-quill-editor'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.component('icon', VueSvgIcon)

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
 
Vue.use(VueQuillEditor /* { default global options } */)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
