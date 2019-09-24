<template>
  <div class="hello">
    <img v-bind:src="img" alt="">
    <button @click="judge">人脸检测</button>
  </div>
</template>

<script>
var https = require("https");
var qs = require("querystring");

const param = qs.stringify({
  grant_type: "client_credentials",
  client_id: "UATlaF8G1zswL91yDEVNVODs",
  client_secret: "GLNOAlax3iVrILmWYfgUxH291ykmWvoB"
});

export default {
  name: "HelloWorld",
  data() {
    return {
      img: "https://staticfile.tq-service.com/image/szacSystem/20190827/e8a1a66d16fd47579d80dbe633029c72.jpg",////aip.bdstatic.com/portal-pc-node/dist/1566909043151/images/technology/face/detect/demo-card-1.jpg
    };
  },
  mounted(){
    this.getAccessToken();
  },
  methods: {
    // 鉴权
    getAccessToken() {
      let token = window.sessionStorage.getItem("token");
      if(token) return;
      this.$axios
        .get("/oauth/2.0/token?" + param)
        .then(response => {
         console.log(response.data);
         window.sessionStorage.setItem("token",response.data.access_token);
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    judge() {
      const token = window.sessionStorage.getItem("token");
      this.$axios
        .post(
          "/rest/2.0/face/v3/detect?access_token=" + token,
          {
            image: this.img,
            image_type: "URL",
            face_field:"age,beauty,expression,type"
          },
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log(response.data);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello img {
  width: 500px;
}
</style>
