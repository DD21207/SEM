<template>
	<div class="col-xs-12" id="History">
        <div class="card">
			<div class="card-header">
                <div class="card-title">
                    <div class="title">历史操作记录 & A/B test效果跟踪</div>
                </div>
            </div>
            <div class="card-body">
                <div class="select_div">
                <label>
                    Category:
                    <el-select
                        v-model="historyData.Category"
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
                        v-model="historyData.Brand"
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
                    Account:
                    <el-select
                        v-model="historyData.Account"
                        multiple
                        collapse-tags
                        style="margin-left: 10px;"
                        placeholder="Please Select" id="Account">
                        <el-option
                          v-for="item in accountList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </label>
                </div>
                <div class="select_div">
                <label>
                    层次:
                    <el-select
                        v-model="historyData.Level"
                        multiple
                        collapse-tags
                        style="margin-left: 10px;"
                        placeholder="Please Select" id="Level">
                        <el-option
                          v-for="item in levelList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </label>
                <label>
                    Current Period:
                    <input type="text" id="timeCPHistory">
                </label>
                <label>
                    Past Period:
                    <input type="text" id="timePPHistory">
                    
                </label>
                </div>
                <button type="btn" id="confirm_btn" class="btn" @click="onChangeTable()">Confirm</button>
            	
            </div>
        </div>
        <div class="card">
           
            <div class="card-body">
                <tableAccounts :tableData="tableData1" :Tid="'Detail'"></tableAccounts>
            </div>
        </div>
    </div>
</template>

<script>
import DateRangePicker from '../../static/js/daterangepicker'
import tableAccounts from '@/components/tableAccounts.vue'
import table_options1 from '@/chart-options/table_options1'


export default{
	name:'History',
	data(){
		return{
            tableData1:table_options1.data,
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
            accountList:[{
                value:"Babycare"
            },{
                value:"Laundry"
            },{
                value:"PHC"
            },{
                value:"Orlcare"
            },{
                value:"Femcare"
            }],
            levelList:[{
                value:"账户"
            },{
                value:"计划"
            },{
                value:"单元"
            },{
                value:"关键词"
            },{
                value:"创意"
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
            }],
            historyData:{
                Account:"",
                Category:"",
                Brand:"",
                CP_start:"",
                CP_end:"",
                PP_start:"",
                PP_end:"",
                Level:""
            }
        }
	},
	components: {
        tableAccounts
    },
	mounted(){
		this.$nextTick(function() {
			this.onloadHistory()
	    });
	},
	methods:{
		onloadHistory(){
            this.historyData.Category = JSON.parse(sessionStorage.getItem('selected')).Category;
            this.historyData.Brand = JSON.parse(sessionStorage.getItem('selected')).Brand;
            this.historyData.CP_start = JSON.parse(sessionStorage.getItem('selected')).CP_start;
            this.historyData.CP_end = JSON.parse(sessionStorage.getItem('selected')).CP_end;
            this.historyData.PP_start = JSON.parse(sessionStorage.getItem('selected')).PP_start;
            this.historyData.PP_end = JSON.parse(sessionStorage.getItem('selected')).PP_end;


            let _this = this;
            // console.log(this.$store.state.selectedData)
            var locale = {  
                "format": 'YYYY-MM-DD',  
                "separator": " ~ ",
            }; 

            $('#timeCPHistory').daterangepicker({
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
                    "startDate":this.historyData.CP_start,
                    "endDate":this.historyData.CP_end,
                    
            })

            $('#timeCPHistory').on('apply.daterangepicker',function(ev, picker) {
                // _this.onChangeChart()
            });


            $('#timePPHistory').daterangepicker({
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
                    "startDate":this.historyData.PP_start,
                    "endDate":this.historyData.PP_end,
                    
            })

            $('#timePPHistory').on('apply.daterangepicker',function(ev, picker) {
                // _this.onChangeChart()
            });

    

        },
        onChangeTable(){
            // let timePicker = $("#timeCPHistory").val();
            // this.startDate = $("#timeCPHistory").val().split(" ~ ")[0].split("-");
            // this.endDate= $("#timeCPHistory").val().split(" ~ ")[1].split("-");
        },

       
	},


}
</script>

<style type="text/css">
.select_div{
    width: 100%;
    margin-bottom: 5px;
}

.select_div label{
    margin-left: 10px;
}
#confirm_btn{
    background: #22A7F0;
    margin-top: -2px;
    color: white;
 /*   margin-left: 30px;*/
    font-weight: bold;
}
</style>