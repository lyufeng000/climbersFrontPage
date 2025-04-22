<template>
  <el-container>
    <el-header>
      <el-page-header @back="goBack" content="人员组成"></el-page-header>
      <el-button type="primary" @click="add" class="addButton">新增</el-button>
    </el-header>
    <el-main>
      <div>
        <el-table :data="menberTable" height="1000" border style="width: 100%" align="center"
                  @row-click="handleRowClick" ref="memberTable">

          <el-table-column type="selection" v-if="isEditing" width="100" align="center"></el-table-column>

          <el-table-column prop="name" label="姓名" width="100" align="center"></el-table-column>

          <el-table-column prop="office" label="职位" width="200" align="center"></el-table-column>

          <el-table-column prop="dept" label="部门" width="300" align="center"></el-table-column>

          <el-table-column prop="hobby" label="爱好" align="center" width="300"></el-table-column>

          <el-table-column label="状态" align="center" width="300">
            <template #default="scope">
              <span v-if="scope.row.status == true">空闲</span>
              <span v-else>忙碌</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="150">
            <!--一个修改超链接文字？，执行修改的函数，一个删除的文字，执行删除的函数-->
            <el-button type="text" @click="clickUpdate(scope.row)">修改 </el-button>
            <el-button type="text" @click="this.delete"> 删除</el-button>
          </el-table-column>
        </el-table>
      </div>

      <div>
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <span>
            <el-form>
              <el-form-item label="姓名">
                <el-input v-model="menberTable.name"></el-input>
              </el-form-item>

              <el-form-item label="职位">
                <el-input v-model="menberTable.office"></el-input>
              </el-form-item>

              <el-form-item label="部门">
                <el-input v-model="menberTable.dept"></el-input>
              </el-form-item>

              <el-form-item label="爱好">
                <el-input v-model="menberTable.hobby"></el-input>
              </el-form-item>

              <el-form-item label="状态">
                <el-tooltip>
                  <el-switch v-model="currentMember.status" active-color="#13ce66" inactive-color="#ff4949" :active-value="true" :inactive-value="false">
                  </el-switch>
                </el-tooltip>
              </el-form-item>
            </el-form>
          </span>

          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>


<script>
import axios from "axios";

export default {

  methods: {
    clickUpdate(row) {
      this.dialogVisible = true;
      this.currentMember = {...row}
      this.update();
    },

    data() {
      return {
        value: false
      }
    },

    goBack() {
      this.$router.back();
    },

    handleRowClick(row, column, event) {
      console.log("点击行", row, column, event);
      if (this.isEditing) {
        this.$refs.memberTable.toggleRowSelection(row);
      }
    },

    /*获取成员数据，在网页加载时立刻执行（被mounted执行）*/
    async fetchData() {
      try {
        const response = await axios.get("/api/members")
        if (response.data.code == 1) {
          this.menberTable = response.data.data;
        } else {
          console.error("后端返回失败", response.data.msg)
        }
      } catch (error) {
        console.error("成员获取失败", error)
      }
    },


    /*修改编辑按钮的点击事件*/
    update() {
      console.log("修改成员");
      // 在此处修改取消逻辑
      // 先打开一个弹窗，弹窗里有一个表单，表单里有成员信息
      // 通过表单获取成员信息
      // 然后通过axios发送PUT请求，修改成员信息
      this.dialogVisible = true;


    },

    /*删除编辑按钮的点击事件*/
    delete() {
      console.log("删除成员");
      // 在此处添加删除逻辑
    },

    /*新增编辑按钮的点击事件*/
    add() {
      console.log("新增成员");
      // 在此处添加新增逻辑
    },






  },//method结束

  // 在组件加载时获取成员数据
  // 加载时自动运行
  mounted() {
    this.fetchData();
  },

  // 在组件销毁时清除成员数据
  data() {
    return {
      menberTable: [],
      dialogVisible: false,
      value: false,
      currentMember: {
        id:"",
        name:"",
        gender:"",
        office:"",
        dept:"",
        hobby:"",
        email:"",
        phone:"",
        status:""

      },
    }
  }
}

</script>


<style>
.addButton {
  float: right;
}
</style>