import Vue from 'vue'
import Router from 'vue-router'
import PageAlarm from '@/page/alarm'
import PageCar from '@/page/car'
import PageWay from '@/page/way'

Vue.use(Router)

export default new Router({
    // mode: 'history', // 去掉路由上的#号
    //base: '/', //这个配置很重要，否则会出现打包页面空白情况
    routes: [{
        path: '/',
        name: 'alarm',
        component: PageAlarm
    }, {
        path: '/alarm',
        name: 'alarm',
        component: PageAlarm
    }, {
        path: '/car',
        name: 'car',
        component: PageCar
    }, {
        path: '/way',
        name: 'way',
        component: PageWay
    }]
})