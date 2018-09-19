<template>
  <div class="layout">
    <div class="header">
      <!-- <h2 class="title">云书后台操作系统</h2> -->
      <div class="tab">
        <h2 class="index-title">云书后台管理系统</h2>
        <div class="user-center">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <img :src="userInfo.avatar" class="img">
              <!-- <i class="el-icon-arrow-down"></i> -->
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="1">修改个人信息</el-dropdown-item>
              <el-dropdown-item command="2">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="sidebar">
      <el-menu
        :router="true"
        background-color="#545c64"
        text-color="#fff"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/index">首页</el-menu-item>
            <el-menu-item index="/login">登录页</el-menu-item>
            
            <el-menu-item index="/layout/testUpload">图片上传测试页</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/categoryList">分类列表</el-menu-item>
            <el-menu-item index="/layout/addCategory">添加分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">管理员用户</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/users">用户列表</el-menu-item>
            <el-menu-item index="/layout/userAdd">添加管理员</el-menu-item>
            <el-menu-item index="/layout/changePassword">修改密码</el-menu-item>
            <el-menu-item index="/layout/userEdit">修改个人信息</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span slot="title">图书管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/book">图书列表</el-menu-item>
            <el-menu-item index="/layout/book/addBook">添加图书</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-star-on"></i>
            <span slot="title">轮播图管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/swiper">轮播图列表</el-menu-item>
            <el-menu-item index="/layout/swiper/addSwiper">添加轮播图</el-menu-item>
            <el-menu-item index="/layout/swiper/display">轮播图展示</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>

    </div>

    <div class="main-content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name:'layout',
  data() {
      return {

      }
   },
  components: {

  },
  methods: {
    handleCommand (command) {
      if (command == 1) {
        this.$router.push('/layout/userEdit')
      } else if (command == 2) {
        this.$axios.get('/logout').then(res => {
          if (res.code == 200) {
            this.$message.success('退出登录成功')
            this.$store.commit('CHANGE_USERINFO',null)
            this.$router.push('/login')
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="scss">
.layout{
    .index-title{
        text-align: center;
        height: 50px;
        line-height: 80px;
        font-weight: 400;
        font-size: 20px;
    }
    .main-content{
        margin-left:200px;
        margin-top:80px;
        padding:15px;
    }
    .sidebar{
        width: 200px;
        position:fixed;
        top:0;
        bottom:0;
        left:0;
        border-right: 1px solid #f1f1f1;
        overflow: hidden;
        padding-top: 80px;
        background: #545c64;
    }
    /deep/ {
      .el-menu {
        border-right:none;
      }
    }
    .tab{
      position:fixed;
      top:0;
      left:200px;
      right:0;
      height: 80px;
      line-height: 1rem;
      border-bottom: 1px solid #2d3a4b;
      text-align: center;
      color:#fff;
      background-color: #2d3a4b;
      z-index: 999;
      .user-center{
        position: absolute;
        top:0;
        right:20px;
        z-index: 1000;
      }
      .img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        transform: translateY(30%)
      }
    }
}
</style>
