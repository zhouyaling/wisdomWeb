<template>
    <div class="house-point-box">
        <div></div>
        <div></div>
        <div class="house-point"></div>
        <div class="hot-camera-0"></div>
    </div>
</template>
<script>
export default {
  name:"PointWare"
}
</script>

<style scoped>
.house-point-box {
  position: absolute;
  width: 35px;
  height: 35px;
  left: -12px;
  top: -12px;
}

.house-point-box div:nth-of-type(1) {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(155,217,255, 0.1);
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 2px;
  margin-top: 2px;
  opacity: 0;
  animation: show-big-1 2s linear infinite;
  -webkit-animation: show-big-1 2s linear infinite;
}

.house-point-box div:nth-of-type(2) {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: rgba(155,217,255, 0.2);
  position: absolute;
  left: 0;
  top: 0;
  margin-left: 5px;
  margin-top: 5px;
  opacity: 0;
  animation: show-big-2 2s linear infinite;
  -webkit-animation: show-big-2 2s linear infinite;
}

@keyframes show-big-1 {
  0% {
    opacity: 0;
    transform: scale3d(0, 0, 1);
  }
  80% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  100% {
    opacity: 0;
    transform: scale3d(1, 1, 1);
  }
}

@-webkit-keyframes show-big-1 {
  0% {
    opacity: 0;
    transform: scale3d(0, 0, 1);
  }
  80% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  100% {
    opacity: 0;
    transform: scale3d(1, 1, 1);
  }
}

@keyframes show-big-2 {
  0% {
    opacity: 0;
    transform: scale3d(0, 0, 1);
  }
  50% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  100% {
    opacity: 0;
    transform: scale3d(1, 1, 1);
  }
}

@-webkit-keyframes show-big-2 {
  0% {
    opacity: 0;
    transform: scale3d(0, 0, 1);
  }
  50% {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
  100% {
    opacity: 0;
    transform: scale3d(1, 1, 1);
  }
}

.house-point {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(155,217,255, 1);
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  cursor: pointer;
  text-align: center;
  color: #fff;
  font-size: 12px;
  line-height: 17px;
}


.point-number {
  position: absolute;
  color: #fff;
  font-size: 12px;
  width: 45px;
  height: 45px;
  text-align: center;
  line-height: 45px;
  font-family: pictos;
  z-index: 999;
}
</style>


