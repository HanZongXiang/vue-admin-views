import Vue from 'vue'
import Router from 'vue-router'
import Nprogress from 'nprogress'
import "nprogress/nprogress.css"

Vue.use(Router)

const components = {
  login:() => import('@/views/login/login'),
  layout:() => import('@/views/layout/layout'),
  index:() => import('@/views/index/index'),
  users:() => import('@/views/users/index'),
  testUpload:() => import('@/views/testUpload/testUpload'),
  userEdit:() => import('@/views/userEdit/userEdit'),
  userAdd:() => import('@/views/userAdd/userAdd'),
  categoryList:() => import('@/views/category/categoryList'),
  addCategory:() => import('@/views/category/addCategory'),
  categoryEdit:() => import('@/views/category/categoryEdit'),
  bookList:() => import('@/views/book/bookList'),
  bookEdit:() => import('@/views/book/bookEdit'),
  bookAdd:() => import('@/views/book/bookAdd'),
  swiperList:() => import('@/views/swiper/swiperList')
}

let router =  new Router({
  routes: [
    {
      path: '/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      meta:{
        title:'登录'
      },
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
        },
        {
          path:'userEdit',
          meta: {
            title: '修改个人信息'
          },
          component:components.userEdit
        },
        {
          path: 'userAdd',
          meta: {
            title: '添加管理员'
          },
          component: components.userAdd
        },
        {
          path:'categoryList',
          meta: {
            title:'分类列表'
          },
          component:components.categoryList
        },
        {
          path:'addCategory',
          meta: {
            title:'添加分类'
          },
          component:components.addCategory
        },
        {
          path:'categoryEdit',
          meta: {
            title:'编辑分类'
          },
          name:'categoryEdit',
          component: components.categoryEdit
        },
        {
          path:'book',
          meta: {
            title:'图书管理'
          },
          component:components.bookList
        },
        {
          path:'book/edit',
          meta: {
            title:'编辑图书'
          },
          name:'bookEdit',
          component:components.bookEdit
        },
        {
          path:'book/addBook',
          meta: {
            title:'添加图书'
          },
          name:'bookAdd',
          component:components.bookAdd
        },
        {
          path:'swiper',
          meta: {
            title:'轮播图列表'
          },
          name:'swiper',
          component:components.swiperList
        }
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  Nprogress.start()

  if (to.meta && to.meta.title) {
    document.title = to.meta.title
  }
  next()
})

router.afterEach((to,from) => {
  Nprogress.done()
})

export default router