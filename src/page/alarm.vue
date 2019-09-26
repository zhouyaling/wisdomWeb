<template>
      <index-layout :blur="showBlur">
          <!-- 监控报警 -->
        <div class="main" :class = "showBlur?'blur-style':''" slot="main">
          <div class="module-left">
              <!-- 监控画面 -->
              <div class="video-box">
                    <!-- <div class="circle-box">
                        <img src="@/assets/imgs/circle1.png" alt="">
                        <img src="@/assets/imgs/circle2.png" alt="">
                        <img src="@/assets/imgs/icon-line1.png" alt="">
                        <img src="@/assets/imgs/icon-line2.png" alt="">
                        <div class="video-box-text">
                            <span>危险区域监控画面</span>
                            <span class=""></span>
                        </div>
                    </div> -->
              </div>
              <!-- 历史报警详情 -->
              <div class="alarm-box">
                  <title-bar title = "历史报警详情" subText = "ALARM INFORMATION"></title-bar>
                  <alarm-detail :info="alramInfo"></alarm-detail>
              </div>
              
          </div>
          <div class="module-right">
              <!-- 历史危险区域报警信息 -->
                  <title-bar title = "历史危险区域报警信息" subText = "ALARM INFORMATION FOR DANGEROUS AREAS"></title-bar>
                  <div class="alarm-list-box" >
                     <div class="alarm-list" v-bind:class="resetAnimation?'reset-animation':''" :style="{top}">
                         <div class="alarm-item" v-for="(item,index) in listData" :key="index" @click="showDatail(item)">
                             <div>
                                 <div class="header-box">
                                     <img  v-bind:src="item.image" alt="">
                                 </div>
                             </div>
                             <div>{{item.time | splitDate}}</div>
                             <div>{{item.time | splitTime}}</div>
                             <div>A区5栋园林通道{{index}}</div>
                         </div>
                         <div class="alarm-item" v-for="(item,index) in listData" :key="index+111" @click="showDatail(item)">
                             <div>
                                 <div class="header-box">
                                     <img  v-bind:src="item.image" alt="">
                                 </div>
                             </div>
                             <div>{{item.time | splitDate}}</div>
                             <div>{{item.time | splitTime}}</div>
                             <div>A区5栋园林通道{{index}}</div>
                         </div>
                     </div>
                  </div>
          </div>
        </div> 
        <!-- 报警详情弹窗 -->
        <!-- <div class="panel" v-show="showPanel" slot="panel">
            <div class="modal alarm-modal">
                 <title-bar icon="true" title = "报警详情" subText = "ALARM INFORMATION"></title-bar>
                <alarm-detail :info="alramInfo" style="height:64%;"></alarm-detail>
                <div class="btn-close" @click="closePanel()">关闭窗口</div>
            </div>
        </div> -->
        <!-- 报警头像详情弹窗 -->
       <!--  <div class="panel" v-show="showHeaderPanel" slot="panel" ref="header-panel">
            <div class="modal header-modal" ref="header-modal">
                <div class="header-big-box">
                </div>
                <img  class="img" src="@/assets/imgs/header-default.png" alt="">
                <div class="header-big-text">
                    <img src="@/assets/imgs/icon-line3.png" alt="">
                    <p>2019-09-09</p>
                    <p>07：32：44</p>
                    <p>A区5栋园林通道</p>
                </div>
            </div>
        </div> -->
      </index-layout>
</template>
<script>
import _axios from "axios";

import IndexLayout from "@/components/IndexLayout.vue";
import TitleBar from "@/components/TitleBar.vue";
import AlarmDetail from "@/components/AlarmDetail.vue";

var qs = require("querystring");

