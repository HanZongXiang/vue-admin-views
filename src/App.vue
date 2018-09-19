<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
.title{
  margin-top: 20px;
  font-weight: normal;
  padding-left: 10px;
  border-left:2px solid rgb(54, 52, 54);
  line-height: 1.5;
}
.clearfix::after{
  content:'';
  display: block;
  clear: both;
  height: 0;
  width: 0;
  overflow: hidden;
}
.fl{
  float: left;
}
</style>
