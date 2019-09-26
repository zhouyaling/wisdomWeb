<template>
    <div style="width:100%;height:100%;"  id="pieChart" ref="pieChart"></div>
</template>
<script>
export default {
  name: "pieChart",
  data() {
    return {
      color: ["#0148E3", "#01C3E3", "#0148E3", "#0098F8", "#88D1FF", "#0388DB"],
      pie: {}
    };
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
          "#0148E3",
          "#01C3E3",
          "#0148E3",
          "#0098F8",
          "#88D1FF",
          "#0388DB"
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
            data: [
              {
                value: 0,
                name: "5",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#0388DB" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#0388DB" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "1",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#0148E3" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#0148E3" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "2",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#01C3E3" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#01C3E3" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "3",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#00C6FF" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#00C6FF" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "4",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#0098F8" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#0098F8" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              },
              {
                value: 0,
                name: "5",
                itemStyle: {
                  color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                      {
                        offset: 0,
                        color: "#88D1FF" // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: "#88D1FF" // 100% 处的颜色
                      }
                    ],
                    global: false // 缺省为 false
                  },
                  shadowColor: "rgba(255,255,255,0.23)",
                  shadowBlur: 8,
                  shadowOffsetX: 2
                }
              }
            ]
          }
        ]
      };
    }
  }
};
</script>
<style scoped>
</style>


