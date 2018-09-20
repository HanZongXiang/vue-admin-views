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
  userEdit:() => import('@/views/users/userEdit'),
  userAdd:() => import('@/views/users/userAdd'),
  userDetails:() => import('@/views/users/userDetails'),
  categoryList:() => import('@/views/category/categoryList'),
  addCategory:() => import('@/views/category/addCategory'),
  categoryEdit:() => import('@/views/category/categoryEdit'),
  categoryBook:() => import('@/views/category/categoryBook'),
  bookList:() => import('@/views/book/bookList'),
  bookEdit:() => import('@/views/book/bookEdit'),
  bookAdd:() => import('@/views/book/bookAdd'),
  bookDetails:() => import('@/views/book/bookDetails'),
  swiperList:() => import('@/views/swiper/swiperList'),
  changePassword:() => import('@/views/users/changePassword'),
  addSwiper:() => import('@/views/swiper/swiperAdd'),
  swiperDisplay:() => import('@/views/swiper/swiperDisplay'),
  editSwiper:() => import('@/views/swiper/swiperEdit')
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
          path:'changePassword',
          meta: {
            title:'修改密码'
          },
          name:'changePassword',
          component:components.changePassword
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
          name:'userAdd',
          component: components.userAdd
        },
        {
          path: 'userDetails',
          meta: {
            title: '管理员详情'
          },
          name:'userDetails',
          component: components.userDetails
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
          path:'categoryBook',
          meta: {
            title:'分类图书'
          },
          name:'categoryBook',
          component:components.categoryBook
        },
        {
          path:'book',
          meta: {
            title:'图书管理'
          },
          name:'bookList',
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
          path:'book/details',
          meta: {
            title:'书籍详情'
          },
          name:'bookDetails',
          component:components.bookDetails
        },
        {
          path:'swiper',
          meta: {
            title:'轮播图列表'
          },
          name:'swiper',
          component:components.swiperList
        },
        {
          path:'swiper/editSwiper',
          meta: {
            title:'修改轮播图'
          },
          name:'swiperEdit',
          component:components.editSwiper
        },
        {
          path:'swiper/addSwiper',
          meta: {
            title:'添加轮播图'
          },
          name:'addSwiper',
          component:components.addSwiper
        },
        {
          path:'swiper/display',
          meta: {
            title:'轮播图展示'
          },
          name:'swiperDisplay',
          component:components.swiperDisplay
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