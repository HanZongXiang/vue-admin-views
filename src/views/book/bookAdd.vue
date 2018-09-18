<template>
  <div class="add-book">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{path:'/layout/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加图书</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 class="title">添加图书</h3>
      <div class="form-wrap">
        <el-form>
          <el-form-item label="图书分类">

          </el-form-item>
          <el-form-item label="爬虫链接">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="图书头图">
            <div class="switch-wrap">
              <el-switch v-model="isShowUpload" active-text="手动上传" 
              inactive-text="填写链接" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </div>

            <uploadImg style="float:left" v-show="isShowUpload"></uploadImg>
            <el-input v-show="!isShowUpload"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleReturn">添加图书</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>  
</template>

<script>
import uploadImg from '../../components/upload-com'

export default {
  name:'bookAdd',
  data() {
      return {
        isShowUpload:true
      }
   },
  components: {
    uploadImg
  },
  methods: {
    handleReturn () {
      this.$router.push('/layout/index')
    }
  }
}
</script>

<style scoped>
.title{
  font-weight: 400;
  padding-left: 10px;
  border-left:2px solid rgb(54, 52, 54);
  line-height: 1.5;
  margin:10px 0;
}
.form-wrap{
  width: 800px;
}
.switch-wrap{
  clear: both;
  display: block;
}
</style>
