
<template>

  <el-container>
    <el-header><el-page-header @back = "goback" content="联系我们"></el-page-header></el-header>
    <el-main>
      <el-descriptions :column=4 :data="memberTable">
        <template v-for="(member, index) in memberTable">
          <el-descriptions-item label="姓名" :key="index">
            {{member.name}}
          </el-descriptions-item>
          <el-descriptions-item :key="index" label="职务">
            {{member.office}}
          </el-descriptions-item>
          <el-descriptions-item :key="index" label="邮箱">
            {{member.email}}
          </el-descriptions-item>
          <el-descriptions-item :key="index" label="电话">
            {{member.phone}}
          </el-descriptions-item>
        </template>
      </el-descriptions>
    </el-main>
  </el-container>
</template>

<style scoped>

</style>

<script>
import axios from "axios";

export default {

  methods: {
    goback() {
      this.$router.back();
    },


    async fetchMember() {
      const response = await axios.get("/api/contacts");
      this.memberTable = response.data.data;
    }

  },

  data() {
    return {
      memberTable:[],
    }
  },

  mounted() {
    this.fetchMember();
  }
}
</script>