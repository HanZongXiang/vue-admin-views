<template>
  <div class="category-list">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分类列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="tableData" class="table">
      <el-table-column prop="title" label="分类名" width="300"> </el-table-column>
      <el-table-column label="分类图标" width="210">
        <template slot-scope="scope">
          <img :src="scope.row.icon" class="img">
        </template>
      </el-table-column>
      <el-table-column prop="index" label="分类排序"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope" width="300">
          <el-button size="small" type="primary" @click="handleEdit(scope.row._id)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row._id)">删除分类</el-button>
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
  name:'categoryList',
  data() {
      return {
        tableData:[],
        page:1,
        count:0
      }
   },
  components: {

  },
  methods: {
    getData () {
      this.$axios.get('/category',{pn:this.page,size:7}).then(res => {
        console.log(res);
        this.count = res.count
        this.tableData = res.data
      })
    },
    handleEdit (id) {
      this.$router.push({name:'categoryEdit',query:{id}})
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该分类,请确认该分类下没有图书。','警告',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(() => {
        this.$axios.delete(`category/${id}`).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success('成功删除当前分类')
            this.getData()
          }
        })
      }).catch(() => {
        this.$message({
          type:'info',
          message:'已取消删除'
        })
      })
    },
    pageChange (page) {
      console.log(page);
      this.page = page
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
.table{
  margin-top: 20px;
}
.img{
  width: 50px;
  height: 50px;
}
.breadcrumb{
  position:relative;
}
.el-pagination{
  position:absolute;
  top:760px;
  left:680px;
}
</style>
