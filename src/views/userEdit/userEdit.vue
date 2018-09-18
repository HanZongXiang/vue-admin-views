<template>
  <div class="edit">
    <h2 class="title">修改个人信息</h2>
    <div class="form-wrapper">
      <el-form :model="formData" size="small" label-width="80px" label-position="left">
        <el-form-item label="用户名">
          <el-input v-model="formData.username" disabled></el-input>
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
          <el-button type="primary" size="small" @click="handleEdit">保存修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
import uploadImg from '@/components/upload-com'

export default {
  name:'userEdit',
  data() {
      return {
        formData: {
          username:'',
          nickname:'',
          email:'',
          avatar:'',
          desc:''
        },
      }
   },
  components: {
    uploadImg
  },
  methods: {
    initData () {
      this.formData = {
        ...this.$store.state.userInfo
      }
    },
    handleEdit () {
      this.$axios.put('/user/userInfo',this.formData).then(res => {
        console.log(res);
        if(res.code == 200) {
          let userInfo = res.data
          this.$store.commit('CHANGE_USERINFO',userInfo)
          this.initData()
          this.$message.success(res.msg)
        }
      })
    }
  },
  created () {
    this.initData()
  }
}
</script>

<style scoped>
.title{
  font-weight: 400;
  padding-left: 10px;
  border-left:2px solid rgb(54, 52, 54);
  line-height: 1.5;
}
.form-wrapper{
  width: 600px;
  margin-top: 20px;
}
</style>
