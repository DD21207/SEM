<template>
	<div class="col-xs-12" id="Competitor">
       <div class="card">
           	<div class="card-header">
                <div class="card-title">
                	<div class="title">Settings</div>
                </div>
            </div>
            <div class="card-body">
                <div class="select_div">
                <label>
                    Category:
                    <el-select
                        v-model="competitorData.Category"
                      
                        style="margin-left: 10px;"
                        placeholder="Please Select" id="competitorCategory">
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
                        v-model="competitorData.Brand"
                      
                        style="margin-left: 10px;"
                        placeholder="Please Select" id="competitorBrand"> 
                        <el-option
                          v-for="item in brandList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </label>
                <label>
                    Devices:
                    <el-select
                        v-model="competitorData.Devices"
                        multiple
                       
                        style="margin-left: 10px;"
                        placeholder="Please Select" id="Devices">
                        <el-option
                          v-for="item in devicesList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </label>
                </div>
                <div class="select_div">
                <label>
                    Location:
                    <el-select
                        v-model="competitorData.Location"
                        multiple
                        collapse-tags
                        style="margin-left: 10px;"
                        placeholder="Please Select" id="Location">
                        <el-option
                          v-for="item in locationList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </label>
                 <label>
                    Pillar:
                    <el-select
                        v-model="competitorData.Pillar"
                        multiple
                        collapse-tags
                        style="margin-left: 10px;"
                        placeholder="Please Select" id="Pillar">
                        <el-option
                          v-for="item in pillarList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                        </el-option>
                    </el-select>
                </label>
                <label>
                   Time:
                    <input type="text" id="timeCompetitor">
                </label>
                </div>
                <button type="btn" id="confirm_btn" class="btn" @click="onChangeTable()">Confirm</button>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <div class="title">Keywords impression & Ranking share overview</div>
                </div>
            </div>
            <div class="card-body">
             	<div class="keywords_box">
             		<div style="margin-right:10px;">
             			<Pie :id="'chart_pie'" :data="options_pie.data" ref="chart_pie"></Pie>
                        <div class="more_div">Impression share <a href="javascript:;;">More</a></div>
             		</div>
             		<div style="margin-left:10px;">
                        <div class="top_div">
                            <div class="top_box">
                                <div class="top_title">TOP 1</div>
                                <Proportion :data="proportion_data.TOP1"></Proportion>
                            </div>
                            <div class="top_box">
                                <div class="top_title">TOP 2</div>
                                <Proportion :data="proportion_data.TOP2"></Proportion>
                            </div>
                            <div class="top_box">
                                <div class="top_title">TOP 3</div>
                                <Proportion :data="proportion_data.TOP3"></Proportion>
                            </div>

                        </div>
                         <div class="more_div">Ranking share <a href="javascript:;;">More</a></div>
                    </div>
             	</div>
            </div>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="card-title">
                    <div class="title">Competitor SOS Estimation</div>
                </div>
            </div>
            <div class="card-body">
                <div class="percent_div">
                    <div class="percent_title">
                        <div class="percent_name">Brand</div>
                        <div>SOS</div>
                    </div>
                    <percent v-for="(item,index) in percent_data" :data="item" :key="item.name"></percent>
                </div>
                <div class="Adcopy_div">
                    <div class="Adcopy_title">Adcopy:</div>
                    <div class="Adcopy_box" style="border-bottom:1px solid lightgrey">
                        <div class="Adcopy_box_name">{{adcopy_data.PG.name}}:</div>
                        <div class="Adcopy_box_chart">
                            <wordCloud :chartData="adcopy_data.PG.chartData"></wordCloud>
                        </div>
                        <div class="Adcopy_box_more">
                            <a href="javascript:;;" class="moreButton">More</a>
                        </div>
                    </div>
                    <div class="Adcopy_box">
                        <div class="Adcopy_box_name1">
                            <div class="Adcopy_box_name1_select">
                                <el-select v-model="adcopySelected" placeholder="Please Select" id="Adcopy" v-on:change="changeAdcopy()">
                                    <el-option
                                      v-for="item in adcopy_data.Non_PG.nameList"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                        <div class="Adcopy_box_chart">
                            <wordCloud :chartData="adcopyChartData"></wordCloud>
                        </div>
                        <div class="Adcopy_box_more">
                            <a href="javascript:;;" class="moreButton">More</a>
                        </div>
                    </div>
                </div>
                <div class="top10_div">
                     <div class="top10_title">Ad copy Key Element Analysis</div>
                     <div class="top10_chart_box">
                         <div>
                            <div class="top10_chart_box_title">
                                {{adcopy_data.PG.name}}
                            </div>
                            <div class="top10_chart_box_content">
                                <Pie  :data="options_pie.data1" ref="chart_pie"></Pie>
                            </div>
                         </div>
                         <div>
                              <div class="top10_chart_box_title1">
                                <el-select v-model="top10selected1" placeholder="Please Select" id="Adcopy" v-on:change="changeTop10()">
                                    <el-option
                                      v-for="item in adcopy_data.Non_PG.nameList"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="top10_chart_box_content">
                                <Pie  :data="options_pie.data2" ref="chart_pie"></Pie>
                            </div>
                         </div>
                         <div>
                              <div class="top10_chart_box_title1">
                                 <el-select v-model="top10selected2" placeholder="Please Select" id="Adcopy" v-on:change="changeTop10()">
                                    <el-option
                                      v-for="item in adcopy_data.Non_PG.nameList"
                                      :key="item.value"
                                      :label="item.name"
                                      :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <div class="top10_chart_box_content">
                                <Pie  :data="options_pie.data3" ref="chart_pie"></Pie>
                            </div>
                         </div>
                     </div>
                     <div class="top10_table_box">
                         <div class="top10_table_box_title">
                             <div class="top10_table_box_title_brand">
                                 Brand
                             </div>
                             <div class="top10_table_box_title_img">
                                 Images
                             </div>
                         </div>
                         <div class="top10_table_box_content">
                             <div class="top10_table_box_content_li">
                                <div class="top10_table_box_content_li_brand">
                                    {{adcopy_data.PG.name}}
                                </div>
                                <div class="top10_table_box_content_li_imgbox">
                                     <div class="top10_table_box_content_li_imgbox_single" v-for="(item,index) in adcopy_data.PG.imgList">
                                        <img :src="'http://localhost:8080/static/img/'+item.url"  height="200">
                                        <div class="top10_table_box_content_li_imgbox_single_input"><input type="text" name="" placeholder="编辑标签" v-bind:value="item.tag"></div>
                                     </div>
                                </div>
                                <div class="top10_table_box_content_li_more">
                                     <a href="javascript:;;" class="moreButton">More</a>
                                </div> 
                             </div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Pie from '@/components/Pie.vue'
