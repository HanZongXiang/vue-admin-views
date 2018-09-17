<template>
  <div class="layout">
    <div class="header">
      <h2 class="title">云书后台操作系统</h2>
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
            <template slot="title">用户管理</template>
            <el-menu-item index="/layout/index">首页</el-menu-item>
            <el-menu-item index="/login">登录页</el-menu-item>
            <el-menu-item index="/layout/users">用户管理页</el-menu-item>
            <el-menu-item index="/layout/testUpload">图片上传测试页</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="用户列表">
            <el-menu-item index="1-3">管理员列表页</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/layout/index">分类列表</el-menu-item>
            <el-menu-item index="/login">添加分类</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
      </el-menu>
      </div>
    <div class="main-content">
        <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name:'layout',
  data() {
      return {

      }
   },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.layout{
    .title{
        text-align: center;
        height: 60px;
        line-height: 60px;
        font-weight: 400;
        margin-left:200px;
        font-size: 20px;
        border-bottom:1px solid #f1f1f1;
    }
    .main-content{
        margin-left:200px;
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
}
</style>
