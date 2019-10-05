<template>
    <index-layout>
            <div class="main"  slot="main">
              <div class="title"><img src="@/assets/imgs/line.png" alt=""></div>
              <div class="col-25">
                <title-bar title="抓拍截图" subText="SNAPSHOT"></title-bar>
                <div class="module-left">
                  <div class="big-img-box">
                    <img v-bind:src="currentData.image" alt="">
                     <div class="circle-box-small">
                        <img src="@/assets/imgs/circle1.png" alt="">
                        <img src="@/assets/imgs/circle2.png" alt="">
                        <img src="@/assets/imgs/icon-line1.png" alt="">
                        <img src="@/assets/imgs/icon-line2.png" alt="">
                       
                    </div>
                  </div>
                  <div class="card-box detail-info">
                      <div>
                        <header-box :img="currentData.image"></header-box>
                        <div class="detail-time">{{currentData.time | splitTime}}</div>
                      </div>
                      <div>
                        <p class="detail-item">
                          <span>年龄</span><span>{{ageGroup[currentData.age]}}</span>
                          </p>
                        <p class="detail-item"><span>性别</span><span>{{currentData.gender | splitGender}}</span></p>
                        <p class="detail-item"><span>眼镜</span><span>{{currentData.glass | splitGlass}}</span></p>
                      </div>
                  </div>
                  <div class="card-box list-box">
                     <div class="card-bar">
                          <span>最近抓拍访客</span>
                          <span>CAPTURING VISITORS</span>
                      </div>
                      <ul class="list">
                            <li v-for="(item,index) in listData" :key="index" v-if="index<3" @click="showPath(item)">
                                <div class="list-item">
                                    <div><small-header-box :img="item.image"></small-header-box></div>
                                    <div>进入时间</div>
                                    <div>{{item.time | splitTime}}</div>
                                </div>
                            </li>
                      </ul>
                  </div>
                </div>
              </div>
              <div class="col-75">
                <div class="card-box map-box">
                  <area-module :way="wayList"></area-module>
                </div>
                <div class="info-box">
                    <!--<div class="people-info">
                       <div class="card-box">
                         <div class="count-title" @click="test">总来访人数</div>
                         <div class="count-sub-title">Total number of visitors</div>
                         <div class="circle-box">
                           <img src="@/assets/imgs/b-circle1.png" alt="">
                           <img src="@/assets/imgs/b-circle2.png" alt="">
                           <img src="@/assets/imgs/b-circle3.png" alt="">
                           <img src="@/assets/imgs/b-circle4.png" alt="">
                           <img src="@/assets/imgs/b-circle5.png" alt="">
                           <div class="circle-text">
                             <p>{{sexData.male + sexData.female}}</p>
                             <p>人员总来访量</p>
                           </div>
                         </div>
                       </div>
                       <div class="card-box1">
                         <div  class="count-title">男性人数</div>
                         <div class="count-sub-title">NUMBER OF MALES</div>
                         <div class="count-box">
                           <span>{{sexData.male}}</span>人
                         </div>
                         <div  class="count-title">女性人数</div>
                         <div class="count-sub-title">NUMBER OF WOMEN</div>
                         <div class="count-box">
                           <span>{{sexData.female}}</span>人
                         </div>
                       </div>
                       <div class="card-box pie-boxs">
                            <div class="pie-box" v-for="(item,index) in listAgeGroup" :key="index">
                                <div>{{item.age}}</div>
                                <div :id="'myChart' + (index+1)" class="pie-s-chart"></div>
                            </div>
                       </div>
                    </div>
                    <div class="video-box">
                    </div>-->
                    <div class="video-groups">

                    </div>
                    <div class="video-infos">
                      <div class="video-infos-title">实事监控画面</div>
                    </div>
                </div>
              </div>
              </div>
    </index-layout>
</template>
<script>
import IndexLayout from "@/components/IndexLayout.vue";
import TitleBar from "@/components/TitleBar.vue";
import HeaderBox from "@/components/HeaderBox.vue";
import SmallHeaderBox from "@/components/SmallHeaderBox.vue";
import AreaModule from "./part/areaModule.vue";