export default {
  name: "alarm",
  components: {
    IndexLayout,
    TitleBar,
    AlarmDetail
  },
  data() {
    return {
      alramInfo: {}, // 报警详情
      listData: [], //报警信息列表数据
      activeIndex: 0, // 当前滚动数据
      resetAnimation: false, // 重置滚动列表
      showPanel: false, // 显示弹窗
      showHeaderPanel: false, // 显示头像弹窗
      showBlur: false // 高斯模糊
    };
  },
  filters: {
    splitDate(val) {
      return val && val.split(" ")[0] ? val.split(" ")[0] : "";
    },
    splitTime(val) {
      return val && val.split(" ")[0] ? val.split(" ")[1] : "";
    }
  },
  computed: {
    top() {
      return -this.activeIndex * 131 + "px";
    }
  },
  mounted() {
    this.getListData();
  },
  methods: {
    // 点击头像
    headerClick() {
      this.showBlur = true;
      this.showHeaderPanel = true;
    },
    // 关闭弹窗
    closePanel() {
      this.showBlur = false;
      this.showPanel = false;
    },
    // 显示弹窗
    alarmPanel(index) {
      this.showPanel = true;
      this.showBlur = true;
    },

    // 详情
    showDatail(item) {
      this.alramInfo = item;
    },

    // 获取历史列表
    getListData() {
      var _this = this;
      _this.listData = [];
      var data = { camera: 1, count: 1 };
      this.$api.queryDangerousList(data).then(result => {
        console.log("历史区域报警列表：", result);
        _this.listData = result;
        if (_this.listData.length > 0) {
          _this.alramInfo = _this.listData[0];
        }
        _this.ScrollUp2();
      });

      /*   _axios
        .get(
          "http://10.15.208.119/api/Face/GetDangerousPedestrianRealtime?camera=1&count=1"
        )
        .then(response => {
          console.log("tttttttttttttt", response);
        })
        .catch(function(error) {}); */
    },

    // 向上滚动
    ScrollUp2() {
      let _this = this;
      setInterval(function() {
        _this.resetAnimation = false;
        if (_this.activeIndex < _this.listData.length) {
          _this.activeIndex += 1;
        } else {
          _this.resetAnimation = true;
          _this.activeIndex = 0;
        }
      }, 8000);
    }
    /*  getTest() {
      const data = qs.stringify({
        camera: "1",
        count: "2"
      });

      this.$api.getTest(data).then(result => {
      });
    } */
  }
};
</script>
<style scoped>
.module-left {
  width: 50%;
  float: left;
  height: 100%;
}

.module-right {
  width: 48%;
  float: left;
  height: 100%;
  margin-left: 2%;
}

.video-box {
  width: 100%;
  height: 55%;
  /* background-image: url(../assets/imgs/video-box.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center; */
}

.video-box-text {
  font-family: PingFang-Regular;
  font-size: 2.1rem;
  color: #ffffff;
  position: absolute;
  left: 8.3rem;
  top: -2.5rem;
  width: 20rem;
}

.video-box-text > span:nth-of-type(2) {
  display: inline-block;
  width: 17.9rem;
  height: 0.8rem;
  position: absolute;
  bottom: -0.1rem;
  left: -0.5rem;
  z-index: -1;
  background: rgba(0, 157, 255, 0.27);
}

.alarm-box {
  height: 46%;
  padding: 2.5% 3% 0 3%;
  box-sizing: border-box;
}

.circle-box {
  width: 5.2rem;
  height: 5.2rem;
  position: absolute;
  left: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
}

@media screen and (min-width: 1870px) {
  .circle-box {
    left: 2%;
  }
}

.circle-box > img:nth-of-type(1) {
  position: absolute;
  animation: circle-move1 18s linear infinite;
}

.circle-box > img:nth-of-type(2) {
  position: absolute;
  animation: circle-move 14s linear infinite;
}

.circle-box > img:nth-of-type(3) {
  position: absolute;
  bottom: -2.5rem;
  left: 50%;
}

.circle-box > img:nth-of-type(4) {
  position: absolute;
  right: -48%;
  top: 0px;
}

/* 历史报警信息 */
.alarm-list-box {
  width: 100%;
  height: 90%;
  /* background: rgba(0, 0, 0, 0.23); */
  margin-top: 2rem;
  overflow: hidden;
  position: relative;
}

.alarm-list {
  width: 100%;
  position: absolute;
  transition: top 0.7s;
  -webkit-transition: top 0.5s;
}

.reset-animation {
  transform: top 0s;
  -webkit-transition: top 0s;
}

