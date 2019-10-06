<template>
    <div class="area-box">
       <div class="house-map">
            <canvas v-show="currentFloor==1" class="canvas" ref="myCanvas"></canvas>
            <!-- 摄像头区域 -->
            <div class="monitors" v-show="currentFloor==1">
                <div class="monitor-item" v-for="(item,index) in pointList" :key="index" v-bind:class="'m'+ (index+1)" v-bind:style="`top:${item.top}rem;left:${item.left}rem;transform:rotate(${item.rotate}deg)`">
                    <img src="@/assets/imgs/monitor1.png" alt="">
                    <point-ware></point-ware>
                </div>
            </div>
            <!-- 头像信息区域 -->
            <div class="header-infos" v-show="currentFloor==1">
              <div class="header-card"  v-for="(item,index) in headerListCacheData" :key="index" v-bind:class="'m'+ (index+1)" v-bind:style="`top:${item.ctop}rem;left:${item.cleft}rem;`">
                <div class="shadow"></div>
                <div class="header"><img v-bind:src="item.image" alt=""></div>
                <div class="header-text">
                  <p>{{item.time | splitDate}}</p>
                  <p>{{item.time | splitTime}}</p>
                  <!-- <p>停留时长:2分钟</p> -->
                  <p>{{item.pointName}}</p>
                </div>
              </div>
            </div>
            <img class="floor-img1" v-show="currentFloor==1" src="@/assets/imgs/house-map.png" alt="">
            <img class="floor-img2" v-show="currentFloor==2" src="@/assets/imgs/house-map1.png" alt="">
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
  props: ["way"],
  data() {
    return {
      currentFloor: 1,
      pointList: [
       
        {
          id: 1,
          left: 46.4,
          top: 19.6,
          cleft: 44,
          ctop: 21.8,
          name:"点位1"
        },
        {
          id: 2,
          left: 26,
          top: 40.1,
          cleft: 27,
          ctop: 40,
          name:"点位2"
        },
         {
          id: 3,
          left: 2,
          top: 24.5,
          cleft:-1.5,
          ctop: 30,
          name:"点位3"
        },
       /* {
          id: 4,
          left: 80.6,
          top: 20.6,
          cleft: 65,
          ctop: 24.2,
          name:"点位4"
        },*/
         {
          id: 4,
          left: 4.1,
          top: 19.9,
          /*rotate: 281,*/
          cleft:9.2,
          ctop: 16,
          name:"点位4"
        },
        {
          id:5,
          left: 9,
          top: 13,
          cleft: 12.8,
          ctop: 0.15,
          name:"点位5"
        },
       
      ],
      infoList: [], // 点位信息

      headerListCacheData: [], // 已渲染头像信息
      points: [], // 分解后的所有动线点
      t: 1, // 当前canvas所画的points长度
      q: 0, // 当前渲染的监控点
      ctx: "",
      c: ""
    };
  },
  watch: {
    way(val) {
      this.showWay();
    }
  },
  filters:{
    splitDate(val) {
      return val && val.split(" ")[0] ? val.split(" ")[0] : "";
    },
    splitTime(val) {
      return val && val.split(" ")[0] ? val.split(" ")[1] : "";
    }
  },
  mounted() {
    this.showWay();
  },
  methods: {
    // 展示动线
    showWay() {
      if (this.way.length > 0) {
        this.drawLine();
      }
    },

    // 画线
    drawLine() {
      // 清空动线和点以及头像
      this.points = [];
      this.headerListCacheData = [];

      var canvas = this.$refs.myCanvas;
      this.ctx = canvas.getContext("2d");
      //this.ctx.imageSmoothingEnabled = true;
      canvas.width = 1062 * 1;
      canvas.height = 406 * 1;
      this.ctx.beginPath();
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);

      this.q = 0;
      var vertices = [];
      var cacheListData = [];
      console.log("way:",this.way);
      this.way.forEach((element, index) => {
        this.pointList.forEach(item => {
          if (item.id == element.CameraID) {
            // 点
            vertices.push({
              x: item.left *10,
              y: item.top *10
            });
            // 头像
            cacheListData.push({
              ...element,
              ctop: item.ctop,
              cleft: item.cleft,
              pointName:item.name
            });
          }
        });
      });

      this.infoList = cacheListData;

      if (vertices.length > 1) {
        this.points = this.calcWaypoints(vertices);
      } else {
        this.drawHeadInfo(0);
      }

      this.ctx.lineWidth = 3;
      this.ctx.lineCap = "round";
      this.ctx.lineJoin = "round";
      //this.ctx.shadowOffsetX = 0; // 设置水平位移
      //this.ctx.shadowOffsetY = 0; // 设置垂直位移
      //this.ctx.shadowBlur = 5; // 设置模糊度
      //this.ctx.shadowColor = "rgba(127,167,255,0.5)"; // 设置阴影颜色
      this.ctx.strokeStyle = "rgba(45,149,255,1)";
      this.t = 1;

      this.animate();
    },

    // 画头像信息
    drawHeadInfo(q) {
      this.headerListCacheData.push(this.infoList[q]);
    },

    // 渲染
    animate() {
      if (this.t < this.points.length) {
        if (
          this.t == 1 ||
          this.t == this.points.length - 1 ||
          this.points[this.t].start
        ) {
          this.drawHeadInfo(this.t != 1 ? this.points[this.t].start : 0);
          this.q++;
        }
        requestAnimationFrame(this.animate);
      } else {
        return;
      }
      this.ctx.beginPath();
      this.ctx.moveTo(this.points[this.t - 1].x, this.points[this.t - 1].y);
      this.ctx.lineTo(this.points[this.t].x, this.points[this.t].y);
      this.t++;
      this.ctx.stroke();
    },

    // 分解点
    calcWaypoints(vertices) {
      var waypoints = [];
      var mark = 30;
      for (var i = 1; i < vertices.length; i++) {
        var pt0 = vertices[i - 1];
        var pt1 = vertices[i];
        var dx = pt1.x - pt0.x;
        var dy = pt1.y - pt0.y;

        if (Math.abs(dx) + Math.abs(dy) < 300) {
          mark = 30;
        } else {
          mark = 50;
        }

        for (var j = 0; j < mark; j++) {
          var x = pt0.x + dx * j / mark;
          var y = pt0.y + dy * j / mark;
          var zz = j == 0 ? i - 1 : false;
          waypoints.push({
            x: x,
            y: y,
            start: i == vertices.length - 1 && j == mark - 1 ? i : zz
          });
        }
      }
      return waypoints;
    },

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

