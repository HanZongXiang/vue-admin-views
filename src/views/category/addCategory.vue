<template>
  <div class="add-category">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/layout/categoryList' }">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加分类</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3>添加分类</h3>
    <div class="form-wrap">
      <el-form label-width="70px" label-position="left" :data="formData">
        <el-form-item label="分类名">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="分类图标">
          <uploadImg style="float:left" v-model="formData.icon"></uploadImg>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" @click="handleAdd">添加分类</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import uploadImg  from '../../components/upload-com'

export default {
  name:'',
  data() {
      return {
        formData:{
          title:'',
          icon:''
        }
      }
   },
  components: {
    uploadImg
  },
  methods: {
    handleAdd () {
      this.$axios.post('/category',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/layout/categoryList')
        }
      })
    }
  }
}
</script>

<style scoped>
h3{
  font-weight: 400;
  margin-top: 20px;
  padding-left: 10px;
  border-left:2px solid rgb(54, 52, 54);
  line-height: 25px;
}
.form-wrap{
  width:400px;
  margin-top: 20px;
}
</style>
