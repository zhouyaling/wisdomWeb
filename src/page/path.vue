<template>
    <index-layout>
            <div class="main"  slot="main">
              <div class="col-25">
                <title-bar title="抓拍截图" subText="SNAPSHOT"></title-bar>
                <div class="module-left">
                  <div class="big-img-box">
                    <img src="@/assets/imgs/img.png" alt="">
                  </div>
                  <div class="card-box detail-info">
                      <div>
                        <header-box></header-box>
                        <div class="detail-time">07 : 32 : 54</div>
                      </div>
                      <div>
                        <p class="detail-item">
                          <span>年龄</span><span>10 - 18</span>
                          </p>
                        <p class="detail-item"><span>性别</span><span>女</span></p>
                        <p class="detail-item"><span>眼镜</span><span>无</span></p>
                      </div>
                  </div>
                  <div class="card-box list-box">
                     <div class="card-bar">
                          <span>最近抓拍访客</span>
                          <span>CAPTURING VISITORS</span>
                      </div>
                      <ul class="list">
                            <li v-for="(item,index) in listData" :key="index">
                                <div class="list-item">
                                    <div><small-header-box></small-header-box></div>
                                    <div>进入时间</div>
                                    <div>07 : 32 : 54</div>
                                </div>
                            </li>
                      </ul>
                  </div>
                </div>
              </div>
              <div class="col-75">
                <div class="card-box map-box">
                  <area-module></area-module>
                </div>
                <div class="info-box">
                    <div class="people-info">
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
                             <p>5000</p>
                             <p>人员总来访量</p>
                           </div>
                         </div>
                       </div>
                       <div class="card-box1">
                         <div  class="count-title">男性人数</div>
                         <div class="count-sub-title">NUMBER OF MALES</div>
                         <div class="count-box">
                           <span>3403</span>人
                         </div>
                         <div  class="count-title">女性人数</div>
                         <div class="count-sub-title">NUMBER OF WOMEN</div>
                         <div class="count-box">
                           <span>3403</span>人
                         </div>
                       </div>
                       <div class="card-box pie-boxs">
                            <div class="pie-box" v-for="(item,index) in listAgeGroup" :key="index">
                                <div>{{item.name}}</div>
                                <div :id="'myChart' + (index+1)" class="pie-s-chart"></div>
                            </div>
                       </div>
                    </div>
                    <div class="video-box">
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
  name: "path",
  components: {
    IndexLayout,
    TitleBar,
    HeaderBox,
    SmallHeaderBox,
    AreaModule
  },
  data() {
    return {
      listData: [1, 2, 3],
      listAgeGroup: [
        {
          name: "青年",
          avg: 25
        },
        {
          name: "少年",
          avg: 10
        },
        {
          name: "中年",
          avg: 25
        },
        {
          name: "老年",
          avg: 40
        }
      ]
    };
  },
  mounted() {
    let _this = this;
    setTimeout(function() {
      _this.listAgeGroup.forEach((element, index) => {
        _this.drawPie(element.name, element.avg, index + 1);
      });
    }, 1000);
  },
  methods: {
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
                      return `${data.data.value.toFixed(0)}%\n${data.name}`;
                    },
                    fontSize: 14,
                    fontFamily: "Acens",
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
      ConsoleWrite();
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
  /* width: 100%; */
  height: 21rem;
  margin: 0px 5% 0 5%;
  position: relative;
  box-sizing: border-box;
}

.big-img-box::before {
  content: "";
  width: 100%;
  height: 100%;
  background: url(../assets/imgs/video-box.png) no-repeat center;
  background-size: 100% auto;
  position: absolute;
  top: 0;
  z-index: 1;
}

.big-img-box img {
  width: 90%;
  height: 90%;
  margin: 5% auto auto 5%;
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
  font-family: Acens;
  font-size: 1.2rem;
  color: #ffffff;
  margin-top: 1.5rem;
}

.detail-item {
  font-family: PingFang-Regular;
  font-size: 1.5rem;
  color: #ffffff;
}

.detail-item > span:nth-of-type(2) {
  font-family: Acens;
  font-size: 2.4rem;
  color: #009eff;
  display: inline-block;
}

.detail-item > span:nth-of-type(1) {
  margin-right: 2rem;
  display: inline-block;
}

.detail-item > span:nth-of-type(1)::after {
  content: "";
  width: 4.1rem;
  height: 0.7rem;
  background: rgba(0, 157, 255, 0.39);
  position: relative;
  bottom: -0.5rem;
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
  box-sizing: border-box;
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
  font-family: Acens;
  font-size: 1.8rem;
  color: #009eff;
  letter-spacing: 0;
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
  width: 60%;
  height: 100%;
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
  font-family: Acens;
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
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-family: Acens;
  font-size: 2.3rem;
  color: #ffffff;
  margin-right: 0.8rem;
}

.circle-box img {
  position: absolute;
}

.circle-box img:nth-of-type(1) {
  top: -5px;
  left: -4px;
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
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(-360deg);
  }
}

@keyframes roate2 {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
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
  margin-top: 0.8rem;
}

.pie-s-chart {
  width: 100%;
  height: 100%;
}
</style>

