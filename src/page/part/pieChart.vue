<template>
    <div style="width:100%;height:100%;"  id="pieChart" ref="pieChart"></div>
</template>
<script>
export default {
  name: "pieChart",
  props: ["data"],
  data() {
    return {
      color: ["#0148E3", "#01C3E3", "#0148E3", "#0098F8", "#88D1FF", "#0388DB"],
      pieData: [
        { value: 0, name: "1" },
        { value: 0, name: "2" },
        { value: 0, name: "3" },
        { value: 0, name: "4" },
        { value: 0, name: "5" }
      ],
      pie: {}
    };
  },
  watch: {
    data(val) {
      this.pieData=[];
      this.data.forEach(element => {
        this.pieData.push({ name: element.carType, value: (element.Percentage.replace('%','')) });
      });
      this.initPie();
      let myChart = this.$echarts.init(this.$refs.pieChart);
      myChart.setOption(this.pie);
    }
  },
  mounted() {
    this.initPie();
    let myChart = this.$echarts.init(this.$refs.pieChart);
    myChart.setOption(this.pie);
  },
  methods: {
    initPie() {
      this.pie = {
        color: [
          "#0388db",
          "#0148e3",
          "#01c3e3",
          "#00C6FF",
          "#0098F8",
          "#88d1ff"
        ],
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["64%", "80%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: false,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.pieData
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
</style>


