<template>
    <div class="top-keywords__table" :tableData='tableData'>
        <div class="top-keywords__table__title top-keywords__table__row">
            <div>Keywords</div>
            <div>Search Volume</div>
        </div>
        <div class="top-keywords__table__row" v-for="(item,index) in tableData" v-bind:class="{'light':index%2 != 1}">
            <div title="宝马" style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap; width: 103px;">
               {{item.keyword}}
            </div>
            <div>{{item.value | formatNum}}</div>
        </div>
    </div>
</template>

<script>
export default {
  // 验证类型
  props: {
    tableData: {
      
    }
  },
  data(){
    return {
      
    }
  },
  filters: {
        formatNum: function(value) {
          var reg=/\d{1,3}(?=(\d{3})+$)/g;   
          return (value + '').replace(reg, '$&,'); 
            
        },
  },
  mounted(){
   
  },
  methods: {  
       
  },
  // watch:{
  //   'data.series': 'queryTrendData'
  // },
}
</script> 

<style>
.top-keywords__table {
    width: 25%;
}

.top-keywords__table__row, .top-keywords__table__title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;

}


.top-keywords__table__title {
    font-weight: 600;
    white-space: nowrap;
    padding: 5px 0;
    text-align: center;
}
.top-keywords__table__title>div{
    font-size: 10px;
    -webkit-transform:scale(0.90);
}
.top-keywords__table__row>div:first-child {
    width: 103px;
    text-align: left;
    padding-left: 35px;
}

.top-keywords__table__row>div {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
    padding: 4px 0;
    font-size: 12px;
}

.top-keywords__table__row.light {
    background-color: #ebfaf8;
}

.top-keywords__table__row>div {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: center;
    padding: 4px 0;
}
</style>