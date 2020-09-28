<template>
  <div class="dashboard-container">
    <el-card class="box-card" v-show="slideshowList.length !==0">
      <div slot="header" class="clearfix">
        <span class="header-title">特别关注</span>
      </div>
      <div>
        <el-carousel height="400px">
          <el-carousel-item v-for="(item, key) in slideshowList" :key="key">
            <div>
              <!-- <el-image :src="item.img" fit="contain" class="image" /> -->
              <img :src="item.img" class="image" style="width:100%;height: 400px;">
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-card>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span class="header-title">近期节目</span>
         <router-link :to="{name:'ProgramList'}">
            <el-button class="box-card-dbtn" type="text">更多节目内容 <i class="el-icon-arrow-right" /></el-button>
        </router-link>
      </div>
      <el-row>
        <el-col v-for="(value, key) in recentList" :key="key" :span="8">
          <el-card class="card-img">
            <div class="box-card-img">
              <!-- <img :src="value.img" class="image"> -->
              <el-image :src="value.img" fit="contain" class="image" />
            </div>
            <div class="box-card-info">
              <div class="title">{{ value.title }}</div>
              <div class="time">{{ value.time }}</div>
              <div class="bottom clearfix">
                <div><span class="title-left">本期主播：</span><span>{{ value.currentAnchor }}</span></div>
                <div>
                  <span class="title-left">督办状态：</span>
                  <span v-show="value.overseeState=== '1'" class="dred">督办未发布</span>
                  <span v-show="value.overseeState=== '2'" class="dred">本期无督办</span>
                  <span v-show="value.overseeState=== '3'" class="dred">督办未回复</span>
                  <span v-show="value.overseeState=== '4'" class="dred">督办未确认</span>
                  <span v-show="value.overseeState=== '5'" class="dblue">督办已完成</span>
                </div>
                <div>
                  <span class="title-left">节目状态：</span>
                  <el-button v-show="value.programStatus=== '1'" type="primary" size="small " class="bgrey border-none dbtn" round>未开始</el-button>
                  <el-button v-show="value.programStatus=== '2'" type="primary" size="small " class="bred border-none dbtn" round>已结束</el-button>
                  <el-button v-show="value.programStatus=== '3'" type="primary" size="small " class="bgreen border-none dbtn" round>进行中</el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>
    <Rank />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
// import { getFocusList, getRecentProgram } from "@/api/IndexPage/home"
import Rank from "./Rank.vue"
@Component({
    components: { Rank }
})
export default class Home extends Vue {
    // 督办状态overseeState：1.督办未发布 2.本期无督办 3.督办未回复 4.督办未确认 5.督办已完成
    // 节目状态programStatus： 1：未开始,2：已结束,3：进行中
    private recentList = [ // 近期节目
        {
            title: "客户之声第100期",
            img: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2667005313,3605400830&fm=26&gp=0.jpg",
            time: "2019年12月2日 17:00-17:30",
            currentAnchor: "信息系统部-小李",
            overseeState: "1",
            programStatus: "1" // 节目状态： 1：未开始,2：已结束,3：进行中
        },
        {
            title: "客户之声第101期",
            img: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1722517107,366391239&fm=26&gp=0.jpg",
            time: "2019年12月2日 17:00-17:30",
            currentAnchor: "信息系统部-小刘",
            overseeState: "2",
            programStatus: "2"
        },
        {
            title: "客户之声第102期",
            img: "http://www.managershare.com/uploads/2015/01/14210532585795.jpg",
            time: "2019年12月2日 17:00-17:30",
            currentAnchor: "信息系统部-小黄",
            overseeState: "5",
            programStatus: "3"
        }
    ]

    private slideshowList = [ // 轮播图
        { img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600835517648&di=66a169c2743457deb998e954546616a0&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F49%2F55%2F635acaccbda9696.jpg" },
        { img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600835550277&di=6ef90ad62c179b7b147d80bd96c80067&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F14%2F41%2F9359a6663593d10.jpg" },
        { img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600835565085&di=025c9d603ada9f8326735c37418bccbd&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Fback_pic%2F05%2F24%2F14%2F1159f04dfb36f0a.jpg" },
        { img: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600835578753&di=c6374cd3314e12b884534d0b43aa4ed2&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F82%2F99%2F355c4aaa264ccc7.jpg" },
        { img: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3572048401,1441053076&fm=26&gp=0.jpg" }
    ]

    private dataPage = {
        pageNum: "1",
        pageSize: "10"
    }

    // protected mounted() {
    //     this.load()
    // }

    // private load() {
    //     // 特别关注数据获取
    //     getFocusList().then((res) => {
    //         if (res) {
    //             console.log(res)
    //         }
    //     })
    //     // 近期节目数据获取
    //     getRecentProgram(this.dataPage).then((res) => {
    //         if (res) {
    //             console.log(res)
    //         }
    //     })
    // }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
}

</style>
