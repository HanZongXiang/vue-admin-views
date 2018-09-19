<template>
  <div class="carousel">
    <el-carousel :interval="2000" type="card" height="350px">
      <el-carousel-item v-for="(item,index) in swiperData" :key="index">
        <img :src="item.img" class="swiper">
      </el-carousel-item>
    </el-carousel>
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
.carousel{
  margin:100px auto;
}
.swiper{
  width: 400px;
  height: 300px;
}
</style>
