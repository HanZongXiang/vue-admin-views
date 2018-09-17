<template>
  <div class="">
    <h1>上传图片测试页</h1>

    <!-- <h1>传统表单上传</h1>
    <div>
      // get请求  'Content-Type':'application/x-www-form-urlencoded'
      // post请求  'Content-Type':'application/json'
      // 传统表单enctype是application/x-www-form-urlencoded
      <form action="https://upload-z1.qiniup.com" method="post" enctype="multipart/form-data">
        <input type="file" name="file">
        <br>
        <input type="text" v-model="token" name="token">
        <button type="submit">提交</button>
        <img :src="">
      </form>
    </div> -->

    <!-- <h2>ajax上传图片</h2>
    <input type="file" @change="handleChange">
    <br>
    <img :src="imgUrl"> -->

    <!-- <upload-com @success="uploadImg"></upload-com>
    <div style="border:1px solid #000">
      <img :src="imgData">
    </div> -->

    <check-box v-model="boxValue"></check-box>

  </div>
</template>

<script>
import axios from 'axios'
import uploadCom from '@/components/upload-com'
import checkBox from '@/components/checkbox-com'

export default {
  name:'testUpload',
  data() {
      return {
        token:'',
        imgData:'',
        boxValue:''
      }
   },
  components: {
    uploadCom,
    checkBox
  },
  methods: {
    getToken () {
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        // console.log(res);
        this.token = res.data.data
      })
    },
    handleChange (event) {
      // console.log(event);
      let file = event.target.files[0]

      let formData = new FormData()
      formData.append('file',file,file.name)
      formData.append('token',this.token)

      axios.post('https://upload-z1.qiniup.com',formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        }
      }).then(res => {
        this.imgUrl = res.data.url
      })
    },
    uploadImg (url) {
      this.imgData = url
    }
  },
  created () {
    this.getToken()
  }
}
</script>

<style scoped>
</style>
