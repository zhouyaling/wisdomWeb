<template>
    <div class="container">
        <!-- 中间内容区域 -->
            <slot name="main"></slot>
            <!-- 弹窗区域 -->
            <slot name="panel"></slot>
        <!-- 两边样式 -->
        <div class="wrap" :class = "blur?'blur-style':''">
            <div class="tip logo">
                <img src="@/assets/imgs/logo.png" alt="">
            </div>
            <div class="tip left-top-tip">
                <img src="@/assets/imgs/icon-triangle.png" alt="">
                <img src="@/assets/imgs/tip3.png" alt="">
            </div>
            <div class="tip right-top-tip">
                <img src="@/assets/imgs/icon-circle1.png" alt="">
                <img src="@/assets/imgs/tip1.png" alt="">
                <span class="tip-number"></span>
            </div>
            <div class="tip left-bottom-tip">
                <img src="@/assets/imgs/icon-line.png" alt="">
            </div>
             <div class="tip right-bottom-tip">
                <img src="@/assets/imgs/icon-line.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import Digit from "@/assets/js/number.js";

export default {
  name: "IndexLayout",
  props: ["blur"],
  mounted() {
    this.changeNumber();
    setInterval(this.changeNumber, 15000);
  },
  methods: {
    changeNumber() {
      var dom = document.querySelector(".tip-number");
      dom.innerHTML = "";
      var digit = new Digit({
        number: parseFloat(Math.random() * 9999999 + 1000000).toFixed(2), //164582.52, // 到达指定数值停止滚动
        finish: 6, // 整体完成时间
        speed: 1, // 数值越大，越多数字同时进行翻滚，取值范围（1 ~ 10）
        direction: "right", // 动画方向
        dom: dom // 在指定dom节点插入动画
      });

      digit.render(); // 执行
    }
  }
};
</script>
<style scoped>
.container {
  height: 100%;
  position: relative;
}

.main {
  position: absolute;
  /* left: 0;
  top: 0; */
  left: 11%;
  top: 12.5%;
  z-index: 1;
  width: 81%;
  height: 83%;
  /*  margin: 7% 8.5% 0% 12.5%; */
}

.wrap {
  position: absolute;
  width: 100%;
  height: 100%;
}

.panel {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
}

.tip {
  position: absolute;
}

.logo {
  left: 3.5%;
  top: 5%;
}

.left-top-tip {
  left: 3.5%;
  top: 16.5%;
}

.right-top-tip {
  right: 3.5%;
  top: 5%;
}

.left-bottom-tip {
  left: 3.5%;
  bottom: 5%;
}

.right-bottom-tip {
  right: 3.5%;
  bottom: 5%;
}

.left-top-tip > img:nth-of-type(2) {
  margin-left: 40px;
}

.left-top-tip > img:nth-of-type(1) {
  position: absolute;
  transform: translateY(-0.8rem);
  animation: triangle-move 15s linear infinite;
}

.right-top-tip > img:nth-of-type(1) {
  position: absolute;
  top: 0.8rem;
  right: 2.9rem;
  animation: circle1-move 15s linear 5s infinite;
}

.tip-number {
  display: inline-block;
  position: absolute;
  color: #029FD8;
  font-size: 1rem;
  top: 1rem;
  right: 5rem;
}

@keyframes circle1-move {
  0% {
    transform: rotate(0);
  }

  58% {
    transform: rotate(360deg);
    opacity: 1;
  }
  60% {
    transform: rotate(360deg);
    opacity: 0.4;
  }

  62% {
    transform: rotate(360deg);
    opacity: 1;
  }

  64% {
    transform: rotate(360deg);
    opacity: 0.4;
  }

  66% {
    transform: rotate(360deg);
    opacity: 1;
  }

  100% {
    transform: rotate(360deg);
    opacity: 1;
  }
}

@keyframes triangle-move {
  0% {
    transform: translateY(-8px);
    opacity: 0.2;
  }

  24.9% {
    transform: translateY(-8px);
    opacity: 1;
  }
  25% {
    transform: translateY(40px);
    opacity: 0.2;
  }

  49.9% {
    transform: translateY(40px);
    opacity: 1;
  }
  50% {
    transform: translateY(110px);
    opacity: 0.2;
  }

  74.9% {
    transform: translateY(110px);
    opacity: 1;
  }
  75% {
    transform: translateY(200px);
    opacity: 0.2;
  }

  99.9% {
    transform: translateY(200px);
    opacity: 1;
  }
  100% {
    transform: translateY(200px);
    opacity: 0.2;
  }
}
</style>
<style>
.to__led-number {
  font-family: Din;
  position: relative;
  padding: 0 0.03rem;
  text-align: center;
  display: inline-block;
  vertical-align: middle;
  box-sizing: border-box;
}

.to__led-number--no {
  padding-right: 0.5rem;
  background: unset;
  border: none;
}
</style>



