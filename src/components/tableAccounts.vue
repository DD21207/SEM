<template>
    <div  :tableData='tableData' :Tid="table_id" class="table_div tableAccounts">
        <el-table
          :data="tableData"
          height="240"
          :summary-method="getSummaries"
          show-summary
          style="width: 100%;">
          <el-table-column
            prop="Account"
            label="Account"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="AccountID"
            label="AccountID"
            align="center"
            >
          </el-table-column>
          <el-table-column
            prop="Impression"
            label="Impression"
            align="right"
            sortable>
          </el-table-column>
          <el-table-column
            prop="Click"
            label="Click"
            align="right"
            sortable>
          </el-table-column>
          <el-table-column
            prop="Spending"
            label="Spending"
            align="right"
            sortable>
          </el-table-column>
          <el-table-column
            prop="CTR"
            label="CTR"
            align="right"
            :formatter="formatPercent"
            sortable>
          </el-table-column>
          <el-table-column
            prop="CPC"
            label="CPC"
            align="right"
            sortable>
          </el-table-column>
          <el-table-column
            prop="Balance"
            label="Balance"
            align="right"
            sortable>
          </el-table-column>
          <el-table-column
            prop="Daily"
            label="Daily Budget"
            align="right"
            sortable>
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  // 验证类型
  props: {
    tableData: {
      
    },
    Tid:String
  },
  data(){
    return {
      table_id:this.Tid
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
        var _this= this;

        // $("#"+this.table_id).DataTable({

        //     "dom": '<"top"fl<"clear">>rt<"bottom"ip<"clear">>',
        //     "data": this.tableData,
        //     "ordering":true,
        //     "paging": false,
        //     "searching":false,
        //     "info":false,
        //     "columns": [
        //         { "data": "Account" },
        //         { "data": "AccountID",},
        //         { "data": "Impression.Value", "className": "td1"},
        //         { "data": "Click.Value",  "className": "td1"},
        //         { "data": "Cost.Value", "className": "td1"},
        //         { "data": "Balance.Value", "className": "td1"},
        //         { "data": "Daily.Value", "className": "td1"},
        //     ],
           

        // })
      },
      formatNumber(num){
          var parts = num.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
          return parts.join(".");
      },
       formatPercent(row, column, cellValue, index){
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

          if(index === 5){
              sums[index] = Math.round(sums[3]*100 / sums[2]*100)/100 + '%';
              return;
          }else if(index === 6){
              sums[index] = Math.floor((sums[4] / sums[3]) * 100) / 100;
              return;
          }
        });
        return sums;
      }
  },
  // watch:{
  //   'data.series': 'queryTrendData'
  // },
}
</script> 

<style lang="less" scoped>
@mainColor :#22A7F0;

.PP{
  font-size: 13px;
  color:grey;
}
.table_div{
  padding: 0px 5px;
}

.myTable{
  thead{
    .tr1 th{
      border-top: 2px solid @mainColor !important;
      border-bottom: 2px solid @mainColor !important;
      color: @mainColor;
    }
  }
  
}


 
</style>
<style type="text/css" >
.el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper{
font-size: 13px;
width: 101%;
}
 .tableAccounts .el-table thead th{
    padding: 2px;
    border-top: 2px solid #22A7F0;
    border-bottom: 2px solid #22A7F0;
    color: #22A7F0;
    font-size:14px;
    line-height: 1.42857143;


  }
 .tableAccounts .el-table tbody td{
    color: #333;
  
 }
 .tableAccounts .el-table td.is-leaf{
    font-size: 13px;
    font-weight: bold;

    color: #333;
 }

</style>