import Proportion from '@/components/Proportion.vue'
import Percent from '@/components/Percent.vue'
import wordCloud from '@/components/wordCloud.vue'

import optionsPie from '@/chart-options/optionsPie'
import proportionData from '@/chart-options/proportionData'
import percentData from '@/chart-options/percentData'
import adcopyData from '@/chart-options/adcopyData'



export default{
	name:'Competitor',
	data(){
		return{
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
            devicesList:[{
                value:"PC"
            },{
                value:"Mobile"
            }],
            locationList:[
              {"value":"安徽"},
              {"value":"北京"},
              {"value":"福建"},
              {"value":"甘肃"},
              {"value":"广东"},
              {"value":"广西"},
              {"value":"贵州"},
              {"value":"海南"},
              {"value":"河北"},
              {"value":"河南"},
              {"value":"黑龙江"},
              {"value":"湖北"},
              {"value":"湖南"},
              {"value":"吉林"},
              {"value":"江苏"},
              {"value":"江西"},
              {"value":"辽宁"},
              {"value":"内蒙古"},
              {"value":"宁夏"},
              {"value":"青海"},
              {"value":"山东"},
              {"value":"山西"},
              {"value":"陕西"},
              {"value":"上海"},
              {"value":"四川"},
              {"value":"天津"},
              {"value":"西藏"},
              {"value":"新疆"},
              {"value":"云南"},
              {"value":"浙江"},
              {"value":"重庆"},
              ],
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
            pillarList:[{
                value:"Pampers Mainline"
            },{
              value:"Pampers Premium"
            },{
              value:"Pampers Pants"
            }],
            competitorData:{
                Devices:["PC","Mobile"],
                Category:"Babycare",
                Brand:"Pampers",
                startTime:"",
                endTime:"",
                Location:"",
                Pillar:""

            },
            options_pie:optionsPie,
            proportion_data:proportionData.data,
            percent_data:percentData.data,
            adcopy_data:adcopyData.data,
            adcopySelected:1,
            adcopyChartData:adcopyData.data.Non_PG.chartData1,
            top10selected1:"Huggies",
            top10selected2:"DAWANG",

		}
	},
	components: {
    	Pie,
      Proportion,
      Percent,
      wordCloud
  	},
	mounted(){
		this.$nextTick(function() {
	     	this.onloadCompetitor()
	    });
	},
	methods:{
		onloadCompetitor(){

            let _this = this;
            // console.log(this.$store.state.selectedData)
            var locale = {  
                "format": 'YYYY-MM-DD',  
                "separator": " ~ ",
            }; 

            $('#timeCompetitor').daterangepicker({
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

            $('#timeCompetitor').on('apply.daterangepicker',function(ev, picker) {
                // _this.onChangeChart()
            });
        },
        changeAdcopy(){
            switch(this.adcopySelected)
            {
            case 1:
              this.adcopyChartData = this.adcopy_data.Non_PG.chartData1;
              break;
            case 2:
              this.adcopyChartData = this.adcopy_data.Non_PG.chartData2;
              break;
            case 3:
              this.adcopyChartData = this.adcopy_data.Non_PG.chartData3;
              break;
            case 4:
              this.adcopyChartData = this.adcopy_data.Non_PG.chartData4;
              break;
            }
        },
        changeTop10(){

        }
	}
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

.keywords_box{
	width: 100%;
	height:380px;
	display: -webkit-flex; /* Safari */
	display: flex;
}

.keywords_box>div{
	flex: 1;
	height: 100%;
	border:1px solid lightgrey;
}

.more_div{
    height:50px;
    line-height: 50px;
    font-size: 18px;
    text-align: right;
    padding-right: 10px;
}

.more_div>a{
    height: 30px;
    width: 80px;
    color: white;
    background: #6a9ad0;
    display: inline-block;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
}
.top_div{
    width: 100%;
    height: calc(100% - 50px);
    padding-top: 40px;
}
.top_box{
    width: 100%;
    padding: 5px 20px;
    margin-bottom: 40px;
}

.top_box>div{
    float: left;
}

.top_title{
    margin-right: 20px;
    height: 30px;line-height: 30px;
}
.percent_div{
    width: 100%;
    height: auto;
    padding: 10px 12% 30px 12%; 
}
.percent_title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid lightgrey;
}
.percent_title>div{
    display: inline-block;
    height: 40px;
    line-height: 40px;
    font-weight: bold;
}

.percent_name{
    width: 250px;
    padding-left: 50px;
}

.Adcopy_div{
    width: 100%;
    height: 570px;
    margin-top: 10px;
    padding:20px 5% 20px 5%;
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;

}

.Adcopy_title{
    width: 100%;
    text-align: left;
    font-weight: bold;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}

.Adcopy_box{
    width: 100%;
    height:250px;
    display: -webkit-flex; /* Safari */
    display: flex; 
}

.Adcopy_box_name{
    width: 250px;
    height: 100%;
    line-height: 250px;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
}

.Adcopy_box_name1{
    width: 250px;
    height: 100%;
/*    line-height: 250px;*/
    text-align: center;
    font-size: 16px;
    font-weight: bold;
}

.Adcopy_box_chart{
    flex: 1;
    height: 100%;
}

.Adcopy_box_more{
    width: 250px;
    height: 100%;
}
.moreButton{
    height: 30px;
    width: 80px;
    color: white;
    background: #c2d6ec;
    display: block;
    line-height: 30px;
    text-align: center;
    font-weight: bold;
    top: 50%;
    left: 50%;
    position: relative;
    margin-top: -15px;
    margin-left: -40px;
    box-shadow:4px 4px 10px #b2bcc7
}

.Adcopy_box_name1_select{
    margin-top: 100px;
}

.top10_div{
    width: 100%;
    height: 1150px;
    margin-top: 10px;
    padding:20px 2% 20px 2%;
}

.top10_title{
    width: 100%;
    text-align: left;
    font-weight: bold;
    font-size: 16px;
    height: 30px;
    line-height: 30px;
}

.top10_chart_box{
    width: 100%;
    height: 300px;
    display: -webkit-flex; /* Safari */
    display: flex; 
    padding-top: 20px;
    border-bottom:1px solid lightgrey; 
}

.top10_chart_box>div{
    flex: 1;
    width: 100%;
}

.top10_chart_box_title{
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-weight: bold;
}


.top10_chart_box_title1{
    width: 100%;
    height: 40px;
/*    line-height: 30px;*/
    text-align: center;
    font-weight: bold;
}
.top10_chart_box_content{
    width: 100%;
    height: 240px;
}

.top10_table_box{
    width: 100%;
    height: 755px;
    margin-top: 20px;
    border: 1px solid grey;
}

.top10_table_box_title{
    height: 50px;
    width: 100%;
    border-bottom: 1px solid lightgrey;
    display: -webkit-flex; /* Safari */
    display: flex; 
}

.top10_table_box_title_brand{
    width: 120px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    border-right:1px solid lightgrey; 
}

.top10_table_box_title_img{
    flex: 1;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
}

.top10_table_box_content{
    height: 755px;
    width: 100%;
}

.top10_table_box_content_li{
    height: 250px;
    width: 100%;
    display: -webkit-flex; /* Safari */
    display: flex; 
    border-bottom: 1px solid lightgrey;
}
.top10_table_box_content_li_brand{
    width: 120px;
     height: 250px;
    line-height: 250px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    border-right:1px solid lightgrey; 
}

.top10_table_box_content_li_imgbox{
    height: 250px;
    flex: 1;
/*    border-right:1px solid lightgrey;*/
    display: -webkit-flex; /* Safari */
    display: flex;
}

.top10_table_box_content_li_more{
    width: 120px;
    height: 100%;
}

.top10_table_box_content_li_imgbox_single{
    flex: 1;
    height:100%;
    text-align: center;
    padding-top: 7px;
}
</style>