<template>
    <div class="area-box">
       <div class="house-map">
            <img v-show="currentFloor==1" src="@/assets/imgs/house-map.png" alt="">
            <img v-show="currentFloor==2" src="@/assets/imgs/house-map1.png" alt="">
            <!-- 摄像头区域 -->
            <div class="monitors" v-show="currentFloor==1">
                <div class="monitor-item" v-for="(item,index) in pointList" :key="index" v-bind:class="'m'+ (index+1)" v-bind:style="`top:${item.top}%;left:${item.left}%;transform:rotate(${item.rotate}deg)`">
                    <img src="@/assets/imgs/monitor1.png" alt="">
                    <point-ware></point-ware>
                </div>
            </div>
            <!-- 头像信息区域 -->
            <div class="header-infos" v-show="currentFloor==1">
              <div class="header-card"  v-for="(item,index) in pointList" :key="index" v-bind:class="'m'+ (index+1)" v-bind:style="`top:${item.ctop}%;left:${item.cleft}%;`">
                <div class="shadow"></div>
                <div class="header"></div>
                <div class="header-text">
                  <p>12 : 16 : 08 — 12 : 19 : 08</p>
                  <p>停留时长:2分钟</p>
                  <p>停车场</p>
                </div>
              </div>
            </div>
       </div>
       <div class="floor-btn">
           <div v-bind:class="currentFloor==1?'active':''" @click="changeFloor(1)">
               <span>F1</span>
           </div>
           <div v-bind:class="currentFloor==2?'active':''" @click="changeFloor(2)">
               <span>F2</span>
           </div>
       </div>
    </div>
</template>
<script>
import PointWare from "@/components/PointWare.vue";
export default {
  name: "areaModule",
  components: {
    PointWare
  },
  data() {
    return {
      currentFloor: 1,
      pointList: [
        {
          id:1,
          left: 9,
          top: 60,
          cleft: 16,
          ctop: 60,
        },
        {
          id:2,
          left: 30,
          top: 48,
          cleft:34,
          ctop:44
        },
        {
          id:3,
          left: 1,
          top: 79,
          cleft:1,
          ctop:89
        },
        {
          id:4,
          left: 80,
          top: 50,
          cleft:80,
          ctop:60
        },
        {
          id:5,
          left: 9,
          top: 12,
          cleft:13,
          ctop:-10
        },
        {
          id:6,
          left: 1,
          top: 59,
          rotate: 281,
          cleft:-4,
          ctop:23
        }
      ]
    };
  },
  methods: {
    changeFloor(mark) {
      this.currentFloor = mark;
    }
  }
};
</script>
<style scoped>
.area-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.house-map {
  width: 106.2rem;
  height: 40.6rem;
  position: relative;
}

.house-map .monitors {
  position: absolute;
  z-index: 1;
}

.house-map > img {
  position: absolute;
  z-index: 0;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.floor-btn {
  position: absolute;
  bottom: 1.5rem;
  right: 1.5em;
  z-index: 2;
}

.floor-btn div {
  display: block;
  cursor: pointer;
  width: 3.2rem;
  height: 3.2rem;
  margin-bottom: 1rem;
  background: rgba(0, 156, 254, 0.2);
  font-family: PingFang-Regular;
  font-size: 1.3rem;
  color: #ffffff;
  text-align: center;
  line-height: 3.2rem;
}

.floor-btn div.active {
  background: #009cfe;
}

.floor-btn div.active span {
  display: inline-block;
  width: 2.1rem;
  height: 2.1rem;
  margin: 0.4rem;
  line-height: 2rem;
  border: 0.1rem solid #fff;
}

.monitors {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
}

/* 摄像头样式 */
.monitor-item {
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #9bd9ff;
}

.monitor-item > img {
  position: absolute;
  bottom: 1.4rem;
  left: -0.5rem;
}

/* 头像信息 */
.header-card {
  width: 16.8rem;
  height: 11rem;
  background-color: #141c2a;
  background-image: url(../../assets/imgs/info-box1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  left: 40%;
  top: 40%;
}

.header-card .shadow {
  width: 16.5rem;
  height: 10.4rem;
  background: url(../../assets/imgs/info-box.png) no-repeat 0;
  background-size: 100%;
  position: absolute;
  top: 2px;
  left: 2px;
}

.header-card .header {
  width: 7rem;
  height: 7rem;
  background: url(../../assets/imgs/header-box-small.png) no-repeat 0;
  background-size: 100%;
  position: absolute;
  top: -4.5rem;
  left: 4.5rem;
}

.header-card > div p {
  font-family: Acens;
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  margin: 0.1rem;
}

.header-card > div p:nth-of-type(3) {
  font-family: PingFang-Regular;
  font-size: 1rem;
  color: #0098f5;
}

.header-text{
  margin-top: 4rem;
}
</style>


