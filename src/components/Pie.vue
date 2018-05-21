<template>
    <div :id="id"
    :data="data" class="chart_container">
      
    </div>

</template>

<script>
import Highcharts from 'highcharts'
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
      chart:null,
      option:{
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
        },
        // colors:['#4AC7DC','#E96C39'],
        title: {
            text:null
            // useHTML:true,
            // text: "Volume<br>"+this.data.dataCount,
            // floating:true,
            // // verticalAlign: 'middle',
            // x: -40,
            // y:80,
            // style:{
            //   "fontSize":"13px"
            // }
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
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
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
    this.$nextTick(function() {
      this.initChart();
    });
  
  },
  methods: {
      initChart(){
          let _this = this;
        
          this.chart = new Highcharts.Chart(this.$el, this.option);
      },
      queryTrendData: function(){ 
        // this.option.title.text = "Volume<br>"+this.data.dataCount,
        // this.option.series = this.data.data.series
        this.chart.series[0].update( this.data.series)
      }  
    }, 
  watch:{
    'data.series': 'queryTrendData'
  },
}
</script>

<style type="text/css">
.chart_container{
  width: 100%;height: calc(100% - 50px);
}
   
 </style> 