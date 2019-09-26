<template>
    <index-layout>
            <div slot="main"  class="main" >
              <div class="title">a</div>
              <div class="col-25">
                  <title-bar title="车辆品牌" subText="VEHICLE BRAND"></title-bar>
                  <div class="card-box">
                    <div class="big-img-box">
                            <div class="box-img" v-for="(item,index) in brandList" v-if="index<5" :key="index">
                                <span>{{item.Percentage | FliterNumber}}<span class="percent-unit"></span></span>
                                <span>{{item.carBrands}}</span>
                            </div>
                    </div>
                  </div>
                    <title-bar title="车型" subText="VEHICLE TYPE"></title-bar>
                  <div class="card-box" >
                    <div class="car-type-box" >
                        <div> <pie-chart :info="carTypeList"></pie-chart></div>
                        <div class="pie-ledge">
                                <dl class="pie-ledge-item" v-for="(item,index) in carTypeList" v-if="index<5" :key="index">
                                    <dt></dt>
                                    <dd>{{item.carType}}</dd>
                                    <dd>{{item.Percentage | FliterNumber}}</dd>
                                </dl>
                        </div>
                        <div class="pie-title">汽车类型</div>

                    </div>
                  </div>
                    <title-bar title="车身颜色" subText="BODY COLOR"></title-bar>
                  <div class="card-box">
                    <div class="car-color-box">
                          <div class="table-item" v-for="(item,index) in carColorList" :key="index">
                              <span>{{item.carColor}}</span>
                              <span>{{item.Percentage}}</span>
                              <span>--辆</span>
                          </div>
                    </div>
                  </div>
                </div>
                <div class="col-50">
                    <div class="video-box">
                    </div>
                    <div class="picture-box">
                        <div class="picture-item"><img v-bind:src="carInfoList.length>0?carInfoList[0].carImg:''"/> </div>
                        <div class="picture-item"><img v-bind:src="carInfoList.length>0?carInfoList[0].licenseImg:'' "/> </div>
                    </div>
                    <div>
                        <title-bar title="车辆进出动态" subText="VEHICLE ENTRY AND EXIT DYNAMICS"></title-bar>
                        <div class="card-box"  style="padding:0">
                            <div class="car-info-box">
                                <div class="info-title-bar">
                                    <span>车牌号</span>
                                    <span>出入口位置</span>
                                    <span>出入场时间</span>
                                    <span>状态</span>
                                </div>
                                <div class="info-detail-box">
                                    <div class="info-detail-item" v-for="(item,index) in carInfoList" :key="index">
                                    <span>{{item.carNum}}</span>
                                    <span>--</span>
                                    <span>{{item.time}}</span>
                                    <span>{{item.InOut==1?"正常出场":"正常入场"}}</span>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              <div class="col-25" style="float:right;">
                  <title-bar title="今日车流量" subText="VEHICLE FLOW"></title-bar>
                  <div class="card-box">
                    <div class="chart-box">
                          <line-chart color = "#0094F2" name="今日车流量" :xData="todayCarInfoXData" :yData="todayCarInfoYData"></line-chart>
                    </div>
                  </div>
                    <title-bar title="本月车流量" subText="VEHICLE FLOW"></title-bar>
                  <div class="card-box" >
                    <div class="car-type-box">
                        <line-chart color = "#5558D7" name="本月车流量" :xData="monthCarInfoXData" :yData="monthCarInfoYData"></line-chart>
                    </div>
                  </div>
                    <title-bar title="异常情况" subText="ABNORMAL SITUATION"></title-bar>
                  <div class="card-box">
                    <div class="car-color-box other-box">
                          <div class="other-info-item">
                              <img src="@/assets/imgs/icon-fangxing.png" alt="">
                              <span>异常放行</span>
                              <span>0</span>
                          </div>
                          <div class="other-info-item">
                              <img src="@/assets/imgs/icon-shebei.png" alt="">
                              <span>设备异常</span>
                              <span>0</span>
                          </div>
                          <div class="other-info-item">
                              <img src="@/assets/imgs/icon-zhiliu.png" alt="">
                              <span>滞留车辆</span>
                              <span>0</span>
                          </div>
                          
                    </div>
                  </div>
              </div>
            </div>
    </index-layout>
</template>
<script>
import IndexLayout from "@/components/IndexLayout.vue";
import TitleBar from "@/components/TitleBar.vue";
import PieChart from "./part/pieChart.vue";
import LineChart from "./part/lineChart.vue";

