<template>
  <div class="change">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/layout/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/layout/users'}">用户列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改密码</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">修改密码</h3>
    <div class="change-password">
      <el-form :model="formData" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="原密码" prop="password">
          <el-input v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="formData.newPassword" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePassword">提交</el-button>
          <el-button type="warning" @click="resetForm('form')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name:'changePassword',
  data() {
    const validatePassword = (rule,value,callback) => {
      if (value === ""){
        callback(new Error('请输入密码'))
      } else if (value.length <5) {
        callback(new Error('密码长度不可小于5位'))
      } else {
        callback()
      }
    }

    return {
      formData: {
        password:'',
        newPassword:''
      },
      rules:{
        password:[{validator:validatePassword,trigger:'blur'}],
        newPassword:[{validator:validatePassword,trigger:'blur'}],
      }
    }
   },
  components: {

  },
  methods: {
    changePassword () {
      this.$axios.put("/user/password",{
        password:this.formData.password,
        new_password:this.formData.newPassword
      }).then(res => {
        // console.log(res);
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/layout/userEdit')
        } else if (res.code == 400) {
          this.$message.error(res.msg)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>

<style scoped>
.change-password{
  width: 500px;
  margin:50px auto;
  text-align: center;
}
</style>
