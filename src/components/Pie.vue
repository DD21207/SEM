<template>
  <div class="x-bar">
    <div :id="id"
    :data="data"></div>
  </div>
</template>

<script>
import HighCharts from 'highcharts'
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
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        colors:['#4AC7DC','#E96C39'],
        title: {
            useHTML:true,
            text: "Volume<br>"+this.data.dataCount,
            floating:true,
            // verticalAlign: 'middle',
            x: -40,
            y:80,
            style:{
              "fontSize":"13px"
            }
        },

         credits: {
          enabled: false
        },
        legend:{
          align: 'right',
          verticalAlign: 'middle',
          layout:'vertical'
        },
        tooltip: {
          pointFormat: 'Volume : {point.y:.,0f}%'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false,
                    style: {
                        color: (HighCharts.theme && HighCharts.theme.contrastTextColor) || 'black'
                    }
                },
                showInLegend: true
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
          this.option.title.text = "Volume<br>"+this.data.dataCount,
          this.option.series = this.data.series
          HighCharts.chart(this.id,this.option)
        }  
    }, 
  watch:{
    'data.series': 'queryTrendData'
  },
}
</script> 