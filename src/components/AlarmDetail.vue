<template>
    <div class="alarm-info-box">
        <div class="alarm-img">
            <img v-bind:src="info.img?info.img:''" alt="">
        </div>
        <div class="alarm-info">
            <div>
                <span>报警状态:</span>
                <span>进入危险区域</span>
            </div>
            <div>
                <span>报警设备:</span>
                <span>危险区域摄像头</span>
            </div>
            <div>
                <span>报警地点:</span>
                <span>大厅危险区域</span>
            </div>
            <div>
                <span>报警时间:</span>
                <span style="white-space:normal;">{{info.time}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "AlarmDetail",
  props: {
    info:{
      type:Object,
      default:{
        img:"",
        time:""
      }
    }
  }
};
</script>
<style scoped>
.alarm-info-box {
  width: 100%;
  height: 75%;
  margin-top: 2rem;
  background-color: rgba(31,40,57, 0.39);
  display: flex;
  align-items: center;
  justify-content: center;
}

.alarm-img {
  width: 58%;
  height: 83.5%;
  /*background-color: #192741;*/
  background: url(../assets/imgs/alarm-box.png) no-repeat center;
  background-size: 100% 100%;
  float: left;
}

.alarm-img img{
    width: 97%;
  height: 95%;
  
  margin-left: 1%;
  margin-top: 2%;
}

.alarm-info {
  float: left;
  font-size: 1.6rem;
  font-family: PingFang-Regular;
  letter-spacing: 0;
  height: 86%;
}

.alarm-info > div {
  margin-left: 3.6rem;
  display: flex;
  align-items: center;
  height: 25%;
}

.alarm-info > div span:nth-of-type(1) {
  clear: both;
  float: left;
  display: inline-block;
  position: relative;
}

.alarm-info > div span:nth-of-type(1)::after {
  content: "";
  width: 6.6rem;
  height: 0.7rem;
  background-color: rgba(0,157,255,0.27);
  position: absolute;
  bottom: -0.2rem;
  left: 0;
  z-index: -1;
}

.alarm-info > div span:nth-of-type(2) {
  float: left;
  color: #009AFA;
  margin-left: 1.5rem;
  max-width: 12rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>


