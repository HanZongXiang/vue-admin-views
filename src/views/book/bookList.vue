<template>
  <div class="book-list">
    <div class="breadcrumb">
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>图书列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="handleEdit(scope.row._id)">编辑</el-button>
            <el-button type="danger">删除图书</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name:'bookList',
  data() {
    return {
      tableData:[]
    }
   },
  components: {

  },
  methods: {
    getData () {
      this.$axios.get('/book',{size:888}).then(res => {
        console.log(res);
        this.tableData = res.data
      })
    },
    handleEdit (id) {
      this.$router.push({name:'bookEdit',query:{id}})
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
  border-top:1px solid #ebeef5;
}
</style>
