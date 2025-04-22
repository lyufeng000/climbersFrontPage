<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="人员组成"></el-page-header>
      <el-button v-if="!isEditing" type="primary" @click="toggleEdit" style="float: right;">编辑</el-button>
      <div v-else style="float: right;">
        <el-button type="success" @click="completeChanges">完成</el-button>
        <el-button type="warning" @click="updateEdit">修改</el-button>
        <el-button type="danger" @click="deleteMember">删除</el-button>
        <el-button type="primary" @click="addMember">新增</el-button>
      </div>
    </el-header>
    <el-main>
      <div>
        <el-table :data="menberTable" height="1000" border style="width: 100%" align="center" @row-click="handleRowClick" ref="memberTable">

          <el-table-column type="selection" v-if="isEditing" width="100" align="center"></el-table-column>

          <el-table-column prop="name" label="姓名" width="300" align="center"></el-table-column>

          <el-table-column prop="office" label="职位" width="200" align="center"></el-table-column>

          <el-table-column prop="category" label="部门" width="300" align="center"></el-table-column>

          <el-table-column prop="hobby" label="爱好" align="center" width="400"></el-table-column>

          <el-table-column label="状态" align="center" width="300">
            <template #default = "scope">
              <span v-if="scope.row.status == true">空闲</span>
              <span v-else>忙碌</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <el-dialog title="成员信息" :visible.sync="editDialogVisible" width="50%">

        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<style>

</style>

<script>
import axios from "axios";

export default {

  methods: {
    goBack() {
      this.$router.back();
    },

    handleRowClick(row, column, event) {
      console.log("点击行", row, column, event);
      if (this.isEditing){
        this.$refs.memberTable.toggleRowSelection(row);
      }
    },

    //GET查
    //POST新增
    //PUT修改
    //DELETE删除


    // 获取成员数据，在网页加载时立刻执行（被mounted执行）
    async fetchData(){
      try {
        const response = await axios.get("/api/members")
        if (response.data.code == 1){
          this.menberTable = response.data.data;
        }else {
          console.error("后端返回失败",response.data.msg)
        }
      }catch (error){
        console.error("成员获取失败",error)
      }
    },

    // 编辑按钮的点击事件，反转编辑状态
    toggleEdit() {
      this.isEditing = !this.isEditing;
    },

    // 完成编辑按钮的点击事件
    completeChanges() {
      console.log("保存修改");
      // 在此处添加保存逻辑
      this.isEditing = false;
    },

    // 修改编辑按钮的点击事件
    updateEdit() {
      console.log("修改成员");
      // 在此处添加取消逻辑

    },

    // 删除编辑按钮的点击事件
    deleteMember() {
      console.log("删除成员");
      // 在此处添加删除逻辑
    },

    // 新增编辑按钮的点击事件
    addMember() {
      console.log("新增成员");
      // 在此处添加新增逻辑
    },

  },

  // 在组件加载时获取成员数据
  // 加载时自动运行
  mounted() {
    this.fetchData();
  },

  // 在组件销毁时清除成员数据
  data() {
    return {
      menberTable: [],
      isEditing: false,
    }
  }
}
</script>