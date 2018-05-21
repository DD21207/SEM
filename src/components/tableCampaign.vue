<template>
    <div :tableData='tableData' :Tid="table_id" class="table_div Campaign">
        <div class="navbar_campaign">
          <el-dropdown @command="handleCommand">
            <el-button >
              编辑<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">修改预算</el-dropdown-item>
              <el-dropdown-item disabled command="2">启用</el-dropdown-item>
              <el-dropdown-item command="3">暂停</el-dropdown-item>
              <el-dropdown-item command="4">删除</el-dropdown-item>
              <el-dropdown-item command="5">展现方式</el-dropdown-item>
              <el-dropdown-item command="6">设置搜索意图定位</el-dropdown-item>
              <el-dropdown-item disabled command="7">修改移动出价比例</el-dropdown-item>
              <el-dropdown-item command="8">修改计算机出价比例</el-dropdown-item>
              <el-dropdown-item command="9">设置高级精确匹配</el-dropdown-item>
              <el-dropdown-item command="10">设置同台展现</el-dropdown-item>
              <el-dropdown-item command="11">设置目标客户追投</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleCommand">
            <el-button >
              查看报告<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">计划报告</el-dropdown-item>
              <el-dropdown-item command="2">搜索词报告</el-dropdown-item>
              <el-dropdown-item command="3">排名分析报告</el-dropdown-item>
              <el-dropdown-item command="4">精准匹配报告</el-dropdown-item>
              <el-dropdown-item command="customReport">自定义报告</el-dropdown-item>
              <el-dropdown-item command="historyReport">历史操作报告</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleCommand" class="custom">
            <el-button >
              自定义列<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
             <el-dropdown-menu slot="dropdown">
              
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <div class="table_box">
            <el-table
              :data="tableData"
               height="600"
              show-summary
              :summary-method="getSummaries"
              style="width: 100%">
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
                prop="Ranking"
                label="Ranking">
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
                prop="Bidding Rate"
                label="Bidding Rate">
              </el-table-column>
              <el-table-column
                prop="Daily Budget"
                label="Daily Budget">
              </el-table-column>
              <el-table-column
                prop="on- air period"
                label="on- air period">
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
              sums[index] = Math.round(sums[3]*100 / sums[2]*100)/100 + '%'
          }else if(index === 6){
              sums[index] = Math.floor((sums[4] / sums[3]) * 100) / 100
          }else if(index === 7){
            sums[index] = "1.56"
          }else if( index === 8 || index === 9 || index === 10 || index === 11 || index === 12 ||index === 13 ||index === 14 ||index === 15){
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
