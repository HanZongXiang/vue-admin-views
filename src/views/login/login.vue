<template>
  <div class="container">
    <h2 class="title">欢迎来到cloudBook后台管理系统</h2>
    <div class="login-box">
        <h2 id="h2" class="login-box-title" ref="title">请登录</h2>
        <el-form ref="form" :rules="rules" :model="formData">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="formData.username" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="formData.password" type="password" placeholder="请输入密码"  @keyup.enter.native="validateLogin"></el-input>
            </el-form-item>
            <el-button @click="validateLogin" type="primary" class="btn" :loading="isLoading">登录</el-button>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    const validateUsername = (rule,value,callback) => {
        if (!value) {
            callback(new Error('必须输入合法用户名'))
        } else {
            callback()
        }
    }
    const validatePassword = (rule,value,callback) => {

        if (value && value.length>=5) {
            callback()
        } else {
            callback(new Error('请输入合法的密码'))
        }
    }
    return {
      formData: {
        username: "",
        password: ""
      },
      rules:{
        username:[{validator:validateUsername,trigger:'blur'}],
        password:[{validator:validatePassword,trigger:'blur'}]
      },
      isLoading: false
    };
  },
  components: {},
  methods: {
    handleLogin() {
      this.isLoading = true;
      this.$axios
        .post("/login", this.formData)
        .then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$store.commit('CHANGE_USERINFO',res.data)
            this.$message.success(res.msg);
            setTimeout(() => {
              this.$router.push("/layout/index");
            }, 1000);
          } else {
            this.$message.error(res.msg);
          }
          this.isLoading = false;
        })
        .catch(err => {
          this.isLoading = false;
        });
    },
    validateLogin () {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          this.handleLogin()
        } else {
          return false
        }
      })
    }
  }, 
  created () {  //vue实例准备好的时候
    // let h1 = this.$refs.title;
    // console.log(h1);
    this.$nextTick(() => {
        let h2 = this.$refs.title
        // console.log(h2);
    })
  },
  mounted () {  //页面挂载完毕
      let h2 = this.$refs.title
    //   console.log(h2);
  }
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  background: #545c64;
  overflow: hidden;
  .title {
    margin-top: 100px;
    text-align: center;
    font-weight: normal;
    color: #fff;
  }
  .login-box {
    margin: 20px auto 0;
    width: 400px;
    height: 300px;
    border: 1px solid #e8e8e8;
    border-radius: 6px;
    padding: 20px 40px 20px 40px;
    background: #fff;
  }
  .login-box-title {
    text-align: center;
    font-weight: normal;
    color: #333;
  }
  .btn {
    margin-top: 20px;
    width: 100%;
    box-sizing: border-box;
  }
}
</style>
