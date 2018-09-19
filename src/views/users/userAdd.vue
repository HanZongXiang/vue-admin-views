<template>
  <div class="add">
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/layout/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/layout/users'}">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h2 class="title">添加管理员</h2>
    <div class="form-wrapper">
      <el-form :model="formData" size="small" label-width="100px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码">
          <el-input type="password" v-model="formData.checkPassword"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="formData.nickname"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="头像">
          <uploadImg v-model="formData.avatar" style="float:left"></uploadImg>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="submitData">提交信息</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
import uploadImg from '@/components/upload-com'

export default {
  name:'userAdd',
  data() {
      return {
        formData :{
          username:'',
          nickname:'',
          email:'',
          avatar:'',
          desc:'',
          password:'',
          checkPassword:''
        }
      }
   },
  components: {
    uploadImg
  },
  methods: {
    submitData () {
      if (this.formData.password != this.formData.checkPassword){
        this.$message.error('两次输入的密码不一致，请重新输入')
      } else {
        this.$axios.post('/user',this.formData).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            setTimeout(() => {
              this.$router.push('/layout/users')
            }, 1000);
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.title{
  font-weight: normal;
  padding-left: 10px;
  border-left:2px solid rgb(54, 52, 54);
  line-height: 1.5;
}
.form-wrapper{
  width: 500px;
  margin-top: 20px;
  line-height: 50px;
}
</style>
