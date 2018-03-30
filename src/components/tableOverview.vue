<template>
    <div  :tableData='tableData' :Tid="table_id">
        <table class="datatable table table-striped myTable" cellspacing="0" width="100%" v-bind:id="table_id">
            <thead>
                <tr>
                    <th>Platform</th>
                    <th>Impression</th>
                    <th>Click</th>
                    <th>Spending</th>
                    <th>CTR</th>
                    <th>CPC</th>
                    <th>SOI(est.)</th>
                    <th>SOS(est.)</th>
                    <th>Visit</th>
                    <th>Bounce Rate</th>
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
                { "data": "Account.Value" },
                { "data": "Impression.Value", "className": "td1"},
                { "data": "Click.Value", "className": "td1" },
                { "data": "Spending.Value", "className": "td1" },
                { "data": "CTR.Value", "className": "td1" },
                { "data": "CPC.Value", "className": "td1" },
                { "data": "SOI.Value", "className": "td1" },
                { "data": "SOS.Value", "className": "td1" },
                { "data": "Visit.Value", "className": "td1" },
                { "data": "Bounce.Value", "className": "td1" },
            ],
            "columnDefs": [{
              "targets":[0],
              "render":function(data, type, full) {
                    let text = full['Account']['PP']
                     return '<span>' + data + '</span>' + '</br>' + '<span class="PP">'+text+'</span>' ;
                 }
            },{
                "targets": [1],
                 "render": function(data, type, full) {
                    if(full['Impression']['PP'].indexOf('-') == 0){
                        var num = '<span class="index1">' + full['Impression']['PP'].replace('-','↓') +'%'+ '</span>';
                    }else{
                        var num = '<span class="index2">' + '↑'+full['Impression']['PP'] + '%'+'</span>';
                    }
                    
                     return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
                 }
            },{
              "targets": [2],
                 "render": function(data, type, full) {
                    if(full['Click']['PP'].indexOf('-') == 0){
                        var num = '<span class="index1">' + full['Click']['PP'].replace('-','↓') +'%'+ '</span>';
                    }else{
                        var num = '<span class="index2">' + '↑'+full['Click']['PP'] + '%'+'</span>';
                    }
                    
                     return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
                 }
            },{
              "targets": [3],
                 "render": function(data, type, full) {
                    if(full['Spending']['PP'].indexOf('-') == 0){
                        var num = '<span class="index1">' + full['Spending']['PP'].replace('-','↓') +'%'+ '</span>';
                    }else{
                        var num = '<span class="index2">' + '↑'+full['Spending']['PP'] + '%'+'</span>';
                    }
                    
                     return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
                 }
            },{
              "targets": [4],
                 "render": function(data, type, full) {
                    if(full['CTR']['PP'].indexOf('-') == 0){
                        var num = '<span class="index1">' + full['CTR']['PP'].replace('-','↓') +'%'+ '</span>';
                    }else{
                        var num = '<span class="index2">' + '↑'+full['CTR']['PP'] + '%'+'</span>';
                    }
                    
                     return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
                 }
            },{
              "targets": [5],
                 "render": function(data, type, full) {
                    if(full['CPC']['PP'].indexOf('-') == 0){
                        var num = '<span class="index1">' + full['CPC']['PP'].replace('-','↓') +'%'+ '</span>';
                    }else{
                        var num = '<span class="index2">' + '↑'+full['CPC']['PP'] + '%'+'</span>';
                    }
                    
                     return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
                 }
            },{
              "targets": [6],
                 "render": function(data, type, full) {
                    if(full['SOI']['PP'].indexOf('-') == 0){
                        var num = '<span class="index1">' + full['SOI']['PP'].replace('-','↓') +'%'+ '</span>';
                    }else{
                        var num = '<span class="index2">' + '↑'+full['SOI']['PP'] + '%'+'</span>';
                    }
                    
                     return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
                 }
            },{
              "targets": [7],
                 "render": function(data, type, full) {
                    if(full['SOS']['PP'].indexOf('-') == 0){
                        var num = '<span class="index1">' + full['SOS']['PP'].replace('-','↓') +'%'+ '</span>';
                    }else{
                        var num = '<span class="index2">' + '↑'+full['SOS']['PP'] + '%'+'</span>';
                    }
                    
                     return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
                 }
            },{
              "targets": [8],
                 "render": function(data, type, full) {
                    if(full['Visit']['PP'].indexOf('-') == 0){
                        var num = '<span class="index1">' + full['Visit']['PP'].replace('-','↓') +'%'+ '</span>';
                    }else{
                        var num = '<span class="index2">' + '↑'+full['Visit']['PP'] + '%'+'</span>';
                    }
                    
                     return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
                 }
            },
            {
              "targets": [9],
                 "render": function(data, type, full) {
                    if(full['Bounce']['PP'].indexOf('-') == 0){
                        var num = '<span class="index1">' + full['Bounce']['PP'].replace('-','↓') +'%'+ '</span>';
                    }else{
                        var num = '<span class="index2">' + '↑'+full['Bounce']['PP'] + '%'+'</span>';
                    }
                    
                     return '<span>' +'￥'+ _this.formatNumber(data) + '</span>' + '</br>' + num ;
                 }
            }]

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
    th{
      border-top: 2px solid @mainColor !important;
      border-bottom: 2px solid @mainColor !important;
      color: @mainColor;
    }
  }
  
}

  
</style>