export default {
  name: "way",
  components: {
    IndexLayout,
    TitleBar,
    HeaderBox,
    SmallHeaderBox,
    AreaModule
  },
  data() {
    return {
      wayList: [],
      currentData: {},
      sexData: { male: 0, female: 0 },
      listData: [],
      listAgeGroup: [],
      startDate: "",
      endDate: "",
      ageGroup: [
        "婴幼儿",
        "儿童",
        "少年",
        "青少年",
        "青年",
        "壮年",
        "中年",
        "中老年",
        "老年"
      ]
    };
  },
  filters: {
    splitGender(val) {
      return val == "1" ? "男" : "女";
    },
    splitGlass(val) {
      return val == "1" ? "有" : "无";
    },
    splitTime(val) {
      return val && val.split(" ")[0] ? val.split(" ")[1] : "";
    }
  },
  mounted() {
    let _this = this;
    _this.initDateTime();
    var obj = {
      dt1: this.startDate,
      dt2: this.endDate
    };

    _this.getPedestriantype(obj);
    _this.getPedestrianCount();
    _this.getPedestrianRealtime();
  },
  methods: {
    // 获取时间
    initDateTime() {
      let dateNow = new Date();
      this.startDate = `${dateNow.getFullYear()}-${dateNow.getMonth() +
        1}-${dateNow.getDate()} 00:00:00`;
      this.endDate = `${dateNow.getFullYear()}-${dateNow.getMonth() +
        1}-${dateNow.getDate()} 23:59:59`;
    },

    // 获取来访人员类型
    getPedestriantype(obj) {
      var _this = this;
      var obj1 = { ...obj, count: 5 };
      _this.$api.queryPedestrianType(obj1).then(result => {
        console.log("来访人员类型", result);
        var cacheData = [];
        result.forEach((element, index) => {
          cacheData.push({
            age: this.ageGroup[element.age - 1],
            Percentage:
              element.Percentage.indexOf("%") > -1
                ? element.Percentage.replace("%", "")
                : ""
          });
        });
        this.listAgeGroup = cacheData;

        setTimeout(function() {
          _this.listAgeGroup.forEach((element, index) => {
            _this.drawPie(element.age, element.Percentage, index + 1);
          });
        }, 1000);
      });
    },

    // 获取来访人员总数
    getPedestrianCount(obj) {
      var obj1 = { camera: 1 };
      this.$api.queryPedestrianCount(obj1).then(result => {
        console.log("来访人员人数", result);
        result.forEach(element => {
          if (element.gender == 1) {
            this.sexData.male = element.num;
          } else if (element.gender == 2) {
            this.sexData.female = element.num;
          }
        });
      });
    },

    // 来访人员最近列表记录
    getPedestrianRealtime() {
      var obj1 = { count: 5 };
      var _this = this;
      _this.$api.queryPedestrianRealtime(obj1).then(result => {
        console.log("来访人员列表", result);
        _this.listData = result;
        if (_this.listData.length > 0) {
          _this.currentData = _this.listData[0];
          _this.getUserList({ user: _this.currentData.user_id });
        }
      });
    },

    // 展示动线
    showPath(item) {
      this.currentData = item;
      this.getUserList({ user: this.currentData.user_id });
    },

    // 查询动线
    getUserList(obj) {
      var _this = this;
      _this.$api.queryUserList(obj).then(result => {
        console.log("获取人员动线", result);
        _this.wayList = result;
         ConsoleWrite(JSON.stringify(result));
      });
    },

    // 画环形图
    drawPie(name, val, index) {
      let myChart = this.$echarts.init(
        document.getElementById("myChart" + index)
      );
      myChart.setOption({
        label: {
          normal: {
            show: true,
            position: "center",
            formatter: ({ data }) => `${data.value.toFixed(2)}%`
          },
          emphasis: {
            show: true
          }
        },
        series: [
          {
            type: "pie",
            radius: ["78%", "85%"],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100,
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0.3,
                    y2: 0.5,
                    colorStops: [
                      {
                        offset: 0.3,
                        color: "#3a3a3a" // 0% 处的颜色
                      },
                      {
                        offset: 0.9,
                        color: "#979797" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  borderWidth: 200
                }
              }
            ]
          },
          {
            name: this.name,
            type: "pie",
            radius: ["72%", "90%"],
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 100 - val,
                itemStyle: {
                  opacity: 0
                }
              },
              {
                value: val,
                itemStyle: {
                  color: "#228FF6",
                  /*  borderColor: "#050814", */
                  borderWidth: 3
                },
                label: {
                  normal: {
                    show: true,
                    position: "center",
                    formatter: function(data) {
                      return `${data.data.value}%`;
                      // return `${data.data.value.toFixed(0)}%\n${data.name}`;
                    },
                    fontSize: 12,
                    fontFamily: "Din",
                    /*  lineHeight: 25, */
                    color: "#FFFFFF",
                    verticalAlign: "top",
                    height: 1
                  },
                  emphasis: {
                    show: true
                  }
                }
              }
            ]
          }
        ]
      });
    },
    test() {
      ConsoleWrite(JSON.stringify({ name: "aaa", number: "1" }));
    }
  }
};
</script>
<style scoped>
.col-25 {
  width: 25.6%;
  float: left;
}

