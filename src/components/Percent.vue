<template>
	<div class="percent__chart__items" :data="data">
		<div class="percent_item_name">{{data.name}}</div>
		<div class="percent_item_box"><el-progress :stroke-width="15" :percentage="data.percent" ></el-progress></div>
    </div>
</template>

<script>
import { extend, isNull } from 'underscore';


export default{
	name:'Percent',
	props: {
	    data: {
	      
	    }
 	},
	data(){
		return{
			
		}
	},
	mounted(){
		this.$nextTick(function() {
			// var test = extend(extend({}, !this.data.name? {"test":"1"} : {"test":"2"}, this.data));
	     	// console.log(this.data)
	    });
	},
	methods:{
		
	}
}
</script>

<style type="text/css" >
.percent__chart__items{
	width: 100%;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid lightgrey;
    display: -webkit-flex; /* Safari */
	display: flex;

}
.percent_item_name{
	height: 100%;
	width: 250px;
    padding-left: 50px;
}

.percent_item_box{
	flex: 1;
	height: 100%;
	padding-top: 10px;
}

.percent_item_box .el-progress-bar{
	width: 95%;
}

.percent_item_box .el-progress__text{
	font-size: 14px !important;
}
</style>