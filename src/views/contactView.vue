
<template>

  <el-container>
    <el-header><el-page-header @back = "goback" content="联系我们"></el-page-header></el-header>
    <el-main>
      <el-descriptions :column=3 :data="memberTable">
        <el-descriptions-item>
          <template slot="label">姓名</template>
            <div>{{ memberTable[0].name }}</div>
        </el-descriptions-item>
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