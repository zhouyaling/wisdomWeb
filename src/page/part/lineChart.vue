<template>
    <div style="width:100%;height:100%;"  id="lineChart" ref="lineChart"></div>
</template>
<script>
export default {
  name: "lineChart",
  props: ["color", "xData","yData", "name"],
  data() {
    return {};
  },
  watch: {
    xData(val,old) {
      if (val) {
        this.initChart();
        let myChart = this.$echarts.init(this.$refs.lineChart);
        myChart.setOption(this.loginLine);
      }
    }
  },
  mounted() {
    this.initChart();
    let myChart = this.$echarts.init(this.$refs.lineChart);
    myChart.setOption(this.loginLine);
  },
  methods: {
    initChart() {
      this.loginLine = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "5%",
          right: "9%",
          bottom: "0%",
          top: "12%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.xData,
            boundaryGap: false,
            name: this.name == "今日车流量" ? "(h)" : "",
            nameLocation: "end", //坐标位置，支持start,end，middle
            nameTextStyle: {
              color: "#ffffff",
              fontSize: 8,
              padding: 0
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false //去掉网格线
            },
            axisLabel: {
              show: true,
              color: "#ffffff",
              fontSize: 10,
              fontFamily: "Acens"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "(辆)",
            nameLocation: "end", //坐标位置，支持start,end，middle
            nameTextStyle: {
              color: "#ffffff",
              fontSize: 8,
              padding: 0
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#1E2B43"
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false //去掉网格线
            },
            axisLabel: {
              show: true,
              color: "#ffffff",
              fontSize: 10,
              fontFamily: "Acens"
            }
          }
        ],
        series: [
          {
            name: this.name,
            type: "line",
            smooth: false, // 设置曲线和直线
            normal: {},
            emphasis: {},
            itemStyle: {
              opacity: 0
            },
            lineStyle: {
              color: this.color //"#2B97D6"
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color:
                      this.name == "今日车流量"
                        ? "rgba(0,148,242,0.4)"
                        : "rgba(0,151,245,0.4)"
                  },
                  {
                    offset: 0.85,
                    color:
                      this.name == "今日车流量"
                        ? "rgba(0,148,242,0.12)"
                        : "rgba(0,151,245,0.12)"
                  },
                  {
                    offset: 1,
                    color:
                      this.name == "今日车流量"
                        ? "rgba(0,148,242,0.03)"
                        : "rgba(0,151,245,0.03)"
                  }
                ],
                global: false // 缺省为 false
              }
            },
            data: this.yData
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
</style>


