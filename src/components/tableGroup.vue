<template>
    <div :tableData='tableData' :Tid="table_id" class="table_div Campaign">
        <div class="table_box">
            <el-table
              :data="tableData"
               height="600"
              show-summary
              :summary-method="getSummaries"
              style="width: 100%">
              <el-table-column
                prop="Group"
                label="Group">
              </el-table-column>
              <el-table-column
                prop="Campaign"
                label="Campaign">
              </el-table-column>
              <el-table-column
                prop="Account"
                label="Account">
              </el-table-column>
              <el-table-column
                prop="Impression"
                label="Impression">
              </el-table-column>
              <el-table-column
                prop="Click"
                label="Click">
              </el-table-column>
              <el-table-column
                prop="Spending"
                label="Spending">
              </el-table-column>
              <el-table-column
                prop="CTR"
                label="CTR"
                :formatter="formatPercent">
              </el-table-column>
              <el-table-column
                prop="CPC"
                label="CPC">
              </el-table-column>
              <el-table-column
                prop="SOI"
                label="SOI(est.)"
                :formatter="formatPercent">
              </el-table-column>
              <el-table-column
                prop="SOS"
                label="SOS(est.)"
                :formatter="formatPercent">
              </el-table-column>
              <el-table-column
                prop="Visit"
                label="Visit"
                >
              </el-table-column>
              <el-table-column
                prop="Bounce Rate"
                label="Bounce Rate">
              </el-table-column>
              <el-table-column
                prop="Negative Keyword"
                label="Negative Keyword">
              </el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import Bus from './bus.js'
export default {
  // 验证类型
  props: {
    tableData: {
      
    },
    Tid:String
  },
  data(){
    return {
      table_id:this.Tid,
     
    }
  },
  filters: {
  },
  mounted(){
      this.$nextTick(function() {
        this.loadTable();
      });
  },
  methods: {
      loadTable(){
       
      },
      handleCommand(command){
        if(command == "customReport"){
          this.$router.push('/Custom')
        }else if(command == "historyReport"){
          this.$router.push('/History')
        }
      },
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0 ) {
            sums[index] = 'Total';
            return;
          }else if(index === 1){
            sums[index] = '--';
            return;
          }else if(index === 2){
            sums[index] = '--';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
             sums[index] = Math.round(sums[index]*100)/100;
          } else {
             sums[index] = '--';
          }

          if(index === 6){
              sums[index] = Math.round(sums[4]*100 / sums[3]*100)/100 + '%'
          }else if(index === 7){
              sums[index] = Math.floor((sums[5] / sums[4]) * 100) / 100
          }else if(index === 8){
            sums[index] = "1.56"
          }else if( index === 9 || index === 10 || index === 11 || index === 12 ||index === 13 ||index === 14 ||index === 15){
            sums[index] = '--';
            return;
          }
        });
        return sums;
      },
      formatPercent(row, column, cellValue, index){
        // console.log(cellValue)
          if(cellValue == null ){
            return "--"
          }else{
            return cellValue + '%'
          }
        },
      formatNumber:function(value){
          if(value == null ){
            return "--"
          }else{
            var re = /(?=(?!\b)(\d{3})+$)/g; 
          return value.toString().replace(re, ',');
        }
    },
  },
  created(){
     Bus.$on('selected_data', data =>{
      // this.test = data;
      // console.log(data);
     })
  }
  // watch:{
  //   'data.series': 'queryTrendData'
  // },
}
</script> 

<style lang="less" scoped>
@mainColor :#22A7F0;

.navbar{
  height: 30px;
  width: 100%;
}
.table_box{
  margin-top: 10px;

}
  
</style>

<style type="text/css">
.Campaign .navbar_campaign .el-button{
    padding: 8px;
    background: #22A7F0;
    color: white;
}

.custom{
  float: right;
}

.el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper{
font-size: 13px;
width: 101%;
}
 .table_box .el-table thead th{
    padding: 2px;
    border-top: 2px solid #22A7F0;
    border-bottom: 2px solid #22A7F0;
    color: #22A7F0;
    font-size:14px;
    line-height: 1.42857143;


  }
 .table_box .el-table tbody td{
    color: #333;
  
 }
 .table_box .el-table td.is-leaf{
    font-size: 13px;
    font-weight: bold;

    color: #333;
 }
</style>
