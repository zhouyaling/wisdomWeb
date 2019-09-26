
<template>
    <div class="small-header-box">
        <img  v-bind:src="img" alt="">
    </div>
</template>
<script>
export default {
  name: "HeaderBox",
  props: ["img"]
};
</script>
<style scoped>
.small-header-box {
  width: 5.3rem;
  height: 5.3rem;
  background-image: url(../assets/imgs/header-box.png);
  background-size: 100%;
  background-repeat: no-repeat;
  /* margin: 0 auto; */
  position: relative;
}

.small-header-box img {
  width: 4rem;
  height: 4rem;
  position: absolute;
  left: 0.9rem;
  top: 0.4rem;
  box-shadow: inset 0 0 10px 0 rgba(96, 83, 66, 0.7);
  border-radius: 0.3rem;
  z-index: 2;
}
</style>