.alarm-list .alarm-item {
  width: 95%;
  margin: 2rem 2.5% 0;
  max-height: 109px;
  height: 10.9rem;
  /*  background-image: linear-gradient(
    to right,
    rgba(125, 125, 125, 0.17) 0%,
    rgba(6, 6, 6, 0.35) 98%
  ); */
  /*   background: rgba(36,46,65,0.39);
  border: 1px solid rgba(44,83,156, 1); */
  background: rgba(36, 46, 65, 0.39);
  border: 1px solid rgba(44, 83, 156, 0.39);
  display: flex;
  align-items: center;
  justify-content: center;
}

.alarm-item > div {
  width: 25%;
  text-align: center;
  font-family: Acens;
  font-size: 1.8rem;
  color: #fbfdff;
}

.alarm-item > div:nth-of-type(1) {
  width: 18%;
}

.alarm-item > div:nth-of-type(2) {
  letter-spacing: 0.2rem;
}

.alarm-item > div:nth-of-type(3) {
  letter-spacing: 0.2rem;
}

.alarm-item .header-box {
  width: 9rem;
  height: 8.2rem;
  background-image: url(../assets/imgs/header-box.png);
  background-size: 100%;
  margin: 0 auto;
  position: relative;
}

.alarm-item .header-box img {
  width: 7.3rem;
  height: 7.3rem;
  position: absolute;
  left: 1.2rem;
  top: 0.4rem;
  box-shadow: inset 0 0 1rem 0 rgba(96, 83, 66, 0.7);
  border-radius: 0.8rem;
  z-index: 2;
}

.alarm-item .header-box img:nth-of-type(1) {
  width: 7.1rem;
  height: 7.1rem;
  left: 1.25rem;
  top: 0.65rem;
  border-radius: 0.7rem;
  z-index: 1;
}

.alarm-item > div:nth-of-type(1) {
  width: 18%;
}

.alarm-item > div:nth-of-type(4) {
  width: 32%;
  font-family: PingFang-Regular;
  font-size: 1.4rem;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

@keyframes circle-move {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(-360deg);
  }
}

@keyframes circle-move1 {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* 弹窗 */
.modal {
  min-width: 28%;
  min-height: 46%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.alarm-modal {
  width: 39%;
  height: 44%;
  background: #212121;
  box-shadow: inset 0 0 1.2rem 0 rgba(200, 159, 99, 0.7);
  box-sizing: border-box;
  padding: 1%;
}

.header-modal {
  width: 28%;
  height: 46%;
 /*  background-image: url(../assets/imgs/header-box-large.png);
  background-size: 100% 100%; */
  position: relative;
}

.header-big-box {
  width: 81%;
  height: 88%;
  background: transparent;
  background: linear-gradient(-45deg, #2a2727 20px, transparent 0) bottom right,
    linear-gradient(45deg, #2a2727 20px, transparent 0) bottom left,
    linear-gradient(135deg, #2a2727 20px, transparent 0) top left,
    linear-gradient(-135deg, #2a2727 20px, transparent 0) top right;
  background-size: 51% 51%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12%;
  margin-top: 5.3%;
  overflow: hidden;
  position: absolute;
  z-index: 1;
}

.header-big-text {
  position: absolute;
  right: -13.1rem;
  top: 22.5%;
}

.header-big-text p {
  position: relative;
  left: 33%;
  font-family: Acens;
  font-size: 2rem;
  color: #ffffff;
}

.header-big-text p:nth-of-type(3) {
  font-family: PingFang-Regular;
  font-size: 1.8rem;
}

.header-modal .img {
  width: 80.6%;
  height: 87.4%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  margin-left: 12.3%;
  margin-top: 5.5%;
  background-color: transparent;
  position: absolute;
  z-index: 0;
}

.btn-close {
  width: 17.4rem;
  height: 5.2rem;
  background-image: url("../assets/imgs/btn-close.png");
  background-size: 100%;
  font-family: PingFang-Regular;
  font-size: 1.6rem;
  color: #ffffff;
  letter-spacing: 0;
  text-align: center;
  line-height: 5.2rem;
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  margin-left: -8.7rem;
  cursor: pointer;
}
</style>


