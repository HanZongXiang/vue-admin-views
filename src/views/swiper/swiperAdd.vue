<template>
  <div class="add-swiper">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/layout/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/layout/swiper'}">轮播图列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加轮播图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">添加轮播图</h3>
    <div class="form-wrap">
      <el-form :data="formData" label-width="90px" label-position="left">
        <el-form-item label="轮播图标题">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>

        <el-form-item label="轮播图书籍">
          <el-select v-model="formData.category" @change="categoryChange">
            <el-option v-for="(item,index) in categoryOptions"
                       :key="index"
                       :value="item._id"
                       :label="item.title"
            ></el-option>
          </el-select>

          <!-- 选中一本书后展示 -->
          <div class="selected-book clearfix" v-if="getSelectedBook[0]">
            <div class="img-wrap">
              <img :src="getSelectedBook[0].img">
            </div>
            <div class="book-desc">
              <div>标题：{{getSelectedBook[0].title}}</div>
              <div>作者：{{getSelectedBook[0].author}}</div>
            </div>
          </div>
        </el-form-item>
        
        <el-form-item label="轮播图头图">
          <uploadImg class="fl" v-model="formData.img"></uploadImg>
        </el-form-item>
        <el-form-item label="轮播图排序">
          <el-input-number v-model="formData.index" :min="1"></el-input-number>
        </el-form-item>
        <el-form-item class="btn">
          <el-button type="primary" @click="handleSubmit">保存添加</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="书籍列表" :visible.sync="isShowDialog">
        <el-table :data="bookData">
          <el-table-column label="书名" prop="title" width="200"></el-table-column>
          <el-table-column label="书籍头图" width="150">
            <template slot-scope="scope">
              <img :src="scope.row.img" class="book-img">
            </template>
          </el-table-column>
          <el-table-column label="作者" prop="author"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handleAddBook(scope.row._id)">添加书籍</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import uploadImg from '@/components/upload-com'

export default {
  name:'swiperAdd',
  data() {
    return {
      formData: {
        title:'',
        img:'',
        book:'',
        index:'',
        category:''
      },
      categoryOptions:[],
      isShowDialog:false,
      bookData:[],
      bookCount:0
    }
   },
  components: {
    uploadImg
  },
  methods: {
    async getCategoryOptions () {
      const res = await this.$axios.get('category',{size:50})
      this.categoryOptions = res.data
    },
    async getBookData () {
      const res = await this.$axios.get(`/category/${this.formData.category}/books`)
      console.log(res);
      this.bookData = res.data.books
      this.bookCount = res.count
    },
    categoryChange () {
      this.isShowDialog = true
      this.getBookData()
    },
    handleAddBook (id) {
      this.formData.book = id
      this.isShowDialog = false
    },
    handleSubmit () {
      //定义提交验证
      let isCanSubmit = true
      for (let key in this.formData) {
        if (!this.formData[key]) {
          isCanSubmit = false    //缺少参数不能提交
        }
      }

      if (isCanSubmit) {
        this.$axios.post('/swiper',this.formData).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            this.$router.push('/layout/swiper')
          } else {  //请求失败或者缺少参数
            this.$message.error(res.msg)
          }
        })
      }
    }
  },
  created () {
    this.getCategoryOptions()
  },
  computed: {
    getSelectedBook() {
      if (this.formData.book) {
        return this.bookData.filter(item => item._id === this.formData.book)
      } else {
        return []
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .form-wrap{
    width: 700px;
    margin-top: 15px;
    .btn{
      text-align: center;
    }
    .book-img{
      width: 100px;
      height: 80px;
    }
    .selected-book{
      margin-top: 20px;
      width:700px;
      padding:15px;
      padding-bottom: 3px;
      border:1px solid #999;
      border-radius: 4px;
    }
    .img-wrap{
      float: left;
    }
    .img-wrap img{
      width: 180px;
      height: 160px;
    }
    .book-desc{
      float: left;
    }
    .book-desc{
      color:#333;
      margin:40px 20px;
    }
  }
</style>
