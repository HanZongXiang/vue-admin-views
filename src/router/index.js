import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const components = {
  login:() => import('@/views/login/login'),
  layout:() => import('@/views/layout/layout'),
  index:() => import('@/views/index/index'),
  users:() => import('@/views/users/index'),
  testUpload:() => import('@/views/testUpload/testUpload')
}

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component: components.login
    },
    {
      path:'/layout',
      component:components.layout,
      redirect:'/layout/index',
      children:[
        {
          path: 'index',
          component:components.index,
          meta:{
            title:'首页'
          }
        },
        {
          path:'users',
          meta:{
            title:'用户管理'
          },
          component:components.users
        },
        {
          path:'testUpload',
          component: components.testUpload
        }
      ]
    }
  ]
})
