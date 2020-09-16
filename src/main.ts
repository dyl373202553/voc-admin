import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./lib/font/ali/iconfont.css"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"

import "@/lib/js/leakRepair"
import "@/lib/css/base.css"
import "@/lib/css/index.scss"
import { deepCopy, getSlotData, getImg, day, getFileIcon } from "@/lib/js/unitls"

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$deepCopy = deepCopy
Vue.prototype.$getImg = getImg
Vue.prototype.$getSlotData = getSlotData
Vue.prototype.$day = day
Vue.prototype.$getFileIcon = getFileIcon

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")