.house-map canvas {
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 1;
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
  width: 3.2rem;
  height: 2.5rem;
}
.monitor-item:nth-of-type(2)>img,
.monitor-item:nth-of-type(1)>img{
  position: absolute;
    bottom: 1.4rem;
    left: -2rem;
    width: 3.2rem;
    height: 2.5rem;
    transform: rotate(-110deg);
}

.monitor-item:nth-of-type(5)>img{
  position: absolute;
  bottom: -1.6rem;
  left: 0.5rem;
  width: 3.2rem;
  height: 2.5rem;
  transform: rotate(58deg);
}

.monitor-item:nth-of-type(4)>img{
  position: absolute;
  bottom: -1.6rem;
  left: 0.5rem;
  width: 3.2rem;
  height: 2.5rem;
  transform: rotate(58deg);
}

/* 头像信息 */
.header-card {
  width: 16.8rem;
  height: 11rem;
  background-color: rgba(20,28,42,0.5);
  background-image: url(../../assets/imgs/info-box1.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  left: 40%;
  top: 40%;
  z-index: 1;
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

.header-card .header img {
  width: 80%;
  height: 80%;
  margin-left: 14%;
  margin-top: 12%;
  border-radius: 5px;
}

.header-card > div p {
  font-family: Din;
  font-size: 1.2rem;
  color: #ffffff;
  text-align: center;
  margin: 0.1rem;
  letter-spacing: 0.2rem;
}

.header-card > div p:nth-of-type(3) {
  font-family: PingFang-Regular;
  font-size: 1rem;
  color: #0098f5;
}

.header-text {
  margin-top: 4rem;
}

  .floor-img1{
      width:98%;
    height: auto;
    transform: scale(1,1.06) translate(-50%, -50%);
  }

   .floor-img2{
    width:73.4rem;
    height: 42.4rem;
   }


</style>


