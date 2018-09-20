<template>
  <div class="swiper-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right"> 
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">轮播图列表
      <i style="cursor:pointer" title="添加轮播图" class="el-icon-circle-plus-outline" @click="handleAdd"></i>
    </h3>
    <el-table :data="tableData">
      <el-table-column label="轮播图头图" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="swiper-img">
        </template>
      </el-table-column>
      <el-table-column label="轮播图标题" width="200">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="分类排序" width="150">
        <template slot-scope="scope">
          <el-tag size="medium" style="cursor:pointer">{{scope.row.sort}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="书籍头图" width="150">
        <template slot-scope="scope">
          <img :src="scope.row.book.img" class="book-img">
        </template>
      </el-table-column>
      <el-table-column label="书籍标题">
        <template slot-scope="scope">
          <span>{{scope.row.book.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button type="info" size="small" disabled>详情</el-button>
          <el-button type="danger" size="small" @click="handleDelete(scope.row._id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
    background
    layout="prev,pager,next"
    @current-change="pageChange"
    :page-size="7"
    :total="count"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name:'swiperList',
  data() {
      return {
        tableData:[],
        pn:1,
        count:0
      }
   },
  components: {

  },
  methods: {
    getSwiper () {
      this.$axios.get('/swiper',{pn:this.pn,size:7}).then(res => {
        console.log(res);
        this.tableData = res.data
        this.count = res.count
      })
    },
    handleEdit (id) {
      this.$router.push(`/layout/swiper/editSwiper?id=${id}`)
    },
    pageChange (page) {
      this.pn = page
      this.getSwiper()
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除此轮播图,请确认轮播图下没有内容。','警告',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        this.$axios.post('/swiper/delete',{ids:[id]}).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success('成功删除一张轮播图')
            this.getSwiper()
            // setTimeout(() => {
            //   this.$router.push('/layout/swiper')
            // }, 1000);
          }
        })
      }).catch(() => {
        this.$message({
          type:'info',
          message:'已取消删除'
        })
      })
    },
    handleAdd () {
      this.$router.push({name:"addSwiper"})
    }
  },
  created () {
    this.getSwiper()
  }
}
</script>

<style scoped>
.swiper-img{
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.book-img{
  width: 75px;
  height: 60px;
}
.title{
  position:relative;
}
.el-pagination{
  position:absolute;
  top:845px;
  left:720px;
}

</style>
