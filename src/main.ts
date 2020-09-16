import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "./lib/font/ali/iconfont.css"
import ViewUI from "view-design"
import "view-design/dist/styles/iview.css"
import "@/lib/js/leakRepair"
import "@/lib/css/base.css"
import { deepCopy, getSlotData, getImg, day, getFileIcon } from "@/lib/js/unitls"

Vue.config.productionTip = false
Vue.use(ViewUI)
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
