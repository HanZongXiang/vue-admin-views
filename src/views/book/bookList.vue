<template>
  <div class="book-list">
    <div class="breadcrumb">
      <el-breadcrumb  separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图书列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <i title="添加图书" @click="handleAdd" class="el-icon-circle-plus-outline add"><span>添加图书</span></i>
    <div class="book-table">
      <el-table :data="tableData">
        <el-table-column prop="title" label="书名"></el-table-column>
        <el-table-column label="书籍头图">
          <template slot-scope="scope">
            <img :src="scope.row.img" class="img">
          </template>
        </el-table-column>
        <el-table-column prop="index" label="书籍排序"></el-table-column>
        <el-table-column prop="author" label="作者"></el-table-column>
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button type="primary" @click="handleDetails(scope.row._id)">详情</el-button>
            <el-button type="danger" @click="handleDelete(scope.row._id)">删除图书</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination 
      background
      layout="prev,pager,next"
      @current-change="pageChange"
      :page-size="7"
      :total="70"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name:'bookList',
  data() {
    return {
      tableData:[],
      pn:1,
      count:0,
      id:''
    }
   },
  components: {

  },
  methods: {
    getData () {
      this.$axios.get('/book',{pn:this.pn,size:7}).then(res => {
        console.log(res);
        // console.log(res.data.length);
        this.count = res.data.count
        this.tableData = res.data
      })
    },
    handleAdd () {
      this.$router.push({name:'bookAdd'})
    },
    handleEdit (id) {
      this.$router.push({name:'bookEdit',query:{id}})
    },
    handleDetails (id) {
      this.$router.push({name:'bookDetails',query:{id}})
    },
    handleDelete (bookId) {
      // console.log(id);
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
            this.getData() //删除成功重新获取数据
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message.info('已取消删除')
      })
    },
    pageChange (page) {
      console.log(page);
      this.pn = page;
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
.img{
  width: 50px;
  height: 50px;
}
.book-table{
  margin-top: 20px;
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-top:1px solid #ebeef5;
}
.el-pagination{
  position:fixed;
  bottom:10px;
  left:600px;
}
.add{
  position: absolute;
  font-size: 20px;
  top:93px;
  right:100px;
  z-index: 999;
  color:#58636F;
  cursor: pointer;
}
.add span{
  margin-left:5px;
}
</style>
