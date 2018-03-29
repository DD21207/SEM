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
            type: 'area'
        },
         colors: ['#2FD0B5', '#69D3D8', '#1A7897', '#03004C', '#8085e9',
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
        credits: {
          enabled: false
        },
        legend: {
          enabled: false
        },
        title: {
            text: null
        },
        xAxis: {
          categories: this.data.xAxis,
          tickmarkPlacement: 'on',
          tickLength: 3,
          allowDecimals: false,
          labels: {
            formatter: function() {
              return this.value; // clean, unformatted number for year
            }
          }
        },
        yAxis: {
            gridLineDashStyle: 'dash',
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                    return this.value / 1000 + 'k';
                }
            }
        },
        tooltip: {
            pointFormat: 'Sub Category:{series.name} <br>Volume : {point.y:.,0f}'
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