import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import "./lib/font/ali/iconfont.css"

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "@/lib/js/leakRepair"

//公共样式
import "@/lib/css/base.css"

import { deepCopy, getSlotData, getImg, day, getFileIcon } from "@/lib/js/unitls"
Vue.prototype.$deepCopy = deepCopy
Vue.prototype.$getImg = getImg
Vue.prototype.$getSlotData = getSlotData
Vue.prototype.$day = day
Vue.prototype.$getFileIcon = getFileIcon

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
