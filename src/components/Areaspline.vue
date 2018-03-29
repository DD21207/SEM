<template>
  <div class="x-bar">
    <div :id="id"
    :data="data"></div>
  </div>
</template>

<script>
import HighCharts from 'highcharts'
import HighchartsNoData from 'highcharts/modules/no-data-to-display';
HighchartsNoData(HighCharts)
export default {
  // 验证类型
  props: {
    id: {
      type: String
    },
    data: {
     
    }
  },
  data(){
    return {
      option:{
        chart: {
          type: 'areaspline'
        },
        colors: ['#2FD0B5', '#f5dab1', '#90ed7d', '#f7a35c', '#8085e9',
          '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'
        ],
         lang: {
            noData: "SELECTED COMBINATION HAS NO DATA" //真正显示的文本
        },
        noData: {  
            // Custom positioning/aligning options  
            position: {    //相对于绘图区定位无数据标签的位置。 默认值：[object Object].
                align: 'center',  
                y:-20
            },  
            // Custom svg attributes  
            attr: {     //无数据标签中额外的SVG属性
                //'stroke-width': 1,  
                //stroke: '#cccccc'  
            },  
            // Custom css  
            style: {    //对无数据标签的CSS样式。 默认值：[object Object].                    
                //fontWeight: 'bold',       
                //fontSize: '15px',  
                //color: '#202030'          
            }  
        },
        title: {
          text: null
        },
        xAxis: {
          categories: this.data.xAxis,
          tickmarkPlacement: 'on',
          tickLength: 0,
          gridLineDashStyle: 'dash',
          gridLineWidth: 1,
          allowDecimals: false,
          labels: {
            formatter: function() {
              return this.value; // clean, unformatted number for year
            }
          }
        },
        yAxis: [{
          title: {
            text: null
          },
          labels: {
            formatter: function() {
              return this.value / 1000 + 'k';
            }
          },
          gridLineWidth: 0,
          }],
        legend: {
          enabled: true
        },
        credits: {
          enabled: false
        },
        tooltip: {
          pointFormat: 'Volume : {point.y:.,0f}'
        },
        scrollbar: {
          enabled: true
        },
        plotOptions: {
            areaspline: {
                marker: {
                    enabled: false,
                    symbol: 'circle',
                    radius: 2,
                    states: {
                        hover: {
                            enabled: true
                        }
                    }
                }
            }
        },
        series: this.data.series
      }
    }
  },
  mounted(){
    HighCharts.chart(this.id,this.option)
  },
  methods: {  
        queryTrendData: function(){
          this.option.xAxis.categories = this.data.xAxis
          this.option.series = this.data.series
          HighCharts.chart(this.id,this.option)
        }  
    }, 
  watch:{
    'data.series': 'queryTrendData'
  },
}
</script> 