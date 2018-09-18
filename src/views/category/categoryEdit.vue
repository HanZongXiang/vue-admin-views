<template>
  <div class="wrap">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/layout/categoryList' }">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">编辑分类</h3>
    <div class="form-wrap">
      <el-form :data="formData">
        <el-form-item label="分类名">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="分类图标">
          <uploadImg style="float:left" v-model="formData.icon" class="img"></uploadImg>
        </el-form-item>
        <el-form-item label="分类排序">
          <el-input-number v-model="formData.index" :min="1" :max="998" label="数字越大越靠前"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" size="small" @click="handleEdit">提交修改</el-button>
        </el-form-item>
      </el-form>
    </div>
    
  </div>
</template>

<script>
import uploadImg from '../../components/upload-com'

export default {
  name:'categoryEdit',
  data() {
      return {
        formData: {
          title:'',
          icon:'',
          index:''
        }
      }
   },
  components: {
    uploadImg
  },
  methods: {
    async getData () {
      // console.log(this.$route);
      const id = this.$route.query.id
      try {
        const {data} = await this.$axios.get(`/category/${id}`)
        this.formData = data
        // console.log(this.formData);
      } catch (err) {
        console.log(err);
      }
    },
    async handleEdit () {
      const id = this.$route.query.id
      const data = await this.$axios.put(`/category/${id}`,this.formData)
      if (data.code == 200) {
        this.$message.success(data.msg)
        setTimeout(() => {
          this.$router.push('/layout/categoryList')
        }, 1000);
      } else {
        this.$message.error(data.msg)
      }
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
.title{
  font-weight: 400;
  margin:15px 0 10px 0;
  padding-left: 10px;
  border-left:2px solid rgb(54, 52, 54);
}
.form-wrap{
  width: 500px;
}
.img{
  width: 50px;
  height: 50px;
}
</style>
