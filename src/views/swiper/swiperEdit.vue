<template>
  <div class="swiper-edit">
    <div class="breadcurmb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/layout/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/layout/swiper'}">轮播图列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改轮播图</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">修改轮播图</h3>
    <div class="form-wrap">
      <el-form :data="formData" label-width="100px" label-position="left">
        <el-form-item label="轮播图标题">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="轮播图头图">
          <uploadImg style="float:left" v-model="formData.img"></uploadImg>
        </el-form-item>

        <el-form-item label="轮播图书籍" class="book">
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

        <el-form-item label="轮播图排序">
          <el-input v-model="formData.index"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleEdit">保存修改</el-button>
        </el-form-item>
      </el-form>

      <el-dialog title="书籍列表" :visible.sync="isShowDialog" class="book-list">
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
  name:'swiperEdit',
  data() {
    return {
      formData: {
        title:'',
        img:'',
        index:'',
        book:'',
        category:''
      },
      id:'',
      isShowDialog:false,
      categoryOptions:[],
      bookData:[],
      bookCount:0
    }
   },
  components: {
    uploadImg
  },  
  methods: {
    getSwiper () {
      const id = this.$route.query.id;
      this.$axios.get(`/swiper/${id}`).then(res => {
        // console.log(res);
        this.formData = res.data
        this.id = res.data.book._id
      })
    },
    async getCategoryOptions () {
      const res = await this.$axios.get('/category',{size:50})
      this.categoryOptions = res.data
    },
    async getBookData () {
      //根据所选分类获取书籍
      const res = await this.$axios.get(`/category/${this.formData.category}/books`)
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
    handleEdit () {
      let id = this.$route.query.id
      // let params = {
      //   ...this.formData,
      //   book:this.id
      // }
      this.$axios.put(`/swiper/${id}`,this.formData
      // {
      //   title:this.formData.title,
      //   img:this.formData.img,
      //   index:this.formData.index,
      //   book:this.id
      // }
      ).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success(res.msg)
          setTimeout(() => {
            this.$router.push('/layout/swiper')
          }, 500);
        } else {
          this.$message.error(res.msg);
        }
      })
    }
  },
  created () {
    this.getSwiper()
    this.getCategoryOptions()
  },
  computed: {
    getSelectedBook () {
      if (this.formData.book) {
        return this.bookData.filter(item => item._id ===this.formData.book)
      } else {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .form-wrap{
    width: 600px;
    margin-top: 15px;
    text-align: center;
  }
  .book{
    text-align: left;
  }
  .book-img{
    width: 100px;
    height: 80px;
  }
  .book-list{
    text-align: left;
  }
  .selected-book{
    margin-top: 20px;
    width: 430px;
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
</style>
