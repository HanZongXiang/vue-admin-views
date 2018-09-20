<template>
  <div class="add-book">
    <div class="breadcrumb">
      <el-breadcrumb  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/layout/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/layout/book'}">图书列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加图书</el-breadcrumb-item>
      </el-breadcrumb>
      <h3 class="title">添加图书</h3>
      <div class="form-wrap">
        <el-form :data="formData">
          <el-form-item label="图书分类">
            <el-select class="options" v-model="formData.typeId">
              <el-option v-for="(item,index) in typeOptions"
                        :key="index"
                        :value="item._id"
                        :label="item.title"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="网络链接">
            <el-input v-model="formData.url"></el-input>
          </el-form-item>
          <el-form-item label="图书头图">
            <div class="switch-wrap">
              <el-switch v-model="isShowUpload" 
                         active-text="填写链接" 
                         inactive-text="手动上传" 
                         active-color="#13ce66" 
                         inactive-color="#ff4949"
              >
              </el-switch>
            </div>

            <uploadImg class="fl" v-show="!isShowUpload" v-model="formData.img"></uploadImg>
            <el-input v-show="isShowUpload" v-model="formData.img"></el-input>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="formData.author"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAddBook">添加图书</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>  
</template>

<script>
import uploadImg from '@/components/upload-com'

export default {
  name:'bookAdd',
  data() {
      return {
        isShowUpload:true,
        typeOptions:[],
        formData: {
          typeId:'',
          img:'',
          url:'',
          author:''
        }
      }
   },
  components: {
    uploadImg
  },
  methods: {
    getCategory () {
      this.$axios.get('/category',{size:50}).then(res => {
        console.log(res);
        this.typeOptions = res.data
      })
    },
    handleAddBook () {
      // this.$router.push('/layout/index')
      this.$axios.post('book',this.formData).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push({name:'bookList'})
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  created () {
    this.getCategory()
  }
}
</script>

<style scoped>
.form-wrap{
  margin-top: 15px;
  width: 800px;
}
.form-wrap .el-form-item:last-child{
  text-align: center;
}
.switch-wrap{
  clear: both;
  display: block;
}
/* .options{
  display: block;
} */
</style>
