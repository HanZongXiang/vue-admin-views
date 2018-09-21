<template>
  <div class="category-book">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/layout/categoryList' }">分类列表</el-breadcrumb-item>
        <el-breadcrumb-item>分类书籍</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">分类图书列表  -  <span>{{categoryTitle}}</span></h3>
    <div class="table-wrap">
      <el-table :data="bookData">
        <el-table-column label="头像" width="280">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="avatar">
          </template>
        </el-table-column>

        <el-table-column label="作者" width="200">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>作者：{{scope.row.author}}</p>
              <p class="desc">简介：{{scope.row.desc}}</p>
              <div slot="reference" class="modal">
                <el-tag size="medium">{{scope.row.author}}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>

        <el-table-column label="创建日期" width="240">
          <template slot-scope="scope">
            <span>
              <i class="el-icon-time"></i>
              <!-- <span>{{scope.row.createTime}}</span> -->
              <timer :time="scope.row.createTime"></timer>
            </span>
          </template>
        </el-table-column>

        <el-table-column label="图书索引" width="240">
          <template slot-scope="scope">
            <div>
              <!-- <i class="el-icon-message"></i> -->
              <el-tag size="small">{{scope.row.index}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleSwiper(scope.row)">生成轮播图</el-button>
            <el-button type="primary" @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button type="danger" @click="handleDelete(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import timer from '@/components/timer'

export default {
  name:'',
  data() {
    return {
      bookData:[],
      categoryTitle:'',
      id:''
    }
  },
  components: {
    timer
  },
  methods: {
    async getBookData () {
      const res = await this.$axios.get(`/category/${this.$route.query.id}/books`,{size:20})
      this.bookData = res.data.books
      this.categoryTitle = res.data.title
    },
    handleDelete (bookId) {
      this.$confirm('该操作会删除对应分类和轮播图当中的图书，确认删除吗？','提示',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        this.id = bookId
        this.$axios.delete(`/book/${this.id}`,this.id).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
            // this.$router.push({name:'bookList'})
            this.getBookData() //删除成功重新获取数据
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    handleEdit (id) {
      this.$router.push(`/layout/book/edit?id=${id}`)
    },
    handleSwiper (data) {
      console.log(data);
      let params = {
        title:data.title,
        img:data.img,
        book:data._id,
        index:data.index
      };
      this.$axios.post('/swiper',params).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success(res.msg);
          this.$router.push('/layout/swiper')
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  },
  created () {
    this.getBookData()
  }
}
</script>

<style scoped>
.desc{
  width: 230px;
  height: 60px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp:3;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  /* white-space:nowrap; */
}
.avatar{
  width: 190px;
  height: 250px;
}
.modal{
  cursor: pointer;
}
</style>
