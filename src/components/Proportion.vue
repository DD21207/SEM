<template>
	<div class="grid-chart__chart__items" :data="data">
     	<div v-for="(item,index) in data" class="grid-chart__chart__items_items" v-bind:style="{width:item.percent,background:colorList[index]}" v-bind:title="item.name"></div>
    </div>
</template>

<script>

export default{
	name:'Proportion',
	props: {
	    data: {
	      
	    }
 	},
	data(){
		return{
			colorList:['#6a9ad0','#9fce63','#b7c7e4','#94aad8']
		}
	},
	mounted(){
		this.$nextTick(function() {
	     	// console.log(this.data)
	    });
	},
	methods:{
		
	}
}
</script>

<style type="text/css" >

.grid-chart__chart__items{
	width: calc(100% - 80px);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 30px;
    overflow: hidden;
    background: red;
}


.colorList{
	height: 15px;
	line-height: 15px;
}
.color_item{
	display: inline-block;
	width: 10px;
	height: 10px;
}
</style>