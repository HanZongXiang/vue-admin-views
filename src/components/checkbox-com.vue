<template>
  <label class="checkbox">
    <input type="checkbox" class="checkbox-input" v-model="currentValue" value="110">
    <span class="box-wrap"></span>
  </label>
</template>

<script>
export default {
  name:'checkbox-com',
  props:{
    value: {
      type:[String,Number]
    }
  },
  data() {
      return {
        currentValue:''
      }
   },
  watch: {
    currentValue (newValue) {
      this.$emit('input',newValue)
      this.$emit('change',newValue)
    },
    value () {
      this.currentValue = this.value
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped>

.checkbox{
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid #a1a1a1;
  border-radius: 4px;
}
.box-wrap{
  transform: scale(0);
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
}
.checkbox-input:checked + .box-wrap{
  background: #409eff;
  transform: scale(1);
  transition: transform .05s ease;
}
.checkbox-input:checked + .box-wrap::after {
  content:'';
  position: relative;;
  left:50%;
  top:38%;
  display: block;
  width: 30px;
  height: 14px;
  border-left: 4px solid #fff;
  border-bottom: 4px solid #fff;
  transform: translate(-50%,-50%) rotate(-45deg)
}
.checkbox-input{
  display: none;
}
</style>