export default {
  name: "car",
  components: {
    IndexLayout,
    PieChart,
    LineChart,
    TitleBar
  },
  data() {
    return {
      todayCarInfoXData: [
        "0",
        "2",
        "3",
        "4",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22",
        "24"
      ],
      todayCarInfoYData: [10, 0, 20, 3, 40, 50, 0, 0, 60, 0, 0, 0, 0], // 今日车流量
      monthCarInfoXData: ["第一周", "第二周", "第三周", "第四周"],
      monthCarInfoYData: [320, 201, 230, 300], // 今日车流量
      brandList: [
        { carBrands: "宝马", Percentage: 0 },
        { carBrands: "丰田", Percentage: 0 },
        { carBrands: "福特", Percentage: 0 },
        { carBrands: "长安", Percentage: 0 },
        { carBrands: "其他", Percentage: 0 }
      ],
      carTypeList: [
        {
          carType: "SUV",
          Percentage: "100%"
        }
      ],
      carColorList: [
        {
          carColor: "白",
          Percentage: "44%"
        }
      ],
      carInfoList: [
        {
          id: 155,
          storeId: "30297f95920a4dfe94de0db50d69431b",
          InOut: 1,
          CameraID: "110",
          carNum: "蓝渝AQ611N",
          carType: "SUV",
          carBrands: "宝骏",
          carColor: "深蓝",
          carImg:
            "https://staticfile.tq-service.com/image/szacSystem/20190926/54fa77cd2ae947839441b94b4c941347.jpg",
          licenseType: "0",
          licenseColor: "0",
          licenseImg:
            "https://staticfile.tq-service.com/image/szacSystem/20190926/33dd2aa4d6d644f7827381a059cddc9f.jpg",
          faceImg:
            "https://staticfile.tq-service.com/image/szacSystem/20190926/5136585eefc64b8db663f38ff5a5f56f.jpg",
          time: "2019-09-26 14:44:05"
        }
      ],
      startDate: "",
      endDate: ""
    };
  },
  filters: {
    FliterNumber(val) {
      return val ? val.substring(0, 3) : 0;
    }
  },
  mounted() {
    this.initDateTime();
    var obj = {
      dt1: this.startDate,
      dt2: this.endDate
    };

    this.getCarBrand(obj);
    this.getCarType(obj);
    this.getCarColor(obj);
    this.getCarListRealtime(obj);
    this.getCarSUMbyHou();
    this.getCarSUMbyDay();
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
    // 车辆品牌
    getCarBrand(obj) {
      var obj1 = { ...obj, count: 5 };
      this.$api.queryCarBrand(obj1).then(result => {
        console.log("车辆品牌", result);
        this.brandList = result;
      });
    },
    // 车辆类型
    getCarType(obj) {
      var obj1 = { ...obj, count: 5 };
      this.$api.queryCarType(obj1).then(result => {
        console.log("车辆类型", result);
        this.carTypeList = result;
      });
    },
    // 车辆颜色
    getCarColor(obj) {
      var obj1 = { ...obj, count: 4 };
      this.$api.queryCarColor(obj1).then(result => {
        console.log("车辆颜色", result);
        this.carColorList = result;
      });
    },
    // 车辆进出记录
    getCarListRealtime() {
      this.$api.queryCarListRealtime({ count: 3 }).then(result => {
        console.log("车辆进出记录", result);
        this.carInfoList = result;
      });
    },

    // 今日车流量
    getCarSUMbyHou() {
      this.$api.queryCarSUMbyHou({}).then(result => {
        console.log("今日车流量", result);
        this.todayCarInfoXData = [];
        this.todayCarInfoYData = [];
        var xData = [];
        var yData = [];
        result.forEach((element, index) => {
          xData.push(element.timeName);
          yData.push(element.nums);
        });

        this.todayCarInfoXData = xData;
        this.todayCarInfoYData = yData;
      });
    },

    // 当月车流量
    getCarSUMbyDay() {
      this.$api.queryCarSUMbyDay({}).then(result => {
        console.log("当月车流量", result);
        this.monthCarInfoXData = [];
        this.monthCarInfoYData = [];
        var xData = [];
        var yData = [];
        result.forEach((element, index) => {
          xData.push(element.timeName);
          yData.push(element.nums);
        });

        this.monthCarInfoXData = xData;
        this.monthCarInfoYData = yData;
      });
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
  width: 43%;
  margin-left: 3%;
  float: left;
}

.card-box {
  width: 100%;
  background: rgba(31, 40, 57, 0.39);
  margin-top: 1rem;
  margin: 0.6rem 0.4% 1rem 0;
  box-sizing: border-box;
  padding: 2rem 0 2rem 0;
  min-height: 20rem;
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
  width: 55%;
  height: 100%;
  float: left;
}

.car-type-box > div:nth-of-type(2) {
  width: 45%;
  float: left;
}

.chart-box {
  height: 19rem;
  width: 100%;
}

.pie-title {
  width: 55%;
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
  top: 0;
  z-index: -1;
}

.pie-ledge {
  margin-top: 2rem;
}

.pie-ledge .pie-ledge-item {
  width: 50%;
  float: left;
  overflow: hidden;
  margin: 0.6rem 0 0.8rem 0;
}

.pie-ledge .pie-ledge-item:nth-of-type(1n) dt {
  background: #0388db;
}

.pie-ledge .pie-ledge-item:nth-of-type(2n) dt {
  background: #0148e3;
}

.pie-ledge .pie-ledge-item:nth-of-type(3n) dt {
  background: #01c3e3;
}

.pie-ledge .pie-ledge-item:nth-of-type(4n) dt {
  background: #00c6ff;
}

.pie-ledge .pie-ledge-item:nth-of-type(5n) dt {
  background: #0098f8;
}

.pie-ledge .pie-ledge-item:nth-of-type(6n) dt {
  background: #88d1ff;
}

.pie-ledge .pie-ledge-item dt {
  float: left;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #0148e3;
}

.pie-ledge .pie-ledge-item dd:nth-of-type(1) {
  margin-left: 1.6rem;
  font-family: PingFang-Regular;
  font-size: 1.4rem;
  color: #787878;
  line-height: 1.8rem;
}

.pie-ledge .pie-ledge-item dd:nth-of-type(2) {
  margin-left: 1.6rem;
  font-family: Acens;
  font-size: 1.5rem;
  color: #ffffff;
  line-height: 1.8rem;
}

/* 车身颜色样式 */
.table-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  flex-direction: row;
}

.table-item:nth-of-type(odd) {
  background: rgba(36, 46, 65, 0.39);
}

.table-item:nth-of-type(even) {
  background: rgba(0, 0, 0, 0.07);
}

.table-item > span {
  min-width: 33%;
  display: block;
  font-family: PingFang-Regular;
  font-size: 1.6rem;
  color: #ffffff;
  text-align: center;
}

.other-box {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
}

.other-info-item {
  height: 16rem;
  min-width: 33%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  flex-direction: column;
}

.other-info-item > span:nth-of-type(1) {
  font-family: PingFang-Regular;
  font-size: 1.4rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  margin: 1.5rem 0 1rem;
}

.other-info-item > span:nth-of-type(2) {
  font-family: Acens;
  font-size: 2.4rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
}

/* 中间区域 */
.video-box {
  width: 100%;
  height: 36.5rem;
  background: rgba(31, 40, 57, 0.39);
}

.picture-box {
  width: 100%;
  height: 20rem;
  margin: 2rem 0 3rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
}

.picture-item {
  width: 49%;
  height: 100%;
  background: rgba(31, 40, 57, 0.39);
  position: relative;
}

.picture-item:nth-of-type(2)::before{
  width: 100%;
  height: 100%;
  content: "";
  background: url(../assets/imgs/picture-box.png) no-repeat center;
  background-size: 100% 100%;
  position: absolute;
  left: 0;
  z-index: 1;
}

.picture-item img {
  width: 100%;
  height: 100%;
}

.car-info-box {
  width: 100%;
}

.info-title-bar {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
  background: rgba(36, 46, 65, 0.76);
}

.info-title-bar > span {
  width: 25%;
  display: block;
  text-align: center;
}

.info-detail-box {
  height: 16rem;
  background: rgba(31, 40, 57, 0.39);
}

.info-detail-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
  font-family: PingFang-Regular;
  font-size: 1.6rem;
  color: #ffffff;
  letter-spacing: 0;
  border-bottom: 1px solid #0f3555;
}

.info-detail-item > span {
  width: 25%;
  display: block;
  text-align: center;
}

.info-detail-item > span:nth-of-type(3) {
  font-family: Acens;
  font-size: 1.4rem;
  letter-spacing: 0.1rem;
  width: 30%;
  line-height: 1.5rem;
}

.title{
  position: absolute;
  top: -11.5rem;
  left: 0;
  width: 100%;
  height:6.6rem ;
  background: url(../assets/imgs/car-title.png) no-repeat center;
  background-size: auto 95%;
}
</style>

