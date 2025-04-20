<template>
  <el-page-header @back="goBack" content="关于我们">
  </el-page-header>
</template>

<style scoped>

</style>

<script>
export default {
  methods: {
    goBack() {
      console.log('go back');
      this.$router.back();
    }
  }
}
</script>