.col-75 {
  width: 74%;
  margin-left: 0.4%;
  float: left;
}

.module-left {
  width: 100%;
  background: rgba(31, 40, 57, 0.39);
  margin-top: 1rem;
  margin: 1.5rem 0.4% auto 0.4%;
  box-sizing: border-box;
  padding: 2rem 0 2rem 0;
}

.big-img-box {
  height: 22.5rem;
  margin: 0px 1% 0 1%;
  position: relative;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.big-img-box::before {
  content: "";
  width: 100%;
  height: 100%;
  background: url(../assets/imgs/small-video-box.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  z-index: 1;
}

.big-img-box > img {
  width: 88%;
  height: 81%;
  margin: 5.2% auto auto 5.8%;
}

.card-box {
  background: rgba(36, 46, 65, 0.5);
  border: 1px solid rgba(44, 83, 156, 0.5);
}

.detail-info {
  /* padding: 20px 0; */
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin: 1.7rem 5% 0 5%;
}

.detail-info > div {
  width: 50%;
}

.detail-info > div:nth-of-type(1) {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.detail-time {
  font-family: Din;
  font-size: 1.2rem;
  color: #ffffff;
  margin-top: 1.5rem;
  letter-spacing: 0.2rem;
}

.detail-item {
  font-family: PingFang-Regular;
  font-size: 1.5rem;
  color: #ffffff;
}

.detail-item > span:nth-of-type(2) {
  /*  font-family: Din; */
  font-size: 2.2rem;
  color: #009eff;
  display: inline-block;
}

.detail-item > span:nth-of-type(1) {
  margin-right: 2rem;
  display: inline-block;
  position: relative;
}

.detail-item > span:nth-of-type(1)::after {
  content: "AGE";
  font-family: PingFang-Regular;
  font-size: 0.6rem;
  color: #ececec;
  text-align: center;
  width: 3.8rem;
  height: 0.7rem;
  background: rgba(0, 157, 255, 0.39);
  position: absolute;
  bottom: -0.2rem;
  left: -0.2rem;
  line-height: 1.5rem;
}

.detail-item:nth-of-type(2) > span:nth-of-type(1)::after {
  content: "GWNDER";
}

.detail-item:nth-of-type(3) > span:nth-of-type(1)::after {
  content: "GLASSES";
}

.card-bar {
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
  padding: 1.5rem 0;
  margin: 1.5rem 1.5rem;
}

.card-bar > span:nth-of-type(1) {
  font-family: PingFang-Regular;
  font-size: 2.1rem;
  color: #ffffff;
}

.card-bar > span:nth-of-type(2) {
  font-family: PingFang-Regular;
  font-size: 1.4rem;
  color: #6b6a6a;
  text-align: right;
  float: right;
}

.list-box {
  list-style: none;
  width: 90%;
  display: inline-block;
  margin: 1.7rem 5% 0 5%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  height: 36rem;
}

.list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list li {
  width: 80%;
  margin: 0 10%;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);
}

.list-item > div {
  width: 30%;
}

.list-item > div:nth-of-type(3) {
  width: 40%;
  text-align: right;
  font-family: Din;
  font-size: 1.8rem;
  color: #009eff;
  letter-spacing: 0.2rem;
}

.map-box {
  width: 97%;
  margin-left: 2%;
  height: 52rem;
}

/* 总来访数样式 */

.info-box {
  width: 97%;
  margin-left: 2%;
  height: 34.5rem;
  margin-top: 2rem;
}

.people-info {
  width: 58%;
  height: 100%;
  float: left;
}

.people-info > div {
  float: left;
  width: 40%;
  border: none !important;
  height: 100%;
}

.people-info > div:nth-of-type(2) {
}

.people-info > div:nth-of-type(3) {
  width: 20%;
}

.count-title {
  font-family: PingFang-Regular;
  font-size: 2.1rem;
  color: #ffffff;
  margin: 1.5rem auto 0.8rem 3.5rem;
}

.count-sub-title {
  font-family: PingFang-Regular;
  font-size: 1.4rem;
  color: #5e5e5e;
  letter-spacing: 0;
  margin-left: 3.5rem;
}

.circle-text {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.circle-text p:nth-of-type(1) {
  font-family: Din;
  font-size: 2.8rem;
  color: #ffffff;
  letter-spacing: 0.2rem;
  margin: 0;
}

.circle-text p:nth-of-type(2) {
  font-family: PingFang-Regular;
  font-size: 1.3rem;
  color: #ffffff;
  letter-spacing: 0.2rem;
  margin: 0;
}

.circle-box {
  width: 20rem;
  height: 20rem;
  position: relative;
  margin-left: 13%;
  margin-top: 10%;
}

.count-box {
  width: 70%;
  height: 4.8rem;
  margin: 2rem 15% 4rem;
  background: url(../assets/imgs/count-box.png) no-repeat center;
  background-size: 100%;
  font-family: PingFang-Regular;
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  line-height: 4.8rem;
}

.count-box span {
  font-family: Din;
  font-size: 2.3rem;
  color: #ffffff;
  margin-right: 0.8rem;
}

.circle-box img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.circle-box img:nth-of-type(1) {
  transform: translate(-51%, -52%);
}

.circle-box img:nth-of-type(2) {
  animation: roate1 30s linear infinite;
}

.circle-box img:nth-of-type(3) {
  animation: roate2 30s linear infinite;
}

.circle-box img:nth-of-type(4) {
  animation: roate1 30s linear infinite;
}

@keyframes roate1 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@keyframes roate2 {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.card-box1 {
  background: rgba(31, 40, 57, 0.2);
}

.pie-boxs {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.pie-box {
  width: 7rem;
  height: 7rem;
  position: relative;
  margin: 0.6rem 0;
}

.pie-box > div:nth-of-type(1) {
  width: 7rem;
  height: 7rem;
  position: absolute;
  font-family: PingFang-Regular;
  font-size: 1.2rem;
  color: #aaaaaa;
  letter-spacing: 0.13rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 1.2rem;
}

.pie-s-chart {
  width: 100%;
  height: 100%;
}

.title {
  width: 96%;
  position: absolute;
  left: 0;
  top: -7%;
  text-align: center;
}

.circle-box-small {
  width: 2.6rem;
  height: 2.6rem;
  position: absolute;
  left: 5%;
  top: -6px;
  z-index: 1;
}

.circle-box-small > img:nth-of-type(1) {
  position: absolute;
  width: 2.6rem;
  height: 2.6rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: circle-move1 18s linear infinite;
}

.circle-box-small > img:nth-of-type(2) {
  position: absolute;

  width: 1.5rem;
  height: 1.5rem;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: circle-move 14s linear infinite;
}

.circle-box-small > img:nth-of-type(3) {
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
}

.circle-box-small > img:nth-of-type(4) {
  position: absolute;
  left: 24px;
  top: 11px;
}

@keyframes circle-move {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }

  100% {
    transform: translate(-50%, -50%) rotate(-360deg);
  }
}

@keyframes circle-move1 {
  0% {
    transform: translate(-50%, -50%) rotate(0);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}

.video-box {
  width: 41%;
  float: left;
  background: rgba(31, 40, 57, 0.4);
  height: 100%;
  margin-left: 1%;
}

.video-groups{
  width:84%;
  height: 100%;
  float: left;
}

.video-infos{
  width:16%;
  height: 100%;
  margin-left: 0%;
  float: left;
  background: rgba(49,77,128,0.32);
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-infos-title{
  width: 14.5rem;
  height: 4.6rem;
  background: url(../assets/imgs/line3.png) no-repeat center;
  background-size: 100% 100%;
  font-family: PingFang-Regular;
  font-size: 2.1rem;
  color:#ffffff;
  text-align: center;
  line-height: 4.6rem;
}
</style>

