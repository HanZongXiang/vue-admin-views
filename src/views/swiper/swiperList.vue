<template>
  <div class="swiper-list">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right"> 
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>轮播图列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">轮播图列表
      <!-- <i title="添加轮播图" class="el-icon-circle-plus-outline"></i> -->
    </h3>
    <el-table :data="tableData">
      <el-table-column label="头图">
        <template slot-scope="scope">
          <img :src="scope.row.img" class="swiper-img">
        </template>
      </el-table-column>
      <el-table-column label="分类排序">
        <template slot-scope="scope">
          <el-tag size="medium" style="cursor:pointer">{{scope.row.sort}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="index">
        <template slot-scope="scope">
          <span>{{scope.row.index}}</span>
        </template>
      </el-table-column>
      <el-table-column label="标题">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="small">编辑</el-button>
          <el-button type="info" size="small" disabled>详情</el-button>
          <el-button type="danger" size="small" disabled>删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'swiperList',
  data() {
      return {
        tableData:[]
      }
   },
  components: {

  },
  methods: {
    getSwiper () {
      this.$axios.get('/swiper?size=30').then(res => {
        console.log(res);
        this.tableData = res.data
      })
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
.title{
  margin-top: 20px;
  font-weight: normal;
  padding-left: 10px;
  border-left:2px solid rgb(54, 52, 54);
  line-height: 1.5;
}
</style>
