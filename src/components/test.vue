<template>
  <div style="width:100%;height:auto">
    <div class="quadrant_four_scope" id="navigator" style="display: inline-block;" >
        <a href="javascript:void(0)" id="quadrantB1" class="q_f_item1 q_f_item" quadrant="2"></a>
        <a href="javascript:void(0)" id="quadrantB2" class="q_f_item2 q_f_item" quadrant="3"></a>
        <a href="javascript:void(0)" id="quadrantB3" class="q_f_item3 q_f_item" quadrant="0"></a>
        <a href="javascript:void(0)" id="quadrantB4" class="q_f_item4 q_f_item" quadrant="1"></a>
    </div>
    <div class="quadrant_four_scope_tip" id="quadrantScopeTip" style="margin-left: 10px; display: inline-block;">( 提示:点击 <em></em> 选择象限内的关键词 )
        <!-- ( 提示:点击 <em></em> 选择象限内的关键词 ) -->
         <div class="view_filter_item" style="margin-top: 10px;">
                <ul id="quadrantFilterItem">
                    <li><a class="cur" href="javascript:void(0);" data-type="quadrant.qAvg">平均值</a></li>
                    <li><a href="javascript:void(0);" data-type="quadrant.qMedian">中位数</a></li>
                    <!--<li><a href="javascript:void(0);" data-i18n="custom">自定义</a></li>-->
                </ul>
                <!-- {{plotLineValue.y}} -->
        </div>
    </div>
    <div class="highcharts-container" id="test">
      
    </div>
    <tableCustom :tableData='tableData' :tableHead="tableHead" :Tid="'table_id'"></tableCustom>
    
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import { extend, isNull } from 'underscore';
import tableCustom from '@/components/tableCustom';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  props: ['options', 'styles'],
  name: 'highchartsTest',
  data() {
    return {
      tableData:[],
      tableHead:[],
      chart: null,
      plotAreas : null,
      plotArea : null,
      rect : null,
      plotLineValue : {
          x: this.options.pointValueX_mean,
          y: this.options.pointValueY_mean
      },
      optionData: {
        chart: {
          type: 'scatter',
          // zoomType:'xy'
        },
        title: {
              text: null
        },
        subtitle: {
          text: null
        },
        credits: {
          enabled: false
        },
        xAxis: {
          lineWidth: 1,
          title: {
            text: this.options.titleX,
            margin:20,
            style: {
                    color: 'black',
                    fontSize:18,
                }
          },
          startOnTick: false, 
          endOnTick:true,
          showLastLabel: true,
          plotLines: [{
            value: this.options.pointValueX_mean,
            width: 1,
            zIndex: 2,
            color: '#000'
          }]
        },
        yAxis: {
          lineWidth: 1,
          gridLineWidth:0,
          title: {
            text: this.options.titleY,
            margin:20,
            style: {
                    color: 'black',
                    fontSize:18,
                }

          },
          plotLines: [{
            value:this.options.pointValueY_mean,
            width: 1,
            zIndex: 2,
            color: '#000'
          }]
        },
        legend: {
            enabled: false
        },
        plotOptions: {
          scatter: {
            marker: {
              radius: 5,
              states: {
                hover: {
                  enabled: true,
                  lineColor: 'rgb(100,100,100)'
                }
              }
            },
            states: {
              hover: {
                marker: {
                  enabled: false
                }
              }
            },
            tooltip: {
              headerFormat: '<b>{series.name}</b><br>',
              pointFormat: '{point.x} cm, {point.y} kg'
            }
          }
        },
        series: [{
          
          color: 'rgba(223, 83, 83, .5)',
          data: this.options.optionData
        }]
      },
    }
  },
  components: {
      tableCustom
  },
  mounted() {
    this.$nextTick(function() {
      this.initChart();
    });
  },
  methods: {
    initChart() {

        if (isNull(this.options)) {
          this.chart.showLoading();
          return;
        } else if (this.options === 'nodata') {
          this.chart.hideLoading();
          return;
        }

        if (this.options.optionData.length == 0) {
          this.chart.showLoading();
          return;
        } 
      //获取当前组件
      // console.log(this.$el);
      // this.$el.style.width = (this.styles.width || 800) + 'px';
      // this.$el.style.height = (this.styles.height || 400) + 'px';
      this.chart = new Highcharts.Chart("test", this.optionData);
      // this.chart.series[0].setData(this.options.optionData);


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
              fill: ' rgba(255, 178, 178, 1)',
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
          

          //选象限更新表格
          _this.$http({
                    method:'get',
                    url:'static/data/Custom2.json',
                    // data:{
                    //     'adminv':"",
                    //     'passv':"",
                    //     'type':'Logout'
                    // }
                }).then(response =>{
                    if(response.data.Message == "Success"){
                      
                      _this.tableHead = response.data.Header;
                       _this.tableData = response.data.QuadrantDiagram;


                    }
                })
      });

      var nav = document.getElementById('navigator');
      nav.onclick = function(e)  {
          if(e.target.tagName === 'A') {
              $('.q_f_item').removeClass("selected");
              e.target.classList.add("selected");
              _this.goto(e.target.getAttribute("quadrant"));
          } 
      };

      $(".view_filter_item li a").click(function(){
        $(".view_filter_item li a").removeClass('cur');
        $(this).addClass('cur');
        if($(this).attr("data-type") == "quadrant.qAvg"){
            _this.plotLineValue.x= _this.options.pointValueX_mean;
            _this.plotLineValue.y= _this.options.pointValueY_mean;
            $('.q_f_item').removeClass("selected");
            _this.plotAreas = null;
            if(_this.rect) {
              _this.rect.destroy();
              _this.rect=null;
            }
            _this.chart.update({
               xAxis: {
                  plotLines: [{
                    value:_this.options.pointValueX_mean,
                    width: 1,
                    zIndex: 2,
                    color: '#000'
                  }]
               },
               yAxis: {
                  plotLines: [{
                  value:_this.options.pointValueY_mean,
                  width: 1,
                  zIndex: 2,
                  color: '#000'
                }]
               },
            })
        }else if($(this).attr("data-type") == "quadrant.qMedian"){
            _this.plotLineValue.x= _this.options.pointValueX_median;
            _this.plotLineValue.y= _this.options.pointValueY_median;
            $('.q_f_item').removeClass("selected");
             _this.plotAreas = null;
            if(_this.rect) {
              _this.rect.destroy();
              _this.rect=null;
            }

            _this.chart.update({
               xAxis: {
                  plotLines: [{
                    value:_this.options.pointValueX_median,
                    width: 1,
                    zIndex: 2,
                    color: '#000'
                  }]
               },
               yAxis: {
                  plotLines: [{
                  value:_this.options.pointValueY_median,
                  width: 1,
                  zIndex: 2,
                  color: '#000'
                }]
               },
            })
        }
      })
      
      
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
              fill: ' rgba(255, 178, 178, 1)',
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
    },
    test(){
      var _this = this;
      _this.chart.series[0].setData(_this.options.optionData);
      _this.plotLineValue.x = _this.options.pointValueX_mean;
      _this.plotLineValue.y = _this.options.pointValueY_mean;
      console.log(_this.plotLineValue.y)
      _this.plotAreas = null;
      if(_this.rect) {
        _this.rect.destroy();
        _this.rect=null;
      }
      _this.chart.update({
         xAxis: {
            plotLines: [{
              value:_this.options.pointValueX_mean,
              width: 1,
              zIndex: 2,
              color: '#000'
            }]
         },
         yAxis: {
            plotLines: [{
            value:_this.options.pointValueY_mean,
            width: 1,
            zIndex: 2,
            color: '#000'
          }]
         },
      })
      // this.chart.update({
      //    xAxis: {
      //       title: {
      //         text: this.options.titleX
      //       }
      //    },
      //    yAxis: {
      //       title: {
      //         text: this.options.titleY
      //       }
      //    },
      // })
    }
  },
  watch:{
        'options.titleX': 'test',
        'options.titleY': 'test',
        // 'options.pointValueX_mean' : 'test',
        // 'options.pointValueY_mean' : 'test',

  },
}
</script>

