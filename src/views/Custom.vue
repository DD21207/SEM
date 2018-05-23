<template>
	<div class="col-xs-12">
      <div class="card">
			<div class="card-header">
                <div class="card-title">
                    <div class="title">自定义数据——四象限图</div>
                </div>
            </div>
            <div class="card-body">
                <label class="labelBox">
                    Current Period:
                    <input type="text" id="timeCustom">
                </label>
                <label style="margin-left:20px;">
                    X轴:
                    <el-select
                        v-model="selectedData.x"
                        style="margin-left: 10px;"
                        placeholder="Please Select" > 
                        <el-option
                          v-for="item in options1"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value"
                          :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </label>
                <label style="margin-left:20px;">
                    Y轴:
                    <el-select
                        v-model="selectedData.y"
                        style="margin-left: 10px;"
                        placeholder="Please Select" > 
                        <el-option
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value" 
                          :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </label>
                <button type="btn" id="confirm_btn" class="btn" @click="onChangeChart()">Confirm</button>
            	<highchartsTest  :options="dataList" :styles="styles" ></highchartsTest>
            </div>
        </div>
    </div>
</template>

<script>
import Bus from '@/components/bus.js'
import DateRangePicker from '../../static/js/daterangepicker'
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import highchartsTest from '@/components/test'
// import options from '@/chart-options/testOptions.js'

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
export default{
	name:'Custom',
	data(){
		return{
            options1: [
                {value:"Impression"},
                {value:"Click"},
                {value:"Spending"},
                {value:"CTR"},
                {value:"CPC"},
                {value:"Bounce Rate"},
                {value:"Est.SOI"},
                {value:"Est.SOS"},
                {value:"Rate of Change"}
            ],
            options2 : [
                {value:"Impression"},
                {value:"Click"},
                {value:"Spending"},
                {value:"CTR"},
                {value:"CPC"},
                {value:"Bounce Rate"},
                {value:"Est.SOI"},
                {value:"Est.SOS"},
                {value:"Rate of Change"}
            ],
            selectedData : {
                startTime:"2017-01-01",
                endTime:"2017-12-31",
                x:"Impression",
                y:"Click"
            },
            startDate:"",
            endDate:"",
            dataList:{
                titleX:"",
                titleY:"",
                pointValueX_mean:0,
                pointValueY_mean:0,
                pointValueX_median:0,
                pointValueY_median:0,
                optionData:[
                    [0, 0]
                ],
            },
			styles:""
		}
	},
	components: {
   		highchartsTest
  	},
	mounted(){
		this.$nextTick(function() {
			this.onloadCustom()
	    });
	},
	methods:{
		onloadCustom(){
            // console.log(JSON.parse(sessionStorage.getItem('selected')));
            // console.log(this.$store.state.selectedData)
            var locale = {  
                "format": 'YYYY-MM-DD',  
                "separator": " ~ ",
            }; 

            $('#timeCustom').daterangepicker({
                    "locale": locale,
                    'showDropdowns': false,  
                    'showWeekNumbers': false,  
                    "ranges" : {  
                    'Past 7 Days': [moment().subtract(7, "days").format("YYYY-MM-DD"),moment().subtract(1, "days").format("YYYY-MM-DD")],  
                    'Past 30 Days': [moment().subtract(30, "days").format("YYYY-MM-DD"),moment().subtract(1, "days").format("YYYY-MM-DD")]
                    },  
                    "opens":"right",  
                    "timePicker":false,  
                    'applyClass':'apply_class',
                    "startDate":moment().subtract(7,'days').format('YYYY-MM-DD'),
                    "endDate":moment().subtract(1,'days').format('YYYY-MM-DD')
                    
            })

            $('#timeCustom').on('apply.daterangepicker',function(ev, picker) {
                _this.onChangeChart()
            });

            this.selectDisabled();
            this.selectDisabled1();

            this.$http({
                    method:'get',
                    url:'static/data/Custom1.json',
                    // data:{
                    //     'adminv':"",
                    //     'passv':"",
                    //     'type':'Logout'
                    // }
                }).then(response =>{
                    if(response.data.Message == "Success"){
                        this.dataList = response.data.QuadrantDiagram;
                        console.log(this.dataList)


                    }
                })
        },
        //Confirm之后更改图的数据
        onChangeChart(){
            let timePicker = $("#timeCustom").val();
            this.selectedData.startTime = $("#timeCustom").val().split(" ~ ")[0].split("-");
            this.selectedData.endTime= $("#timeCustom").val().split(" ~ ")[1].split("-");

            this.$http({
                    method:'get',
                    url:'static/data/Custom1.json',
                    // data:{
                    //     'adminv':"",
                    //     'passv':"",
                    //     'type':'Logout'
                    // }
                }).then(response =>{
                    if(response.data.Message == "Success"){
                        this.dataList = response.data.QuadrantDiagram;
                        console.log(this.dataList)


                    }
                })
        },

        selectDisabled(){
            var _this = this;
            $.each(this.options1,function(index,select) {
                if(select.value == _this.selectedData.y){
                    select.disabled =true
                }else{
                    select.disabled =false
                }
            });

            // this.dataList.titleX=this.selectedData.x;
            // this.dataList.titleY=this.selectedData.y;

                
        },
        selectDisabled1(){
            var _this = this;

            $.each(this.options2,function(index,select) {
                if(select.value == _this.selectedData.x){
             
                    select.disabled =true
                }else{
                    select.disabled =false
                }
            });
            // this.dataList.titleX=this.selectedData.x;
            // this.dataList.titleY=this.selectedData.y;
        },
	},
    watch:{
        'selectedData.x': 'selectDisabled1',
        'selectedData.y': 'selectDisabled',
    },
	// created(){
	// 	Bus.$on('selected_data', data =>{
	// 	 this.selectedData = data;
	// 	 // console.log( this.selectedData)
	// 	})
 //  	}
}
</script>

<style type="text/css">
.labelBox{
    background: #22A7F0;
    color: white;
    padding-left: 5px;
    padding-right: 2px;
    border-radius: 5px;
}
#timeCustom {
    margin-left: 5px;
    border-radius: 5px;
    padding: 0 10px;
    background: #22A7F0;
    width: 190px;
    border: 1px solid #22A7F0;
    font-size: 11px;
    height: 35px;
    color:white;
}

#confirm_btn{
    background: #22A7F0;
    margin-top: -2px;
    color: white;
    margin-left: 30px;
    font-weight: bold;
}
</style>