<template>
  <div class="x-bar">
    <div :id="id"
    :data="data"></div>
  </div>
</template>

<script>
import HighCharts from 'highcharts'
import HighchartsMore from 'highcharts/highcharts-more';
HighchartsMore(HighCharts)
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
            type: 'bubble',
            zoomType:'xy'
        },
        colors:['#2FD0B5'],
        legend: {
            enabled: false
        },
         title: {
              text: null
          },
           credits: {
          enabled: false
        },
        xAxis: {
            lineWidth: 1,
            gridLineWidth: 1,
            title: {
                text: null
            },
            labels: {
                formatter: function () {
                     var reg=/\d{1,3}(?=(\d{3})+$)/g;   
                      return (this.value + '').replace(reg, '$&,'); 
                }
            },
            endOnTick:true,
        },
        yAxis: {
            lineWidth: 1,
            title: {
                text: null
            },
           labels: {
                formatter: function () {
                     var reg=/\d{1,3}(?=(\d{3})+$)/g;   
                      return (this.value + '').replace(reg, '$&,'); 
                }
            },
            maxPadding: 0.2,
             gridLineWidth: 1,
        },
        tooltip: {
            useHTML: true,
            headerFormat: '<table>',
            pointFormat: '<tr><td>{point.name}</td></tr>' +
            '<tr><td>{point.z}%</td></tr>',
            footerFormat: '</table>',
            followPointer: true
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}',
                   style: {
                    fontWeight: 'bold',
                    fontSize: '14px',
                    color: 'black',
                    fontFamily:'arial'
                }
                }
            }
        },
        series:  this.data.series
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