<style >
  .highcharts-container {
    width: 100%;
    height: 500px;
    margin-top: 10px;
  }
  .quadrant_four_scope {
    position: relative;
    display: inline-block;
    vertical-align: middle;
    width: 50px;
    height: 50px;
}
.quadrant_four_scope .q_f_item1 {
    left: 0;
    top: 0;
}
.quadrant_four_scope .q_f_item2 {
    right: -1px;
    top: 0;
}
.quadrant_four_scope .q_f_item3 {
    bottom: -1px;
    left: 0;
}
.quadrant_four_scope .q_f_item4 {
    bottom: -1px;
    right: -1px;
}

.quadrant_four_scope a {
    display: inline-block;
    position: absolute;
    width: 25px;
    height: 25px;
    background: #e2e2e2;
    transition: background 1s;
    -webkit-transition: background 1s;
}

.quadrant_four_scope a.selected {
    background: #FFB2B2;
}

.quadrant_four_scope_tip {
    display: inline-block;
    vertical-align: middle;
    color: #FFBB78;
}

.quadrant_four_scope_tip em {
    display: inline-block;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    background: #E2E2E2;
}

ul, ol {
    list-style-type: none;
}

.view_filter_item li {
    display: inline-block;
    margin-right: 5px;
}

.view_filter_item li a.cur,.view_filter_item li a:hover {
    background: #3F89F4;
    color: #fff;
    text-decoration: none;
}

.view_filter_item li a {
    display: block;
    padding: 3px 5px;
    text-decoration: none;
}
</style>