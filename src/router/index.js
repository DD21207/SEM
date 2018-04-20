import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hello from '@/components/Hello'
import Home from '@/views/Home'
import Performance from '@/views/Performance'
import Competitor from '@/views/Competitor'
import Custom from '@/views/Custom'
import History from '@/views/History'
import SEO from '@/views/SEO'






Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect:'/Performance',
    name: 'Home',
    component: Home,
    children:[{
    	path:'Performance',
    	name:'Performance',
    	component:Performance
    },{
    	path:'Competitor',
    	name:'Competitor',
    	component:Competitor
    },{
    	path:'SEO',
    	name:'SEO',
    	component:SEO
    },{
        path:'Custom',
        name:'Custom',
        component:Custom
    },{
        path:'History',
        name:'History',
        component:History
    }]
  }]
})
