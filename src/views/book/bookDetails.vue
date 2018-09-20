<template>
  <div class="book-details">
    <div class="breadcrumb">
      <el-breadcrumb  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/layout/book' }">图书列表</el-breadcrumb-item>
        <el-breadcrumb-item>图书详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">书籍详情</h3>
    <div class="wrap">
      <el-form  label-position="left">
        <el-form-item label="搜索" label-width="50px">
          <el-input></el-input>
        </el-form-item>
      </el-form>
    </div>
    
    <div class="detail-wrap">
      <div class="top">
        <h4 class="author">作者：{{details.author}}</h4>
        <h4>标题：{{details.title}}</h4>
        <h4>简介：{{details.desc}}</h4>
        <br>
        <span><i class="el-icon-time"></i> 添加时间：{{details.createTime}}</span>
        <div class="avatar-wrap">
          <span class="fl"><i class="el-icon-picture"></i> 图书封面：</span>
          <img :src="img" class="avatar">
        </div>
        <div class="bottom">
          <span><i class="el-icon-view"> 在看人数：<el-tag>{{details.looknums}}</el-tag></i></span>
          <br>
          <span><i class="el-icon-star-on"> 喜欢人数：<el-tag>{{likenums}}</el-tag></i></span>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import uploadImg from '@/components/upload-com'

export default {
  name:'bookDetails',
  data() {
    return {
      details:[],
      img:'',
      likenums:0
    }
  },
  components: {
    uploadImg
  },
  methods: {
    async getBookDetails () {
      const res = await this.$axios.get(`/book/${this.$route.query.id}`)
      console.log(res);
      if (res.code == 200) {
        // this.$message.success('获取详情成功')
        this.details = res.data
        this.img = res.data.img
        this.likenums = res.data.like_this_users.length
      } else {
        this.$message.error(res.msg)
      }
    }
  },
  created () {
    if (this.$route.query.id) {
      this.getBookDetails()
    }
  }
}
</script>

<style scoped lang="scss">
  .wrap{
    width: 500px;
  }
  .detail-wrap{
    width: 500px;
    color:#666;
    .author{
      margin-top: 15px;
    }
    h4{
      font-weight: 400;
      font-size: 16px;
      line-height: 2;
    }
    
    .avatar{
      width: 300px;
      height: 200px;
      border-radius: 5px;
    }
  }

</style>
