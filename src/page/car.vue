<template>
    <index-layout>
            <div slot="main"  class="main" >
            <div class="col-25">
                <title-bar title="车辆品牌" subText="VEHICLE BRAND"></title-bar>
                <div class="card-box">
                  <div class="big-img-box">
                          <div class="box-img" v-for="(item,index) in brandList" :key="index">
                              <span>{{item.percent}}<span class="percent-unit">%</span></span>
                              <span>{{item.name}}</span>
                          </div>
                  </div>
                </div>
                  <title-bar title="车型" subText="VEHICLE TYPE"></title-bar>
                <div class="card-box" style="padding:0;">
                  <div class="car-type-box" >
                      <div  id="pieChart" ref="pieChart"></div>
                      <div class="">

                      </div>
                      <div class="pie-title">汽车类型</div>

                  </div>
                </div>
                  <title-bar title="车身颜色" subText="BODY COLOR"></title-bar>
                <div class="card-box">
                  <div class="car-type-box">
                         
                  </div>
                </div>
              </div>
              <div class="col-50">
                  中间区域
              </div>
             <div class="col-25" style="float:right;">
                <title-bar title="今日车流量" subText="VEHICLE FLOW"></title-bar>
                <div class="card-box">
                  <div class="big-img-box">
                          
                  </div>
                </div>
                  <title-bar title="本月车流量" subText="VEHICLE FLOW"></title-bar>
                <div class="card-box">
                  <div class="car-type-box">
                  </div>
                </div>
                  <title-bar title="异常情况" subText="ABNORMAL SITUATION"></title-bar>
                <div class="card-box">
                  <div class="car-type-box">
                         
                  </div>
                </div>
            </div>
            </div>
    </index-layout>
</template>
<script>
import IndexLayout from "@/components/IndexLayout.vue";
import TitleBar from "@/components/TitleBar.vue";

export default {
  name: "car",
  components: {
    IndexLayout,
    TitleBar
  },
  data() {
    return {
      brandList: [
        { name: "宝马", percent: 20 },
        { name: "宝马", percent: 20 },
        { name: "宝马", percent: 20 },
        { name: "宝马", percent: 20 },
        { name: "宝马", percent: 20 }
      ],
      color: ["#0148E3", "#01C3E3", "#0148E3", "#0098F8", "#88D1FF", "#0388DB"],
      pie: {}
    };
  },
  mounted() {
    this.initPie();
    debugger;
    let myChart = this.$echarts.init(this.$refs.pieChart);
    myChart.setOption(this.pie);
  },
  methods: {
    initPie() {
      this.pie = {
        color: [
          "#0148E3",
          "#01C3E3",
          "#0148E3",
          "#0098F8",
          "#88D1FF",
          "#0388DB"
        ],
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["52%", "68%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 0,
                name: "1",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#0148E3" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#0148E3" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "2",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#01C3E3" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#01C3E3" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "3",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#0148E3" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#0148E3" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "4",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#0098F8" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#0098F8" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "5",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#88D1FF" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#88D1FF" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "5",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#0388DB" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#0388DB" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              }
            ]
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
.col-25 {
  width: 25.6%;
  float: left;
}

.col-50 {
  width: 40%;
  margin-left: 4%;
  float: left;
}

.card-box {
  width: 100%;
  background: rgba(31, 40, 57, 0.39);
  margin-top: 1rem;
  margin: 0.6rem 0.4% 1rem 0;
  box-sizing: border-box;
  padding: 2rem 0 2rem 0;
}

.big-img-box {
  /* width: 100%; */
  height: 19rem;
  margin: 0px auto 0 12%;
  position: relative;
  box-sizing: border-box;
}

.percent-unit {
  font-family: Acens;
  font-size: 1.2rem;
}

.big-img-box .box-img {
  width: 9.5rem;
  height: 10.5rem;
  background: url(../assets/imgs/icon-box1.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.box-img > span:nth-of-type(1) {
  display: inline-block;
  font-family: Acens;
  font-size: 2rem;
  color: #ffffff;
  text-align: center;
}

.box-img > span:nth-of-type(2) {
  font-family: PingFang-Regular;
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  font-weight: 700;
}

.big-img-box .box-img:nth-of-type(1) {
  left: 0;
  top: 0;
}

.big-img-box .box-img:nth-of-type(2) {
  left: 10rem;
  top: 0;
}

.big-img-box .box-img:nth-of-type(3) {
  left: 20rem;
  top: 0;
}

.big-img-box .box-img:nth-of-type(4) {
  left: 5rem;
  top: 8.3rem;
}
.big-img-box .box-img:nth-of-type(5) {
  left: 15rem;
  top: 8.3rem;
}

.car-type-box {
  height: 18rem;
  width: 100%;
  position: relative;
}

.car-type-box > div:nth-of-type(1) {
  width: 50%;
  height: 100%;
  float: left;
}

.car-type-box > div:nth-of-type(2) {
  width: 50%;
  float: left;
}

.pie-title {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: PingFang-Regular;
  font-size: 1.4rem;
  color: #ffffff;
  letter-spacing: 0;
  position: absolute;
  left: 0;
  top:0;
  z-index: -1;
}
</style>

