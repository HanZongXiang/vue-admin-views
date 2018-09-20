<template>
  <div class="swiper-display">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{path:'/layout/index'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{path:'/layout/swiper'}">轮播图列表</el-breadcrumb-item>
        <el-breadcrumb-item>轮播图展示</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <h3 class="title">轮播图展示</h3>
    <div class="carousel">
      <el-carousel :interval="2000" type="card" height="350px">
        <el-carousel-item v-for="(item,index) in swiperData" :key="index">
          <img :src="item.img" class="swiper">
        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
export default {
  name:'swiperDisplay',
  data() {
    return {
      swiperData:[]
    }
   },
  components: {

  },
  methods: {
    getSwiper () {
      this.$axios.get('/swiper',{size:30}).then(res => {
        console.log(res);
        this.swiperData = res.data
      })
    }
  },
  created () {
    this.getSwiper()
  }
}
</script>

<style scoped>
.breadcrumb{
  margin-bottom: 30px;
}
.carousel{
  margin:50px auto;
}
.swiper{
  width: 400px;
  height: 300px;
}
</style>
