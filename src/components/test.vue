<template>
  <div style="width:100%;height:auto">
    <ul id="navigator">
      <li>0</li>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
    <div class="highcharts-container" id="test">
      
    </div>
    
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  props: ['options', 'styles'],
  name: 'highchartsTest',
  data() {
    return {
      chart: null,
      plotAreas : null,
      plotArea : null,
      rect : null,
      plotLineValue : {
          x: 170,
          y: 80
      },
    }
  },
  mounted() {
    
       this.initChart();
   
   
  },
  methods: {
    initChart() {
      // console.log(this.$el);
      // this.$el.style.width = (this.styles.width || 800) + 'px';
      // this.$el.style.height = (this.styles.height || 400) + 'px';
      this.chart = new Highcharts.Chart("test", this.options);

      var _this= this;

      Highcharts.addEvent(this.chart.container, 'click', function(e) {
          var xAxis = _this.chart.xAxis[0],
              yAxis = _this.chart.yAxis[0],
              plot = 0,
              x = xAxis.toValue(e.chartX), // 点击位置的 x 值
              y = yAxis.toValue(e.chartY); // 点击位置的 y 值
          if(!_this.plotAreas) {
              // 四个象限的边界点（左下角和右上角）
              // 2 3
              // 0 1
              _this.plotAreas = [
                  [
                      [xAxis.min, yAxis.min],
                      [_this.plotLineValue.x, _this.plotLineValue.y]
                  ],
                  [
                      [_this.plotLineValue.x, yAxis.min],
                      [xAxis.max, _this.plotLineValue.y]
                  ],
                  [
                      [xAxis.min, _this.plotLineValue.y],
                      [_this.plotLineValue.x, yAxis.max]
                  ],
                  [
                      [_this.plotLineValue.x, _this.plotLineValue.y],
                      [xAxis.max, yAxis.max],
                  ]
              ];
          }
          // 查找当前点所在的象限
          for(var i = 0; i< 4; i++) {
              _this.plotArea = _this.plotAreas[i];
              if(x >= _this.plotArea[0][0] && y >= _this.plotArea[0][1] &&
                 x <= _this.plotArea[1][0] && y <= _this.plotArea[1][1]
                ) {
                  plot = i;
                  break;
              }
          }
          if(_this.rect) {
              _this.rect.destroy();
          }
          // 绘制矩形
          var xPix = xAxis.toPixels(_this.plotArea[0][0]),
              x2Pix = xAxis.toPixels(_this.plotArea[1][0]),
              yPix = yAxis.toPixels(_this.plotArea[1][1]),
              y2Pix = yAxis.toPixels(_this.plotArea[0][1]);
          _this.rect = _this.chart.renderer.rect(xPix, yPix, x2Pix - xPix, y2Pix - yPix) 
              .attr({
              fill: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1
          }).add();
          console.log('当前是第 ' + plot  + ' 象限')

           var points = [];
        
          _this.chart.series[0].points.forEach(function(p) {
              if(p.x >= _this.plotArea[0][0] && p.y>= _this.plotArea[0][1] &&
                 p.x <= _this.plotArea[1][0] && p.y <= _this.plotArea[1][1]) {
                  points.push(p);
              }
          });
          console.log(points, points.length);
      });

      var nav = document.getElementById('navigator');
      nav.onclick = function(e)  {
          if(e.target.tagName === 'LI') {
              _this.goto(e.target.innerText);
          } 
      };
      
      
    },
    goto(index) {
          index = parseInt(index);
          var xAxis = this.chart.xAxis[0],
              yAxis = this.chart.yAxis[0],
              plotArea = null;
            
          if(!this.plotAreas) {
              // 四个象限的边界点（左下角和右上角）
              // 2 3
              // 0 1
              this.plotAreas = [
                  [
                      [xAxis.min, yAxis.min],
                      [this.plotLineValue.x, this.plotLineValue.y]
                  ],
                  [
                      [this.plotLineValue.x, yAxis.min],
                      [xAxis.max, this.plotLineValue.y]
                  ],
                  [
                      [xAxis.min, this.plotLineValue.y],
                      [this.plotLineValue.x, yAxis.max]
                  ],
                  [
                      [this.plotLineValue.x, this.plotLineValue.y],
                      [xAxis.max, yAxis.max],
                  ]
              ];
          }
          if(this.rect) {
              this.rect.destroy();
          }
          this.plotArea = this.plotAreas[index];
          // 绘制矩形
          var xPix = xAxis.toPixels(this.plotArea[0][0]),
              x2Pix = xAxis.toPixels(this.plotArea[1][0]),
              yPix = yAxis.toPixels(this.plotArea[1][1]),
              y2Pix = yAxis.toPixels(this.plotArea[0][1]);
          this.rect = this.chart.renderer.rect(xPix, yPix, x2Pix - xPix, y2Pix - yPix) 
              .attr({
              fill: 'rgba(0, 0, 0, 0.3)',
              zIndex: 1
          })
              .add();
          // 查找点
          var points = [];
          var _this=this;
          this.chart.series[0].points.forEach(function(p) {
              if(p.x >= _this.plotArea[0][0] && p.y>= _this.plotArea[0][1] &&
                 p.x <= _this.plotArea[1][0] && p.y <= _this.plotArea[1][1]) {
                  points.push(p);
              }
          });
          console.log(points, points.length);
    }
  }
}
</script>

<style >
  .highcharts-container {
    width: 800px;
    height: 400px;
  }
</style>