
<template>

  <el-container>
    <el-header><el-page-header @back = "goback" content="联系我们"></el-page-header></el-header>
    <el-main>
      <h1>副队长：李雨峰</h1><br>
      <h4>TEL:13908228487</h4><br>
      <h4>mail:lyufeng000@foxmail.com</h4>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>

<script>
export default {
  methods: {
    goback() {
      this.$router.back();
    }
  }
}
</script>