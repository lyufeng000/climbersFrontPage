
<template>
  <el-page-header @back="goBack" content="博客">
  </el-page-header>
</template>

<style scoped>

</style>

<script>
export default {
  methods:{
    goBack() {
      this.$router.back();
    }
  }
}
</script>