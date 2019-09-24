<template>
    <div class="header-box">
        <img  src="@/assets/imgs/header-default.png" alt="">
    </div>
</template>
<script>
export default {
  name: "HeaderBox",
  props: ["img"]
};
</script>
<style scoped>
.header-box {
  width: 9rem;
  height: 8.2rem;
  background-image: url(../assets/imgs/header-box.png);
  background-size: 100%;
  margin: 0 auto;
  position: relative;
}

.header-box img {
  width: 7.3rem;
  height: 7.3rem;
  position: absolute;
  left: 1.2rem;
  top: 0.4rem;
  box-shadow: inset 0 0 1rem 0 rgba(96, 83, 66, 0.7);
  border-radius: 0.8rem;
  z-index: 2;
}

.header-box img:nth-of-type(1) {
  width: 6.9rem;
  height: 6.9rem;
  left: 1.4rem;
  top: 0.6rem;
  border-radius: 6px;
  z-index: 1;
}
</style>
