<template>
	<div class="flat-blue">
		<div class="app-container">
	        <div class="content-container">
	            <nav class="navbar navbar-default navbar-fixed-top navbar-top">
	                <div class="container-fluid">
	                    <div class="navbar-header" style="height:60px;">
	                        <button type="button" class="navbar-expand-toggle">
	                            <i class="fa fa-bars icon"></i>
	                        </button>
	                        <ol class="breadcrumb navbar-breadcrumb">
	                            <li class="active">{{title}}</li>
	                        </ol>
	                        <button type="button" class="navbar-right-expand-toggle pull-right visible-xs">
	                            <i class="fa fa-th icon"></i>
	                        </button>
	                    </div>
	                    <ul class="nav navbar-nav navbar-right">
	                    	
	                        <li class="dropdown profile">
	                            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false" id="User">DD<span class="caret"></span></a>
	                            <ul class="dropdown-menu animated fadeInDown" id="User_box">
	                                <li class="profile-img">
	                                    <img src="../assets/img/people.jpg" class="profile-img" >
	                                </li>
	                                <li>
	                                    <div class="profile-info">
	                                        <h4 class="username">DD</h4>
	                                        <p>DD@xxxxxxx.com</p>
	                                        <div class="btn-group margin-bottom-2x" role="group">
	                                            <button type="button" class="btn btn-default"><i class="fa fa-user"></i> Profile</button>
	                                            <button type="button" class="btn btn-default" v-on:click="logout()"><i class="fa fa-sign-out"></i> Logout</button>
	                                        </div>
	                                    </div>
	                                </li>
	                            </ul>
	                        </li>
	                    </ul>
	                </div>
	            </nav>
	            <div class="side-menu sidebar-inverse">
	                <nav class="navbar navbar-default" role="navigation">
	                    <div class="side-menu-container">
	                        <div class="navbar-header">
	                            <a class="navbar-brand" href="#">
	                            	<div class="icon fa fa-paper-plane"></div>
                                	<div class="title" style="font-weight: bold;margin-left: -6px;">SEM V.1</div>
	                            </a>
	                            <button type="button" class="navbar-expand-toggle pull-right visible-xs">
	                                <i class="fa fa-times icon"></i>
	                            </button>
	                        </div>
	                        <ul class="nav navbar-nav">
	                            <li class="active" ref="Performance">
	                                <router-link to="/Performance" @click.native="skip('1')" >
	                                    <span class="icon fa fa-line-chart" ></span>
	                                    <span class="title">Performance</span>
                               		</router-link>
	                            </li>
	                             <li ref="Competitor">
	                                <router-link to="/Competitor" @click.native="skip('2')" >
	                                    <span class="icon fa fa-balance-scale"></span>
	                                    <span class="title">Competitor</span>
                               		</router-link>
	                            </li>
	                             <li ref="SEO">
	                                <router-link to="/SEO" @click.native="skip('3')" >
	                                    <span class="icon fa fa-bullhorn"></span>
	                                    <span class="title">SEO</span>
                               		</router-link>
	                            </li>
	                        </ul>
	                    </div>
	                    <!-- /.navbar-collapse -->
	                </nav>
	            </div>
	            <!-- Main Content -->
	            <div class="container-fluid">
	                <div class="side_body">
	                	<router-view/>               	
	                </div>
	            </div>
	        </div>
	    </div>
	   
    </div>
</template>


<script>

export default {
  name: 'home',
  data () {
    return {
     	title:"SEM Overall Performance"
    }
  },
  filters: {
        formatNum: function(value) {
          var reg=/\d{1,3}(?=(\d{3})+$)/g;   
          return (value + '').replace(reg, '$&,'); 
            
        },
        formatPercent:function(value){
        	return '('+value+')'
        }
  },
  mounted: function() {
	    this.$nextTick(function() {
	      this.load();
	    });
  },
  methods:{
	  	load(){
	  		$(".navbar-expand-toggle").click(function() {
		        $(".app-container").toggleClass("expanded");
		        return $(".navbar-expand-toggle").toggleClass("fa-rotate-90");
		    });

		    $("#User").click(function(){
		    	$("#User_box").fadeToggle()
		    });

		    $("._tip-popup.u-ml5.tip").hover(function(){
		    	$(this).children('._tip-popup__content.bottom').show()
		    },function(){
		    	$(this).children('._tip-popup__content.bottom').hide()
		    });
		},
		skip(data){
			var _this = this;
			
			switch(data)
			{
			case "1":
			  _this.title = "SEM Overall Performance";
			  _this.$refs.Performance.classList.add('active');
			  _this.$refs.Competitor.classList.remove('active');
			  _this.$refs.SEO.classList.remove('active');
			  break;
			case "2":
			  _this.title = "Competitor Analysis";
			  _this.$refs.Performance.classList.remove('active');
			  _this.$refs.Competitor.classList.add('active');
			  _this.$refs.SEO.classList.remove('active');
			  break;
			case "3":
			  _this.title = "SEO";
			  _this.$refs.Performance.classList.remove('active');
			  _this.$refs.Competitor.classList.remove('active');
			  _this.$refs.SEO.classList.add('active');
			  break;
			}
		}
  },
}
</script>

<style scoped lang="less">
@import '../assets/less/home.less';

</style>