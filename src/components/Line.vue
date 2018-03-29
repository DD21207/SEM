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
              type: 'line'
          },
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
          colors:['#4AC7DC','#E96C39'],
          title: {
              text: null
          },
           credits: {
          enabled: false
        },
          xAxis: {
              categories: this.data.xAxis,
              labels: {
                rotation: -45
            }
          },
          yAxis: {
              title: {
                  text: null
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