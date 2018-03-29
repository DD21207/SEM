<template>
	<div class="col-xs-12">
		<div class="card">
            <div class="card-body">
            	<label>
            		Platform:
            		<el-select
					    v-model="selected_data.Platform"
					    multiple
					    collapse-tags
					    style="margin-left: 5px;"
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
					    style="margin-left: 5px;"
					    placeholder="Please Select" id="">
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
					    style="margin-left: 5px;"
					    placeholder="Please Select">
					    <el-option
					      v-for="item in brandList"
					      :key="item.value"
					      :label="item.value"
					      :value="item.value">
					    </el-option>
					</el-select>
				</label>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <div class="title">推广账号</div>
                </div>
            </div>
            <div class="card-body">
                <table class="datatable table table-striped" cellspacing="0" width="100%" id="starcom_table">
                    <thead>
                        <tr>
                            <th>Platform</th>
                            <th>Account</th>
                            <th>Cost</th>
                            <th>Cost</th>
                            <th>Impression</th>
                            <th>Impression</th>
                            <th>Click</th>
                            <th>Click</th>
                            <th>Click%</th>
                            <th>Click%</th>
                            <th>CPC</th>
                            <th>CPC</th>
                            <th>CPM</th>
                            <th>CPM</th>
                        </tr>
                    </thead>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
var multipleSelect = require("exports-loader?window.multipleSelect!./multiple-select.js")
import DateRangePicker from '../../static/js/daterangepicker'
import DataTable from '../../static/js/jquery.dataTables.min.js'

import table_options from '@/chart-options/table_options'

export default{
	name:'Performance',
	data(){
		return{
			tableData:table_options.data,
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
	mounted(){
		this.$nextTick(function() {
	      this.loadPerformance();
	    });
	},
	methods:{
		loadPerformance(){
			var _this= this;

		    $("#starcom_table").DataTable({
		        "dom": '<"top"fl<"clear">>rt<"bottom"ip<"clear">>',
		        "data": this.tableData,
		        "order":[[2,"desc"]],
		        "columns": [
		            { "data": "img", render: function(data, type, row, meta) { return '<img src ="' + data + '" width="25px" />' }, "width": "5px", "className": "logo", "orderable": false },
		            { "data": "Account", render: function(data, type, row) { return '<a href="###">' + data + '</a>'; } },
		            { "data": "Cost.Value", "className": "td1"},
		            { "data": "Cost.Value", "className": "td1" },
		            { "data": "Impression.Value", "className": "td1" },
		            { "data": "Impression.Value", "className": "td1" },
		            { "data": "Click.Value", "className": "td1" },
		            { "data": "Click.Value", "className": "td1" },
		            { "data": "Click%.Value", "className": "td1" },
		            { "data": "Click%.Value", "className": "td1" },
		            { "data": "CPC.Value", "className": "td1" },
		            { "data": "CPC.Value", "className": "td1" },
		            { "data": "CPM.Value", "className": "td1" },
		            { "data": "CPM.Value", "className": "td1" }
		        ],
		        "columnDefs": [{
		            "targets": [2],
		            "orderData": [3],
		             "render": function(data, type, full) {
		                if(full['Cost']['Index'].indexOf('-') == 0){
		                    var num = '<span class="index1">' + full['Cost']['Index'].replace('-','↓') +'%'+ '</span>';
		                }else{
		                    var num = '<span class="index2">' + '↑'+full['Cost']['Index'] + '%'+'</span>';
		                }
		                
		                 return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
		             }
		        }, {
		            "visible": false,
		            "targets": [3],
		        },{
		            "targets": [4],
		            "orderData": [5],
		            "render": function(data, type, full) {
		                if(full['Impression']['Index'].indexOf('-') == 0){
		                    var num = '<span class="index1">' + full['Impression']['Index'].replace('-','↓') + '%'+'</span>';
		                }else{
		                    var num = '<span class="index2">' + '↑'+full['Impression']['Index'] +'%'+'</span>';
		                }
		                 return '<span>' + _this.formatNumber(data) + '</span>' + '</br>' + num ;
		             }
		        }, {
		            "visible": false,
		            "targets": [5],
		        },{
		            "targets": [6],
		            "orderData": [7],
		            "render": function(data, type, full) {
		                if(full['Click']['Index'].indexOf('-') == 0){
		                    var num = '<span class="index1">' + full['Click']['Index'].replace('-','↓') + '%'+'</span>';
		                }else{
		                    var num = '<span class="index2">' + '↑'+full['Click']['Index'] + '%'+'</span>';
		                }
		                 return '<span>' + _this.formatNumber(data) + '</span>' + '</br>' + num ;
		             }
		        }, {
		            "visible": false,
		            "targets": [7],
		        },{
		            "targets": [8],
		            "orderData": [9],
		            "render": function(data, type, full) {
		                if(full['Click%']['Index'].indexOf('-') == 0){
		                    var num = '<span class="index1">' + full['Click%']['Index'].replace('-','↓') + '%'+'</span>';
		                }else{
		                    var num = '<span class="index2">' + '↑'+full['Click%']['Index'] + '%'+'</span>';
		                }
		                 return '<span>' + _this.formatNumber(data) +'%'+ '</span>' + '</br>' + num ;
		             }
		        }, {
		            "visible": false,
		            "targets": [9],
		        },{
		            "targets": [10],
		            "orderData": [11],
		             "render": function(data, type, full) {
		                if(full['CPC']['Index'].indexOf('-') == 0){
		                    var num = '<span class="index1">' + full['CPC']['Index'].replace('-','↓') + '%'+'</span>';
		                }else{
		                    var num = '<span class="index2">' + '↑'+full['CPC']['Index'] + '%'+'</span>';
		                }
		                 return '<span>' + _this.formatNumber(data) + '</span>' + '</br>' + num ;
		             }
		        }, {
		            "visible": false,
		            "targets": [11],
		        },{
		            "targets": [12],
		            "orderData": [13],
		            "render": function(data, type, full) {
		                if(full['CPM']['Index'].indexOf('-') == 0){
		                    var num = '<span class="index1">' + full['CPM']['Index'].replace('-','↓') + '%'+'</span>';
		                }else{
		                    var num = '<span class="index2">' + '↑'+full['CPM']['Index'] + '%'+'</span>';
		                }
		                 return '<span>' + _this.formatNumber(data) + '</span>' + '</br>' + num ;
		             }
		        }, {
		            "visible": false,
		            "targets": [13],
		        }]

		    })
		},
		formatNumber(num){
	        var parts = num.toString().split(".");
	        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
	        return parts.join(".");
    	}
	}
}
</script>

<style lang="less" scoped>

.card-body{
    label{
        margin-right: 10px;
    }


}

#Platform{
        border-radius: 5px;
        padding: 0 10px;
        color: #4d4d4d;
        height: 25px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        cursor: pointer;
        width: 160px;
        font-size: 10px;
        -webkit-transform: scale(.98);
        margin-left: -5px;
    }   

	
</style>


<style type="text/css" >
@import '../assets/less/home.less';

</style>