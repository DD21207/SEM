<template>
    <div  :tableData='tableData' :Tid="table_id">

        <table class="datatable table table-striped myTable" cellspacing="0" width="100%" v-bind:id="table_id">
            <thead>
                <tr class="tr1">
                    <th>Account</th>
                    <th>AccountID</th>
                    <th class="td1">Impression</th>
                    <th class="td1">Click</th>
                    <th class="td1">Cost</th>
                    <th class="td1">Balance</th>
                    <th class="td1">Daily Budget</th>
                </tr>
                <tr>
                  <th>Total</th>
                  <th>--</th>
                  <th>47798.00</th>
                  <th>47798.00</th>
                  <th>47798.00</th>
                  <th>47798.00</th>
                  <th>47798.00</th>
                </tr>
            </thead>
        </table>
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

        $("#"+this.table_id).DataTable({

            "dom": '<"top"fl<"clear">>rt<"bottom"ip<"clear">>',
            "data": this.tableData,
            "ordering":false,
            "paging": false,
            "searching":false,
            "info":false,
            "columns": [
                { "data": "Account" },
                { "data": "AccountID",},
                { "data": "Impression.Value", "className": "td1"},
                { "data": "Click.Value",  "className": "td1"},
                { "data": "Cost.Value", "className": "td1"},
                { "data": "Balance.Value", "className": "td1"},
                { "data": "Daily.Value", "className": "td1"},
            ],
           

        })
      },
      formatNumber(num){
          var parts = num.toString().split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");
          return parts.join(".");
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
