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
      chart_obj:'',
      option:{
         chart: {
            type: 'bar'
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
        colors:['#8FE8D7'],
        title: {
            text: null
        },
        xAxis: {
            categories: this.data.xAxis,
            title: {
                text: null
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: null,
                align: 'high'
            },
            labels: {
                overflow: 'justify',
                rotation: -45
            }
        },
        tooltip: {
          pointFormat: 'Volume : {point.y:.,0f}'
        },
        plotOptions: {
            bar: {
                
                pointWidth:12
            }
        },
        credits: {
            enabled: false
        },
         legend: {
          enabled: false
        },
        series:  this.data.series
    }
    }
  },
  mounted(){
    this.chart_obj = HighCharts.chart(this.id,this.option)
    // this.chart_obj.showLoading();

    //  setTimeout(() => {
    //       this.chart_obj.hideLoading()
    //     }, 13000);
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