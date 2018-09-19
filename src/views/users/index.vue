<template>
  <div class="user-manage">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right"> 
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <el-table :data="tableData" class="table">
      <el-table-column prop="nickname" label="姓名" width="130"></el-table-column>
      <el-table-column prop="date" label="日期" width="220"></el-table-column>
      <el-table-column prop="desc" label="个性签名" width="350"></el-table-column>
      <el-table-column prop="" label="用户头像" width="200" height="100">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" class="avatar">
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button @click="handleDetails(scope.row._id)" size="small" type="primary">查看详细</el-button>
          <el-button @click="handleDelete(scope.row._id)" size="small" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination 
    background
    @current-change="pageChange" 
    layout="prev,pager,next"
    :page-size="5" 
    :total="count">
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData:[],
      count:0,
      page:1
    }
   },
  components: {

  },
  methods: {
    getData(){
      this.$axios.get('/user',{pn:this.page,size:5}).then(res => {
        console.log(res);
        if(res.code == 200){
          this.count = res.count
          this.tableData = res.data.map(item => {
            let time = new Date(item.createdTime);
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            let day = time.getDate()
            let hour = time.getHours()
            let minute = time.getMinutes()
            let second = time.getSeconds()
            item.date = `${year}年${month}月${day}日${hour}时${minute}分${second}秒`
            return item
          })
        }
      })
    },
    handleDetails (id) {
      this.$router.push(`/layout/userDetails?id=${id}`)
    },
    handleDelete (id) {
      this.$confirm('此操作将永久删除该管理员信息，是否继续?','警告',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then((res) => {
        this.$axios.post('/user/delete',{userIds:[id]}).then(res => {
          if(res.code == 200){
            this.$message.success(res.msg)
            this.getData()
          }
        }).catch(() => {
          this.$message({
            type:'info',
            message:'已取消删除'
          })
        })
      })
    },
    pageChange (page) {
      // console.log(page);
      this.page = page;
      this.getData()
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style scoped>
.breadcrumb{
  position: relative;
}
.table{
  margin-top: 20px;
}
el-table-column:last-child {
  margin-left: 50px;
}
.avatar{
  width: 100px;
  height: 100px;
}
.el-pagination{
  position:absolute;
  top:840px;
  left:670px;
}
</style>
