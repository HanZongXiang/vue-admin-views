<template>
  <div class="book-edit">
    <div>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path:'/layout/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path:'/layout/book' }">图书列表</el-breadcrumb-item>
        <el-breadcrumb-item>编辑图书</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <div class="form-wrap">
      <el-form>
        <el-form-item label="书籍名">
          <el-input v-model="formData.title"></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <el-input v-model="formData.author"></el-input>
        </el-form-item>
        <el-form-item label="图书头图">
          <uploadImg style="float:left" v-model="formData.img"></uploadImg>
        </el-form-item>
        <el-form-item label="书籍简介">
          <el-input type="textarea" autosize v-model="formData.desc"></el-input>
        </el-form-item>
        <el-form-item label="图书分类">
          <el-select v-model="formData.type">
            <el-option v-for="(item,index) in typeOptions" :value="item._id" :label="item.title" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleEdit">保存更改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import uploadImg from '../../components/upload-com'

export default {
  name:'bookEdit',
  data() {
      return {
        formData: {
          title:'',
          author:'',
          img:'',
          desc:'',
          type:''
        },
        typeOptions:[]
      }
   },
  components: {
    uploadImg
  },
  methods: {
    getData () {
      const id = this.$route.query.id;
      this.$axios.get(`/book/${id}`).then(res => {
        // console.log(res);
        this.formData = res.data
      })
    },
    //获取分类
    getCategory () {
      return new Promise((resolve,reject) => {
        this.$axios.get('/category').then(res => {
          console.log(res);
          this.typeOptions = res.data
          resolve(res)
        })
      })
    },
    handleEdit () {
      let params = {
        ...this.formData,
        book_id:this.$route.query.id
      }
      this.$axios.put('/book',params).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/layout/book')
        }
      })
    }
  },
  created () {
    this.getCategory().then(() => {
      this.getData()
    })
  }
}
</script>

<style scoped>
</style>
