<template>
	<div class="col-xs-12">
		<div class="card">
			<div class="card-header">
                <div class="card-title">
                    <div class="title">Settings</div>
                </div>
            </div>
            <div class="card-body">
            	<label>
            		Platform:
            		<el-select
					    v-model="selected_data.Platform"
					    multiple
					    collapse-tags
					    style="margin-left: 10px;"
					    placeholder="Please Select" id="Platform">
					    <el-option
					      v-for="item in platformList"
					      :key="item.value"
					      :label="item.value"
					      :value="item.value">
					    </el-option>
					</el-select>
				</label>
				<label>
            		Category:
            		<el-select
					    v-model="selected_data.Category"
					    multiple
					    collapse-tags
					    style="margin-left: 10px;"
					    placeholder="Please Select" id="Category">
					    <el-option
					      v-for="item in categoryList"
					      :key="item.value"
					      :label="item.value"
					      :value="item.value">
					    </el-option>
					</el-select>
				</label>
				<label>
            		Brand:
            		<el-select
					    v-model="selected_data.Brand"
					    multiple
					    collapse-tags
					    style="margin-left: 10px;"
					    placeholder="Please Select" id="Brand"> 
					    <el-option
					      v-for="item in brandList"
					      :key="item.value"
					      :label="item.value"
					      :value="item.value">
					    </el-option>
					</el-select>
				</label>
				<label>
					Current Period:
					<input type="text" id="time">
				</label>
				<label>
					Past Period:
					<input type="text" id="timePP" disabled v-bind:value="selected_data.PP_start+' ~ '+selected_data.PP_end">
					
				</label>
				<button type="btn" id="confirm_btn" class="btn">Confirm</button>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <div class="title">I.Brand Overview Performance</div>
                </div>
            </div>
            <div class="card-body">
                <myTable :tableData="tableData" :Tid="'Overview'"></myTable>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <div class="title">II.Detail Report</div>
                </div>
            </div>
            <div class="card-body">
                <tableAccounts :tableData="tableData1" :Tid="'Detail'"></tableAccounts>
            </div>
        </div>
    </div>
</template>

<script>
var multipleSelect = require("exports-loader?window.multipleSelect!./multiple-select.js")
import DateRangePicker from '../../static/js/daterangepicker'
import DataTable from '../../static/js/jquery.dataTables.min.js'
import myTable from '@/components/table.vue'
import tableAccounts from '@/components/tableAccounts.vue'


import table_options from '@/chart-options/table_options'
import table_options1 from '@/chart-options/table_options1'


export default{
	name:'Performance',
	data(){
		return{
			tableData:table_options.data,
			tableData1:table_options1.data,
			selected_data:{
			 	Platform:"",
			 	Category:"",
			 	Brand:"",
			 	CP_start:"",
			 	CP_end:"",
			 	PP_start:"",
			 	PP_end:""
			},
			platformList:[{
			 	value:"Baidu"
			},{
			 	value:"Sougo"
			},{
			 	value:"360"
			},{
			 	value:"So"
			}],
			categoryList:[{
			 	value:"Babycare"
			},{
			 	value:"Laundry"
			},{
			 	value:"PHC"
			},{
			 	value:"Orlcare"
			},{
			 	value:"Femcare"
			},{
			 	value:"Aircare"
			},{
			 	value:"Shave"
			}],
			brandList:[{
				value:"Pampers"
			},{
				value:"Downy"
			},{
				value:"Clearblue"
			},{
				value:"Crest"
			},{
				value:"Oral-B"
			},{
				value:"Tampax"
			},{
				value:"Whisper"
			},]
		}
	},
	components: {
   		myTable,
   		tableAccounts
  	},
	mounted(){
		this.$nextTick(function() {
	      this.loadPerformance();
	    });
	},
	methods:{
		loadPerformance(){
			var locale = {  
				"format": 'YYYY-MM-DD',  
				"separator": " ~ ",
			}; 

	        $('#time').daterangepicker({
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

	        let timePicker = $("#time").val();
	  		let startDate = $("#time").val().split(" ~ ")[0].split("-");
	  		let endDate= $("#time").val().split(" ~ ")[1].split("-");

	  		let strDateS = new Date(startDate[0], startDate[1]-1, startDate[2]);
			let strDateE = new Date(endDate[0], endDate[1]-1, endDate[2]);
			let iDays = (parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24) +1)*2

			this.selected_data.PP_start = moment().subtract(iDays,"days").format("YYYY-MM-DD");
			this.selected_data.PP_end =  moment().subtract(iDays/2+1,"days").format("YYYY-MM-DD");

			var _this= this

	        $('#time').on('apply.daterangepicker',function(ev, picker) {

				_this.onChangeChart()

			});
		},
		onChangeChart(){
		 	let timePicker = $("#time").val();
	  		let startDate = $("#time").val().split(" ~ ")[0].split("-");
	  		let endDate= $("#time").val().split(" ~ ")[1].split("-");

	  		let strDateS = new Date(startDate[0], startDate[1]-1, startDate[2]);
			let strDateE = new Date(endDate[0], endDate[1]-1, endDate[2]);
			let iDays = (parseInt(Math.abs(strDateS - strDateE ) / 1000 / 60 / 60 /24) +1)*2

			this.selected_data.PP_start = moment().subtract(iDays,"days").format("YYYY-MM-DD");
			this.selected_data.PP_end =  moment().subtract(iDays/2+1,"days").format("YYYY-MM-DD");
		}	
	}

}
</script>

<style lang="less" scoped>
@mainColor :#22A7F0;
.card{
	label{
		margin-left: 20px;
	}
	
	#timePP{
		    cursor: not-allowed;
	}
	#confirm_btn{
		background: @mainColor;
		// border:1px solid @mainColor;
		margin-top: -2px;
		color: white;
		margin-left: 30px;
		font-weight: bold;
	}
}


</style>

