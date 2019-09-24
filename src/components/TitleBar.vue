<template>
    <div class="title-bar">
        <img v-if="icon" src="@/assets/imgs/icon-warn.png" alt="">
        <span>{{title}}</span>
        <span>{{subText}}</span>
    </div>
</template>
<script>
export default {
  name: "TitleBar",
  props: ["icon","title", "subText"]
};
</script>
<style scoped>
.title-bar {
  width: 100%;
  height: 6.7rem;
  background-image: url("../assets/imgs/title-bar.png");
  background-repeat: no-repeat;
  background-position: left;
  background-size: 100% 100%;
  padding: 0 4%;
  box-sizing: border-box;
  font-family: PingFang-Regular;
  display: flex;
  align-items: center;
}

.title-bar img{
  margin-right: 1.5rem;
}

.title-bar > span:nth-of-type(1) {
  font-size: 2.1rem;
  width: 50%;
}

.title-bar > span:nth-of-type(2) {
    width: 50%;
  font-size: 1.4rem;
color: #9D9D9D;
  letter-spacing: 0;
  text-align: right;
}
</style>


